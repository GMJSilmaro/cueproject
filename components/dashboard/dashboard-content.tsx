'use client';

import { useDashboard } from "./dashboard-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Music, Radio, Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from 'date-fns';

interface DashboardContentProps {
  genres: string[];
}

function StatsCard({ title, value, description, icon: Icon }: {
  title: string;
  value: number;
  description: string;
  icon: any;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}

export function DashboardContent({ genres }: DashboardContentProps) {
  const { 
    session,
    mixes,
    allUsers,
    totalUsers,
    totalDJs,
    totalMixes,
    isLoading
  } = useDashboard();

  if (!session || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          description="Active users on the platform"
        />
        <StatsCard
          title="Total DJs"
          value={totalDJs}
          icon={Radio}
          description="Verified DJs on the platform"
        />
        <StatsCard
          title="Total Mixes"
          value={totalMixes}
          icon={Music}
          description="Mixes uploaded to the platform"
        />
      </div>

      {/* Mix Feed Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Latest Mixes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mixes.map((mix) => (
            <Card key={mix.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={mix.coverImage || '/images/default-mix-cover.jpg'}
                  alt={mix.title}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/60 text-white"
                >
                  <Music className="h-12 w-12" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <Link href={`/dashboard/mix/${mix.id}`}>
                      <h3 className="font-semibold truncate hover:text-red-600">
                        {mix.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Link 
                        href={`/dashboard/dj/${mix.id}`}
                        className="flex items-center gap-2 group"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage 
                            src={mix.user.image || '/avatars/default.png'}
                            alt={mix.user.name || "DJ"}
                          />
                          <AvatarFallback>{(mix.user.name?.[0] || "D").toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground group-hover:text-red-600">
                          {mix.user.name}
                        </span>
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(mix.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    {mix.likes?.length || 0}
                  </Button>
                  <Link href={`/dashboard/mix/${mix.id}#comments`}>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {mix.comments?.length || 0}
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested DJs Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Suggested DJs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allUsers
            .filter(user => user.user.role === 'DJ')
            .map((user) => (
              <Card key={user.userId}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/dashboard/dj/${user.userId}`}
                      className="flex items-center space-x-4 group flex-1"
                    >
                      <Avatar className="h-12 w-12 ring-2 ring-red-500/20 transition-all group-hover:ring-red-500/40">
                        <AvatarImage 
                          src={user.avatar || user.user?.image || '/avatars/default.png'}
                          alt={user.username || "User"}
                        />
                        <AvatarFallback>{(user.username?.[0] || "U").toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold group-hover:text-red-600">
                          {user.username}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {user.followers.length} followers
                        </p>
                      </div>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                    >
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
} 