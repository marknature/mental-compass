import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Phone,
  MessageCircle,
  Users,
  Shield,
  CalendarHeart,
} from "lucide-react";
import Link from "next/link";
import { CrisisSupport } from "../_components/crisis-support";

export default function Counselling() {
  const services = [
    {
      id: 1,
      title: "Individual Counseling",
      description: "One-on-one support",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      id: 2,
      title: "Group Therapy",
      description: "Peer support sessions",
      icon: Users,
      color: "bg-pink-500",
    },
    {
      id: 3,
      title: "Crisis Support",
      description: "24/7 emergency help",
      icon: Shield,
      color: "bg-indigo-500",
    },
    {
      id: 4,
      title: "Wellness Workshops",
      description: "Educational sessions",
      icon: Users,
      color: "bg-blue-500",
    },
  ];
  return (
    <>
      <h1 className="text-2xl mb-2 text-foreground">
        Counselling
        <p className="text-sm text-muted-foreground">
          Get professional help from the Africa university counselor
        </p>
      </h1>
      <CrisisSupport />
      <main className="flex-1 pb-24 relative">
        {/* About Section */}
        <div className="pb-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className=" text-sm leading-relaxed">
            The University Counseling Center provides confidential mental health
            services to all enrolled students. Our team of licensed
            professionals offers support for a wide range of concerns including
            stress, anxiety, depression, relationship issues, and academic
            challenges.
            <br />
            <br />
            Location:{" "}
            <span className="text-primary">
              Student Services Building, Room 203 123 University Avenue Campus,
              State 12345
            </span>
          </p>
        </div>

        {/* Hours Section */}
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
          <div className="bg-border rounded-lg   p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monday - Friday</span>
                <span className="text-sm font-medium">8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Saturday</span>
                <span className="text-sm font-medium">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Sunday</span>
                <span className="text-sm font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
