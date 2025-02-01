'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Heart, MessageCircle, Share2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@headlessui/react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MixActionsProps {
  mixId: string;
  initialLikes: number;
  initialComments: number;
  audioUrl: string;
  isPlaying?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onCommentClick?: () => void;
}

export function MixActions({
  mixId,
  initialLikes,
  initialComments,
  audioUrl,
  isPlaying = false,
  onPlayStateChange,
  onCommentClick,
}: MixActionsProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [isLiked, setIsLiked] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check initial like state
  useEffect(() => {
    const checkLikeState = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(`/api/mixes/${mixId}/like/check`);
        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.hasLiked);
          setLikes(data.likesCount);
        }
      } catch (error) {
        console.error('Failed to check like state:', error);
      }
    };
    checkLikeState();
  }, [session?.user, mixId]);

  const handleLike = async () => {
    if (!session) {
      toast.error('Please sign in to like mixes');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/mixes/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mixId }),
      });

      if (!response.ok) throw new Error('Failed to like mix');

      const data = await response.json();
      setIsLiked(data.action === 'liked');
      setLikes(data.likesCount);
      toast.success(data.action === 'liked' ? 'Mix liked!' : 'Mix unliked');
    } catch (error) {
      toast.error('Failed to like mix');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComment = async () => {
    if (!session) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/mixes/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mixId, content: commentText }),
      });

      if (!response.ok) throw new Error('Failed to add comment');

      setComments(prev => prev + 1);
      setCommentText('');
      setCommentDialogOpen(false);
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this mix!',
        url: window.location.href,
      });
      toast.success('Mix shared successfully');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share mix');
      }
    }
  };

  const handlePlayToggle = () => {
    if (onPlayStateChange) {
      onPlayStateChange(!isPlaying);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'flex items-center gap-2',
          isLiked && 'text-red-500'
        )}
        onClick={handleLike}
        disabled={isSubmitting}
      >
        <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
        <span>{likes}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setCommentDialogOpen(true)}
      >
        <MessageCircle className="h-5 w-5" />
        <span>{comments}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleShare}
      >
        <Share2 className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={handlePlayToggle}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>

      <Dialog
        open={commentDialogOpen}
        onClose={() => setCommentDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Add a comment
            </Dialog.Title>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleComment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 