import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';
import type { Session } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { mixId, content, parentId } = await req.json();
    if (!mixId || !content) {
      return new NextResponse('Mix ID and content are required', { status: 400 });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        mixId,
        userId: session.user.id,
        parentId, // Optional parent comment ID for replies
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      comment
    });
  } catch (error) {
    console.error('Comment action failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Get comments for a mix
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mixId = searchParams.get('mixId');

    if (!mixId) {
      return new NextResponse('Mix ID is required', { status: 400 });
    }

    // Get all comments for the mix, including replies
    const comments = await prisma.comment.findMany({
      where: {
        mixId,
        parentId: null, // Only get top-level comments
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      comments
    });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 