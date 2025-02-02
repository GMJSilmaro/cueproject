"use client";

import { motion } from "framer-motion";
import { Heart, Music, Users, Zap } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "1,000+",
      label: "Active DJs"
    },
    {
      icon: <Music className="h-6 w-6" />,
      value: "5,000+",
      label: "Events Hosted"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      value: "50,000+",
      label: "Happy Clients"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      value: "24/7",
      label: "Support"
    }
  ];

  const team = [
    {
      name: "DJ Miko",
      role: "Lead DJ & Music Director",
      image: "/images/djs/Miko.png",
      bio: "Professional DJ with over 5 years of experience in the industry."
    },
    {
      name: "DEV Yobb",
      role: "Lead Developer",
      image: "/images/djs/Yobb.jpg",
      bio: "Full-stack developer with a passion for creating innovative solutions."
    }
  ];

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          About CueProject
        </h2>
        <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto">
          Empowering DJs and creating unforgettable music experiences
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground">
              At CueProject, we're on a mission to revolutionize the DJ industry by providing
              a comprehensive platform that connects talented DJs with event organizers and music
              enthusiasts. We believe in the power of music to bring people together and create
              memorable experiences.
            </p>
            <p className="text-muted-foreground">
              Our platform is designed to streamline the booking process, provide professional
              tools for DJs, and ensure exceptional experiences for event organizers and attendees
              alike.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 text-primary">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold text-center mb-12">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-6 p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 