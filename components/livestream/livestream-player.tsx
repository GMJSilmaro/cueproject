'use client'

import MuxPlayer from '@mux/mux-player-react'
import { Card } from "@/components/ui/card"
import { Eye, Radio, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StreamData {
  id: string
  status: string
  streamKey: string
  playbackId?: string
  userId: string
  username?: string
}

interface LivestreamPlayerProps {
  stream: StreamData
}

export function LivestreamPlayer({ stream }: LivestreamPlayerProps) {
  if (!stream.playbackId) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Stream not available</p>
      </div>
    )
  }

  return (
    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
      <iframe
        src={`https://iframe.mux.com/${stream.playbackId}`}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
} 