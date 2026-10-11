import { elements, type ReadingRow } from "./schema";

export function aggregateReadings(rows: ReadingRow[]) {
  const stats = {
    total: rows.length,
    dayMasters: { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 },
    averageElements: { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 },
    strength: { strong: 0, weak: 0, balanced: 0 },
    yinYang: { yin: 0, yang: 0 },
    timeAccuracy: { known: 0, unknown: 0 },
    topics: { personality: 0, love: 0, career: 0, year: 0, other: 0 },
  };
  for (const row of rows) {
    stats.dayMasters[row.pillars.day.stemElement]++;
    stats.strength[row.day_master_strength]++;
    stats.yinYang[row.day_master_yin_yang]++;
    stats.timeAccuracy[row.time_accuracy]++;
    const topic = row.fortune_type;
    if (topic === "personality" || topic === "love" || topic === "career" || topic === "year") stats.topics[topic]++;
    else stats.topics.other++;
    for (const key of elements) stats.averageElements[key] += row.five_elements[key];
  }
  for (const key of elements) stats.averageElements[key] = rows.length ? stats.averageElements[key] / rows.length : 0;
  return stats;
}
