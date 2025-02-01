import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import type { Session } from "next-auth";
import { prisma } from "@/lib/db";
import type { ExtendedMix, ExtendedProfile } from "@/types";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/dashboard-content";


// Mock data - Replace with real data from your API
const mixFeed = [
  {
    id: 1,
    title: "Summer Vibes Mix 2024",
    description: "Deep house vibes for your summer parties 🌴",
    coverImage: "https://picsum.photos/seed/mix1/600/400",
    audioUrl: "https://soundcloud.com/example/summer-vibes-2024",
    duration: "1:24:30",
    plays: "2.3k",
    likes: 234,
    comments: 45,
    dj: {
      name: "DJ Sarah Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      verified: true,
    },
    tags: ["#deephouse", "#summer", "#vibes"],
  },
  {
    id: 2,
    title: "Late Night Progressive House",
    description: "Progressive house journey into the night 🌙",
    coverImage: "https://picsum.photos/seed/mix2/600/400",
    audioUrl: "https://soundcloud.com/example/progressive-house",
    duration: "2:01:15",
    plays: "1.8k",
    likes: 189,
    comments: 32,
    dj: {
      name: "Mike Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      verified: true,
    },
    tags: ["#progressive", "#house", "#night"],
  },
  {
    id: 3,
    title: "Techno Underground Vol. 3",
    description: "Raw underground techno selections 🔊",
    coverImage: "https://picsum.photos/seed/mix3/600/400",
    audioUrl: "https://soundcloud.com/example/techno-underground",
    duration: "1:45:00",
    plays: "3.1k",
    likes: 421,
    comments: 67,
    dj: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      verified: false,
    },
    tags: ["#techno", "#underground", "#dark"],
  },
  {
    id: 4,
    title: "Techno Underground Vol. 3",
    description: "Raw underground techno selections 🔊",
    coverImage: "https://picsum.photos/seed/mix3/600/400",
    audioUrl: "https://soundcloud.com/example/techno-underground",
    duration: "1:45:00",
    plays: "3.1k",
    likes: 421,
    comments: 67,
    dj: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      verified: false,
    },
    tags: ["#techno", "#underground", "#dark"],
  },
  {
    id: 5,
    title: "Techno Underground Vol. 3",
    description: "Raw underground techno selections 🔊",
    coverImage: "https://picsum.photos/seed/mix3/600/400",
    audioUrl: "https://soundcloud.com/example/techno-underground",
    duration: "1:45:00",
    plays: "3.1k",
    likes: 421,
    comments: 67,
    dj: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      verified: false,
    },
    tags: ["#techno", "#underground", "#dark"],
  },
];

const genres = [
  "House",
  "Techno",
  "Tech House",
  "Deep House",
  "Progressive",
  "Melodic Techno",
  "Minimal",
  "Trance",
  "Drum & Bass",
  "Dubstep",
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions) as Session;
  if (!session) redirect("/login");

  // Fetch all users for suggested section
  const allUsers = await prisma.profile.findMany({
    where: {
      userId: {
        not: session.user.id // Exclude current user
      }
    },
    select: {
      userId: true,
      username: true,
      avatar: true,
      followers: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) as ExtendedProfile[];

  // Fetch featured DJs (users with DJ role and most followers)
  const featuredDJs = await prisma.profile.findMany({
    where: {
      user: {
        role: "DJ"
      }
    },
    include: {
      user: true
    },
    orderBy: {
      followers: "desc"
    },
    take: 5
  }) as ExtendedProfile[];

  // Fetch user stats
  const totalUsers = await prisma.user.count();
  const totalDJs = await prisma.user.count({
    where: {
      role: "DJ"
    }
  });
  const totalMixes = await prisma.mix.count();

  return (
    <DashboardContent 
      session={session}
      allUsers={allUsers}
      featuredDJs={featuredDJs}
      mixFeed={mixFeed as ExtendedMix[]}
      genres={genres}
      totalUsers={totalUsers}
      totalDJs={totalDJs}
      totalMixes={totalMixes}
    />
  );
}