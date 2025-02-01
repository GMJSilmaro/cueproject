 'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Music, Calendar, TrendingUp, Users } from "lucide-react";

const routes = [
  {
    label: "Feed",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Mixes",
    icon: Music,
    href: "/dashboard/mixes",
    color: "text-violet-500",
  },
  {
    label: "Events",
    icon: Calendar,
    href: "/dashboard/events",
    color: "text-pink-700",
  },
  {
    label: "Trending",
    icon: TrendingUp,
    href: "/dashboard/trending",
    color: "text-orange-700",
  },
  {
    label: "Community",
    icon: Users,
    href: "/dashboard/community",
    color: "text-emerald-500",
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`
            text-sm group flex p-3 w-full justify-start font-medium cursor-pointer 
            hover:text-red-600 hover:bg-red-100/50 rounded-lg transition
            ${pathname === route.href ? "text-red-600 bg-red-100" : "text-gray-600"}
          `}
        >
          <div className="flex items-center flex-1">
            <route.icon className={`h-5 w-5 mr-3 ${pathname === route.href ? "text-red-600" : "text-gray-400"}`} />
            {route.label}
          </div>
        </Link>
      ))}
    </div>
  );
}