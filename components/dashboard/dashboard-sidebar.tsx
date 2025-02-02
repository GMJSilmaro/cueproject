'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Music2,
  Calendar,
  Users,
  MessageCircle,
  Settings,
  Headphones,
  TrendingUp,
  Star,
  Radio,
  Video,
} from "lucide-react";

const navigationItems = [
  {
    title: "Feed",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "My Mixes",
    icon: Music2,
    href: "/dashboard/mixes",
  },
  {
    title: "Live Streams",
    icon: Radio,
    href: "/dashboard/livestreams",
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/dashboard/events",
  },
  {
    title: "Community",
    icon: Users,
    href: "/dashboard/community",
  },
  {
    title: "Messages",
    icon: MessageCircle,
    href: "/dashboard/messages",
  },
];

const quickLinks = [
  {
    title: "Trending",
    icon: TrendingUp,
    href: "/dashboard/trending",
  },
  {
    title: "Top DJs",
    icon: Star,
    href: "/dashboard/top-djs",
  },
  {
    title: "Genres",
    icon: Headphones,
    href: "/dashboard/genres",
  },
  {
    title: "Go Live",
    icon: Video,
    href: "/dashboard/livestreams/setup",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },


];

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("space-y-6 py-2", className)}>
      <nav className="space-y-1">
        {navigationItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-muted"
            )}
          >
            <Link href={item.href}>
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </Link>
          </Button>
        ))}
      </nav>

      <div className="h-px bg-border" />

      <div>
        <h4 className="px-2 mb-2 text-sm font-semibold">Quick Links</h4>
        <nav className="space-y-1">
          {quickLinks.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-muted"
              )}
            >
              <Link href={item.href}>
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
} 