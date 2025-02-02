import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const users = await prisma.profile.findMany({
      where: {
        userId: {
          not: session.user.id // Exclude current user
        }
      },
      select: {
        userId: true,
        username: true,
        avatar: true,
        followers: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 