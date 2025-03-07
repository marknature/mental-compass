import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageSection from "./_components/section";
import ReflectCard from "./_components/reflect-card";
import StartDay from "./_components/personal-tasks";

export default function Home() {
  const moods = [
    { label: "Happy", color: "bg-pink-300/30" },
    { label: "Calm", color: "bg-purple-300/30" },
    { label: "Manic", color: "bg-cyan-300/30" },
    { label: "Angry", color: "bg-orange-300/30" },
    { label: "Angry", color: "bg-orange-300/30" },
  ];
  return (
    <div className="max-w-md mx-auto bg-background min-h-screen space-y-6">
      <h1 className="text-2xl mb-2 text-foreground">
        Good Afternoon,
        <br />
        <span className="font-semibold">Saira!</span>
      </h1>

      <Card className="border-none bg-transparent shadow-none">
        <CardHeader className="p-0 mb-4">
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>
            Yesterday you were sad, whats the mood today?{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-5 gap-5 items-center place-items-center">
          {moods.map((mood, index) => (
            <span className="text-center" key={`${mood}${index}`}>
              <button
                key={index}
                className={`bg-border w-16 h-16 rounded-2xl flex mb-1 items-center justify-center `}
                aria-label={`Select mood: ${mood.label}`}
              />
              <span className="text-sm">{mood.label}</span>
            </span>
          ))}
        </CardContent>
      </Card>

      <StartDay />

      <PageSection
        title="Because you are happy"
        description="Articles based on your mood today."
      />
    </div>
  );
}
