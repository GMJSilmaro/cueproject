import type { NextAuthOptions } from "next-auth";
import type { DefaultSession, Account, Session, User as NextAuthUser } from "next-auth";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";

type Role = "ADMIN" | "DJ" | "USER";

// Extend the session type to include custom fields
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"]
  }

  interface User {
    readonly id: string;
    email: string;
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt" as const, 
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  theme: {
    colorScheme: 'light',
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "email,public_profile"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }: { 
      user: NextAuthUser; 
      account: Account | null; 
    }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        if (!user.email) return false;

        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true }
          });

          if (existingUser) {
            // If user exists but doesn't have this provider account, create it
            const accounts = existingUser.accounts as Array<{ provider: string }>;
            const hasProvider = accounts?.some(acc => acc.provider === account.provider);
            if (!hasProvider) {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  expires_at: account.expires_at
                },
              });
            }
            return true;
          }

          // If no user exists, create new user
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? null,
              image: user.image ?? null,
              role: "USER",
              password: null,
            },
          });

          await prisma.profile.create({
            data: {
              userId: newUser.id,
              username: user.name || `user_${newUser.id.slice(0, 8)}`,
            },
          });

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ token, session }: { 
      token: JWT; 
      session: Session 
    }) {
      if (token && session.user) {
        session.user.id = token.sub ?? "";
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? "";
        session.user.role = (token.role as Role) ?? "USER";
        session.user.image = token.picture ?? null;
      }
      return session;
    },
    async jwt({ token, user, account }: { 
      token: JWT; 
      user?: NextAuthUser; 
      account?: Account | null 
    }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role ?? "USER";
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    }
  }
}; 