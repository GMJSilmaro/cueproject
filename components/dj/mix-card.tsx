'use client';

import { useState } from 'react';
import { Play, Pause, Heart, Share2, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MixCardProps {
  mix: {
    id: string;
    title: string;
    coverImage: string;
    duration: number;
    plays: number;
    likes: number;
    createdAt: Date;
    genre: string;
    djName: string;
    djImage: string;
  };
}

export function MixCard({ mix }: MixCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual audio playback
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Implement like functionality
  };

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={mix.coverImage}
          alt={mix.title}
          fill
          className="object-cover"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 rounded-full bg-white/90 shadow-lg hover:bg-white"
          onClick={handlePlay}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold line-clamp-1">{mix.title}</h3>
            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
              <span>{mix.genre}</span>
              <span>•</span>
              <span>{formatDuration(mix.duration)}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Image
            src={mix.djImage}
            alt={mix.djName}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm font-medium">{mix.djName}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="space-x-2"
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span>{mix.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="space-x-2"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(mix.createdAt, { addSuffix: true })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
} 