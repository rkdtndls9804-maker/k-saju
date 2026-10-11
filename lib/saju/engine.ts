import { analyzeSaju } from "saju-fortune";
import type { SajuChart, SajuRequest } from "./schema";

const ENGINE_LIMITATION =
  "Beta calculation: solar-term boundaries use date-level approximations and do not include true solar-time correction.";

export function calculateSaju(input: SajuRequest): SajuChart {
  const result = analyzeSaju(
    {
      birthDate: input.birthDate,
      birthTime: input.birthTimeKnown ? input.birthTime : undefined,
      gender: input.gender,
      calendar: "solar",
      birthCity: input.birthPlace,
    },
    { analysisType: "basic" },
  ) as SajuChart;

  return {
    pillars: result.pillars,
    dayMaster: result.dayMaster,
    fiveElements: result.fiveElements,
    dominantElements: result.dominantElements,
    weakElements: result.weakElements,
    yongsin: result.yongsin ? { primaryKo: result.yongsin.primaryKo, secondaryKo: result.yongsin.secondaryKo } : undefined,
    timeAccuracy: result.timeAccuracy,
    limitations: [...result.limitations, ENGINE_LIMITATION],
  };
}
