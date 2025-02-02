import { Metadata } from "next"
import { GenresList } from "@/components/genres/genres-list"

export const metadata: Metadata = {
  title: "Genres",
  description: "Explore music genres and discover new tracks",
}

const mockGenres = [
  {
    id: 1,
    name: "Deep House",
    slug: "deep-house",
    postsCount: "2.5K",
    image: "/genres/deep-house.jpg",
    trending: true,
    description: "Smooth, soulful electronic music with jazz and ambient influences"
  },
  {
    id: 2,
    name: "Techno",
    slug: "techno",
    postsCount: "1.8K",
    image: "/genres/techno.jpg",
    trending: true,
    description: "Hard-hitting electronic music with repetitive beats"
  },
  {
    id: 3,
    name: "House",
    slug: "house",
    postsCount: "3.2K",
    image: "/genres/house.jpg",
    trending: true,
    description: "Four-on-the-floor beats with soulful and uplifting elements"
  },
  {
    id: 4,
    name: "Trance",
    slug: "trance",
    postsCount: "1.2K",
    image: "/genres/trance.jpg",
    trending: false,
    description: "Hypnotic electronic music with emotional melodies"
  },
  {
    id: 5,
    name: "Drum & Bass",
    slug: "drum-and-bass",
    postsCount: "980",
    image: "/genres/dnb.jpg",
    trending: false,
    description: "Fast-paced electronic music with heavy bass and breakbeats"
  }
]

export default function GenresPage() {
  return (
    <div className="container max-w-[1500px] py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Genres</h1>
          <p className="text-muted-foreground">
            Explore different music genres and discover new tracks
          </p>
        </div>
        
        <GenresList genres={mockGenres} />
      </div>
    </div>
  )
} 