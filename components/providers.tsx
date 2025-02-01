'use client'

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import { Navigation } from "@/components/common/navigation"
import { Footer } from "@/components/common/footer"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navigation excludePaths={['/login', '/register', '/dashboard']} />
      <main className="flex-1">
        {children}
      </main>
      <Footer excludePaths={['/login', '/register', '/dashboard']} />
      <Toaster position="top-center" />
    </SessionProvider>
  )
} 