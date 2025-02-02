import { NextResponse } from 'next/server'
import { createLiveStream, deleteLiveStream } from '@/lib/mux'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to create a stream' },
        { status: 401 }
      )
    }

    // Check if user already has an active stream
    const activeStreamResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/streams/active`)
    const activeStreamData = await activeStreamResponse.json()

    if (activeStreamData.stream) {
      return NextResponse.json(
        { error: 'You already have an active stream. Please end it before creating a new one.' },
        { status: 400 }
      )
    }

    const stream = await createLiveStream({
      userId: session.user.id,
      metadata: {
        user_id: session.user.id,
        username: session.user.name || 'Anonymous',
      }
    })

    return NextResponse.json(stream)
  } catch (error) {
    console.error('Error creating stream:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create stream' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { streamId } = await request.json()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to delete a stream' },
        { status: 401 }
      )
    }

    await deleteLiveStream(streamId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting stream:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete stream' },
      { status: 500 }
    )
  }
} 