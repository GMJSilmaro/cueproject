'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { toast } from "sonner";
import type { ExtendedProfile } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";

function FollowButton({ userId, username, initialIsFollowing = false }: { 
  userId: string, 
  username: string,
  initialIsFollowing?: boolean 
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/profile/${userId}/follow`, {
        method: 'POST',
      });
      
      if (!res.ok) throw new Error();
      
      const data = await res.json();
      setIsFollowing(data.following);
      
      if (data.following) {
        toast.success(`You are now following ${username}`);
      } else {
        toast.success(`You have unfollowed ${username}`);
      }
    } catch (_error: unknown) {
      console.error('Error following user:', _error);
      toast("Failed to follow user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}

interface UserListProps {
  users: ExtendedProfile[];
  totalUsers: number;
}

export function UserList({ users, totalUsers }: UserListProps) {
  const { data: session } = useSession();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Discover New DJs</h2>
          <p className="text-sm text-gray-500">Connect with {totalUsers} talented DJs</p>
        </div>
        <Users className="h-5 w-5 text-red-500" />
      </div>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.userId} className="flex items-center justify-between group">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 ring-2 ring-red-500/20 transition-all group-hover:ring-red-500/40">
                <AvatarImage src={user.avatar || user.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`} />
                <AvatarFallback>{user.username?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{user.username}</p>
                  {user.user.role === "DJ" && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs">DJ</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{user.genre?.[0] || 'Member'}</p>
                <p className="text-xs text-gray-400">{user.followers.length} followers</p>
              </div>
            </div>
            {session?.user?.id !== user.userId && (
              <FollowButton 
                userId={user.userId} 
                username={user.username}
                initialIsFollowing={user.followers.includes(session?.user?.id || '')}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 