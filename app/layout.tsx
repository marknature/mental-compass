import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import MobileNav from "./_components/mobile-nav";

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
      <body className={`dark ${epilogue.className} relative antialiased p-5`}>
        <main className="max-w-md mx-auto bg-background min-h-screen space-y-5">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
