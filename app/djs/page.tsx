'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Music2, Calendar, Instagram, Star, Users, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function DJs() {
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
      topTracks: ["Electric Dreams", "Neon Pulse", "Digital Storm"],
      experience: "5+ years",
      specialties: ["Weddings", "Corporate Events", "Clubs"]
    },
    {
      name: "DEV Yobb",
      genre: "Software Engineer",
      image: "/images/djs/Yobb.jpg",
      followers: "100,050",
      rating: 5.0,
      bio: "Full-stack developer specializing in web applications and system architecture",
      upcoming: "0 events",
      instagram: "@its_boramlis",
      topTracks: ["NA"],
      experience: "4+ years",
      specialties: ["Programming", "Software Development", "Web Development"]
    },
    {
      name: "DJ ????",
      genre: "???",
      image: "/images/djs/default.jpg",
      followers: "1",
      rating: 4.8,
      bio: "????",
      upcoming: "????",
      instagram: "????",
      topTracks: ["????", "????", "????"],
      experience: "????",
      specialties: ["????", "????", "????"]
    },
    {
      name: "DJ ????",
      genre: "???",
      image: "/images/djs/default.jpg",
      followers: "1",
      rating: 4.8,
      bio: "????",
      upcoming: "????",
      instagram: "????",
      topTracks: ["????", "????", "????"],
      experience: "????",
      specialties: ["????", "????", "????"]
    },
    {
      name: "DJ ????",
      genre: "???",
      image: "/images/djs/default.jpg",
      followers: "1",
      rating: 4.8,
      bio: "????",
      upcoming: "????",
      instagram: "????",
      topTracks: ["????", "????", "????"],
      experience: "????",
      specialties: ["????", "????", "????"]
    },
    {
      name: "DJ ????",
      genre: "???",
      image: "/images/djs/default.jpg",
      followers: "1",
      rating: 4.8,
      bio: "????",
      upcoming: "????",
      instagram: "????",
      topTracks: ["????", "????", "????"],
      experience: "????",
      specialties: ["????", "????", "????"]
    },
    {
      name: "DJ ????",
      genre: "???",
      image: "/images/djs/default.jpg",
      followers: "1",
      rating: 4.8,
      bio: "????",
      upcoming: "????",
      instagram: "????",
      topTracks: ["????", "????", "????"],
      experience: "????",
      specialties: ["????", "????", "????"]
    },
    {
      name: "DJ ????",
      genre: "???",
      image: "/images/djs/default.jpg",
      followers: "1",
      rating: 4.8,
      bio: "????",
      upcoming: "????",
      instagram: "????",
      topTracks: ["????", "????", "????"],
      experience: "????",
      specialties: ["????", "????", "????"]
    },
  ];

  const genres = ["All", ...new Set(djs.map(dj => dj.genre))];
  
  const filteredDJs = djs.filter(dj => {
    const matchesSearch = dj.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || dj.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-black to-neutral-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 animate-gradient" />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Featured DJs
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover and book the most talented DJs for your next event. From weddings to corporate events, find the perfect match for your occasion.
            </p>
          </motion.div>

          {/* Search Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search DJs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all border border-gray-700"
              />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full md:w-48 px-4 py-3 bg-neutral-800/50 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all border border-gray-700"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* DJs Grid */}
      <div className="container mx-auto px-10 pb-10 mt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDJs.map((dj, index) => (
            <motion.div
              key={dj.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-neutral-800/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-gray-800/50 hover:border-red-500/50 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative h-[320px] w-full overflow-hidden">
                <Image
                  src={dj.image}
                  alt={`${dj.name} profile`}
                  fill
                  className="object-cover object-[center_15%] transform group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full text-sm text-white border border-red-500/20">
                    {dj.genre}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-sm text-white border border-purple-500/20">
                    {dj.experience}
                  </span>
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{dj.name}</h3>
                    <p className="text-gray-400 text-sm">{dj.bio}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full">
                    <Users size={14} className="text-red-500" />
                    <span className="text-red-500 text-sm">{dj.followers}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Music2 size={16} className="text-red-500" />
                    <span className="text-sm">Top track: {dj.topTracks[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} className="text-purple-500" />
                    <span className="text-sm">{dj.upcoming}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Instagram size={16} className="text-pink-500" />
                    <span className="text-sm">{dj.instagram}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {dj.specialties.map((specialty, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-neutral-700/50 rounded-full text-gray-300">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-medium">{dj.rating}</span>
                    </div>
                    {dj.genre === "Software Engineer" ? (
                      <button 
                        disabled
                        className="px-6 py-2 bg-gray-600 text-gray-400 rounded-xl cursor-not-allowed flex items-center gap-2"
                      >
                        <span>Unavailable</span>
                      </button>
                    ) : (
                      <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 group">
                        <span>Book Now</span>
                        <TrendingUp size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
}