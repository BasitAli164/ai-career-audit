import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function RoadmapTimeline({ roadmap }) {
  // Split roadmap into weeks (assuming format has "Week" or numbered sections)
  const splitIntoWeeks = (text) => {
    const weeks = [];
    const lines = text.split("\n").filter((line) => line.trim());
    let currentWeek = [];
    let weekNumber = 1;

    for (const line of lines) {
      if (line.toLowerCase().includes("week") || line.match(/^\d+\./)) {
        if (currentWeek.length > 0) {
          weeks.push({ week: weekNumber, items: currentWeek });
          weekNumber++;
          currentWeek = [];
        }
        currentWeek.push(line);
      } else {
        currentWeek.push(line);
      }
    }
    if (currentWeek.length > 0) {
      weeks.push({ week: weekNumber, items: currentWeek });
    }
    return weeks.length > 0 ? weeks : [{ week: 1, items: lines }];
  };

  const weeks = splitIntoWeeks(roadmap);

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar size={20} className="text-green-400" />
          30-Day Improvement Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeks.map((week, idx) => (
            <div key={idx} className="relative pl-6 pb-6 border-l-2 border-green-500/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-green-500 rounded-full" />
              <h4 className="text-green-400 font-semibold text-lg">
                Week {week.week}
              </h4>
              <div className="mt-2 space-y-1">
                {week.items.map((item, i) => (
                  <p key={i} className="text-gray-300 text-sm">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}