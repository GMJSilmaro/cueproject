"use client";

import { CalendarDays, Clock, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function BlogSection() {
  const posts = [
    {
      title: "The Evolution of Electronic Dance Music",
      excerpt: "Explore the history and development of EDM from its roots to modern day.",
      date: "2024-02-01",
      readTime: "5 min read",
      author: "DJ Miko",
      image: "/images/blog/edm-evolution.jpg",
      category: "Music History"
    },
    {
      title: "Essential DJ Equipment for Beginners",
      excerpt: "A comprehensive guide to the must-have gear for aspiring DJs.",
      date: "2024-02-05",
      readTime: "8 min read",
      author: "DEV Yobb",
      image: "/images/blog/dj-equipment.jpg",
      category: "Equipment"
    },
    {
      title: "Mastering the Art of Beat Matching",
      excerpt: "Learn the fundamental techniques of seamless track transitions.",
      date: "2024-02-10",
      readTime: "6 min read",
      author: "DJ Miko",
      image: "/images/blog/beat-matching.jpg",
      category: "Techniques"
    }
  ];

  return (
    <section id="blog" className="py-32 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative overflow-hidden border-t">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
          Latest Blog Posts
        </h2>
        <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto">
          Stay updated with the latest news, tips, and insights from the DJ world
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-300"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
} 