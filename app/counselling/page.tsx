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
      <div className=" overflow-hidden rounded-xl bg-border p-5">
        {/* Content Section */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex gap-8 items-center w-full">
            <div className="space-y-2 w-2/3">
              <h2 className="text-xl font-semibold ">We are here to help</h2>
              <p className="mt-1 text-sm">
                Join our transformative wellness event and discover powerful
                techniques to manage stress, improve mental clarity, and
                cultivate lasting inner peace.
              </p>
            </div>
            <CalendarHeart size={"100"} />
          </div>
          <div className="flex gap-3">
            <Button className="bg-primary px-6 text-sm">Book a session</Button>
          </div>
        </div>
      </div>{" "}
      <main className="flex-1 pb-24 relative">
        <div className="grid grid-cols-2 gap-2">
          <Button size="lg" className="w-full">
            <Phone className="h-5 w-5 " /> Call
          </Button>
          <Button size="lg" className="w-full">
            <MessageCircle className="h-5 w-5 " /> Email
          </Button>
        </div>
        {/* About Section */}
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className=" text-sm leading-relaxed">
            The University Counseling Center provides confidential mental health
            services to all enrolled students. Our team of licensed
            professionals offers support for a wide range of concerns including
            stress, anxiety, depression, relationship issues, and academic
            challenges.
            <br />
            <br />
            Location:
            <br />
            Student Services Building, Room 203 123 University Avenue Campus,
            State 12345
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

        {/* Services Section */}
        <div className="py-4 w-full">
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-none w-[200px] first:ml-0"
                >
                  <div className="rounded-xl bg-border p-4 h-full flex flex-col">
                    <div
                      className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mb-3`}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-white font-medium mb-1">
                      {service.title}
                    </h4>
                    <p className="text-zinc-400 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar
              orientation="horizontal"
              className="bg-background mt-5"
            />
          </ScrollArea>
        </div>
      </main>
    </>
  );
}
