'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  Music2, 
  Calendar, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Bell,
  Heart,
  Clock,
  Check,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "message",
    title: "New Message",
    content: "DJ Beats sent you a message",
    time: "2m ago",
    read: false,
    link: "/dashboard/messages",
    color: "text-primary",
    icon: MessageCircle
  },
  {
    id: 2,
    type: "like",
    title: "Mix Liked",
    content: "Vinyl Queen liked your latest mix",
    time: "1h ago",
    read: false,
    link: "/dashboard/mixes",
    color: "text-primary",
    icon: Heart
  },
  {
    id: 3,
    type: "event",
    title: "Event Reminder",
    content: "Club Night starts in 2 hours",
    time: "2h ago",
    read: true,
    link: "/dashboard/events",
    color: "text-foreground",
    icon: Clock
  }
];

export function UserNav() {
  const { data: session } = useSession();
  const user = session?.user;
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex items-center gap-4">
      {/* Notifications Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-muted/50 -mr-2 px-2"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[320px] p-0" align="end">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium">Notifications</span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="text-xs text-primary font-medium">{unreadCount} new</span>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={markAllAsRead}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={clearNotifications}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DropdownMenuSeparator className="m-0" />
          <div className="px-3 py-2 flex items-center gap-2 border-b border-border">
            <Badge 
              variant={filter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('all')}
            >
              All
            </Badge>
            <Badge 
              variant={filter === 'unread' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('unread')}
            >
              Unread
            </Badge>
            <Badge 
              variant={filter === 'read' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('read')}
            >
              Read
            </Badge>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No notifications to show
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <DropdownMenuItem key={notification.id} asChild>
                    <Link 
                      href={notification.link} 
                      className={cn(
                        "px-3 py-2 flex gap-3 cursor-pointer hover:bg-muted/50 focus:bg-muted/50",
                        !notification.read && "bg-muted/30"
                      )}
                    >
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        !notification.read ? "bg-primary/10" : "bg-muted",
                      )}>
                        <Icon className={cn(
                          "h-4 w-4",
                          !notification.read ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <div className="flex items-start gap-1.5">
                          <span className={cn(
                            "text-sm font-medium leading-none",
                            notification.color
                          )}>
                            {notification.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">
                            · {notification.time}
                          </span>
                        </div>
                        <span className="text-[13px] text-muted-foreground truncate">
                          {notification.content}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })
            )}
          </div>
          <DropdownMenuSeparator className="m-0" />
          <Link 
            href="/dashboard/notifications" 
            className="block px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            View all notifications
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/mixes" className="flex items-center cursor-pointer">
                <Music2 className="mr-2 h-4 w-4" />
                <span>My Mixes</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/events" className="flex items-center cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Events</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/messages" className="flex items-center cursor-pointer">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>Messages</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-red-600 dark:text-red-400 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 