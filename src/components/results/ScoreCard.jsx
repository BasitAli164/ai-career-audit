"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ScoreCard({ label, score }) {
  // Determine color based on score
  let color = "text-red-400";
  if (score >= 70) color = "text-green-400";
  else if (score >= 50) color = "text-yellow-400";

  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">{label}</span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`text-3xl font-bold ${color}`}
          >
            {score}
          </motion.span>
        </div>
        <Progress value={score} className="h-2 bg-gray-700" />
        <div className="mt-2 text-xs text-gray-500">
          {score >= 70 ? "👍 Solid" : score >= 50 ? "📈 Needs work" : "🔴 Urgent improvement"}
        </div>
      </CardContent>
    </Card>
  );
}