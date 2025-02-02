'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MessageCircle,
  Share2,
  User,
  ThumbsUp,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Comment {
  id: number
  user: {
    name: string
    image: string
    handle: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

const mockComments: Comment[] = [
  {
    id: 1,
    user: {
      name: "House Fan",
      image: "/avatars/user-1.jpg",
      handle: "@housefan"
    },
    content: "This mix is absolutely fire! 🔥",
    timestamp: "2 minutes ago",
    likes: 12,
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: "Techno Lover",
      image: "/avatars/user-2.jpg",
      handle: "@technolover"
    },
    content: "That transition at 15:30 was insane!",
    timestamp: "5 minutes ago",
    likes: 8,
    isLiked: true
  },
]

export function StreamComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        }
      }
      return comment
    }))
  }

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: comments.length + 1,
      user: {
        name: "You",
        image: "/avatars/user.jpg",
        handle: "@you"
      },
      content: newComment,
      timestamp: "just now",
      likes: 0,
      isLiked: false
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  return (
    <div className="space-y-6">
      {/* Stream Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              <span>4.2K</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </Button>
        </div>
      </Card>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!newComment.trim()}>
            Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.user.image} alt={comment.user.name} />
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.user.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {comment.user.handle}
                    </span>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 h-auto p-0"
                      onClick={() => handleLike(comment.id)}
                    >
                      <ThumbsUp
                        className={`w-4 h-4 ${
                          comment.isLiked ? "text-primary fill-primary" : ""
                        }`}
                      />
                      <span className="text-sm">{comment.likes}</span>
                    </Button>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuItem>Copy Link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  )
} 