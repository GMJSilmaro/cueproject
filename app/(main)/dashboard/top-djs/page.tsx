import { Metadata } from "next"
import { DJList } from "@/components/djs/dj-list"

export const metadata: Metadata = {
  title: "Top DJs",
  description: "Discover the most popular DJs and their mixes",
}

const mockDJs = [
  {
    id: 1,
    name: "DJ Beats",
    handle: "@djbeats",
    image: "/avatars/dj-beats.jpg",
    followers: "12.5K",
    rank: 1,
    genres: ["House", "Deep House", "Tech House"],
    stats: {
      mixes: 48,
      likes: "85.2K",
      plays: "320K"
    }
  },
  {
    id: 2,
    name: "Vinyl Queen",
    handle: "@vinylqueen",
    image: "/avatars/vinyl-queen.jpg",
    followers: "10.1K",
    rank: 2,
    genres: ["Techno", "Progressive", "Minimal"],
    stats: {
      mixes: 36,
      likes: "72.8K",
      plays: "280K"
    }
  },
  {
    id: 3,
    name: "Bass Master",
    handle: "@bassmaster",
    image: "/avatars/bass-master.jpg",
    followers: "9.8K",
    rank: 3,
    genres: ["Drum & Bass", "Jungle", "Breakbeat"],
    stats: {
      mixes: 42,
      likes: "68.5K",
      plays: "245K"
    }
  },
  {
    id: 4,
    name: "Groove Theory",
    handle: "@groovetheory",
    image: "/avatars/groove-theory.jpg",
    followers: "8.9K",
    rank: 4,
    genres: ["Funk", "Disco", "House"],
    stats: {
      mixes: 39,
      likes: "61.2K",
      plays: "210K"
    }
  },
  {
    id: 5,
    name: "Trance Runner",
    handle: "@trancerunner",
    image: "/avatars/trance-runner.jpg",
    followers: "8.2K",
    rank: 5,
    genres: ["Trance", "Progressive", "Uplifting"],
    stats: {
      mixes: 45,
      likes: "58.9K",
      plays: "195K"
    }
  }
]

export default function TopDJsPage() {
  return (
    <div className="container max-w-[1500px] py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Top DJs</h1>
          <p className="text-muted-foreground">
            Discover the most popular DJs and their latest mixes
          </p>
        </div>
        
        <DJList djs={mockDJs} />
      </div>
    </div>
  )
} 