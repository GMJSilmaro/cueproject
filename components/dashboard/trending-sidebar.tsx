'use client';

import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for trending hashtags
const trendingTags = [
  { tag: "#deephouse", count: "2.5K posts" },
  { tag: "#techno", count: "1.8K posts" },
  { tag: "#trance", count: "1.2K posts" },
  { tag: "#progressive", count: "950 posts" },
  { tag: "#edmfamily", count: "850 posts" },
];

// Mock data for suggested DJs
const suggestedDJs = [
  {
    name: "Alex Turner",
    handle: "alexturner",
    image: "/avatars/dj3.jpg",
    followers: "12.5K",
    genre: "Tech House",
  },
  {
    name: "Maya Beats",
    handle: "mayabeats",
    image: "/avatars/dj4.jpg",
    followers: "8.2K",
    genre: "Progressive",
  },
  {
    name: "Tom Deep",
    handle: "tomdeep",
    image: "/avatars/dj5.jpg",
    followers: "5.7K",
    genre: "Deep House",
  },
];

interface TrendingSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TrendingSidebar({ className }: TrendingSidebarProps) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className={cn("space-y-6", className)}>
      {/* User Stats Card */}
      <Card className="p-4 bg-card">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground">@{user?.name?.toLowerCase().replace(/\s+/g, '')}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-2 rounded-lg bg-muted/50">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Mixes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">1.2K</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">3.5K</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
        </div>
      </Card>

      {/* Trending Hashtags */}
      <Card className="p-4 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Trending Hashtags</h3>
        </div>
        <div className="space-y-3">
          {trendingTags.map((item) => (
            <div key={item.tag} className="flex items-center justify-between">
              <Button variant="link" className="p-0 h-auto font-medium text-primary hover:text-primary/90">
                {item.tag}
              </Button>
              <span className="text-sm text-muted-foreground">{item.count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggested DJs */}
      <Card className="p-4 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Suggested DJs</h3>
        </div>
        <div className="space-y-4">
          {suggestedDJs.map((dj) => (
            <div key={dj.handle} className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={dj.image} alt={dj.name} />
                <AvatarFallback>{dj.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-foreground">{dj.name}</p>
                <p className="text-sm text-muted-foreground truncate">{dj.genre}</p>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}