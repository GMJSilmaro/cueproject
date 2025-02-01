'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import {
  LayoutDashboard,
  Music,
  Calendar,
  Settings,
  LogOut,
  Headphones,
  Users,
  TrendingUp,
  Bell,
  Disc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserNav() {
  const { data: session } = useSession();
  const userImage = session?.user?.image || undefined;
  const userName = session?.user?.name || 'User';
  const userEmail = session?.user?.email;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 [&_*]:!overflow-visible">
      <div className="container mx-auto flex h-16 items-center justify-between px-8 max-w-[1400px]">
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="relative">
              <Disc className="h-8 w-8 text-red-500 transition-transform group-hover:scale-110 animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-0 animate-ping-slow rounded-full bg-red-500/20" />
            </div>
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-xl font-bold text-transparent">
              CueProject
            </span>
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/dashboard/mixes">
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                <Music className="mr-2 h-4 w-4" />
                Mixes
              </Button>
            </Link>
            <Link href="/dashboard/events">
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </Button>
            </Link>
            <Link href="/dashboard/trending">
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </Button>
            </Link>
            <Link href="/dashboard/community">
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                <Users className="mr-2 h-4 w-4" />
                Community
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center focus:outline-none">
              <Avatar className="h-8 w-8 ring-2 ring-red-500/20 hover:ring-red-500/40 transition-all">
                <AvatarImage src={userImage || '/avatars/default.png'} alt={userName} />
                <AvatarFallback className="bg-red-100 text-red-600">
                  {userName?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-4 py-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-red-500/20">
                      <AvatarImage src={userImage || '/avatars/default.png'} alt={userName} />
                      <AvatarFallback className="bg-red-100 text-red-600">
                        {userName?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      {userEmail && (
                        <p className="text-xs text-gray-500 truncate max-w-[180px]">
                          {userEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/dj/profile"
                        className={`${
                          active ? 'bg-red-50 text-red-600' : 'text-gray-700'
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors`}
                      >
                        <Headphones className="mr-2 h-4 w-4" />
                        DJ Profile
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/settings"
                        className={`${
                          active ? 'bg-red-50 text-red-600' : 'text-gray-700'
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors`}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                </div>

                <div className="px-2 py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className={`${
                          active ? 'bg-red-50 text-red-600' : 'text-red-600'
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors`}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
} 