'use client';

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "This platform has completely transformed how I connect with my audience. The analytics tools are invaluable!",
    author: "DJ Maxwell",
    role: "House Music DJ",
    location: "London, UK"
  },
  {
    quote: "The best platform for DJs to showcase their work. The community here is incredibly supportive and engaging.",
    author: "Sarah Beats",
    role: "EDM Producer",
    location: "Berlin, DE"
  },
  {
    quote: "From booking gigs to growing my fanbase, this platform has been instrumental in my success.",
    author: "DJ Phoenix",
    role: "Tech House DJ",
    location: "Miami, US"
  },
  {
    quote: "The networking opportunities here are unmatched. I've collaborated with amazing artists worldwide.",
    author: "Bass Queen",
    role: "Drum & Bass DJ",
    location: "Amsterdam, NL"
  },
  {
    quote: "Outstanding platform for both emerging and established DJs. The features are exactly what we need.",
    author: "Mike Rhythm",
    role: "Progressive House DJ",
    location: "Sydney, AU"
  },
  {
    quote: "The event management tools have made organizing my gigs so much easier. Highly recommended!",
    author: "Luna Groove",
    role: "Techno DJ",
    location: "Barcelona, ES"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
            What DJs Are Saying
          </h2>
          
          <div className="relative">
            <motion.div 
              className="flex gap-6 py-4"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.author}
                  className="min-w-[400px] bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-white">{testimonial.author}</h4>
                      <p className="text-red-400">{testimonial.role}</p>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Duplicate for seamless loop */}
            <motion.div 
              className="flex gap-6 py-4"
              animate={{
                x: [-1920, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={`duplicate-${testimonial.author}`}
                  className="min-w-[400px] bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-white">{testimonial.author}</h4>
                      <p className="text-red-400">{testimonial.role}</p>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 