import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account | Cue Project Dj's",
  description: "Create a new account and join our community",
};


export default async function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur relative">

      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-2xl border border-border/50">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/90 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
