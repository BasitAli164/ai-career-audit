import { GoogleGenAI } from "@google/genai";

// Use the latest Gemini 2.0 Flash for speed & quality
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const MODEL = "gemini-2.0-flash-exp";