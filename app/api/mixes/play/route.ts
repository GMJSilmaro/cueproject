import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { mixId } = await req.json();
    if (!mixId) {
      return new NextResponse('Mix ID is required', { status: 400 });
    }

    // Increment the play count
    const updatedMix = await prisma.mix.update({
      where: { id: mixId },
      data: {
        plays: { increment: 1 }
      }
    });

    return NextResponse.json({
      success: true,
      plays: updatedMix.plays
    });
  } catch (error) {
    console.error('Failed to update play count:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 