'use client'

import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Events() {
  const events = [
    {
      title: "Summer Bass Festival",
      date: "July 15, 2024",
      location: "Miami Beach",
      attendees: 1200,
      image: "/images/event-1.jpg"
    },
    {
      title: "Electronic Night",
      date: "August 5, 2024",
      location: "New York",
      attendees: 800,
      image: "/images/event-2.jpg"
    },
    // Add more events as needed
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-white mb-8">Upcoming Events</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-neutral-900 rounded-xl overflow-hidden border border-red-500/20"
              >
                <div className="h-48 bg-gradient-to-r from-red-500 to-purple-500" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-400">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <UserGroupIcon className="w-5 h-5 mr-2" />
                      {event.attendees} attending
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Get Tickets
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}