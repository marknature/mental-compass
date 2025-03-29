import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
  description?: string;
} & PropsWithChildren;

export default function ArticlesWrapper({
  title,
  description,
  children,
}: Props) {
  return (
    <Card className="bg-transparent space-y-4 max-w-4xl mx-auto border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="flex gap-5 w-full overflow-y-scroll">
          {children}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
