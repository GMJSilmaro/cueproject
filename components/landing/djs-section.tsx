"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Music2, Calendar, Instagram, Star } from "lucide-react";
import Image from "next/image";

export function DJsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const djs = [
    {
      name: "DJ Miko",
      genre: "Electronic",
      image: "/images/djs/Miko.png",
      followers: "1",
      rating: 4.8,
      bio: "Known for electrifying sets and unique sound design",
      upcoming: "3 events",
      instagram: "@djmiko",
      experience: "5+ years",
      specialties: ["Weddings", "Corporate Events", "Clubs"]
    },
    {
      name: "DEV Yobb",
      genre: "Software Engineer",
      image: "/images/djs/Yobb.jpg",
      followers: "100,050",
      rating: 5.0,
      bio: "Full-stack developer specializing in web applications",
      upcoming: "0 events",
      instagram: "@its_boramlis",
      experience: "4+ years",
      specialties: ["Programming", "Software Development", "Web Development"]
    },
    {
      name: "DJ Nova",
      genre: "House",
      image: "/images/djs/default.jpg",
      followers: "500",
      rating: 4.7,
      bio: "Rising star in the house music scene",
      upcoming: "2 events",
      instagram: "@djnova",
      experience: "2+ years",
      specialties: ["House Music", "Club Events", "Private Parties"]
    },
    {
      name: "DJ Pulse",
      genre: "Techno",
      image: "/images/djs/default.jpg",
      followers: "750",
      rating: 4.6,
      bio: "Techno specialist with a unique underground sound",
      upcoming: "1 event",
      instagram: "@djpulse",
      experience: "3+ years",
      specialties: ["Techno", "Warehouse Events", "Music Production"]
    },
    {
      name: "DJ Echo",
      genre: "Trance",
      image: "/images/djs/default.jpg",
      followers: "600",
      rating: 4.5,
      bio: "Trance music enthusiast creating euphoric experiences",
      upcoming: "2 events",
      instagram: "@djecho",
      experience: "4+ years",
      specialties: ["Trance", "Festivals", "Live Streaming"]
    }
  ];

  const genres = ["All", ...new Set(djs.map(dj => dj.genre))];
  
  const filteredDJs = djs.filter(dj => {
    const matchesSearch = dj.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || dj.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <section id="djs" className="py-32 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative overflow-hidden border-t">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
          Featured DJs
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover talented DJs from around the world
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search DJs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDJs.map((dj, index) => (
            <motion.div
              key={dj.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-colors duration-300"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={dj.image}
                  alt={dj.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{dj.name}</h3>
                  <span className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {dj.rating}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{dj.bio}</p>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <Music2 className="h-4 w-4 mr-1" />
                    {dj.genre}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {dj.upcoming}
                  </span>
                  <span className="flex items-center">
                    <Instagram className="h-4 w-4 mr-1" />
                    {dj.instagram}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dj.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 