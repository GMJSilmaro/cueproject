'use client'

import { Metadata } from "next"
import { getLiveStream } from "@/lib/mux"
import { LivestreamPlayer } from "@/components/livestream/livestream-player"
import { LivestreamChat } from "@/components/livestream/livestream-chat"
import { StreamComments } from "@/components/livestream/stream-comments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"

interface StreamData {
  id: string
  status: string
  streamKey: string
  playbackId?: string
  userId: string
  username?: string
}

export default function LivestreamPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [stream, setStream] = useState<StreamData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await fetch(`/api/streams/active`)
        const data = await response.json()
        
        if (data.stream && data.stream.id === params.id) {
          setStream(data.stream)
        } else {
          setError('Stream not found or has ended')
        }
      } catch (error) {
        console.error('Error fetching stream:', error)
        setError('Failed to load stream')
      }
    }

    fetchStream()
  }, [params.id])

  const handleStopStream = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/streams', {
        method: 'DELETE',
        body: JSON.stringify({ streamId: params.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to stop stream')
      }

      router.push('/dashboard/livestreams')
      router.refresh()
    } catch (error) {
      console.error('Error stopping stream:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="container max-w-[1500px] py-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Stream Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!stream) {
    return (
      <div className="container max-w-[1500px] py-6">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground mt-2">Loading stream...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-[1500px] py-6">
      <div className="grid lg:grid-cols-[1fr,380px] gap-6">
        {/* Main Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Live DJ Set</h1>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Stopping...
                    </>
                  ) : (
                    'Stop Stream'
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Stop Stream</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to stop this stream? This will end the broadcast for all viewers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleStopStream}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Stop Stream
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <LivestreamPlayer stream={stream} />
          
          <p className="text-muted-foreground">
            Join me for a late night house music session! Taking requests in the chat.
          </p>

          <Card className="p-6">
            <Tabs defaultValue="comments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="space-y-4">
                <StreamComments />
              </TabsContent>
              <TabsContent value="about" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Streamer Information</h3>
                    <p className="text-sm text-muted-foreground">
                      {stream.username || 'Anonymous'} is streaming live.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Chat */}
        <div className="lg:h-[calc(100vh-8rem)] bg-card rounded-xl border border-border">
          <LivestreamChat streamId={params.id} />
        </div>
      </div>
    </div>
  )
} 