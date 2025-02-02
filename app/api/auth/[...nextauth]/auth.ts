import type { NextAuthOptions } from "next-auth";
import type { DefaultSession, Account, Session } from "next-auth";
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
      provider?: string;
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/',
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
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            password: true,
          },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.password) {
          throw new Error("Please login with your social account");
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
    async signIn({ user, account }) {
      if (!user?.email) {
        throw new Error("No email associated with this account");
      }

      try {
        if (account?.provider === "google" || account?.provider === "facebook") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true, profile: true }
          });

          if (existingUser) {
            if (!existingUser.profile) {
              await prisma.profile.create({
                data: {
                  userId: existingUser.id,
                  username: user.name || `user_${existingUser.id.slice(0, 8)}`,
                },
              });
            }

            const hasProvider = existingUser.accounts?.some(acc => acc.provider === account.provider);
            if (!hasProvider && account) {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type ?? "oauth",
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
          } else {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || null,
                image: user.image || null,
                role: "USER",
                profile: {
                  create: {
                    username: user.name || `user_${Date.now().toString(36)}`,
                  }
                }
              },
            });
          }
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // If the URL is relative, make it absolute
      if (url.startsWith('/')) {
        url = new URL(url, baseUrl).toString();
      }
      // Allow redirects to the same domain
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.sub ?? "";
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
        session.user.role = (token.role as Role) ?? "USER";
        session.user.image = token.picture ?? null;
        session.user.provider = token.provider as string ?? null;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as any).role ?? "USER";
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    }
  }
}; 