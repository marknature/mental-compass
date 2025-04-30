"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { type AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";

// Validation schema using zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);

  const [errors, setErrors] = useState<AuthError | null>(null);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(data);
    console.log("Login error:", error);

    if (error) {
      setErrors(error);
      return router.push("/error");
    }

    const onboardingStatus = localStorage.getItem("onboardingComplete");
    const isComplete = onboardingStatus === "true";
    setIsOnboardingComplete(isComplete);

    if (!isComplete && pathname !== "/onboarding") {
      console.log("Navigating to onboarding");
      return router.push("/onboarding");
    }

    return router.push("/");
  };

  useEffect(() => {
    if (params.get("confirmEmail")) {
      const notification = toast.success("Sign up successful", {
        description: "Please check your emails to verify your account",
        duration: 15000,
      });
      return () => {
        toast.dismiss(notification);
      };
    }
  }, []);

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      {/* Logo Area */}
      <div className="mb-6 flex items-center justify-center">
        <Avatar>
          <AvatarImage
            src="/images/logo.png"
            alt="@shadcn"
            className="h-24 w-24 rounded-lg"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <Card className="w-full max-w-sm border-none shadow-md">
        <CardHeader className="space-y-1 text-center pb-4">
          <CardTitle className="text-xl font-semibold">Welcome Back</CardTitle>
          <CardDescription className="text-sm">
            Take a moment for yourself. You're exactly where you need to be.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {errors && (
                <Alert variant="destructive" className="py-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <div>
                      <AlertTitle className="text-sm font-medium">
                        Login failed
                      </AlertTitle>
                      <AlertDescription className="text-xs">
                        {errors.message}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm">Password</FormLabel>
                      <a
                        href="#"
                        className="text-xs text-primary hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <FormControl>
                      <Input type="password" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-6 h-10"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center text-sm pt-2">
                <span className="text-muted-foreground text-xs">
                  Don't have an account?
                </span>{" "}
                <a
                  href="/sign-up"
                  className="text-primary text-xs hover:underline underline-offset-4"
                >
                  Create account
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-xs text-muted-foreground max-w-xs">
        By continuing, you agree to our{" "}
        <a href="#" className="text-primary  ">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary ">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
