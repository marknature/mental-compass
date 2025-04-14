"use client";

import "../globals.css";
import { BottomNavigation } from "../_components/mobile-nav";
import PageHeader from "../_components/page-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="relative container mx-auto px-4 py-6 space-y-8 min-h-screen max-w-[390px] overflow-x-hidden  pb-20">
        <PageHeader />
        {children}
        <BottomNavigation />
      </main>
    </>
  );
}
