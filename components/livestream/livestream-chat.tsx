'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Send, User } from "lucide-react"

interface Message {
  id: number
  user: {
    name: string
    image: string
    handle: string
  }
  content: string
  timestamp: string
}

interface LivestreamChatProps {
  streamId: string
}

// Mock messages for demo
const mockMessages: Message[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  user: {
    name: i % 2 === 0 ? "DJ Beats Fan" : "House Lover",
    image: `/avatars/user-${(i % 5) + 1}.jpg`,
    handle: i % 2 === 0 ? "@djbeatsfan" : "@houselover"
  },
  content: i % 3 === 0 
    ? "🔥 This track is fire!" 
    : i % 3 === 1 
    ? "Love the mix! Can you play some deep house next?" 
    : "Amazing transition! 🎵",
  timestamp: "just now"
}))

export function LivestreamChat({ streamId }: LivestreamChatProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      user: {
        name: "You",
        image: "/avatars/user.jpg",
        handle: "@you"
      },
      content: newMessage,
      timestamp: "just now"
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Live Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={message.user.image} alt={message.user.name} />
              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{message.user.name}</span>
                <span className="text-muted-foreground text-xs">{message.timestamp}</span>
              </div>
              <p className="text-sm text-foreground/90">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-2">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-1"
          />
          <button 
            type="submit"
            className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
} 