'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MixCard } from '@/components/mix/mix-card';
import { DJCard } from '@/components/dj/dj-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadMixDialog } from '@/components/mix/upload-mix-dialog';
import { Users, Radio, Music, TrendingUp, Upload, Search } from 'lucide-react';
import { toast } from 'sonner';
import type { ExtendedMix } from '@/types';

interface DashboardStats {
  totalUsers: number;
  totalDJs: number;
  totalMixes: number;
}

// Trending hashtags data
const trendingTags = [
  "#deephouse", "#techno", "#progressive", "#trance", "#housemusic",
  "#edmfamily", "#djlife", "#mixing", "#producer", "#musicproducer"
];

// Genre filters
const genreFilters = [
  "All", "Deep House", "Techno", "Progressive", "Trance", "Tech House", "Minimal"
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [mixes, setMixes] = useState<ExtendedMix[]>([]);
  const [suggestedDJs, setSuggestedDJs] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, mixesRes, djsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/mixes'),
        fetch('/api/users?role=DJ')
      ]);

      if (!statsRes.ok || !mixesRes.ok || !djsRes.ok) throw new Error('Failed to fetch data');

      const [statsData, mixesData, djsData] = await Promise.all([
        statsRes.json(),
        mixesRes.json(),
        djsRes.json()
      ]);

      setStats(statsData);
      setMixes(mixesData.mixes);
      setSuggestedDJs(djsData.users);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  const handleMixUpload = () => {
    fetchDashboardData();
    setIsUploadOpen(false);
  };

  const filteredMixes = mixes.filter(mix => {
    const matchesGenre = selectedGenre === "All" || mix.tags.includes(selectedGenre);
    const matchesSearch = mix.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mix.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search mixes..."
                className="pl-10 border-gray-200 focus:ring-red-500 focus:border-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setIsUploadOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Genre Filters */}
        <div className="container max-w-7xl mx-auto px-4 py-2 overflow-x-auto border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="flex gap-2 min-w-max">
            {genreFilters.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className={`
                  ${selectedGenre === genre 
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-sm" 
                    : "text-gray-600 border-gray-200 hover:bg-gray-50"}
                  transition-all duration-200
                `}
                size="sm"
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMixes.map((mix) => (
                <MixCard
                  key={mix.id}
                  mix={{
                    ...mix,
                    genre: mix.genre ? [mix.genre] : [],
                    dj: {
                      id: mix.userId,
                      name: mix.user?.name || 'Anonymous',
                      image: mix.user?.image || '',
                      verified: mix.user?.verified || false,
                      coverImage: mix.user?.coverImage || ''
                    }
                  }}
                  onLike={() => fetchDashboardData()}
                  onComment={() => {}}
                  onShare={(id) => {
                    navigator.share({
                      title: mix.title || 'Mix',
                      text: mix.description || '',
                      url: `${window.location.origin}/mix/${id}`,
                    }).catch(() => {
                      navigator.clipboard.writeText(`${window.location.origin}/mix/${id}`);
                      toast.success('Link copied to clipboard');
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-gray-100">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || ""}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Users className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{session?.user?.name}</h3>
                  <p className="text-sm text-gray-500">{session?.user?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                <div className="text-center px-4">
                  <p className="font-semibold text-gray-900">{stats?.totalMixes || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Mixes</p>
                </div>
                <div className="text-center px-4">
                  <p className="font-semibold text-gray-900">{stats?.totalDJs || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Following</p>
                </div>
                <div className="text-center px-4">
                  <p className="font-semibold text-gray-900">{stats?.totalUsers || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Followers</p>
                </div>
              </div>
            </div>

            {/* Trending Hashtags */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Trending Hashtags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="text-sm border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Suggested DJs */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Suggested DJs</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  See All
                </Button>
              </div>
              <div className="space-y-4">
                {suggestedDJs.slice(0, 5).map((dj: any) => (
                  <DJCard
                    key={dj.userId || dj.id}
                    dj={dj}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadMixDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUploadSuccess={handleMixUpload}
      />
    </div>
  );
}