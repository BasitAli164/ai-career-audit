import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// HIGHEST QUOTA MODELS (Recommended for hackathon)
export const MODELS = {
  // Best for high-volume requests - Highest quota available
  FLASH_LITE: "gemini-3.1-flash-lite",  // Ultra-efficient, highest quota
  FLASH: "gemini-2.5-flash",             // Balanced speed & quota
  
  // Lower quota but better quality
  FLASH_35: "gemini-3.5-flash",           // Flagship model, good quota
  PRO: "gemini-2.5-pro",                 // Lower quota, better reasoning
  PRO_PREVIEW: "gemini-3.1-pro-preview", // Lowest quota, experimental
};

// Default to highest quota model
export const MODEL = MODELS.FLASH_LITE;  // or MODELS.FLASH