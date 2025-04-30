"use client";

import { getGreeting } from "@/lib/hooks/useGreeting";
import { type User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {
  user: User | undefined;
};

export default function Greeter({ user }: Props) {
  const [showPersonalGreeting, setShowPersonalGreeting] = useState(false);

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => setShowPersonalGreeting(true), 500); // Wait for smoother transition
      return () => clearTimeout(timeout);
    }
  }, [user]);

  return (
    <header className="px-0 grid grid-cols-2 mb-0 ">
      <div className="overflow-hidden relative h-[48px]">
        <AnimatePresence mode="wait">
          {!showPersonalGreeting ? (
            <motion.div
              key="placeholder"
              initial={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute"
            >
              <h1 className="text-xl font-semibold flex items-center gap-2 text-primary">
                Welcome
              </h1>
              <p className="text-sm text-muted-foreground">
                Give us a moment to load your journey
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="greeting"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute"
            >
              <h1 className="text-primary font-semibold text-lg">
                {getGreeting()}
              </h1>
              <h3 className="font-semibold text-sm text-muted-foreground">
                {user?.user_metadata.first_name} {user?.user_metadata.last_name}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-end items-start">
        <Link href={"/profile"}>
          <Avatar>
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
        </Link>
      </div>{" "}
    </header>
  );
}
