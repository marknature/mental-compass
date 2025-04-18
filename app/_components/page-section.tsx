import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = {
  title: string;
  description?: string;
  layout?: "list" | "row";
  className?: string;
} & PropsWithChildren;

export default function PageSection({
  title,
  description,
  layout = "list",
  className,
  children,
}: Props) {
  return (
    <Card
      className={cn("bg-transparent w-full border-none shadow-none", className)}
    >
      <CardHeader className="p-0 mb-3">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div
          className={cn(
            layout === "list" ? "space-y-4 w-full" : "flex space-x-4",
          )}
        >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
