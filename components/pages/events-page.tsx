'use client';

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Music, Plus } from "lucide-react";

// Mock data - Replace with real data from your API
const upcomingEvents = [
  {
    id: 1,
    title: "Summer House Festival",
    description: "The biggest house music festival of the summer featuring top DJs from around the world.",
    date: "2024-07-15",
    time: "14:00 - 23:00",
    location: "Beachfront Arena, Miami",
    coverImage: "https://picsum.photos/seed/event1/800/400",
    attendees: 1250,
    djs: [
      {
        name: "DJ Sarah Chen",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      {
        name: "Mike Rodriguez",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
    ],
    price: "$49.99",
    genre: "House",
  },
  {
    id: 2,
    title: "Techno Underground",
    description: "An underground techno experience in a unique industrial setting.",
    date: "2024-07-20",
    time: "22:00 - 06:00",
    location: "The Warehouse, Downtown",
    coverImage: "https://picsum.photos/seed/event2/800/400",
    attendees: 800,
    djs: [
      {
        name: "Emma Wilson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      },
    ],
    price: "$35.00",
    genre: "Techno",
  },
];

export function EventsPageContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-500">Discover and book the hottest DJ events</p>
          </div>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="relative aspect-video">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                <div className="absolute top-4 right-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.genre}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{event.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center -space-x-2">
                      {event.djs.map((dj) => (
                        <Avatar key={dj.name} className="border-2 border-white">
                          <AvatarImage src={dj.image} alt={dj.name} />
                          <AvatarFallback>{dj.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      <div className="ml-4">
                        <p className="text-sm font-medium">Featured DJs</p>
                        <p className="text-xs text-gray-500">{event.djs.map(dj => dj.name).join(', ')}</p>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                      Book {event.price}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 