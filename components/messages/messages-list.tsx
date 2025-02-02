'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessagesListProps {
  conversations: Array<{
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
  }>
  selectedChat: number | null
  onSelectChat: (id: number) => void
}

export function MessagesList({ conversations, selectedChat, onSelectChat }: MessagesListProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search messages" 
            className="pl-9"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectChat(conversation.id)}
            className={cn(
              "w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors",
              selectedChat === conversation.id && "bg-muted"
            )}
          >
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
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{conversation.user.name}</span>
                <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
              </div>
              <div className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</div>
            </div>
            {conversation.unread > 0 && (
              <div className="min-w-[1.5rem] h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {conversation.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
} 