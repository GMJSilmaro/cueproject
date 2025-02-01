import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const commentId = params.commentId;
    const userId = session.user.id;

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return new NextResponse('Comment not found', { status: 404 });
    }

    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
      // Unlike the comment
      await prisma.comment.update({
        where: { id: commentId },
        data: {
          likes: {
            set: comment.likes.filter(id => id !== userId)
          }
        }
      });

      return NextResponse.json({
        message: 'Comment unliked successfully',
        likes: comment.likes.length - 1
      });
    }

    // Like the comment
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        likes: {
          push: userId
        }
      }
    });

    return NextResponse.json({
      message: 'Comment liked successfully',
      likes: comment.likes.length + 1
    });

  } catch (error) {
    console.error('Error in comment like:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 