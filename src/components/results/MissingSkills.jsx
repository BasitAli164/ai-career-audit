import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function MissingSkills({ skills }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle size={20} className="text-yellow-400" />
          Missing Skills to Learn
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm border border-yellow-500/30"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}