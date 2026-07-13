import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Code, Clock } from "lucide-react";

export function SuggestedProjects({ projects }) {
  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Beginner":
        return "text-green-400 bg-green-500/20";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-500/20";
      case "Advanced":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb size={20} className="text-purple-400" />
          Suggested Projects to Build
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{project.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getComplexityColor(
                    project.complexity
                  )}`}
                >
                  {project.complexity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}