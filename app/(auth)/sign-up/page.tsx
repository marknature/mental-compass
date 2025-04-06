"use client";
import { Suspense } from "react";
import { SignupForm } from "../_components/sign-up-form";
import Loading from "@/app/_components/loading";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<Loading title="sign up" />}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
