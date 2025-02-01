'use client'

import Link from "next/link";
import { Logo } from "./logo";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';

interface NavigationProps {
  excludePaths?: string[];
}

export function Navigation({ excludePaths = [] }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Check if current path should be excluded
  const shouldExclude = excludePaths.some(path => pathname?.startsWith(path));

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted || shouldExclude) return null;

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center h-24">
              <Link href="/" className="flex items-center">
                <Logo width={250} height={100} />
              </Link>
            </div>


            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/#features">Features</NavLink>
              <NavLink href="/#pricing">Pricing</NavLink>
              <NavLink href="/dj">DJs</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-red-500 px-4 py-2.5 transition-all duration-200 hover:scale-105 text-base"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-red-500/20 hover:scale-105 text-base"
              >
                Get Started
              </Link>
            </div>

            <button className="md:hidden p-2.5 rounded-lg hover:bg-white/10 text-white transition-colors duration-200">
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center h-24"
          >
            <Link href="/" className="flex items-center">
              <Logo width={100} height={100} className="object-contain" />
            </Link>
          </motion.div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/#pricing">Pricing</NavLink>
            <NavLink href="/dj">DJs</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-red-500 px-4 py-2.5 transition-all duration-200 hover:scale-105 text-base"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-red-500/20 hover:scale-105 text-base"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-lg hover:bg-white/10 text-white transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-1"
            >
              <div className="py-3 border-t border-white/10 bg-black/95 backdrop-blur-lg rounded-lg">
                <div className="flex flex-col space-y-2">
                  <MobileNavLink href="/#features" onClick={() => setMobileMenuOpen(false)}>
                    Features
                  </MobileNavLink>
                  <MobileNavLink href="/#pricing" onClick={() => setMobileMenuOpen(false)}>
                    Pricing
                  </MobileNavLink>
                  <MobileNavLink href="/dj" onClick={() => setMobileMenuOpen(false)}>
                    DJs
                  </MobileNavLink>
                  <div className="pt-2 flex flex-col space-y-2 px-3">
                    <Link
                      href="/login"
                      className="text-gray-300 hover:text-red-500 px-4 py-2.5 transition-all duration-200 rounded-lg hover:bg-white/5 text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-lg text-center hover:from-red-700 hover:to-red-800 transition-all duration-200 text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-300 hover:text-red-500 transition-all duration-200 hover:scale-105 relative group text-base font-medium"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full" />
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-red-500 px-4 py-2.5 transition-all duration-200 hover:bg-white/5 text-base"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 