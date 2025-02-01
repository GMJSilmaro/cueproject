import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Users, MessageCircle, Globe2, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

// Mock data - Replace with real data from your API
const discussions = [
  {
    id: 1,
    title: "Best DAW for live performance?",
    content: "I'm looking to start performing live and wondering what DAW would be best for my setup. Currently using Ableton but open to suggestions!",
    author: {
      name: "Sarah Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "DJ",
    },
    category: "Equipment",
    replies: 24,
    views: 156,
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    title: "Tips for promoting your first event",
    content: "Planning my first club night and looking for advice on promotion strategies. What worked for you when starting out?",
    author: {
      name: "Mike Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      role: "Promoter",
    },
    category: "Events",
    replies: 18,
    views: 203,
    lastActivity: "5 hours ago",
  },
  {
    id: 3,
    title: "Genre-blending in sets - thoughts?",
    content: "How do you feel about mixing different genres in your sets? Looking to experiment with combining house and breaks.",
    author: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      role: "DJ",
    },
    category: "Mixing",
    replies: 32,
    views: 289,
    lastActivity: "1 day ago",
  },
];

const popularTags = [
  { name: "Technique", count: 234 },
  { name: "Equipment", count: 189 },
  { name: "Production", count: 156 },
  { name: "Events", count: 143 },
  { name: "Mixing", count: 128 },
];

const activeMembers = [
  {
    name: "Alex Thompson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    role: "DJ/Producer",
    posts: 156,
  },
  {
    name: "Maria Garcia",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    role: "Event Organizer",
    posts: 143,
  },
  {
    name: "James Wilson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    role: "DJ",
    posts: 128,
  },
];

export default async function CommunityPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
              <p className="text-gray-500">Connect with fellow DJs and music enthusiasts</p>
            </div>
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <MessageCircle className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Avatar className="w-12 h-12 ring-2 ring-red-500/20">
                        <AvatarImage src={discussion.author.image} alt={discussion.author.name} />
                        <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg hover:text-red-600 cursor-pointer">
                              {discussion.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-medium">{discussion.author.name}</span>
                              <span className="text-xs text-gray-500">{discussion.author.role}</span>
                              <span className="text-xs text-gray-400">• {discussion.lastActivity}</span>
                            </div>
                          </div>
                          <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            {discussion.category}
                          </div>
                        </div>
                        <p className="mt-3 text-gray-600 line-clamp-2">{discussion.content}</p>
                        <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.replies} replies
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {discussion.views} views
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Popular Tags</h2>
                  <Globe2 className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <div
                      key={tag.name}
                      className="bg-gray-100 hover:bg-red-50 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      <span className="text-gray-600">{tag.name}</span>
                      <span className="text-gray-400 ml-1">{tag.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Members */}
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Active Members</h2>
                  <Users className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {activeMembers.map((member) => (
                    <div key={member.name} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <Avatar className="ring-2 ring-red-500/20 transition-all group-hover:ring-red-500/40">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.posts} posts
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