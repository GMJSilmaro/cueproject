import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Music, Heart, MessageCircle, Share2, Play, Headphones, Disc, MoreHorizontal, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
];

const suggestedDJs = [
  {
    name: "Alex Thompson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    genre: "Tech House",
    followers: "12.4k",
  },
  {
    name: "Maria Garcia",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    genre: "Melodic Techno",
    followers: "8.9k",
  },
  {
    name: "James Wilson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    genre: "Progressive",
    followers: "15.2k",
  },
];

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-7xl py-20 px-4">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="relative h-48 w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
          </div>
          <div className="relative px-4 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-end gap-6">
                <Avatar className="h-32 w-32 rounded-xl ring-4 ring-white shadow-xl">
                  <AvatarImage src={session.user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} />
                  <AvatarFallback>DJ</AvatarFallback>
                </Avatar>
                <div className="mb-2">
                  <h1 className="text-2xl font-bold">{session.user.name}</h1>
                  <p className="text-gray-500">{session.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                  <Music className="h-4 w-4" />
                  <span>Upload Mix</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
          {/* Main Feed - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stories/Featured DJs Row */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Featured DJs</h2>
                <Button variant="ghost" size="sm" className="text-gray-500">See all</Button>
              </div>
              <div className="overflow-x-auto">
                <div className="flex space-x-6">
                  {suggestedDJs.map((dj) => (
                    <div key={dj.name} className="flex-shrink-0 w-24 text-center group">
                      <div className="ring-2 ring-red-500/20 rounded-full p-1 mb-2 transition-transform group-hover:scale-105 group-hover:ring-red-500/40">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={dj.image} alt={dj.name} />
                          <AvatarFallback>{dj.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-sm font-medium truncate">{dj.name}</p>
                      <p className="text-xs text-gray-500 truncate">{dj.genre}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mix Feed */}
            <div className="space-y-6">
              {mixFeed.map((mix) => (
                <Card key={mix.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Mix Header */}
                  <CardHeader className="p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="ring-2 ring-red-500/20">
                          <AvatarImage src={mix.dj.image} alt={mix.dj.name} />
                          <AvatarFallback>{mix.dj.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{mix.dj.name}</p>
                          <p className="text-sm text-gray-500">{mix.title}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
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
                        <Headphones className="h-4 w-4 mr-1" />
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
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Stats Card */}
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="border-b border-gray-100 bg-white p-4">
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{mixFeed.length}</p>
                  <p className="text-sm text-gray-500">Mixes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">1.2k</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">45</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </CardContent>
            </Card>

            {/* Suggested DJs */}
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-white p-4">
                <CardTitle className="text-lg">Suggested DJs</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {suggestedDJs.map((dj) => (
                    <div key={dj.name} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <Avatar className="ring-2 ring-red-500/20 transition-all group-hover:ring-red-500/40">
                          <AvatarImage src={dj.image} alt={dj.name} />
                          <AvatarFallback>{dj.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{dj.name}</p>
                          <p className="text-xs text-gray-500">{dj.genre}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload CTA */}
            <Card className="border-none shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Share Your Sound</h3>
                <p className="text-sm mb-4 text-red-100">Upload your latest mix and reach new audiences.</p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  Upload Mix
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 