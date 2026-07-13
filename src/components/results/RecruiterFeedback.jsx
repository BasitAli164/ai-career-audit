import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export function RecruiterFeedback({ feedback }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare size={20} className="text-blue-400" />
          Recruiter Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 leading-relaxed">{feedback}</p>
      </CardContent>
    </Card>
  );
}