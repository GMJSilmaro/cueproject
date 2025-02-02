'use client';

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { AlertModal } from "@/components/ui/alert-modal";
import { toast } from "sonner";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result?.error) {
        setShowSuccessModal(true);
      } else {
        toast.error("Login Failed", {
          description: result.error,
          duration: 4000,
          className: "bg-background text-foreground",
        });
      }
    } catch (error) {
      toast.error("Login Error", {
        description: "An unexpected error occurred. Please try again.",
        duration: 4000,
        className: "bg-background text-foreground",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      toast.loading(`Connecting to ${provider}...`, {
        duration: 2000,
      });
      await signIn(provider, { callbackUrl });
    } catch (error) {
      toast.error(`${provider} Login Failed`, {
        description: "Could not connect to the provider. Please try again.",
        duration: 4000,
        className: "bg-background text-foreground",
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="Login Successful!"
        description="Welcome back! You'll be redirected to your dashboard."
        primaryActionLabel="Go to Dashboard"
        onPrimaryAction={() => {
          router.push(callbackUrl);
          router.refresh();
        }}
      />

      <div className="grid gap-6" {...props}>
        <form onSubmit={onSubmit}>
          <Card className="border-none shadow-lg dark:bg-gray-900">
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="auth-input"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="auth-input"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground dark:bg-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSocialLogin("google")}
                  className="auth-social-button"
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSocialLogin("facebook")}
                  className="auth-social-button"
                >
                  <Icons.facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}