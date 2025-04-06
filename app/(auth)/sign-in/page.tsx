"use client";

import Loading from "@/app/_components/loading";
import { Suspense } from "react";
import { LoginForm } from "../_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<Loading title="sign in" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
