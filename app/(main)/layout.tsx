import { DashboardNav } from "@/components/dashboard/nav";
import { IdleDetector } from '@/components/auth/idle-detector';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <IdleDetector />
      <DashboardNav />
      {children}
    </div>
  );
} 