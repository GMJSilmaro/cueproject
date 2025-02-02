'use client'

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, ImageIcon, VideoIcon, Music2Icon, SmileIcon, User } from "lucide-react";


// Mock data for feed items
const mockFeedItems = [
  {
    id: 1,
    user: {
      name: "DJ Beats",
      image: "/avatars/dj-beats.jpg",
      handle: "@djbeats"
    },
    content: "Just dropped a new house mix! Check it out 🎵",
    timestamp: "2h ago",
    image: "/mixes/house-mix-cover.jpg",
    likes: 245,
    comments: 23,
    shares: 12,
    tags: ["#house", "#newmix", "#electronicmusic"]
  },
  {
    id: 2,
    user: {
      name: "Vinyl Queen",
      image: "/avatars/vinyl-queen.jpg",
      handle: "@vinylqueen"
    },
    content: "Tonight's set at Club Atmosphere was incredible! Thanks to everyone who came out and danced with me until sunrise 🌅",
    timestamp: "5h ago",
    likes: 189,
    comments: 15,
    shares: 8,
    tags: ["#clubnight", "#djlife", "#techno"]
  },
  // Add more mock items as needed
];

export function DashboardFeed() {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      {/* Create Post */}
      <div className="bg-card rounded-xl border border-border/60">
        <div className="p-4">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted/50 hover:bg-muted/80 rounded-xl border border-border/60 transition-colors">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground text-sm px-4 py-3 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-3">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg px-2 py-1.5 hover:bg-muted/50">
                <ImageIcon className="h-5 w-5" />
                <span className="text-sm hidden sm:inline">Photo</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg px-2 py-1.5 hover:bg-muted/50">
                <VideoIcon className="h-5 w-5" />
                <span className="text-sm hidden sm:inline">Video</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg px-2 py-1.5 hover:bg-muted/50">
                <Music2Icon className="h-5 w-5" />
                <span className="text-sm hidden sm:inline">Audio</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg px-2 py-1.5 hover:bg-muted/50">
                <SmileIcon className="h-5 w-5" />
                <span className="text-sm hidden sm:inline">Feeling</span>
              </button>
            </div>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-full px-4 py-1.5 text-sm font-medium">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Feed Items */}
      <div className="space-y-4">
        {mockFeedItems.map((item) => (
          <Card key={item.id} className="p-4 shadow-none border bg-card">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={item.user.image} alt={item.user.name} />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-foreground">{item.user.name}</div>
                <div className="text-sm text-muted-foreground">{item.user.handle} · {item.timestamp}</div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-foreground">{item.content}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="text-primary hover:text-primary/90 text-sm hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image if present */}
            {item.image && (
              <div className="mt-3 relative rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt="Post content" 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Engagement Metrics */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Heart className="h-4 w-4 mr-2" />
                {item.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4 mr-2" />
                {item.comments}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Share2 className="h-4 w-4 mr-2" />
                {item.shares}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 