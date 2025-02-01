'use client';

import Image from "next/image";
import { Music, Heart, MessageCircle, Share2, Play, Headphones, Disc, MoreHorizontal, Users, TrendingUp, Hash, Search, SlidersHorizontal, X, Plus, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import type { Session } from "next-auth";
import type { ExtendedProfile } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ExtendedMix } from "@/types";

function FollowButton({ userId, username, initialIsFollowing = false }: { 
  userId: string, 
  username: string,
  initialIsFollowing?: boolean 
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/profile/${userId}/follow`, {
        method: 'POST',
      });
      
      if (!res.ok) throw new Error();
      
      const data = await res.json();
      setIsFollowing(data.following);
      
      if (data.following) {
        toast.success(`You are now following ${username}`);
      } else {
        toast.success(`You have unfollowed ${username}`);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleFollow}
      variant={isFollowing ? "default" : "outline"}
      size="sm"
      className={isFollowing ? 
        "bg-red-600 hover:bg-red-700 text-white" : 
        "hover:bg-red-50 hover:text-red-600 hover:border-red-600"
      }
      disabled={isLoading}
    >
      {isLoading ? "..." : isFollowing ? "Following" : "Follow"}
    </Button>
  );
}

interface DashboardContentProps {
  session: Session;
  allUsers: ExtendedProfile[];
  featuredDJs: ExtendedProfile[];
  totalUsers: number;
  totalDJs: number;
  totalMixes: number;
  mixFeed: ExtendedMix[];
  genres: string[];
}

// Helper function to get valid image source or null
function getValidImageSrc(src: string | null | undefined, defaultSrc: string): string {
  if (!src || src.trim() === '') {
    return defaultSrc;
  }
  return src;
}

export function DashboardContent({ 
  session, 
  allUsers, 
  featuredDJs, 
  mixFeed,
  genres,
}: DashboardContentProps) {
  const { inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    duration?: "short" | "medium" | "long";
    type?: "remix" | "original" | "live";
  }>({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const MIXES_PER_PAGE = 3;

  // Filter mixes based on search and filters
  const filteredMixes = mixFeed.filter(mix => {
    const matchesSearch = mix.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mix.dj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mix.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mix.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = !activeGenre || mix.tags.includes(activeGenre.toLowerCase());
    
    return matchesSearch && matchesGenre;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMixes.length / MIXES_PER_PAGE);
  const paginatedMixes = filteredMixes.slice(
    (currentPage - 1) * MIXES_PER_PAGE,
    currentPage * MIXES_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeGenre, activeFilters]);

  // Fix useEffect dependency array
  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, isLoading]); // Added isLoading to dependency array

  return (
    <div className="min-h-screen relative">
      {/* Stories/Featured DJs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Featured DJs</h2>
            <Button variant="ghost" size="sm" className="text-gray-500">See all</Button>
          </div>
          <div className="overflow-x-auto">
            <div className="flex space-x-6">
              {featuredDJs.map((dj) => (
                <Link 
                  href={`/dashboard/dj/${dj.userId}`} 
                  key={dj.userId} 
                  className="flex-shrink-0 w-24 text-center group cursor-pointer"
                >
                  <div className="ring-2 ring-red-500/20 rounded-full p-1 mb-2 transition-all duration-300 group-hover:scale-105 group-hover:ring-red-500/40">
                    <Avatar className="w-20 h-20">
                      <AvatarImage 
                        src={getValidImageSrc(dj.avatar || dj.user?.image, '/avatars/default.png')}
                        alt={dj.username || "DJ"}
                      />
                      <AvatarFallback>{(dj.username?.[0] || "D").toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-sm font-medium truncate group-hover:text-red-600">{dj.username}</p>
                  <p className="text-xs text-gray-500 truncate">{dj.followers.length} followers</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-4 items-center">
          <Button 
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white shadow-md min-w-max"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload className="h-4 w-4" />
            Upload Mix
          </Button>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search mixes, DJs, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="h-11 px-4 flex items-center space-x-2 inline-flex justify-center border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-md transition-colors">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Sort & Filter
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" className="w-56">
              <DropdownMenu.Label>Sort By</DropdownMenu.Label>
              <DropdownMenu.Item onClick={() => setSortBy("recent")}>
                Most Recent
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setSortBy("popular")}>
                Most Popular
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setSortBy("trending")}>
                Trending
              </DropdownMenu.Item>
              
              <DropdownMenu.Separator />
              <DropdownMenu.Label>Duration</DropdownMenu.Label>
              <DropdownMenu.Item 
                onClick={() => setActiveFilters(prev => ({ ...prev, duration: "short" }))}
              >
                {"Short (< 30min)"}
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                onClick={() => setActiveFilters(prev => ({ ...prev, duration: "medium" }))}
              >
                Medium (30-60min)
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                onClick={() => setActiveFilters(prev => ({ ...prev, duration: "long" }))}
              >
                {"Long (> 60min)"}
              </DropdownMenu.Item>

              <DropdownMenu.Separator />
              <DropdownMenu.Label>Type</DropdownMenu.Label>
              <DropdownMenu.Item 
                onClick={() => setActiveFilters(prev => ({ ...prev, type: "remix" }))}
              >
                Remixes
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                onClick={() => setActiveFilters(prev => ({ ...prev, type: "original" }))}
              >
                Original Mixes
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        {/* Active Filters */}
        {(Object.keys(activeFilters).length > 0 || activeGenre) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activeGenre && (
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                onClick={() => setActiveGenre(null)}
              >
                {activeGenre}
                <X className="h-4 w-4 ml-2" />
              </Button>
            )}
            {Object.entries(activeFilters).map(([key, value]) => (
              <Button
                key={key}
                variant="secondary"
                size="sm"
                className="rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                onClick={() => setActiveFilters(prev => {
                  const newFilters = { ...prev };
                  delete newFilters[key as keyof typeof activeFilters];
                  return newFilters;
                })}
              >
                {`${key}: ${value}`}
                <X className="h-4 w-4 ml-2" />
              </Button>
            ))}
            {(Object.keys(activeFilters).length > 0 || activeGenre) && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-600"
                onClick={() => {
                  setActiveFilters({});
                  setActiveGenre(null);
                }}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Genre Quick Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeGenre === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveGenre(null)}
            className="rounded-full"
          >
            All
          </Button>
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={activeGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveGenre(genre)}
              className="rounded-full"
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mix Feed */}
          <div className="lg:col-span-3 space-y-6">
            {paginatedMixes.length > 0 ? (
              <>
                {paginatedMixes.map((mix) => (
                  <Card key={mix.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 group">
                          <Avatar className="ring-2 ring-red-500/20 group-hover:ring-red-500/40">
                            <AvatarImage 
                              src={getValidImageSrc(mix.dj.image, '/avatars/default.png')}
                              alt={mix.dj.name || "DJ"}
                            />
                            <AvatarFallback>{(mix.dj.name?.[0] || "D").toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Link 
                              href={`/dashboard/dj/${mix.dj.id}`}
                              className="hover:text-red-600 transition-colors"
                            >
                              <span className="font-semibold">{mix.dj.name}</span>
                            </Link>
                            <p className="text-sm text-gray-500">{mix.title}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>

                    {/* Mix Cover */}
                    <div className="relative aspect-video group cursor-pointer">
                      <Image
                        src={getValidImageSrc(mix.coverImage, '/covers/default-mix.jpg')}
                        alt={mix.title || "Mix Cover"}
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
                        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <Disc className="h-4 w-4 animate-[spin_3s_linear_infinite]" />
                          <span className="text-sm">{mix.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <Headphones className="h-4 w-4" />
                          <span className="text-sm">{mix.plays} plays</span>
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
                
                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-4 pb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Showing {((currentPage - 1) * MIXES_PER_PAGE) + 1} to {Math.min(currentPage * MIXES_PER_PAGE, filteredMixes.length)} of {filteredMixes.length} mixes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Previous page</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "h-8 w-8 p-0",
                          currentPage === page && "bg-red-600 hover:bg-red-700"
                        )}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Next page</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-sm">
                <Music className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No mixes found</h3>
                <p className="text-gray-500 text-center mb-6 max-w-md">
                  {searchQuery || activeGenre || Object.keys(activeFilters).length > 0
                    ? "No mixes match your current filters. Try adjusting your search or filters."
                    : "Start by uploading your first mix or follow some DJs to see their content here."}
                </p>
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  <Upload className="h-4 w-4" />
                  Upload Your First Mix
                </Button>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">

    {/* Suggested DJs */}
    <Card className="border-none shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Suggested DJs</CardTitle>
                  <Users className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {allUsers.slice(0, 5).map((user: ExtendedProfile) => (
                    <div key={user.userId} className="flex items-center justify-between group">
                      <Link 
                        href={`/dashboard/dj/${user.userId}`}
                        className="flex items-center space-x-3 group flex-1 hover:opacity-90"
                      >
                        <Avatar className="ring-2 ring-red-500/20 transition-all group-hover:ring-red-500/40">
                          <AvatarImage 
                            src={getValidImageSrc(user.avatar || user.user?.image, '/avatars/default.png')}
                            alt={user.username || "User"}
                          />
                          <AvatarFallback>{(user.username?.[0] || "U").toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm group-hover:text-red-600">{user.username}</p>
                          <p className="text-xs text-gray-400">{user.followers.length} followers</p>
                        </div>
                      </Link>
                      {session?.user?.id !== user.userId && (
                        <FollowButton 
                          userId={user.userId} 
                          username={user.username}
                          initialIsFollowing={user.followers.includes(session.user.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Trending</CardTitle>
                  <TrendingUp className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {[
                    { tag: "#DeepHouse", posts: "2.3k posts" },
                    { tag: "#TechnoNight", posts: "1.8k posts" },
                    { tag: "#SummerVibes", posts: "1.5k posts" },
                    { tag: "#ProgressiveHouse", posts: "1.2k posts" },
                    { tag: "#UndergroundScene", posts: "956 posts" },
                  ].map((topic) => (
                    <div key={topic.tag} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-gray-400 group-hover:text-red-600" />
                        <span className="text-sm font-medium group-hover:text-red-600">{topic.tag}</span>
                      </div>
                      <span className="text-xs text-gray-400">{topic.posts}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

        
          </div>
        </div>
      </div>

      {/* Floating Action Button (mobile) */}
      <button
        onClick={() => setShowUploadModal(true)}
        className="fixed right-6 bottom-6 md:hidden bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors duration-200"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Upload New Mix</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <div className="space-y-6">
              {/* Cover Image Upload */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload cover image</p>
                  <p className="text-xs text-gray-400 mt-1">Recommended: 1920x1080px</p>
                </div>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              </div>

              {/* Mix Details Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mix Title</label>
                  <Input placeholder="e.g., Summer Vibes Mix 2024" className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Tell us about your mix..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {genres.map((genre) => (
                      <Button
                        key={genre}
                        variant="outline"
                        size="sm"
                        className="rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload audio file</p>
                    <p className="text-xs text-gray-400 mt-1">Supported formats: MP3, WAV (max 500MB)</p>
                    <input type="file" className="hidden" accept="audio/*" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      setShowUploadModal(false);
                      toast.success("Mix uploaded successfully!");
                    }}
                  >
                    Upload Mix
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 