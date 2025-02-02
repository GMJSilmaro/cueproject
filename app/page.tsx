"use client";

import { LandingNav } from "@/components/landing/nav";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { DJsSection } from "@/components/landing/djs-section";
import { EventsSection } from "@/components/landing/events-section";
import { BlogSection } from "@/components/landing/blog-section";
import { AboutSection } from "@/components/landing/about-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

// Menu items configuration
const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'DJs', href: '#djs' },
  { name: 'Events', href: '#events' },
  { name: 'Blog', href: '#blog' },
  { name: 'About', href: '#about' },
  { name: 'Pricing', href: '#pricing' }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNav menuItems={menuItems} />
      <div className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <DJsSection />
        <EventsSection />
        <BlogSection />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
