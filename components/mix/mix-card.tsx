'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Play, Pause, Radio, MoreHorizontal, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { FormattedMix } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

interface CommentProps {
  comment: any;
  onReply: (commentId: string, username: string) => void;
  onLike: (commentId: string) => void;
  className?: string;
}

function Comment({ comment, onReply, onLike, className }: CommentProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <Avatar className="h-6 w-6 flex-shrink-0">
        <AvatarImage src={comment.user.image || `/avatars/default-avatar.jpg`} alt={comment.user.name || 'Anonymous'} />
        <AvatarFallback>
          {comment.user.name?.[0]?.toUpperCase() || 'A'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="inline-block rounded-2xl bg-gray-100 px-3 py-2">
          <p className="font-semibold text-sm text-gray-900">{comment.user.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-800">{comment.content}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <button 
            className="hover:text-gray-700"
            onClick={() => onLike(comment.id)}
          >
            Like
          </button>
          <button 
            className="hover:text-gray-700"
            onClick={() => onReply(comment.id, comment.user.name)}
          >
            Reply
          </button>
          <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-2 mt-2 pl-4 border-l-2 border-gray-100">
            {comment.replies.map((reply: any) => (
              <Comment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onLike={onLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface MixCardProps {
  mix: FormattedMix;
  onLike: () => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  className?: string;
}

export function MixCard({ mix, onLike, onComment, onShare, className }: MixCardProps) {
  const { data: session } = useSession();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(mix.audioUrl));
  const [isLiked, setIsLiked] = useState(mix.isLiked);
  const [likesCount, setLikesCount] = useState(mix.likesCount);
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: string; username: string } | null>(null);
  const [comments, setComments] = useState(mix.comments || []);
  const [plays, setPlays] = useState(mix.plays);
  const [isPlayTracked, setIsPlayTracked] = useState(false);

  // Track play when audio starts
  useEffect(() => {
    const handlePlay = async () => {
      if (!isPlayTracked) {
        try {
          const response = await fetch(`/api/mixes/${mix.id}/play`, {
            method: 'POST',
          });
          
          if (response.ok) {
            const data = await response.json();
            setPlays(data.plays);
            setIsPlayTracked(true);
          }
        } catch (error) {
          console.error('Failed to track play:', error);
        }
      }
    };

    audio.addEventListener('play', handlePlay);
    return () => {
      audio.removeEventListener('play', handlePlay);
    };
  }, [audio, mix.id, isPlayTracked]);

  // Reset play tracking after 5 minutes
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlayTracked) {
      timeout = setTimeout(() => {
        setIsPlayTracked(false);
      }, 5 * 60 * 1000); // 5 minutes
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isPlayTracked]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
        toast.error('Failed to play audio');
      });
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/mixes/${mix.id}/like`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to like mix');
      
      const data = await response.json();
      setIsLiked(data.action === 'liked');
      setLikesCount(data.likesCount);
      onLike();
    } catch (error) {
      console.error('Failed to like mix:', error);
      toast.error('Failed to like mix');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mixId: mix.id,
          content: commentText.trim(),
          parentId: replyingTo?.id
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const newComment = await response.json();

      if (replyingTo) {
        setComments((prevComments: any) => 
          prevComments.map((comment: any) => 
            comment.id === replyingTo.id
              ? {
                  ...comment,
                  replies: [newComment]
                }
              : comment
          )
        );
      } else {
        setComments((prev: any) => [newComment, ...prev]);
      }

      setCommentText('');
      setReplyingTo(null);
      onComment(mix.id);
    } catch (error) {
      console.error('Failed to add comment:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to add comment');
      }
    }
  };

  const handleCommentLike = async (commentId: string) => {
    if (!session) {
      toast.error('Please sign in to like comments');
      return;
    }

    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to like comment');

      const data = await response.json();
      
      setComments((prevComments: any) => 
        prevComments.map((comment: any) => 
          comment.id === commentId
            ? { ...comment, likes: data.likes }
            : comment
        )
      );

      toast.success(data.message);
    } catch (error) {
      console.error('Failed to like comment:', error);
      toast.error('Failed to like comment');
    }
  };

  const handleReply = (commentId: string, username: string) => {
    if (!session) {
      toast.error('Please sign in to reply');
      return;
    }
    setReplyingTo({ id: commentId, username });
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300",
      className
    )}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-gray-100">
            <AvatarImage src={mix.dj.image || `/avatars/default-avatar.jpg`} alt={mix.dj.name || 'Anonymous'} />
            <AvatarFallback>
              {mix.dj.name?.[0]?.toUpperCase() || 'A'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-gray-900">{mix.dj.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(mix.createdAt))} ago</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Mix Cover */}
      <div className="relative aspect-square group">
        <Image
          src={mix.dj.coverImage || '/images/cueProjectLogo.png'}
          alt={mix.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-white hover:scale-110 transition-all duration-300"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-16 w-16 drop-shadow-lg" />
            ) : (
              <Play className="h-16 w-16 drop-shadow-lg" />
            )}
          </Button>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 text-sm font-medium bg-black/60 text-white rounded-full backdrop-blur-sm">
          {mix.formattedDuration}
        </div>

        {/* Genre Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {mix.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-sm font-medium bg-black/60 text-white rounded-full backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
          {mix.tags.length > 2 && (
            <span className="px-3 py-1.5 text-sm font-medium bg-black/60 text-white rounded-full backdrop-blur-sm">
              +{mix.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={cn(
                "hover:bg-red-50 transition-colors",
                isLiked && "text-red-600"
              )}
            >
              <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onShare(mix.id)} className="hover:bg-green-50">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            {plays} plays
          </div>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm text-gray-900 mb-2">
          {likesCount} likes
        </p>

        {/* Title and Description */}
        <div className="space-y-1 mb-3">
          <p className="text-sm">
            <span className="font-semibold text-gray-900">{mix.dj.name}</span>{' '}
            <span className="text-gray-800">{mix.title}</span>
          </p>
          {mix.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{mix.description}</p>
          )}
        </div>

        {/* Comments */}
        {comments.length > 0 && (
          <div className="space-y-3 mb-3">
            {comments.length > 2 && !showAllComments && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setShowAllComments(true)}
              >
                View all {comments.length} comments
              </button>
            )}
            {displayedComments.map((comment: any) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onLike={handleCommentLike}
              />
            ))}
          </div>
        )}

        {/* Add Comment */}
        <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <div className="flex-1 space-y-2">
            {replyingTo && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Reply className="h-3 w-3" />
                <span>Replying to {replyingTo.username}</span>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </button>
              </div>
            )}
            <Input
              type="text"
              placeholder={replyingTo ? `Reply to ${replyingTo.username}...` : "Add a comment..."}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 text-sm border-none bg-transparent px-0 h-auto placeholder:text-gray-400 focus-visible:ring-0"
            />
          </div>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={!commentText.trim()}
            className="text-blue-600 hover:text-blue-700 disabled:text-gray-300 font-semibold px-0"
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
} 