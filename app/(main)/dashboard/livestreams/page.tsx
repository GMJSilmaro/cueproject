import { Metadata } from "next"
import { Video } from "@/lib/mux"
import { LivestreamGrid } from "@/components/livestream/livestream-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Livestreams",
  description: "Manage your live streams",
}

async function getActiveStreams() {
  try {
    const { data: streams } = await Video.liveStreams.list()
    return streams.map((stream: any) => ({
      id: stream.id,
      title: `Live DJ Set`, // You would get this from your database
      dj: {
        name: "DJ Beats", // You would get this from your database
        image: "/avatars/dj-beats.jpg",
        handle: "@djbeats"
      },
      thumbnail: "/thumbnails/house-mix-live.jpg",
      viewers: Math.floor(Math.random() * 300), // Replace with actual viewer count
      tags: ["live-mix"], // You would get this from your database
      isLive: stream.status === 'active',
      playbackId: stream.playback_ids?.[0]?.id || '',
    }))
  } catch (error) {
    console.error('Error fetching streams:', error)
    return []
  }
}

export default async function LivestreamsPage() {
  const streams = await getActiveStreams()

  return (
    <div className="container max-w-[1000px] py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Livestreams</h1>
          <p className="text-muted-foreground">
            Manage your live streams and view your streaming history
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/livestreams/setup">
            Stream Setup
          </Link>
        </Button>
      </div>
      
      {streams.length > 0 ? (
        <LivestreamGrid streams={streams} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No live streams available right now.</p>
        </div>
      )}
    </div>
  )
} 