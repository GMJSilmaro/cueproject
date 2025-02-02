'use client';

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music, Settings } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, Play, Headphones, Disc, MoreHorizontal } from "lucide-react";

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
  // ... existing mix feed data ...
];

const suggestedDJs = [
  {
    name: "Alex Thompson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    genre: "House",
    followers: "10.2k",
  },
  // ... existing suggested DJs data ...
];

export function ProfilePageContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">View and manage your profile</p>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Your Mixes</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add your mix content here */}
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add your activity content here */}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-sm text-muted-foreground">Mixes</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">1.2K</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-foreground">Bio</h3>
                    <p className="text-sm text-muted-foreground">
                      Electronic music producer and DJ based in London.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Genre</h3>
                    <p className="text-sm text-muted-foreground">
                      Deep House, Techno
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 