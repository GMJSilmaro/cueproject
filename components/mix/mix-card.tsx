'use client';

import { useState, useRef } from 'react';
import Image from "next/image";
import { Music, Heart, MessageCircle, Share2, Play, Pause, Disc, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface Mix {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  duration: string;
  plays: string;
  likes: number;
  comments: number;
  dj: {
    name: string;
    image: string;
    verified: boolean;
  };
  tags: string[];
}

interface MixCardProps {
  mix: Mix;
}

export function MixCard({ mix }: MixCardProps) {
  const { data: session } = useSession();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(mix.likes);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(mix.audioUrl);
      
      // Update play count when the audio starts playing
      audioRef.current.addEventListener('play', async () => {
        try {
          await fetch('/api/mixes/play', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mixId: mix.id }),
          });
        } catch (error) {
          console.error('Failed to update play count:', error);
        }
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch (error) {
        toast.error('Failed to play audio. Please try again.');
        console.error('Playback failed:', error);
      }
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleLike = async () => {
    if (!session) {
      toast.error('Please sign in to like mixes');
      return;
    }

    try {
      const response = await fetch('/api/mixes/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mixId: mix.id }),
      });

      if (!response.ok) throw new Error('Failed to like mix');

      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      toast.success(isLiked ? 'Mix unliked' : 'Mix liked');
    } catch (error) {
      toast.error('Failed to like mix. Please try again.');
      console.error('Like action failed:', error);
    }
  };

  const handleComment = () => {
    if (!session) {
      toast.error('Please sign in to comment');
      return;
    }
    // TODO: Open comment modal or navigate to comments section
    toast.info('Comments coming soon!');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: mix.title,
          text: mix.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
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

      <div className="relative aspect-video group">
        <Image
          src={mix.coverImage}
          alt={mix.title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-white hover:text-white hover:scale-110 transition-transform"
            onClick={handlePlay}
          >
            {isPlaying ? (
              <Pause className="h-12 w-12" />
            ) : (
              <Play className="h-12 w-12" />
            )}
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
            <Disc className={`h-4 w-4 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
            <span className="text-sm">{mix.duration}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`hover:bg-red-50 hover:text-red-600 transition-colors ${isLiked ? 'text-red-600' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-red-50 hover:text-red-600 transition-colors"
              onClick={handleComment}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-red-50 hover:text-red-600 transition-colors"
              onClick={handleShare}
            >
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Music className="h-4 w-4 mr-1" />
            {mix.plays} plays
          </div>
        </div>

        <div className="space-y-2">
          <p><span className="font-semibold">{likesCount}</span> likes</p>
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
          <button 
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={handleComment}
          >
            View all {mix.comments} comments
          </button>
        </div>
      </CardContent>
    </Card>
  );
} 