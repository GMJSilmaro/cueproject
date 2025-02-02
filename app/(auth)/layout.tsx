'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side with background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-red-600 to-red-900 dark:from-red-900 dark:to-red-950">
        <div className="absolute inset-0">
          <Image
            src="/images/login-bg.jpg"
            alt="DJ Background"
            fill
            className="object-cover opacity-25 dark:opacity-15"
            priority
          />
        </div>
        <div className="relative z-20 flex flex-col justify-between w-full p-12">
          <div className="flex items-center space-x-3">
            <Image 
              src="/images/cueprojectLogo.png" 
              alt="Cue Project Logo" 
              width={40} 
              height={40}
              className="dark:invert" 
            />
          </div>
          <div className="space-y-6">
            <blockquote className="space-y-2">
              <p className="text-2xl font-medium text-white">
                "Connect with talented DJs, discover new music, and book amazing events - all in one place."
              </p>
              <footer className="text-lg text-white/80">
                Join our growing community of music lovers
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="w-full max-w-md space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 