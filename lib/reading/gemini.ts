import "server-only";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import type { Reading, SajuChart, SajuRequest } from "@/lib/saju/schema";
import { buildReadingPrompt } from "@/lib/reading/prompt";

const readingSchema = z.object({
  title: z.string().min(1).max(80), tagline: z.string().min(1).max(100), summary: z.string().min(300).max(3000),
  strengths: z.array(z.string().max(500)).min(3).max(6), growthAreas: z.array(z.string().max(500)).min(2).max(5),
  guidance: z.array(z.string().max(600)).min(3).max(6),
});

export async function buildGeminiReading(chart: SajuChart, input: SajuRequest): Promise<Reading | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: buildReadingPrompt(chart, input),
    config: { responseMimeType: "application/json", temperature: 0.55 },
  });
  if (!response.text) return null;
  const parsed = readingSchema.safeParse(JSON.parse(response.text));
  return parsed.success ? { ...parsed.data, source: "gemini" } : null;
}
