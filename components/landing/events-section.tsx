"use client";

import { Calendar, Clock, MapPin, Music2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function EventsSection() {
  const events = [
    {
      title: "Summer Beach Party",
      date: "2024-07-15",
      time: "18:00 - 23:00",
      location: "Miami Beach",
      genre: "House & EDM",
      image: "/images/events/beach-party.jpg",
      dj: "DJ Miko"
    },
    {
      title: "Club Night Special",
      date: "2024-07-20",
      time: "22:00 - 04:00",
      location: "Club XYZ",
      genre: "Electronic",
      image: "/images/events/club-night.jpg",
      dj: "DJ Miko"
    },
    {
      title: "Rooftop Sunset Sessions",
      date: "2024-07-25",
      time: "17:00 - 22:00",
      location: "Sky Lounge",
      genre: "Deep House",
      image: "/images/events/rooftop.jpg",
      dj: "DJ Miko"
    }
  ];

  return (
    <section id="events" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Upcoming Events
        </h2>
        <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto">
          Discover upcoming DJ events and performances
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border hover:border-primary transition-all duration-300"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music2 className="h-4 w-4" />
                    <span>{event.genre}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Featuring: <span className="font-medium text-foreground">{event.dj}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 