'use client'

import { useState } from "react"
import { MessagesList } from "./messages-list"
import { MessageChat } from "./message-chat"

type UserStatus = 'online' | 'offline'

interface Conversation {
  id: number
  user: {
    name: string
    image: string
    handle: string
    status: UserStatus
  }
  lastMessage: string
  timestamp: string
  unread: number
}

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: 1,
    user: {
      name: "DJ Beats",
      image: "/avatars/dj-beats.jpg",
      handle: "@djbeats",
      status: "online"
    },
    lastMessage: "Hey! Loved your latest mix! 🎵",
    timestamp: "2m ago",
    unread: 2
  },
  {
    id: 2,
    user: {
      name: "Vinyl Queen",
      image: "/avatars/vinyl-queen.jpg",
      handle: "@vinylqueen",
      status: "offline"
    },
    lastMessage: "Thanks for the feedback on my set!",
    timestamp: "1h ago",
    unread: 0
  }
]

export function MessagesContainer() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full max-w-[100vw]">
      {/* Messages List - Fixed width sidebar */}
      <div className="w-80 border-r border-border flex-shrink-0">
        <MessagesList 
          conversations={mockConversations}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
      </div>

      {/* Chat Area - Takes remaining width */}
      <div className="flex-1 flex flex-col min-w-0 w-0">
        {selectedChat ? (
          <MessageChat 
            conversation={mockConversations.find(c => c.id === selectedChat)!}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  )
} 