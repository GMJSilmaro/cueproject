import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';
import { Prisma, Role } from '@prisma/client';
import type { FormattedMix } from '@/types';
import { formatDuration } from '@/lib/utils';

const mixInclude = {
  user: true,
  likes: true,
  comments: {
    include: {
      user: true,
      replies: {
        include: {
          user: true
        }
      }
    }
  }
} satisfies Prisma.MixInclude;

type MixWithRelations = Prisma.MixGetPayload<{
  include: typeof mixInclude;
}>;

// Helper function to format a mix for the API response
function formatMixForResponse(
  mix: MixWithRelations,
  isLiked: boolean = false,
  likesCount?: number,
  commentsCount?: number
): FormattedMix {
  if (!mix.user) {
    throw new Error('Mix user data is missing');
  }

  return {
    id: mix.id,
    title: mix.title,
    description: mix.description,
    audioUrl: mix.audioUrl,
    comments: mix.comments,
    coverUrl: mix.coverUrl || '/covers/default-mix.jpg',
    genre: mix.genre ? [mix.genre] : [],
    duration: mix.duration,
    plays: mix.plays,
    isPublic: mix.isPublic,
    tags: mix.tags,
    createdAt: mix.createdAt,
    updatedAt: mix.updatedAt,
    userId: mix.userId,
    dj: {
      id: mix.user.id,
      name: mix.user.name || 'Anonymous',
      image: mix.user.image || '/avatars/default-avatar.jpg',
      verified: false,
      coverImage: null
    },
    isLiked,
    likesCount: likesCount ?? mix.likes.length,
    commentsCount: commentsCount ?? mix.comments.length,
    formattedDuration: formatDuration(mix.duration)
  };
}

// Create a new mix
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const {
      title,
      description,
      audioUrl,
      coverImage,
      genre,
      duration,
      tags,
      isPublic = true
    } = await req.json();

    // Validate required fields
    if (!title || !audioUrl || !duration) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const mix = await prisma.mix.create({
      data: {
        title,
        description,
        audioUrl,
        coverUrl: coverImage || '/covers/default-mix.jpg',
        genre: Array.isArray(genre) ? genre[0] : '', // Convert to single string
        duration,
        tags: Array.isArray(tags) ? tags : [],
        isPublic,
        userId: session.user.id,
        plays: 0
      },
      include: mixInclude
    });

    return NextResponse.json({
      success: true,
      mix: formatMixForResponse(mix)
    });
  } catch (error) {
    console.error('Failed to create mix:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Get all mixes
export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const mixes = await prisma.mix.findMany({
      orderBy: { createdAt: 'desc' },
      include: mixInclude
    });

    const mixesWithDetails = await Promise.all(
      mixes.map(async (mix) => {
        const [likesCount, commentsCount, isLiked] = await Promise.all([
          prisma.like.count({ where: { mixId: mix.id } }),
          prisma.comment.count({ where: { mixId: mix.id } }),
          prisma.like.findFirst({
            where: {
              mixId: mix.id,
              userId: session.user.id
            }
          }).then(like => !!like)
        ]);

        return formatMixForResponse(mix, isLiked, likesCount, commentsCount);
      })
    );

    return NextResponse.json({ mixes: mixesWithDetails });
  } catch (error) {
    console.error('Failed to fetch mixes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}