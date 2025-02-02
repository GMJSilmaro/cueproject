import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CueProject - DJ Booking Platform",
  description: "Connect with talented DJs and book them for your events.",
  keywords: ["DJ", "Music", "Events", "Booking", "Entertainment"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </ThemeProvider>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
            className: 'text-foreground',
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
