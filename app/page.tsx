'use client'

import { Navigation } from "@/components/common/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MusicalNoteIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  ArrowDownIcon,
  CalendarIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/outline";

// Add this at the top of your component
const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'DJs', href: '/djs' },
  { name: 'Events', href: '/events', icon: CalendarIcon },
  { name: 'Blog', href: '/blog', icon: NewspaperIcon },
  { name: 'Community', href: '/community', icon: ChatBubbleLeftRightIcon },
  { name: 'Resources', href: '/resources', icon: BookOpenIcon },
  { name: 'FAQ', href: '/faq', icon: QuestionMarkCircleIcon },
  { name: 'About Us', href: '/about', icon: RocketLaunchIcon },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden pt-14">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-purple-500/20" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Share Your Sound
              <motion.span 
                className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                with the World
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto"
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
                className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-red-500/20 transform hover:scale-105"
              >
                Start Your Journey
                <ArrowDownIcon className="inline-block w-5 h-5 ml-2 transform group-hover:translate-y-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/dj"
                className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 backdrop-blur-sm transform hover:scale-105"
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
          <ArrowDownIcon className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>


      {/* Testimonials Section */}
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
        
              {/* Define testimonials array once */}
              {(() => {
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

                return (
                  <>
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
                      {testimonials.map((testimonial, index) => (
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
                     
                    </motion.div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-purple-500/10" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Ready to Amplify Your DJ Career?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of DJs who are already growing their careers with us.
              Start your journey today!
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link
                href="/register"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-red-500/20 transform hover:scale-105"
              >
                Get Started Now
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 backdrop-blur-sm transform hover:scale-105"
              >
                Contact Sales
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
