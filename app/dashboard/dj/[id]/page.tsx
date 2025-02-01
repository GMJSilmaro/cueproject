import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";
import type { ExtendedProfile } from "@/types";
import { DJProfile } from "@/components/dj/dj-profile";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const profile = await prisma.profile.findUnique({
    where: { userId: params.id },
    select: { username: true }
  });

  return {
    title: profile ? `${profile.username} | DJ Profile` : 'DJ Profile',
    description: `View ${profile?.username}'s DJ profile and mixes`,
  };
}

export default async function DJProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions);
  
  // Validate ObjectId format
  if (!/^[0-9a-fA-F]{24}$/.test(params.id)) {
    notFound();
  }
  
  const profile = await prisma.profile.findUnique({
    where: { userId: params.id },
    include: {
      user: {
        include: {
          mixes: {
            orderBy: { createdAt: 'desc' },
            take: 6,
          },
        },
      },
    },
  }) as ExtendedProfile | null;

  if (!profile) {
    notFound();
  }

  return <DJProfile profile={profile} session={session} />;
}