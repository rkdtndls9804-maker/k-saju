import { describe, expect, it } from "vitest";
import { buildReadingPrompt } from "@/lib/reading/prompt";
import { calculateSaju } from "@/lib/saju/engine";

const base = { locale: "en" as const, birthDate: "1990-03-15", birthTime: "10:30", birthTimeKnown: true, gender: "female" as const };

describe("domain-specific reading prompts", () => {
  it("gives love a relationship-only scope", () => {
    const input = { ...base, topic: "love" as const };
    const prompt = buildReadingPrompt(calculateSaju(input), input);
    expect(prompt).toContain("LOVE AND RELATIONSHIPS ONLY");
    expect(prompt).toContain("Do not retell the full personality reading");
  });

  it("prevents unsupported annual timing claims", () => {
    const input = { ...base, topic: "year" as const, targetYear: 2026 };
    const prompt = buildReadingPrompt(calculateSaju(input), input);
    expect(prompt).toContain("If annual or major-luck interaction data is missing");
    expect(prompt).toContain("never invent month-by-month timing");
  });
});
