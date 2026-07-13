import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

export function RoastCard({ roast }) {
  return (
    <Card className="bg-red-950/30 border-red-800/50">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <Flame size={20} /> Roast Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 italic">{roast}</p>
      </CardContent>
    </Card>
  );
}