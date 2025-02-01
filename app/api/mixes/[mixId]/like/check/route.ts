import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';
import type { Session } from 'next-auth';

export async function GET(
  req: Request,
  { params }: { params: { mixId: string } }
) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { mixId } = params;
    if (!mixId) {
      return new NextResponse('Mix ID is required', { status: 400 });
    }

    const mix = await prisma.mix.findUnique({
      where: { id: mixId },
      select: { likes: true }
    });

    if (!mix) {
      return new NextResponse('Mix not found', { status: 404 });
    }

    const userId = session.user.id;
    const hasLiked = mix.likes.includes(userId);

    return NextResponse.json({
      hasLiked,
      likesCount: mix.likes.length
    });
  } catch (error) {
    console.error('Like check failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 