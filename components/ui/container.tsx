import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div 
      className={cn(
        "mx-auto w-full max-w-[1300px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 