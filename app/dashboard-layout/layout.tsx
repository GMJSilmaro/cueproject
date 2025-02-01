// app/(dashboard)/layout.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/nav/dashboard-nav";
import { UserNav } from "@/components/nav/user-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { Logo } from "@/components/common/logo";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-gray-50 border-r">
        <div className="p-6">
          <Logo />
        </div>
        <div className="px-4 flex-1">
          <DashboardNav />
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden fixed inset-x-0 top-0 z-50 h-16 bg-white border-b">
        <div className="flex items-center justify-between px-4 h-full">
          <Logo />
          <MobileNav />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72 flex-1">
        {/* Top navigation */}
        <div className="hidden lg:flex lg:h-16 lg:items-center lg:justify-end lg:px-8 lg:border-b bg-white">
          <UserNav />
        </div>

        {/* Page content */}
        <main className="py-6">
          {children}
        </main>
      </div>
    </div>
  );
}