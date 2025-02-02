import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
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
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
          name: username,
          profile: {
            create: {
              username,
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          profile: true,
        },
      });

      return user;
    });

    return NextResponse.json({
      user: {
        id: result.id,
        email: result.email,
        name: result.name,
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