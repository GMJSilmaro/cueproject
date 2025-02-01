'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'DJs', href: '/djs' },
    { name: 'Events', href: '/events' },
    { name: 'Membership', href: '/membership' },
  ];

  const userNavigation = session?.user.role === 'DJ' 
    ? [
        { name: 'Profile', href: '/dj/profile' },
        { name: 'Mixes', href: '/dj/mixes' },
      ]
    : session?.user.role === 'ADMIN'
    ? [
        { name: 'Members', href: '/admin/members' },
        { name: 'Settings', href: '/admin/settings' },
      ]
    : [];

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-2xl font-bold text-red-600">
                CueProject
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-b-2 border-red-500 text-gray-900'
                      : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => signOut()}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
} 