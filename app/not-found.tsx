import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight text-muted-foreground">Page Not Found</h2>
        </div>
        
        <p className="max-w-[600px] text-muted-foreground">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Need help? <Link href="/contact" className="underline underline-offset-4 hover:text-primary">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
} 