import { Card, CardContent } from "@/components/ui/card";

export default function StartDay() {
  const tasks = [
    {
      title: "Mood Tracking",
      subtitle: "Daily Check",
    },
    {
      title: "Personality Test",
      subtitle: "21 min",
    },
    {
      title: "Health Assessment",
      subtitle: "25 min",
    },
  ];

  return (
    <Card className="border-0 bg-background m-0 shadow-none">
      <CardContent className="p-0">
        <h2 className="text-xl font-semibold">Personal Tasks</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Brace yourself for amazing revelations
        </p>
        <div className="relative">
          {/* Dotted Timeline */}
          <div className="absolute left-[14px] top-[28px] bottom-2 w-0.5 bg-dotted">
            <div className="absolute inset-0 border-l-2 border-dotted border-primary" />
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-center">
                {/* Timeline dot */}
                <div className="relative z-10 mt-1.5 mr-4">
                  <div className="w-7 h-7 rounded-full border-2 border-primary bg-background" />
                </div>

                {/* Task content */}
                <div className="flex-1 flex items-center justify-between bg-border p-2 rounded-lg">
                  <div>
                    <h3 className="text-sm">{task.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {task.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
