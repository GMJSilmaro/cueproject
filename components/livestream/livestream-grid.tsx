'use client'

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Radio, User } from "lucide-react"

interface LivestreamGridProps {
  streams: Array<{
    id: number
    title: string
    dj: {
      name: string
      image: string
      handle: string
    }
    thumbnail: string
    viewers: number
    tags: string[]
    isLive: boolean
  }>
}

export function LivestreamGrid({ streams }: LivestreamGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {streams.map((stream) => (
        <Link key={stream.id} href={`/dashboard/livestreams/${stream.id}`}>
          <Card className="group overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className="aspect-video relative">
              <Image
                src={stream.thumbnail}
                alt={stream.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Live Badge */}
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <Badge variant="destructive" className="bg-red-600 text-white">
                  <Radio className="w-3 h-3 mr-1 animate-pulse" />
                  LIVE
                </Badge>
                <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-0">
                  <Eye className="w-3 h-3 mr-1" />
                  {stream.viewers}
                </Badge>
              </div>

              {/* DJ Info */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                <Avatar className="w-8 h-8 border-2 border-background">
                  <AvatarImage src={stream.dj.image} alt={stream.dj.name} />
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{stream.title}</h3>
                  <p className="text-white/80 text-sm truncate">{stream.dj.name}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="p-3 border-t border-border">
              <div className="flex flex-wrap gap-1">
                {stream.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
} 