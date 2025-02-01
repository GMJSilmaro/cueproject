import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { Send, MessageCircle } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface CommentsSectionProps {
  mixId: string;
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
}

export function CommentsSection({ mixId, comments, onAddComment }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting || !newComment.trim()}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6 mt-8">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              {comment.user.image ? (
                <Image
                  src={comment.user.image}
                  alt={comment.user.name || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {(comment.user.name?.[0] || 'U').toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{comment.user.name || 'Anonymous'}</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 