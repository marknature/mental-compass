"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { createQueryClient } from "./client";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  // Create a client for each request to avoid cross-request state pollution
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
