import { z } from "zod";

export const topicSchema = z.enum(["personality", "love", "career", "year"]);

export const sajuRequestSchema = z.object({
  locale: z.enum(["ko", "en"]).default("en"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  birthTimeKnown: z.boolean(),
  gender: z.enum(["female", "male"]),
  birthPlace: z.string().trim().max(120).optional(),
  topic: topicSchema.default("personality"),
  targetYear: z.number().int().min(1900).max(2200).optional(),
}).superRefine((value, context) => {
  const date = new Date(`${value.birthDate}T00:00:00Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value.birthDate) {
    context.addIssue({ code: "custom", path: ["birthDate"], message: "Enter a valid date." });
  }
  if (date > new Date()) {
    context.addIssue({ code: "custom", path: ["birthDate"], message: "Birth date cannot be in the future." });
  }
  if (value.birthTimeKnown && !value.birthTime) {
    context.addIssue({ code: "custom", path: ["birthTime"], message: "Enter a birth time or choose unknown." });
  }
});

export type SajuRequest = z.infer<typeof sajuRequestSchema>;

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

export type Pillar = {
  label: string;
  hanja: string;
  stem: string;
  branch: string;
  stemElement: ElementKey;
  branchElement: ElementKey;
  branchAnimal: string;
  yinYang: "yin" | "yang";
};

export type SajuChart = {
  pillars: { year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null };
  dayMaster: { stem: string; element: ElementKey; elementKo: string; yinYang: "yin" | "yang"; strength: string };
  fiveElements: Record<ElementKey, number>;
  dominantElements: ElementKey[];
  weakElements: ElementKey[];
  timeAccuracy: "known" | "unknown";
  limitations: string[];
};

export type Reading = {
  title: string;
  tagline: string;
  summary: string;
  strengths: string[];
  growthAreas: string[];
  guidance: string[];
  source: "gemini" | "local";
};

export type SajuResponse = { chart: SajuChart; reading: Reading; targetYear: number };
