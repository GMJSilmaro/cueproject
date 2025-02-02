'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserNav } from "@/components/user/user-nav";
import { useSidebarStore } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/providers/theme-toggle";
import { Logo } from "@/components/icons";

export function DashboardNav() {
  const { data: session } = useSession();
  const { isLeftSidebarOpen, toggleLeftSidebar } = useSidebarStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLeftSidebar}
          className={cn(
            "lg:relative lg:left-0 transition-all duration-300 ease-in-out",
            isLeftSidebarOpen ? "lg:translate-x-0" : "lg:-translate-x-2"
          )}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex items-center gap-2 lg:hidden">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-between gap-4">
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <Logo />
          </div>

          <div className="flex-1 max-w-2xl px-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search mixes, DJs, events..."
                className="w-full px-4 py-2 rounded-full bg-muted/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}