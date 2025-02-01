import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { mixId, content, parentId } = body;

    if (!mixId || !content) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Rate limiting: Check if user has commented in the last 10 seconds
    const recentComment = await prisma.comment.findFirst({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: new Date(Date.now() - 10000) // 10 seconds ago
        }
      }
    });

    if (recentComment) {
      return new NextResponse('Please wait before commenting again', { status: 429 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        mixId,
        userId: session.user.id,
        parentId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('[COMMENTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 