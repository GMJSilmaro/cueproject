'use client'

import { motion } from "framer-motion";
import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      title: "Essential DJ Equipment for Beginners",
      excerpt: "Starting your DJ journey? Here's everything you need to know about essential equipment...",
      date: "March 15, 2024",
      category: "Equipment",
      readTime: "5 min read"
    },
    {
      title: "How to Build Your DJ Brand",
      excerpt: "Building a strong personal brand is crucial for success in the modern DJ landscape...",
      date: "March 10, 2024",
      category: "Marketing",
      readTime: "8 min read"
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-white mb-12">Latest Articles</h1>
          <div className="space-y-12">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border-b border-gray-800 pb-12 last:border-0"
              >
                <div className="space-y-4">
                  <span className="text-red-500 text-sm font-semibold">{post.category}</span>
                  <h2 className="text-2xl font-bold text-white hover:text-red-500 transition-colors duration-200">
                    <Link href="#">{post.title}</Link>
                  </h2>
                  <p className="text-gray-400 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}