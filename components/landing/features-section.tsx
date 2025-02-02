"use client";

import { Code2, Sparkles, Users, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "DJ Community",
      description: "Connect with talented DJs from around the world and grow your network."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Event Management",
      description: "Easily manage your events, bookings, and schedule all in one place."
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Music Library",
      description: "Access and organize your music collection with powerful tools and integrations."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Analytics",
      description: "Track your performance and audience engagement with detailed analytics."
    }
  ];

  return (
    <section id="features" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Platform Features
        </h2>
        <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto">
          Discover what makes CueProject the ultimate platform for DJs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 