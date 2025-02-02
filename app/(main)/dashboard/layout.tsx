'use client';

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { TrendingSidebar } from "@/components/dashboard/trending-sidebar";
import { PageLayout } from "@/components/layout/page-layout";
import { useSidebarStore } from "@/store/use-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { 
    isLeftSidebarOpen, 
    isRightSidebarOpen, 
    setLeftSidebar 
  } = useSidebarStore();

  const handleSidebarChange = (show: boolean) => {
    setLeftSidebar(show);
  };

  return (
    <PageLayout
      leftSidebar={
        <div className="py-4">
          <DashboardSidebar />
        </div>
      }
      rightSidebar={
        <div className="py-4 pl-4">
          <TrendingSidebar />
        </div>
      }
      showLeft={isLeftSidebarOpen}
      showRight={isRightSidebarOpen}
      onSidebarChange={handleSidebarChange}
    >
      {children}
    </PageLayout>
  );
}