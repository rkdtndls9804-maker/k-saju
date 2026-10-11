import { z } from "zod";
import type { SajuChart, SajuRequest } from "@/lib/saju/schema";

export const elements = ["wood", "fire", "earth", "metal", "water"] as const;
const element = z.enum(elements);
const pillar = z.object({
  label: z.string(), hanja: z.string(), stem: z.string(), branch: z.string(),
  stemElement: element, branchElement: element, branchAnimal: z.string(),
  yinYang: z.enum(["yin", "yang"]),
});

// Explicit allowlist: even extra nested properties are stripped before insertion.
export const readingInsertSchema = z.object({
  pillars: z.object({ year: pillar, month: pillar, day: pillar, hour: pillar.nullable() }),
  day_master_stem: z.string(), day_master_element: z.string(),
  day_master_yin_yang: z.enum(["yang", "yin"]),
  day_master_strength: z.enum(["strong", "weak", "balanced"]),
  five_elements: z.object({ wood: z.number().nonnegative(), fire: z.number().nonnegative(), earth: z.number().nonnegative(), metal: z.number().nonnegative(), water: z.number().nonnegative() }),
  dominant_elements: z.array(element), weak_elements: z.array(element),
  yongsin_primary: z.string().nullable(), yongsin_secondary: z.string().nullable(),
  time_accuracy: z.enum(["known", "unknown"]),
  gender: z.enum(["male", "female"]).nullable(), fortune_type: z.string(),
});
export const readingRowSchema = readingInsertSchema.extend({ id: z.string().uuid(), created_at: z.string().datetime({ offset: true }) });
export type ReadingRow = z.infer<typeof readingRowSchema>;
export type ReadingMetadata = { gender?: SajuRequest["gender"]; fortuneType: SajuRequest["topic"] };

export function toReadingInsert(chart: SajuChart, metadata: ReadingMetadata) {
  return readingInsertSchema.parse({
    pillars: chart.pillars,
    day_master_stem: chart.dayMaster.stem, day_master_element: chart.dayMaster.elementKo,
    day_master_yin_yang: chart.dayMaster.yinYang, day_master_strength: chart.dayMaster.strength,
    five_elements: chart.fiveElements, dominant_elements: chart.dominantElements, weak_elements: chart.weakElements,
    yongsin_primary: chart.yongsin?.primaryKo ?? null, yongsin_secondary: chart.yongsin?.secondaryKo ?? null,
    time_accuracy: chart.timeAccuracy, gender: metadata.gender ?? null, fortune_type: metadata.fortuneType,
  });
}
