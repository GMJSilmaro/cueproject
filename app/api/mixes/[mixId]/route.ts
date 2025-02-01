import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';
import type { Session } from 'next-auth';

// Update a mix
export async function PATCH(
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

    // Check if the mix exists and belongs to the user
    const existingMix = await prisma.mix.findUnique({
      where: { id: mixId },
      select: { userId: true }
    });

    if (!existingMix) {
      return new NextResponse('Mix not found', { status: 404 });
    }

    if (existingMix.userId !== session.user.id) {
      return new NextResponse('Not authorized to update this mix', { status: 403 });
    }

    const {
      title,
      description,
      audioUrl,
      coverImage,
      genre,
      duration,
      tags,
      isPublic
    } = await req.json();

    const updatedMix = await prisma.mix.update({
      where: { id: mixId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(audioUrl && { audioUrl }),
        ...(coverImage !== undefined && { coverImage }),
        ...(genre && { genre }),
        ...(duration && { duration }),
        ...(tags && { tags }),
        ...(isPublic !== undefined && { isPublic })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true
          }
        },
        comments: true
      }
    });

    return NextResponse.json({
      success: true,
      mix: {
        ...updatedMix,
        dj: {
          id: updatedMix.user.id,
          name: updatedMix.user.name || 'Anonymous',
          image: updatedMix.user.image,
          verified: updatedMix.user.role === 'DJ'
        }
      }
    });
  } catch (error) {
    console.error('Failed to update mix:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Delete a mix
export async function DELETE(
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

    // Check if the mix exists and belongs to the user
    const existingMix = await prisma.mix.findUnique({
      where: { id: mixId },
      select: { userId: true }
    });

    if (!existingMix) {
      return new NextResponse('Mix not found', { status: 404 });
    }

    if (existingMix.userId !== session.user.id) {
      return new NextResponse('Not authorized to delete this mix', { status: 403 });
    }

    await prisma.mix.delete({
      where: { id: mixId }
    });

    return NextResponse.json({
      success: true,
      message: 'Mix deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete mix:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 