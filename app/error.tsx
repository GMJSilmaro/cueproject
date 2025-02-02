'use client';

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Oops!</h1>
          <h2 className="text-2xl font-semibold tracking-tight text-muted-foreground">Something went wrong</h2>
        </div>
        
        <p className="max-w-[600px] text-muted-foreground">
          We apologize for the inconvenience. An unexpected error occurred while processing your request.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button onClick={() => reset()} variant="default">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Back to Home
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>If the problem persists, please <a href="/contact" className="underline underline-offset-4 hover:text-primary">contact support</a></p>
        </div>
      </div>
    </div>
  );
} 