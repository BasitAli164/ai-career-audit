import { NextResponse } from "next/server";
import { ai, MODEL } from "@/lib/gemini/client";
import { analyzeResumeAndGitHub } from "@/lib/gemini/prompts";
import { analyzeRequestSchema } from "@/lib/validators/schemas";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = analyzeRequestSchema.parse(body);

    // Build prompt
    const prompt = analyzeResumeAndGitHub(
      validated.resumeText,
      validated.githubData
    );

    // Call Gemini
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    // Parse the response
    const result = JSON.parse(response.text || "{}");

    // Optionally validate the result shape
    // (but we trust Gemini to follow the prompt)

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}