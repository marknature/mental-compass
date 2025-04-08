import { Loader2 } from "lucide-react";

type Props = {
  title: string;
};

export default function Loading(props: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-32 w-full min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground text-nowrap">
        Loading {props.title}...
      </p>
    </div>
  );
}
