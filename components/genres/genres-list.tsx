'use client'

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

interface GenresListProps {
  genres: Array<{
    id: number
    name: string
    slug: string
    postsCount: string
    image: string
    trending: boolean
    description: string
  }>
}

export function GenresList({ genres }: GenresListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {genres.map((genre) => (
        <Link key={genre.id} href={`/genres/${genre.slug}`}>
          <Card className="group overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[2/1] relative">
              <Image
                src={genre.image}
                alt={genre.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {genre.trending && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                >
                  <Flame className="h-3 w-3 text-primary mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{genre.name}</h3>
                <span className="text-sm text-muted-foreground">{genre.postsCount} posts</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {genre.description}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
} 