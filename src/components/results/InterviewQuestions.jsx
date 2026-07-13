import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export function InterviewQuestions({ questions }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <HelpCircle size={20} className="text-pink-400" />
          Interview Questions to Expect
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-900/50 rounded-lg border border-gray-700"
            >
              <span className="text-sm font-medium text-pink-400">Q{idx + 1}:</span>
              <p className="text-gray-300 mt-1">{q}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}