'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Music, Play, Clock, MoreHorizontal, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data - Replace with real data from your API
const myMixes = [
  {
    id: 1,
    title: "Summer Vibes Mix 2024",
    description: "Deep house vibes for your summer parties 🌴",
    coverImage: "https://picsum.photos/seed/mix1/600/400",
    duration: "1:24:30",
    plays: "2.3k",
    likes: 234,
    comments: 45,
    genre: "Deep House",
    uploadDate: "2024-03-15",
  },
  // ... existing mixes data ...
];

export function MixesPageContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Your Mixes</h1>
          <p className="text-muted-foreground">Manage and share your music</p>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Recent Mixes</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Mix
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mix Items */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                      <Image
                        src="/images/mix-cover.jpg"
                        alt="Mix Cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">Summer Vibes Mix 2024</h3>
                      <p className="text-sm text-muted-foreground">Deep House • 1:24:30</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
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
                    <p className="text-sm text-muted-foreground">Total Mixes</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">12.5K</p>
                    <p className="text-sm text-muted-foreground">Total Plays</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="text-foreground">4.2 GB</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-full w-[42%] bg-primary rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    6.8 GB free of 10 GB
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 