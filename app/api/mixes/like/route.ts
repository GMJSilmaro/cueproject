import { NextResponse } from 'next/server';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { mixId } = await req.json();
    if (!mixId) {
      return new NextResponse('Mix ID is required', { status: 400 });
    }

    // Get the mix and check if the user has already liked it
    const mix = await prisma.mix.findUnique({
      where: { id: mixId },
      select: { likes: true }
    });

    if (!mix) {
      return new NextResponse('Mix not found', { status: 404 });
    }

    const userId = session.user.id;
    const hasLiked = mix.likes.includes(userId);

    // Update the mix's likes array
    const updatedMix = await prisma.mix.update({
      where: { id: mixId },
      data: {
        likes: hasLiked
          ? { set: mix.likes.filter((id: string) => id !== userId) } // Unlike
          : { push: userId } // Like
      }
    });

    return NextResponse.json({
      success: true,
      liked: !hasLiked,
      likesCount: updatedMix.likes.length
    });
  } catch (error) {
    console.error('Like action failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 