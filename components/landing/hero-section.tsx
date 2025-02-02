'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden pt-14">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Share Your Sound
            <motion.span 
              className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              with the World
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            The ultimate platform for DJs to showcase their talent, connect with fans,
            and grow their audience.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link
              href="/register"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-primary/20 transform hover:scale-105"
            >
              Start Your Journey
              <ArrowDownIcon className="inline-block w-5 h-5 ml-2 transform group-hover:translate-y-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/djs"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm transform hover:scale-105"
            >
              Explore DJs
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <ArrowDownIcon className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
} 