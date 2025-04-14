import { Card, CardContent } from "@/components/ui/card";
import { Book, Calendar, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ActionItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  color: "primary" | "accent" | "secondary" | "destructive";
  isExternal?: boolean;
};

export default function QuickActions() {
  const actions: ActionItem[] = [
    {
      icon: Book,
      title: "Journal Entry",
      description: "Track your mood",
      href: "/journals/",
      color: "primary",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Join activities",
      href: "/events/",
      color: "accent",
    },
    {
      icon: Mail,
      title: "Email Counselor",
      description: "Get professional advice",
      href: "mailto:counselling@africau.edu",
      color: "secondary",
      isExternal: true,
    },
    {
      icon: Phone,
      title: "Call Counselor",
      description: "Call for immediate help",
      href: "tel:+263719562825",
      color: "primary",
      isExternal: true,
    },
  ];

  return (
    <section className="quick-actions">
      <div className="mb-4">
        <h2 className="text-base mb-1 font-semibold flex items-center">
          Quick Actions
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <ActionCard key={action.href} action={action} />
        ))}
      </div>
    </section>
  );
}

function ActionCard({ action }: { action: ActionItem }) {
  const Icon = action.icon;

  const colorStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  return (
    <Card
      className={cn(
        "border-none shadow-md transition-all hover:shadow-lg hover:scale-105",
        colorStyles[action.color],
      )}
    >
      <Link
        href={action.href}
        className="block h-full"
        target={action.isExternal ? "_blank" : undefined}
        rel={action.isExternal ? "noopener noreferrer" : undefined}
      >
        <CardContent className="p-3 flex flex-col items-center justify-center h-full">
          <Icon className="h-5 w-5 mb-2 mx-auto" />
          <h3 className="font-medium text-sm">{action.title}</h3>
          <p className="text-xs mt-1 opacity-90 text-center">
            {action.description}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
