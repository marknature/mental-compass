import { Card, CardContent } from "@/components/ui/card";

type Props = {
  message: string;
};

export default function EmptyDataList({ message }: Props) {
  return (
    <Card className="bg-muted/50 border border-border">
      <CardContent className="p-4 text-center">
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
