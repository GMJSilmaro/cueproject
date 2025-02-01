import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';
import type { Session } from 'next-auth';

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const targetUserId = params.userId;
    if (!targetUserId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    // Get the target user's profile
    const targetProfile = await prisma.profile.findUnique({
      where: { userId: targetUserId },
      select: { followers: true }
    });

    if (!targetProfile) {
      return new NextResponse('User not found', { status: 404 });
    }

    const currentUserId = session.user.id;
    const isFollowing = targetProfile.followers.includes(currentUserId);

    // Update the profile's followers array
    const updatedProfile = await prisma.profile.update({
      where: { userId: targetUserId },
      data: {
        followers: isFollowing
          ? { set: targetProfile.followers.filter((id: string) => id !== currentUserId) } // Unfollow
          : { push: currentUserId } // Follow
      }
    });

    return NextResponse.json({
      success: true,
      following: !isFollowing,
      followersCount: updatedProfile.followers.length
    });
  } catch (error) {
    console.error('Follow action failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 