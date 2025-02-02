// app/(auth)/login/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { LoginForm } from "@/components/auth/login-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export const metadata: Metadata = {
  title: "Login | CueProject",
  description: "Login to your account",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link 
          href="/register" 
          className="font-medium text-primary hover:text-primary/90 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
