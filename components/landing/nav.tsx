"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/providers/theme-toggle";
import { usePathname } from "next/navigation";

interface MenuItem {
  name: string;
  href: string;
}

interface LandingNavProps {
  menuItems: MenuItem[];
}

export function LandingNav({ menuItems }: LandingNavProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Function to handle smooth scrolling
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link 
            href="#" 
            className="flex items-center"
            onClick={(e) => handleScroll(e, '#hero')}
          >
            <div className="w-[150px] h-[50px] relative">
              <Image
                src="/images/djs/cueprojectLogo.png"
                alt="CueProject Logo"
                fill
                sizes="150px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`text-base font-medium transition-colors duration-300 hover:text-primary`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <Button 
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 rounded-full transition-colors duration-300"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                asChild
                size="lg"
                className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button 
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 