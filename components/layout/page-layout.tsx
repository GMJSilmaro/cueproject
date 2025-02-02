'use client';

import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  showLeft?: boolean;
  showRight?: boolean;
  onSidebarChange?: (show: boolean) => void;
}

export function PageLayout({
  children,
  leftSidebar,
  rightSidebar,
  showLeft = true,
  showRight = true,
  onSidebarChange,
}: PageLayoutProps) {
  // Handle backdrop click
  const handleBackdropClick = () => {
    if (onSidebarChange) {
      onSidebarChange(false);
    }
  };

  return (
    <div className="flex-1 flex relative">
      {/* Left Sidebar - Navigation */}
      {leftSidebar && (
        <aside 
          className={cn(
            "fixed lg:relative w-[280px] h-[calc(100vh-3.5rem)] top-14 lg:top-0 overflow-y-auto bg-background border-r z-30",
            "transition-all duration-300 ease-in-out transform",
            !showLeft && "-translate-x-[280px] lg:w-0 lg:min-w-0 lg:border-r-0 lg:opacity-0",
            showLeft && "translate-x-0 opacity-100"
          )}
        >
          <div className="opacity-100 transition-opacity duration-300 ease-in-out p-4">
            {leftSidebar}
          </div>
        </aside>
      )}
      
      {/* Main Content */}
      <main className={cn(
        "flex-1 min-w-0 w-full",
        "transition-all duration-300 ease-in-out transform",
        showLeft && "lg:pl-0",
        !showLeft && "lg:pl-0"
      )}>
        <div className="w-full h-full">
          <div className="flex flex-col xl:flex-row gap-4 xl:gap-8">
            {/* Center Content */}
            <div className="flex-1 min-w-0 py-4 px-4 sm:py-6 sm:px-6">
              {children}
            </div>
            
            {/* Desktop Right Sidebar - Trending */}
            {rightSidebar && (
              <aside className={cn(
                "hidden xl:block w-[336px] flex-shrink-0 h-[calc(100vh-3.5rem)] overflow-y-auto border-l py-4 xl:py-6",
                "transition-all duration-300 ease-in-out transform",
                !showRight && "opacity-0 translate-x-full",
                showRight && "opacity-100 translate-x-0"
              )}>
                <div className="px-4">
                  {rightSidebar}
                </div>
              </aside>
            )}
          </div>

          {/* Mobile Trending Section - Inline */}
          {rightSidebar && (
            <div className="xl:hidden px-4 py-6 border-t">
              {rightSidebar}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Backdrop with click handler */}
      {(showLeft && leftSidebar) && (
        <div 
          onClick={handleBackdropClick}
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden z-20",
            "transition-all duration-300 ease-in-out",
            "animate-in fade-in"
          )}
        />
      )}
    </div>
  );
} 