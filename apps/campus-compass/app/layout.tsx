import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "./_components/mobile-nav";
import { Toaster } from "@/components/ui/sonner";

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
      <body className={`dark ${epilogue.className} relative antialiased `}>
        <>
          <main className="relative container mx-auto px-4 py-6 space-y-5 min-h-screen pb-20">
            {children}
          </main>
          <Toaster richColors />
          <BottomNavigation />
        </>
      </body>
    </html>
  );
}
