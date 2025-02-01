'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CommentsSection } from '@/components/mix/comments-section';
import { Heart, Share2, Play, Pause, Music2, Clock, Calendar, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { ExtendedMix } from '@/types';

export default function MixDetailPage() {
  const params = useParams();
  const [mix, setMix] = useState<ExtendedMix | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchMix = async () => {
      try {
        const response = await fetch(`/api/mixes/${params.mixId}`);
        if (!response.ok) throw new Error('Failed to fetch mix');
        const data = await response.json();
        setMix(data.mix);
        setIsLiked(data.mix.isLiked);
        setLikesCount(data.mix.likesCount);
        setAudio(new Audio(data.mix.audioUrl));
      } catch (error) {
        console.error('Failed to fetch mix:', error);
        toast.error('Failed to load mix');
      }
    };

    fetchMix();
  }, [params.mixId]);

  const togglePlay = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
        toast.error('Failed to play audio');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleLike = async () => {
    if (!mix) return;

    try {
      const response = await fetch(`/api/mixes/${mix.id}/like`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to like mix');
      
      const data = await response.json();
      setIsLiked(data.action === 'liked');
      setLikesCount(data.likesCount);
    } catch (error) {
      console.error('Failed to like mix:', error);
      toast.error('Failed to like mix');
    }
  };

  const handleAddComment = async (content: string) => {
    if (!mix) return;

    try {
      const response = await fetch('/api/mixes/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mixId: mix.id, content }),
      });

      if (!response.ok) throw new Error('Failed to add comment');

      // Refresh mix data to get updated comments
      const mixResponse = await fetch(`/api/mixes/${mix.id}`);
      if (!mixResponse.ok) throw new Error('Failed to refresh mix data');
      const data = await mixResponse.json();
      setMix(data.mix);

      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment');
    }
  };

  if (!mix) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-[400px]">
          {mix.coverImage ? (
            <Image
              src={mix.coverImage}
              alt={mix.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
              <Music2 className="w-32 h-32 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Mix Info Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{mix.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              {mix.user.image && (
                <Image
                  src={mix.user.image}
                  alt={mix.user.name || 'DJ'}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-white/50"
                />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{mix.user.name}</span>
                  {mix.user.role === "DJ" && (
                    <span className="text-blue-400">✓</span>
                  )}
                </div>
                <div className="text-sm text-gray-300">
                  {formatDistanceToNow(new Date(mix.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={togglePlay}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 mr-2" />
                ) : (
                  <Play className="w-6 h-6 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleLike}
                className={cn(
                  "border-white/20 text-white hover:bg-white/10",
                  isLiked && "text-red-400"
                )}
              >
                <Heart className={cn("w-6 h-6 mr-2", isLiked && "fill-current")} />
                {likesCount}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  navigator.share({
                    title: mix.title,
                    text: mix.description || undefined,
                    url: window.location.href,
                  }).catch(() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard');
                  });
                }}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Share2 className="w-6 h-6 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Mix Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About this mix</h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {mix.description || 'No description provided.'}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Mix Details</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Duration: {mix.formattedDuration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Uploaded {formatDistanceToNow(new Date(mix.createdAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="w-5 h-5" />
                  <div className="flex flex-wrap gap-2">
                    {mix.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-gray-100 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t pt-8">
            <CommentsSection
              mixId={mix.id}
              comments={mix.comments as any} // Type assertion to fix type mismatch
              onAddComment={handleAddComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 