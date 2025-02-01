'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";
import type { ExtendedProfile } from "@/types";

interface UserCardProps {
  user: ExtendedProfile;
}

export function UserCard({ user }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/profile/${user.userId}/follow`, {
        method: 'POST',
      });
      
      if (!res.ok) throw new Error();
      
      const data = await res.json();
      setIsFollowing(data.following);
      
      if (data.following) {
        toast.success(`You are now following ${user.username}`);
      } else {
        toast.success(`You have unfollowed ${user.username}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Link 
            href={`/dashboard/dj/${user.userId}`}
            className="flex items-center space-x-4 group flex-1"
          >
            <Avatar className="h-12 w-12 ring-2 ring-red-500/20 transition-all group-hover:ring-red-500/40">
              <AvatarImage 
                src={user.avatar || user.user?.image || '/avatars/default.png'}
                alt={user.username || "User"}
              />
              <AvatarFallback>{(user.username?.[0] || "U").toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold group-hover:text-red-600">
                {user.username}
              </h3>
              <p className="text-sm text-muted-foreground">
                {user.followers.length} followers
              </p>
            </div>
          </Link>
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
        </div>
      </CardContent>
    </Card>
  );
} 