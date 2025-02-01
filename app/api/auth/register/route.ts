import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
// @ts-expect-error - Prisma Client is not available during build time but will be available at runtime
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

import * as z from "zod";
const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["USER", "DJ"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, role } = registerSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    // Check if username already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { username },
    });

    if (existingProfile) {
      return new NextResponse("Username already taken", { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user and profile in a transaction
    const result = await prisma.$transaction(async (prisma: PrismaClient) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
          name: username, // Use username as initial name
        },
      });

      // Create profile
      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          username,
          genre: role === "DJ" ? ["House"] : [], // Default genre for DJs
        },
      });

      return { user, profile };
    });

    return NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(error.errors[0].message, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}