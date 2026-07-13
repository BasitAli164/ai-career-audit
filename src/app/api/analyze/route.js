import { NextResponse } from "next/server";
import { ai, MODELS, MODEL } from "@/lib/gemini/client";
import { analyzeResumeAndGitHub } from "@/lib/gemini/prompts";

// Models ordered by quota (highest first)
const QUOTA_OPTIMIZED_MODELS = [
  MODELS.FLASH_LITE,   // Highest quota - Try first
  MODELS.FLASH,        // High quota - Fallback 1
  MODELS.FLASH_35,     // Good quota - Fallback 2
  MODELS.PRO,          // Lower quota - Fallback 3
  MODELS.PRO_PREVIEW,  // Lowest quota - Last resort
];

async function callGeminiWithQuotaOptimization(prompt, maxRetriesPerModel = 2) {
  let lastError = null;
  
  for (const modelName of QUOTA_OPTIMIZED_MODELS) {
    for (let attempt = 0; attempt < maxRetriesPerModel; attempt++) {
      try {
        console.log(`🔄 Trying model: ${modelName} (attempt ${attempt + 1})`);
        
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });
        
        console.log(`✅ Success with ${modelName}!`);
        return response;
      } catch (error) {
        lastError = error;
        console.log(`❌ Failed with ${modelName}:`, error.message);
        
        // Quota exceeded - wait and retry
        if (error.status === 429) {
          const delayMatch = error.message?.match(/retry in ([\d.]+)s/);
          const delay = delayMatch ? parseFloat(delayMatch[1]) * 1000 : 3000;
          console.log(`⏳ Rate limited. Waiting ${delay/1000}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        // Model not found - try next model immediately
        if (error.status === 404) {
          console.log(`⚠️ Model ${modelName} not found, trying next...`);
          break;
        }
        
        // Other errors - retry same model
        if (attempt < maxRetriesPerModel - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
      }
    }
  }
  
  throw lastError || new Error("All models failed. Please try again later.");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { resumeText, githubData } = body;
    
    // Clean GitHub data
    const cleanedGithubData = githubData.map(repo => ({
      name: repo.name || "Unknown",
      stars: repo.stars || 0,
      description: repo.description || "",
      language: repo.language || "Unknown",
      forks: repo.forks || 0,
      url: repo.url || "",
    }));

    const prompt = analyzeResumeAndGitHub(resumeText, cleanedGithubData);
    const response = await callGeminiWithQuotaOptimization(prompt);
    const result = JSON.parse(response.text || "{}");
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: `Analysis failed: ${error.message}` },
      { status: 500 }
    );
  }
}