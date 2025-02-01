import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
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
  {
    id: 2,
    title: "Late Night Progressive House",
    description: "Progressive house journey into the night 🌙",
    coverImage: "https://picsum.photos/seed/mix2/600/400",
    duration: "2:01:15",
    plays: "18.2k",
    likes: 1890,
    comments: 320,
    trending: 2,
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
    duration: "1:45:00",
    plays: "31.1k",
    likes: 4210,
    comments: 670,
    trending: 3,
    dj: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      verified: false,
    },
    tags: ["#techno", "#underground", "#dark"],
  },
];

const trendingGenres = [
  { name: "Deep House", plays: "125.4k", trend: "+12%" },
  { name: "Melodic Techno", plays: "98.2k", trend: "+8%" },
  { name: "Progressive", plays: "87.6k", trend: "+15%" },
  { name: "Tech House", plays: "76.3k", trend: "+5%" },
  { name: "Minimal", plays: "65.8k", trend: "+10%" },
];

export default async function TrendingPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Trending Now</h1>
          <p className="text-gray-500">Discover what&apos;s hot in the electronic music scene</p>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trending Mixes */}
            <div className="space-y-6">
              {trendingMixes.map((mix) => (
                <Card key={mix.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Mix Header */}
                  <CardHeader className="p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="ring-2 ring-red-500/20">
                            <AvatarImage src={mix.dj.image} alt={mix.dj.name} />
                            <AvatarFallback>{mix.dj.name[0]}</AvatarFallback>
                          </Avatar>
                          {mix.dj.verified && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full">
                              <TrendingUp className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{mix.dj.name}</p>
                          <p className="text-sm text-gray-500">{mix.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium flex items-center">
                          <Flame className="h-4 w-4 mr-1" />
                          #{mix.trending} Trending
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Mix Cover */}
                  <div className="relative aspect-video group">
                    <Image
                      src={mix.coverImage}
                      alt={mix.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="ghost" size="lg" className="text-white hover:text-white hover:scale-110 transition-transform">
                        <Play className="h-12 w-12" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
                        <Disc className="h-4 w-4 animate-[spin_3s_linear_infinite]" />
                        <span className="text-sm">{mix.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mix Actions */}
                  <CardContent className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Heart className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600 transition-colors">
                          <MessageCircle className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Share2 className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Music className="h-4 w-4 mr-1" />
                        {mix.plays} plays
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p><span className="font-semibold">{mix.likes}</span> likes</p>
                      <p className="text-sm">
                        <span className="font-semibold">{mix.dj.name}</span>{" "}
                        {mix.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mix.tags.map((tag) => (
                          <span key={tag} className="text-sm text-red-600 hover:text-red-700 cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        View all {mix.comments} comments
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Trending Genres */}
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Trending Genres</h2>
                  <TrendingUp className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {trendingGenres.map((genre, index) => (
                    <div key={genre.name} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 text-gray-400 text-sm">{index + 1}</div>
                        <div>
                          <p className="font-semibold text-sm">{genre.name}</p>
                          <p className="text-xs text-gray-500">{genre.plays} plays</p>
                        </div>
                      </div>
                      <div className="text-green-500 text-sm font-medium">
                        {genre.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 