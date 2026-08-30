import { describe, expect, it } from "vitest";
import { calculateSaju } from "@/lib/saju/engine";

describe("saju engine adapter", () => {
  it("normalizes the documented reference result", () => {
    const result = calculateSaju({ locale: "en", birthDate: "1990-03-15", birthTime: "10:30", birthTimeKnown: true, gender: "male", topic: "personality" });
    expect(result.pillars.year.label).toBe("경오");
    expect(result.pillars.day.label).toBe("기묘");
    expect(result.dayMaster.element).toBe("earth");
    expect(result.limitations.some((item) => item.includes("Beta calculation"))).toBe(true);
  });

  it("keeps the hour pillar empty when birth time is unknown", () => {
    const result = calculateSaju({ locale: "en", birthDate: "1990-03-15", birthTimeKnown: false, gender: "female", topic: "love" });
    expect(result.pillars.hour).toBeNull();
    expect(result.timeAccuracy).toBe("unknown");
  });

  it("captures the package's current date-level solar-term boundary", () => {
    const before = calculateSaju({ locale: "en", birthDate: "2024-02-03", birthTimeKnown: false, gender: "female", topic: "year" });
    const after = calculateSaju({ locale: "en", birthDate: "2024-02-04", birthTimeKnown: false, gender: "female", topic: "year" });
    expect(before.pillars.year.label).toBe("계묘");
    expect(after.pillars.year.label).toBe("갑진");
  });
});
