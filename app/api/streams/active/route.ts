import { NextResponse } from 'next/server'
import { Video } from '@/lib/mux'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

interface MuxStreamWithMetadata {
  id: string
  status: string
  stream_key: string
  playback_ids?: Array<{ id: string }>
  metadata?: {
    user_id: string
    username?: string
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to check stream status' },
        { status: 401 }
      )
    }

    const { data: streams } = await Video.liveStreams.list()
    const activeStream = (streams as MuxStreamWithMetadata[]).find(stream => 
      stream.status === 'active' && 
      stream.metadata?.user_id === session.user.id
    )

    if (activeStream) {
      return NextResponse.json({
        stream: {
          id: activeStream.id,
          streamKey: activeStream.stream_key,
          status: activeStream.status,
          playbackId: activeStream.playback_ids?.[0]?.id,
          userId: activeStream.metadata?.user_id,
          username: activeStream.metadata?.username,
        }
      })
    }

    return NextResponse.json({ stream: null })
  } catch (error) {
    console.error('Error checking active streams:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check active streams' },
      { status: 500 }
    )
  }
} 