import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Music, Play, Clock, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  {
    id: 2,
    title: "Late Night Progressive House",
    description: "Progressive house journey into the night 🌙",
    coverImage: "https://picsum.photos/seed/mix2/600/400",
    duration: "2:01:15",
    plays: "1.8k",
    likes: 189,
    comments: 32,
    genre: "Progressive House",
    uploadDate: "2024-03-10",
  },
  {
    id: 3,
    title: "Techno Underground Vol. 3",
    description: "Raw underground techno selections 🔊",
    coverImage: "https://picsum.photos/seed/mix3/600/400",
    duration: "1:45:00",
    plays: "3.1k",
    likes: 421,
    comments: 67,
    genre: "Techno",
    uploadDate: "2024-03-05",
  },
];

export default async function MixesPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Mixes</h1>
            <p className="text-gray-500">Manage and organize your uploaded mixes</p>
          </div>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
            <Music className="mr-2 h-4 w-4" />
            Upload New Mix
          </Button>
        </div>

        {/* Mix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myMixes.map((mix) => (
            <Card key={mix.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-200">
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
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{mix.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
                    <Music className="h-4 w-4" />
                    <span className="text-sm">{mix.plays} plays</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{mix.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{mix.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600">{mix.genre}</span>
                    <span className="text-gray-500">Uploaded {mix.uploadDate}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{mix.likes} likes</span>
                    <span>{mix.comments} comments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 