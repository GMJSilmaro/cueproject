'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
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
  );
} 