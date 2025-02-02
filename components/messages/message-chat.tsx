'use client'

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, SmileIcon, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MessageChatProps {
  conversation: {
    id: number
    user: {
      name: string
      image: string
      handle: string
      status: 'online' | 'offline'
    }
    lastMessage: string
    timestamp: string
    unread: number
  }
}

// Mock messages for the chat
const allMockMessages = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  sender: i % 2 === 0 ? 'user' : 'other',
  content: i % 3 === 0 
    ? "Hey! Loved your latest mix! 🎵" 
    : i % 3 === 1 
    ? "Thanks! I had a blast making it. Did you catch the transition at 5:20?"
    : "Yes! That transition was smooth. What technique did you use?",
  timestamp: `${Math.floor(i/2) + 1}:${i % 2 === 0 ? '30' : '31'} PM`
})).reverse() // Reverse to show newest messages at bottom

export function MessageChat({ conversation }: MessageChatProps) {
  const [messages, setMessages] = useState(allMockMessages.slice(-20)) // Start with last 20 messages
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const loadMoreMessages = async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const currentLength = messages.length
    const newMessages = allMockMessages.slice(-currentLength - 10, -currentLength)
    
    if (newMessages.length === 0) {
      setHasMore(false)
    } else {
      setMessages(prev => [...newMessages, ...prev])
    }
    setIsLoading(false)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    if (scrollTop === 0 && !isLoading && hasMore) {
      loadMoreMessages()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border flex items-center gap-3 shrink-0">
        <div className="relative">
          <Avatar>
            <AvatarImage src={conversation.user.image} alt={conversation.user.name} />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
            conversation.user.status === 'online' ? 'bg-green-500' : 'bg-muted'
          )} />
        </div>
        <div>
          <div className="font-medium">{conversation.user.name}</div>
          <div className="text-sm text-muted-foreground">{conversation.user.handle}</div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4" 
        onScroll={handleScroll}
        ref={messagesContainerRef}
      >
        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={loadMoreMessages}
              disabled={isLoading}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin mr-2" />
              ) : null}
              {isLoading ? "Loading messages..." : "Load previous messages"}
            </Button>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 max-w-[80%]",
              message.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            )}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage 
                src={message.sender === 'user' ? '/avatars/user.jpg' : conversation.user.image} 
                alt={message.sender === 'user' ? 'You' : conversation.user.name} 
              />
              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            <div>
              <div className={cn(
                "rounded-2xl p-3",
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              )}>
                {message.content}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-2 bg-muted/50 rounded-xl border border-border/60 px-3">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <Input 
            placeholder="Type a message..." 
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-0"
          />
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SmileIcon className="h-5 w-5" />
          </button>
          <button className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors ml-2">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 