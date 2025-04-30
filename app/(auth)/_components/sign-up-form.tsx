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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type AuthError } from "@supabase/supabase-js";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

// Validation schema using Zod
const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [errors, setErrors] = useState<AuthError | null>(null);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const supabase = createClient();
    const params = new URLSearchParams("");
    params.set("confirmEmail", "true");

    const signUpdata = {
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
      email: data.email,
      password: data.password,
    };

    const { error } = await supabase.auth.signUp(signUpdata);

    if (error) {
      setErrors(error);
      return;
    }

    router.push(`/sign-in?${params}`);
  };

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center py-8",
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
          <CardTitle className="text-xl font-semibold">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-sm">
            Begin your mindfulness journey with us
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
                        Signup failed
                      </AlertTitle>
                      <AlertDescription className="text-xs">
                        {errors.message}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm">First Name</FormLabel>
                      <FormControl>
                        <Input type="text" className="h-10" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm">Last Name</FormLabel>
                      <FormControl>
                        <Input type="text" className="h-10" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

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
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm">Confirm Password</FormLabel>
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="text-center text-sm pt-2">
                <span className="text-muted-foreground text-xs">
                  Already have an account?
                </span>{" "}
                <a
                  href="/sign-in"
                  className="text-primary text-xs hover:underline underline-offset-4"
                >
                  Sign in
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-xs text-muted-foreground max-w-xs">
        By continuing, you agree to our{" "}
        <a href="#" className="text-primary ">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
