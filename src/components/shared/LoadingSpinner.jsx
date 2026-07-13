import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <Loader2 className="h-16 w-16 animate-spin text-blue-400" />
      <p className="mt-4 text-gray-400 text-lg">Analyzing your career profile...</p>
      <p className="text-gray-500 text-sm mt-2">Gemini AI is reviewing your resume and GitHub</p>
    </motion.div>
  );
}