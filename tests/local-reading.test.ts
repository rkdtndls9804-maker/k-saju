import { describe, expect, it } from "vitest";
import { buildLocalReading } from "@/lib/reading/local";
import { calculateSaju } from "@/lib/saju/engine";

describe("supportive local reading", () => {
  it("produces a detailed Korean reading without deterministic claims", () => {
    const input = { locale: "ko" as const, birthDate: "1990-03-15", birthTime: "10:30", birthTimeKnown: true, gender: "female" as const, topic: "year" as const, targetYear: 2026 };
    const reading = buildLocalReading(calculateSaju(input), input);
    expect(reading.summary.length).toBeGreaterThan(700);
    expect(reading.summary.split("\n\n").length).toBeGreaterThanOrEqual(5);
    expect(reading.guidance.length).toBeGreaterThanOrEqual(3);
    expect(reading.summary).not.toContain("반드시");
  });
});
