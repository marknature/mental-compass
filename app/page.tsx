import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageSection from "./_components/section";
import StartDay from "./_components/personal-tasks";
import TestimonialCard from "./_components/qoute";

export default function Home() {
  const moods = [
    { label: "Happy", color: "bg-pink-300/30" },
    { label: "Calm", color: "bg-purple-300/30" },
    { label: "Manic", color: "bg-cyan-300/30" },
    { label: "Angry", color: "bg-orange-300/30" },
    { label: "Angry", color: "bg-orange-300/30" },
  ];
  return (
    <>
      <h1 className="text-2xl mb-2 text-foreground">
        Good Afternoon,
        <br />
        <span className="font-semibold">Saira!</span>
      </h1>

      <Card className="border-none bg-transparent shadow-none mb-0">
        <CardHeader className="p-0 mb-4">
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-5 gap-5 items-center place-items-center">
          {moods.map((mood, index) => (
            <span className="text-center" key={`${mood}${index}`}>
              <button
                key={index}
                className={`bg-primary w-16 h-16 rounded-2xl flex mb-1 items-center justify-center `}
                aria-label={`Select mood: ${mood.label}`}
              />
              <span className="text-sm">{mood.label}</span>
            </span>
          ))}
        </CardContent>
      </Card>

      <TestimonialCard />
      <PageSection
        title="Because you are happy"
        description="Articles based on your mood today."
      />
      <StartDay />
    </>
  );
}
