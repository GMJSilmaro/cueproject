import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function POST(
  req: Request,
  { params }: { params: { mixId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { mixId } = params;

    // Get user IP or session ID for rate limiting
    const userId = session?.user?.id;
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
    const identifier = userId || clientIp;

    // Check for recent plays from this user/IP (last 5 minutes)
    const recentPlay = await prisma.playHistory.findFirst({
      where: {
        identifier,
        mixId,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        }
      }
    });

    if (recentPlay) {
      return new NextResponse('Play already counted', { status: 200 });
    }

    // Record the play
    await prisma.playHistory.create({
      data: {
        mixId,
        identifier,
        userId: session?.user?.id
      }
    });

    // Increment play count
    const updatedMix = await prisma.mix.update({
      where: { id: mixId },
      data: {
        plays: {
          increment: 1
        }
      }
    });

    return NextResponse.json({
      plays: updatedMix.plays
    });
  } catch (error) {
    console.error('[PLAY_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 