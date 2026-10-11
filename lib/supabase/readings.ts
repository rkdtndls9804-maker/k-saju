import "server-only";
import { getSupabase } from "./index";
import { readingRowSchema, toReadingInsert, type ReadingMetadata, type ReadingRow } from "./schema";
import type { SajuChart } from "@/lib/saju/schema";

export async function saveReading(chart: SajuChart, metadata: ReadingMetadata): Promise<void> {
  try {
    const { error } = await getSupabase().from("saju_readings")
      .insert(toReadingInsert(chart, metadata)).abortSignal(AbortSignal.timeout(5000));
    if (error) throw error;
  } catch {
    // Never log request data, credentials, or database error details.
    console.warn("[saju_readings] Save failed. Check database configuration and policies.");
  }
}

export async function getReadings(): Promise<ReadingRow[]> {
  const client = getSupabase();
  const rows: ReadingRow[] = [];
  const cutoff = new Date().toISOString();
  const signal = AbortSignal.timeout(15000);
  let total: number | null = null;
  // Stable ordering and a fixed upper timestamp keep new inserts out of this scan.
  // Use the actual returned length: a project's row cap may be below 1,000.
  do {
    const { data, error, count } = await client.from("saju_readings")
      .select("*", { count: "exact" }).lte("created_at", cutoff)
      .order("created_at", { ascending: true }).order("id", { ascending: true })
      .range(rows.length, rows.length + 999).abortSignal(signal);
    if (error || !data || count === null) throw new Error("Statistics unavailable");
    total ??= count;
    if (data.length === 0 && rows.length < total) throw new Error("Incomplete statistics");
    rows.push(...data.map((row) => readingRowSchema.parse(row)));
  } while (rows.length < total);
  return rows;
}
