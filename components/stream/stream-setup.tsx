'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Copy, Eye, EyeOff, Trash2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

// Helper functions for local storage
const getStoredStreamData = () => {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem('streamData')
  return data ? JSON.parse(data) : null
}

const setStoredStreamData = (data: any) => {
  if (typeof window === 'undefined') return
  if (data) {
    localStorage.setItem('streamData', JSON.stringify(data))
  } else {
    localStorage.removeItem('streamData')
  }
}

export function StreamSetup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamKey, setStreamKey] = useState<string | null>(() => {
    const stored = getStoredStreamData()
    return stored?.streamKey || null
  })
  const [streamId, setStreamId] = useState<string | null>(() => {
    const stored = getStoredStreamData()
    return stored?.streamId || null
  })
  const [isStreamActive, setIsStreamActive] = useState<boolean>(() => {
    const stored = getStoredStreamData()
    return stored?.isStreamActive || false
  })
  const [showStreamKey, setShowStreamKey] = useState(false)

  // Check for existing active streams on mount and periodically
  useEffect(() => {
    checkActiveStream()

    // Set up periodic checking every 30 seconds
    const interval = setInterval(checkActiveStream, 30000)

    return () => clearInterval(interval)
  }, [])

  const checkActiveStream = async () => {
    try {
      setIsChecking(true)
      const response = await fetch('/api/streams/active')
      const data = await response.json()
      
      if (response.ok && data.stream) {
        const streamData = {
          streamKey: data.stream.streamKey,
          streamId: data.stream.id,
          isStreamActive: data.stream.status === 'active'
        }
        setStreamKey(streamData.streamKey)
        setStreamId(streamData.streamId)
        setIsStreamActive(streamData.isStreamActive)
        setStoredStreamData(streamData)
        setError(null)
      } else {
        setStreamKey(null)
        setStreamId(null)
        setIsStreamActive(false)
        setStoredStreamData(null)
      }
    } catch (err) {
      console.error('Error checking active stream:', err)
    } finally {
      setIsChecking(false)
    }
  }

  const createStream = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Double check for active streams first
      const checkResponse = await fetch('/api/streams/active')
      const checkData = await checkResponse.json()
      
      if (checkData.stream) {
        const streamData = {
          streamKey: checkData.stream.streamKey,
          streamId: checkData.stream.id,
          isStreamActive: checkData.stream.status === 'active'
        }
        setStreamKey(streamData.streamKey)
        setStreamId(streamData.streamId)
        setIsStreamActive(streamData.isStreamActive)
        setStoredStreamData(streamData)
        return
      }
      
      const response = await fetch('/api/streams', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)
      
      const newStreamData = {
        streamKey: data.streamKey,
        streamId: data.id,
        isStreamActive: false
      }
      setStreamKey(newStreamData.streamKey)
      setStreamId(newStreamData.streamId)
      setIsStreamActive(newStreamData.isStreamActive)
      setStoredStreamData(newStreamData)

      router.refresh()
    } catch (err) {
      setError('Failed to create stream. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteStream = async () => {
    if (!streamId) return

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/streams', {
        method: 'DELETE',
        body: JSON.stringify({ streamId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      setStreamKey(null)
      setStreamId(null)
      setIsStreamActive(false)
      setStoredStreamData(null)

      router.refresh()
    } catch (err) {
      setError('Failed to delete stream. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyStreamKey = () => {
    if (streamKey) {
      navigator.clipboard.writeText(streamKey)
    }
  }

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Stream Key</h2>
            <p className="text-muted-foreground">
              Use this key in your streaming software (like OBS) to start streaming
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isStreamActive && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Stream is Active</AlertTitle>
              <AlertDescription>
                Your stream is currently live. You can view it on your channel page.
              </AlertDescription>
            </Alert>
          )}

          {!streamKey ? (
            <Button 
              onClick={createStream} 
              disabled={isLoading || isStreamActive}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Stream Key'
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your Stream Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showStreamKey ? "text" : "password"}
                      value={streamKey}
                      readOnly
                    />
                    <button
                      onClick={() => setShowStreamKey(!showStreamKey)}
                      className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      {showStreamKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyStreamKey}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Stream</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this stream? This action cannot be undone.
                          {isStreamActive && (
                            <p className="mt-2 text-destructive font-medium">
                              Warning: Your stream is currently active. Deleting it will end the stream immediately.
                            </p>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={deleteStream}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isStreamActive ? 'End Stream & Delete' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                {isChecking && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <Loader2 className="h-3 w-3 animate-spin inline mr-1" />
                    Verifying stream status...
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Stream URL</Label>
                <Input
                  value="rtmps://global-live.mux.com:443/app"
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Streaming Software Setup</h2>
            <p className="text-muted-foreground">
              Follow these steps to set up your streaming software
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Download OBS Studio</h3>
              <p className="text-sm text-muted-foreground">
                Download and install OBS Studio from{' '}
                <a 
                  href="https://obsproject.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  obsproject.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Configure Stream Settings</h3>
              <p className="text-sm text-muted-foreground">
                In OBS, go to Settings → Stream and select "Custom" as the service.
                Enter the Stream URL and Stream Key provided above.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Set Up Audio Sources</h3>
              <p className="text-sm text-muted-foreground">
                Add your audio interface or microphone as an Audio Input Source.
                Make sure to test your audio levels before going live.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">4. Start Streaming</h3>
              <p className="text-sm text-muted-foreground">
                Click "Start Streaming" in OBS to go live. Your stream will appear
                on your channel page after a few seconds.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 