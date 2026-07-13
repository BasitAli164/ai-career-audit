import { z } from "zod";

export const analyzeRequestSchema = z.object({
  resumeText: z.string().min(10, "Resume text too short"),
  githubData: z.array(
    z.object({
      name: z.string(),
      stars: z.number().int().nonnegative(),
      description: z.string().nullable().optional().default(""),
      language: z.string().nullable().optional().default("Unknown"),
      forks: z.number().int().nonnegative().optional(),
      url: z.string().optional(),
    })
  ),
});

export const analysisResultSchema = z.object({
  resumeScore: z.number().int().min(0).max(100),
  atsScore: z.number().int().min(0).max(100),
  recruiterFeedback: z.string(),
  missingSkills: z.array(z.string()),
  suggestedProjects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      techStack: z.array(z.string()),
      complexity: z.enum(["Beginner", "Intermediate", "Advanced"]),
    })
  ),
  interviewQuestions: z.array(z.string()),
  roastMode: z.string(),
  roadmap: z.string(),
});