import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const [totalUsers, totalDJs, totalMixes] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          role: 'DJ'
        }
      }),
      prisma.mix.count()
    ]);

    return NextResponse.json({
      totalUsers,
      totalDJs,
      totalMixes
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 