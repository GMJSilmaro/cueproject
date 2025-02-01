'use client';

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  username: string;
}

export function ShareButton({ username }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      if (!navigator.share) {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
        return;
      }

      await navigator.share({
        title: `${username}'s DJ Profile`,
        url: window.location.href
      });
      toast.success('Shared successfully!');
    } catch (error) {
      // Only show error if it's not a user cancellation
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
  };

  return (
    <Button variant="outline" className="gap-2" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  );
} 