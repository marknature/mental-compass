import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/lib/react-query/providers";

const epilogue = Epilogue({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Compass",
  description: "Wellness that rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex items-center justify-center dark  ${epilogue.className} relative antialiased `}
      >
        <Toaster richColors position="top-center" />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
