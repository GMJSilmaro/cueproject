'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Music, Heart, MessageCircle, Share2, Play, Disc, MoreHorizontal, TrendingUp, Flame } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - Replace with real data from your API
const trendingMixes = [
  {
    id: 1,
    title: "Summer Vibes Mix 2024",
    description: "Deep house vibes for your summer parties 🌴",
    coverImage: "https://picsum.photos/seed/mix1/600/400",
    duration: "1:24:30",
    plays: "23.5k",
    likes: 2340,
    comments: 450,
    trending: 1,
    dj: {
      name: "DJ Sarah Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      verified: true,
    },
    tags: ["#deephouse", "#summer", "#vibes"],
  },
  // ... existing trending mixes data ...
];

const trendingGenres = [
  { name: "Deep House", plays: "125.4k", trend: "+12%" },
  { name: "Melodic Techno", plays: "98.2k", trend: "+8%" },
  { name: "Progressive", plays: "87.6k", trend: "+15%" },
  { name: "Tech House", plays: "76.3k", trend: "+5%" },
  { name: "Minimal", plays: "65.8k", trend: "+10%" },
];

export function TrendingPageContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Trending Now</h1>
          <p className="text-muted-foreground">Discover what&apos;s hot in the electronic music scene</p>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trending Mixes */}
            <div className="space-y-6">
              {trendingMixes.map((mix) => (
                <Card key={mix.id} className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
                  {/* Mix Header */}
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="ring-2 ring-primary/20">
                            <AvatarImage src={mix.dj.image} alt={mix.dj.name} />
                            <AvatarFallback>{mix.dj.name[0]}</AvatarFallback>
                          </Avatar>
                          {mix.dj.verified && (
                            <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full">
                              <TrendingUp className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{mix.dj.name}</p>
                          <p className="text-sm text-muted-foreground">{mix.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium flex items-center">
                          <Flame className="h-4 w-4 mr-1" />
                          #{mix.trending} Trending
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground mb-4">{mix.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mix.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-primary hover:text-primary/90 text-sm cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Mix Cover */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={mix.coverImage}
                        alt={mix.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <Button 
                        size="icon"
                        className="absolute bottom-4 right-4 rounded-full bg-primary hover:bg-primary/90"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-foreground">
                        <Disc className="h-4 w-4" />
                        <span>{mix.duration}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{mix.plays} plays</span>
                      </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Heart className="h-4 w-4 mr-2" />
                        {mix.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {mix.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 