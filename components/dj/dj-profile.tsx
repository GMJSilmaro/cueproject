'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, Users, Calendar, MapPin, ExternalLink } from "lucide-react";
import { MixCard } from "@/components/mix/mix-card";
import type { ExtendedProfile } from "@/types";
import { ShareButton } from "@/components/dj/share-button";
import Image from "next/image";
import type { Session } from "next-auth";

// Helper function to get valid image source or null
function getValidImageSrc(src: string | null | undefined, defaultSrc: string): string {
  if (!src || src.trim() === '') {
    return defaultSrc;
  }
  return src;
}

interface DJProfileProps {
  profile: ExtendedProfile;
  session: Session | null;
}

export function DJProfile({ profile, session }: DJProfileProps) {
  const isFollowing = session?.user?.id ? profile.followers.includes(session.user.id) : false;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="relative h-64 w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 overflow-hidden">
            {profile.coverImage && (
              <Image
                src={getValidImageSrc(profile.coverImage, '/covers/default-cover.jpg')}
                alt={`${profile.username}'s cover`}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          <div className="relative px-4 -mt-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-end gap-6">
                <Avatar className="h-40 w-40 rounded-xl ring-4 ring-white shadow-xl">
                  <AvatarImage 
                    src={getValidImageSrc(profile.avatar || profile.user?.image, '/avatars/default.png')}
                    alt={profile.username || "DJ"}
                  />
                  <AvatarFallback>{(profile.username?.[0] || "D").toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="mb-2">
                  <h1 className="text-3xl font-bold">{profile.username}</h1>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-2">
                {session?.user?.id !== profile.userId && (
                  <form action={`/api/profile/${profile.userId}/follow`} method="POST">
                    <Button 
                      variant={isFollowing ? "outline" : "default"}
                      className="gap-2"
                      type="submit"
                    >
                      <Users className="h-4 w-4" />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </form>
                )}
                <ShareButton username={profile.username} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Mixes</p>
                  <p className="text-2xl font-bold">{profile.user.mixes.length}</p>
                </div>
                <Music className="h-8 w-8 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Followers</p>
                  <p className="text-2xl font-bold">{profile.followers.length}</p>
                </div>
                <Users className="h-8 w-8 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Following</p>
                  <p className="text-2xl font-bold">{profile.following.length}</p>
                </div>
                <Users className="h-8 w-8 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-2xl font-bold">
                    {new Date(profile.createdAt).getFullYear()}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">About</h2>
            <Card>
              <CardContent className="p-6 space-y-6">
                {profile.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                
                {profile.equipment && (
                  <div>
                    <h3 className="font-semibold mb-2">Equipment</h3>
                    <p className="text-gray-600">{profile.equipment}</p>
                  </div>
                )}
                
                {profile.experience && (
                  <div>
                    <h3 className="font-semibold mb-2">Experience</h3>
                    <p className="text-gray-600">{profile.experience}</p>
                  </div>
                )}
                
                {profile.socialLinks && (
                  <div>
                    <h3 className="font-semibold mb-2">Social Links</h3>
                    <div className="flex gap-4">
                      {Object.entries(profile.socialLinks as Record<string, string>).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Genres</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {profile.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Mixes */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Mixes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.user.mixes.map((mix) => (
              <MixCard key={mix.id} mix={mix} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 