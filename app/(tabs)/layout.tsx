"use client";

import "../globals.css";
import { BottomNavigation } from "../_components/mobile-nav";
import PageHeader from "../_components/page-header";
import { usePathname } from "next/navigation";
import Greeter from "./(home)/_components/greeter";
import { useUser } from "@/lib/hooks/useUsers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = useUser();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      <main
        className={`relative container mx-auto px-4 py-6 mb-6  min-h-screen max-w-[430px] overflow-x-hidden pb-20 flex flex-col ${
          isHomePage ? "space-y-8" : " pt-14 space-y-6"
        }`}
      >
        <PageHeader />
        {isHomePage && <Greeter user={user} />}
        {children}
        <BottomNavigation />
      </main>
    </>
  );
}
