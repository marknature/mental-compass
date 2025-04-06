import { SearchSlash } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="space-y-5 pt-20 flex flex-col items-center justify-center h-full text-sm text-muted-foreground">
      <SearchSlash size={"35"} />
      <p>{title} still in development comming soon</p>
    </div>
  );
}
