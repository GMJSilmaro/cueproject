'use client';

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Image as ImageIcon, Music, Smile, Send } from "lucide-react";

// Mock data - Replace with real data from your API
const posts = [
  {
    id: 1,
    author: {
      name: "DJ Sarah Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "DJ",
    },
    content: "Just dropped a new deep house mix! Check it out on my profile 🎧",
    timestamp: "2 hours ago",
    likes: 234,
    comments: 45,
    shares: 12,
    attachedMix: {
      title: "Summer Vibes Mix 2024",
      coverImage: "https://picsum.photos/seed/mix1/600/400",
    },
  },
  {
    id: 2,
    author: {
      name: "Mike Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      role: "DJ",
    },
    content: "Getting ready for tonight's live stream! Who's joining? 🎵",
    timestamp: "4 hours ago",
    likes: 189,
    comments: 32,
    shares: 8,
  },
];

export function CommunityPageContent() {
  const { data: session } = useSession();
  const userImage = session?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
  const userName = session?.user?.name || "User";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-3xl py-8 px-4">
        {/* Create Post */}
        <Card className="mb-8 border-none shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={userImage} alt={userName} />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Textarea 
                  placeholder="Share your thoughts with the community..."
                  className="resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <ImageIcon className="h-5 w-5 mr-1" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <Music className="h-5 w-5 mr-1" />
                      Mix
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <Smile className="h-5 w-5 mr-1" />
                      Feeling
                    </Button>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="border-none shadow-lg">
              <CardHeader className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.author.image} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">{post.author.name}</p>
                      <span className="text-sm text-red-600">{post.author.role}</span>
                    </div>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <p>{post.content}</p>
                {post.attachedMix && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={post.attachedMix.coverImage}
                      alt={post.attachedMix.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">{post.attachedMix.title}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                    <Heart className="h-5 w-5 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                    <Share2 className="h-5 w-5 mr-1" />
                    {post.shares}
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