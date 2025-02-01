// components/NavigationLink.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  href: string;
  label: string;
}

export function NavigationLink({ href, label }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md",
        "sm:px-4 sm:py-3 sm:text-base",
        "transition-colors duration-300 ease-in-out",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}