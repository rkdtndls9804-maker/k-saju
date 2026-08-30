import { describe, expect, it } from "vitest";
import { sajuRequestSchema } from "@/lib/saju/schema";

describe("saju request validation", () => {
  const valid = { birthDate: "1990-03-15", birthTime: "10:30", birthTimeKnown: true, gender: "female", topic: "personality" };

  it("accepts valid solar birth details", () => {
    expect(sajuRequestSchema.safeParse(valid).success).toBe(true);
  });

  it("allows an unknown birth time", () => {
    expect(sajuRequestSchema.safeParse({ ...valid, birthTime: undefined, birthTimeKnown: false }).success).toBe(true);
  });

  it("rejects a missing known time and invalid dates", () => {
    expect(sajuRequestSchema.safeParse({ ...valid, birthTime: undefined }).success).toBe(false);
    expect(sajuRequestSchema.safeParse({ ...valid, birthDate: "2025-02-30" }).success).toBe(false);
  });
});
