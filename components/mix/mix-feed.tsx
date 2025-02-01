import { useState, useEffect } from 'react';
import { Music, Send } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MixActions } from '@/components/mix/mix-actions';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow, isValid } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import type { ExtendedMix } from '@/types';

interface MixFeedProps {
  mixes: ExtendedMix[];
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image: string | null;
  };
  replies?: Comment[];
}

function formatDate(dateString: Date | string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isValid(date) ? formatDistanceToNow(date, { addSuffix: true }) : '';
}

function CommentItem({ comment, onReply }: { comment: Comment; onReply: (parentId: string) => void }) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.user.image || ''} />
        <AvatarFallback>
          {comment.user.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-4 py-2">
          <p className="font-medium text-sm">{comment.user.name}</p>
          <p className="text-sm">{comment.content}</p>
        </div>
        <div className="flex gap-4 mt-1 text-xs text-gray-500">
          <button className="hover:text-gray-700">Like</button>
          <button 
            className="hover:text-gray-700"
            onClick={() => onReply(comment.id)}
          >
            Reply
          </button>
          <span>{formatDate(comment.createdAt)}</span>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 space-y-3 pl-6 border-l-2 border-gray-100">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} onReply={onReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MixFeed({ mixes }: MixFeedProps) {
  const { data: session } = useSession();
  const [playingMixId, setPlayingMixId] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const toggleComments = async (mixId: string) => {
    if (expandedComments.includes(mixId)) {
      setExpandedComments(prev => prev.filter(id => id !== mixId));
      return;
    }

    setExpandedComments(prev => [...prev, mixId]);
    if (!comments[mixId]) {
      setIsLoading(prev => ({ ...prev, [mixId]: true }));
      try {
        const response = await fetch(`/api/mixes/comment?mixId=${mixId}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(prev => ({ ...prev, [mixId]: data.comments }));
      } catch (error) {
        toast.error('Failed to load comments');
      } finally {
        setIsLoading(prev => ({ ...prev, [mixId]: false }));
      }
    }
  };

  const handleComment = async (mixId: string) => {
    if (!session) {
      toast.error('Please sign in to comment');
      return;
    }

    const text = commentText[mixId]?.trim();
    if (!text) {
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
        body: JSON.stringify({ 
          mixId, 
          content: text,
          parentId: replyingTo,
        }),
      });

      if (!response.ok) throw new Error('Failed to add comment');

      const { comment } = await response.json();
      
      if (replyingTo) {
        setComments(prev => ({
          ...prev,
          [mixId]: prev[mixId].map(c => 
            c.id === replyingTo 
              ? { ...c, replies: [...(c.replies || []), comment] }
              : c
          ),
        }));
      } else {
        setComments(prev => ({
          ...prev,
          [mixId]: [comment, ...(prev[mixId] || [])],
        }));
      }

      setCommentText(prev => ({ ...prev, [mixId]: '' }));
      setReplyingTo(null);
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {mixes.map((mix) => (
        <Card key={mix.id} className="overflow-hidden">
          {/* Cover Image */}
          <div className="relative aspect-video">
            <img
              src={mix.coverImage || '/covers/default-mix.jpg'}
              alt={mix.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Mix Info */}
          <CardHeader className="flex flex-row items-start gap-4 p-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={mix.user.image || ''} alt={mix.user.name || ''} />
              <AvatarFallback>
                {mix.user.name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{mix.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{mix.user.name}</span>
                {mix.user.role === "DJ" && (
                  <span className="text-blue-500">✓</span>
                )}
                <span>•</span>
                <span>{mix.duration}</span>
                <span>•</span>
                <span>{formatDate(mix.createdAt)}</span>
              </div>
              {mix.description && (
                <p className="mt-2 text-sm text-gray-600">{mix.description}</p>
              )}
              {mix.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {mix.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>

          {/* Mix Actions */}
          <CardContent className="p-4 border-t">
            <div className="flex items-center justify-between">
              <MixActions
                mixId={mix.id}
                initialLikes={mix.likes.length}
                initialComments={mix.comments.length}
                audioUrl={mix.audioUrl}
                isPlaying={playingMixId === mix.id}
                onPlayStateChange={(isPlaying) => {
                  setPlayingMixId(isPlaying ? mix.id : null);
                }}
                onCommentClick={() => toggleComments(mix.id)}
              />
              <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                <Music className="h-4 w-4" />
                <span>{mix.plays.toLocaleString()} plays</span>
              </div>
            </div>

            {/* Comments Section */}
            {expandedComments.includes(mix.id) && (
              <div className="mt-4 space-y-4">
                {/* Comment Input */}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ''} />
                    <AvatarFallback>
                      {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
                        value={commentText[mix.id] || ''}
                        onChange={(e) => setCommentText(prev => ({
                          ...prev,
                          [mix.id]: e.target.value
                        }))}
                        rows={1}
                        className="min-h-[2.5rem] py-2 resize-none"
                      />
                      {replyingTo && (
                        <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                          <span>Replying to comment</span>
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                    <Button
                      size="icon"
                      onClick={() => handleComment(mix.id)}
                      disabled={isSubmitting || !commentText[mix.id]?.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-3 pl-11">
                  {isLoading[mix.id] ? (
                    <div className="text-center text-sm text-gray-500">
                      Loading comments...
                    </div>
                  ) : comments[mix.id]?.length > 0 ? (
                    comments[mix.id]?.map((comment: Comment) => (
                      <CommentItem 
                        key={comment.id} 
                        comment={comment}
                        onReply={(parentId: string) => {
                          setReplyingTo(parentId);
                          const textarea = document.querySelector('textarea');
                          if (textarea) {
                            textarea.focus();
                          }
                        }}
                      />
                    ))
                  ) : (
                    <div className="text-center text-sm text-gray-500">
                      No comments yet. Be the first to comment!
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}