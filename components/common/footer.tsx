'use client';

import { usePathname } from 'next/navigation';

interface FooterProps {
  excludePaths?: string[];
}

export function Footer({ excludePaths = [] }: FooterProps) {
  const pathname = usePathname();
  
  if (excludePaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CueProject. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 