import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, Users, Music, Clock, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - Replace with real data from your API
const events = [
  {
    id: 1,
    title: "Summer House Festival",
    description: "The biggest house music festival of the summer featuring top DJs from around the world.",
    coverImage: "https://picsum.photos/seed/event1/800/400",
    date: "2024-07-15",
    time: "14:00",
    location: "Sunset Beach Club, Miami",
    price: "$49.99",
    attendees: 1250,
    lineup: [
      {
        name: "DJ Sarah Chen",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      {
        name: "Mike Rodriguez",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
      {
        name: "Emma Wilson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      },
    ],
  },
  {
    id: 2,
    title: "Techno Underground",
    description: "A night of pure techno in an underground warehouse venue with state-of-the-art sound system.",
    coverImage: "https://picsum.photos/seed/event2/800/400",
    date: "2024-08-20",
    time: "22:00",
    location: "The Warehouse, Brooklyn",
    price: "$35.00",
    attendees: 800,
    lineup: [
      {
        name: "David Kim",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      {
        name: "Lisa Thompson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      },
    ],
  },
  {
    id: 3,
    title: "Progressive Dreams",
    description: "An immersive journey through progressive house and melodic techno.",
    coverImage: "https://picsum.photos/seed/event3/800/400",
    date: "2024-09-10",
    time: "20:00",
    location: "Dreamscape Club, Los Angeles",
    price: "$40.00",
    attendees: 600,
    lineup: [
      {
        name: "James Wilson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      },
      {
        name: "Alex Thompson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
    ],
  },
];

export default async function EventsPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
            <p className="text-gray-500">Discover and join the hottest electronic music events</p>
          </div>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
            <Calendar className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="relative aspect-[2/1] group">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                <div className="absolute top-4 right-4">
                  <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {event.price}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{event.description}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {event.lineup.map((dj) => (
                        <Avatar key={dj.name} className="ring-2 ring-white">
                          <AvatarImage src={dj.image} alt={dj.name} />
                          <AvatarFallback>{dj.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      <div className="pl-4 text-sm text-gray-500">
                        <Music className="h-4 w-4 inline mr-1" />
                        {event.lineup.length} DJs
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees} attending
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                    <Ticket className="mr-2 h-4 w-4" />
                    Get Tickets
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 