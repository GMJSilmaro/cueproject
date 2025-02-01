'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { MusicalNoteIcon, UserGroupIcon, ChartBarIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
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

      {/* Features Section */}
      <section id="features" className="py-32 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
              Everything You Need to Succeed
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              {[
                {
                  icon: MusicalNoteIcon,
                  title: "Professional Profile",
                  description: "Create your professional DJ profile, showcase your work, and build your brand."
                },
                {
                  icon: UserGroupIcon,
                  title: "Growing Community",
                  description: "Connect with other DJs, share experiences, and grow together."
                },
                {
                  icon: ChartBarIcon,
                  title: "Analytics & Insights",
                  description: "Track your growth with detailed analytics and audience insights."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="mb-6 p-6 bg-gradient-to-br from-black/80 to-black/40 rounded-xl group-hover:from-red-950/80 group-hover:to-red-900/40 transition-colors duration-500 border border-red-500/20 transform group-hover:scale-105">
                    <feature.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
              Choose Your Plan
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="group bg-neutral-900/80 backdrop-blur-sm p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Free</h3>
                <p className="text-4xl font-bold mb-8 text-white">$0<span className="text-lg text-gray-400">/mo</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2 text-red-500">✓</span> Basic DJ profile
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2 text-red-500">✓</span> Up to 3 mixes
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2 text-red-500">✓</span> Community access
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full py-3 px-4 rounded-lg text-center font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 transform group-hover:scale-105"
                >
                  Get Started
                </Link>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative group transform hover:scale-105 transition-all duration-500"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-black p-8 rounded-xl">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Pro</h3>
                  <p className="text-4xl font-bold mb-8 text-white">$9.99<span className="text-lg text-red-200">/mo</span></p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-white">
                      <span className="mr-2">✓</span> Enhanced DJ profile
                    </li>
                    <li className="flex items-center text-white">
                      <span className="mr-2">✓</span> Unlimited mixes
                    </li>
                    <li className="flex items-center text-white">
                      <span className="mr-2">✓</span> Analytics dashboard
                    </li>
                    <li className="flex items-center text-white">
                      <span className="mr-2">✓</span> Priority support
                    </li>
                  </ul>
                  <Link
                    href="/register"
                    className="block w-full py-3 px-4 rounded-lg text-center font-semibold bg-white text-red-600 hover:bg-gray-100 transition-all duration-200 transform group-hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>

              {/* Premium Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="group bg-neutral-900/80 backdrop-blur-sm p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Premium</h3>
                <p className="text-4xl font-bold mb-8 text-white">$19.99<span className="text-lg text-gray-400">/mo</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2 text-red-500">✓</span> Custom branding
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2 text-red-500">✓</span> Unlimited everything
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2 text-red-500">✓</span> Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2 text-red-500">✓</span> 24/7 support
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full py-3 px-4 rounded-lg text-center font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 transform group-hover:scale-105"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
