'use client'

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Music, Heart, Play } from "lucide-react"

interface DJListProps {
  djs: Array<{
    id: number
    name: string
    handle: string
    image: string
    followers: string
    rank: number
    genres: string[]
    stats: {
      mixes: number
      likes: string
      plays: string
    }
  }>
}

export function DJList({ djs }: DJListProps) {
  return (
    <div className="grid gap-4">
      {djs.map((dj) => (
        <Link key={dj.id} href={`/profile/${dj.handle}`}>
          <Card className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="text-2xl font-bold text-muted-foreground w-8 text-center">
                {dj.rank}
              </div>

              {/* Avatar */}
              <Avatar className="h-16 w-16">
                <AvatarImage src={dj.image} alt={dj.name} />
                <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{dj.name}</h3>
                  <span className="text-sm text-muted-foreground">{dj.handle}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {dj.genres.map((genre, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {dj.followers} followers
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Music className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dj.stats.mixes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dj.stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Play className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dj.stats.plays}</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
} 