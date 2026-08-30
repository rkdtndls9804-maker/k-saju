import { NextResponse } from "next/server";
import { buildGeminiReading } from "@/lib/reading/gemini";
import { buildLocalReading } from "@/lib/reading/local";
import { calculateSaju } from "@/lib/saju/engine";
import { sajuRequestSchema } from "@/lib/saju/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const parsed = sajuRequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please check your birth details.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    const targetYear = parsed.data.targetYear ?? new Date().getFullYear();
    const input = { ...parsed.data, targetYear };
    const chart = calculateSaju(input);
    let reading = buildLocalReading(chart, input);
    try { reading = (await buildGeminiReading(chart, input)) ?? reading; } catch { /* The deterministic chart remains available. */ }
    return NextResponse.json({ chart, reading, targetYear });
  } catch {
    return NextResponse.json({ error: "We couldn't read this chart yet. Please check the details and try again." }, { status: 500 });
  }
}
