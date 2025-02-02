import Mux from '@mux/mux-node'

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

if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
  throw new Error('Missing Mux API credentials')
}

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

export const Video = mux.video

interface CreateStreamOptions {
  userId: string
  metadata?: Record<string, any>
}

// Helper function to clean up old streams
async function cleanupOldStreams(userId: string) {
  try {
    const { data: streams } = await Video.liveStreams.list()
    const userStreams = (streams as MuxStreamWithMetadata[]).filter(stream => 
      stream.metadata?.user_id === userId &&
      stream.status !== 'active'
    )

    // Delete old inactive streams
    await Promise.all(
      userStreams.map(stream => Video.liveStreams.delete(stream.id))
    )
  } catch (error) {
    console.error('Error cleaning up old streams:', error)
  }
}

export async function createLiveStream({ userId, metadata = {} }: CreateStreamOptions) {
  // Clean up old streams before creating a new one
  await cleanupOldStreams(userId)

  const stream = await Video.liveStreams.create({
    playback_policy: ['public'],
    new_asset_settings: {
      playback_policy: ['public'],
    },
    metadata: {
      user_id: userId,
      ...metadata,
    },
  } as any)

  return {
    id: stream.id,
    streamKey: stream.stream_key,
    playbackId: stream.playback_ids?.[0]?.id,
    status: stream.status,
    userId,
  }
}

export async function getLiveStream(streamId: string) {
  const stream = await Video.liveStreams.retrieve(streamId) as MuxStreamWithMetadata
  return {
    ...stream,
    userId: stream.metadata?.user_id,
  }
}

export async function deleteLiveStream(streamId: string) {
  await Video.liveStreams.delete(streamId)
}