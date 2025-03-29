import { ReactNode } from "react";

const emotions: { icon: ReactNode; title: string }[] = [
  { icon: "😄", title: "Happy" },
  { icon: "😞", title: "Sad" },
  { icon: "😠", title: "Angry" },
  { icon: "🙂", title: "Calm" },
  { icon: "😐", title: "Neutral" },
];

export default function MoodTracker() {
  return (
    <section className="space-y-2">
      <h4 className="font-medium">How are you feeling today?</h4>

      <div className="flex w-full gap-5 ">
        {emotions.map((emotion) => (
          <div
            className="flex flex-col items-center space-y-2 w-20 h-14 rounded-2xl bg-foreground "
            key={emotion.title}
          />
        ))}
      </div>
    </section>
  );
}
