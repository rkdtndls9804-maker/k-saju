import { afterEach, describe, expect, it, vi } from "vitest";
import { calculateSaju } from "@/lib/saju/engine";
import { toReadingInsert, type ReadingRow } from "@/lib/supabase/schema";
import { aggregateReadings } from "@/lib/supabase/stats";
import { getReadings, saveReading } from "@/lib/supabase/readings";

vi.mock("server-only", () => ({}));
const { getSupabase } = vi.hoisted(() => ({ getSupabase: vi.fn() }));
vi.mock("@/lib/supabase/index", () => ({ getSupabase }));
const chart = calculateSaju({ locale: "ko", birthDate: "1990-03-15", birthTimeKnown: false, gender: "female", topic: "personality" });
const insert = toReadingInsert(chart, { gender: "female", fortuneType: "personality" });
const row: ReadingRow = { ...insert, id: "00000000-0000-4000-8000-000000000001", created_at: "2026-01-01T00:00:00+00:00" };
afterEach(() => { vi.restoreAllMocks(); getSupabase.mockReset(); });

describe("database privacy boundary", () => {
  it("strips extra nested fields and omits source data and interpretation", () => {
    const extended = { ...chart, birthDate: "private", limitations: ["private"], yongsin: { primaryKo: "목(木)", reasoning: "private" }, pillars: { ...chart.pillars, day: { ...chart.pillars.day, birthPlace: "private" } } };
    const saved = toReadingInsert(extended, { fortuneType: "love" });
    expect(JSON.stringify(saved)).not.toContain("private");
    expect(saved.pillars.hour).toBeNull();
    expect(saved.gender).toBeNull();
    expect(saved.yongsin_primary).toBe("목(木)");
    expect(saved.yongsin_secondary).toBeNull();
  });
  it("contains setup, validation and database failures", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    getSupabase.mockImplementationOnce(() => { throw new Error("secret"); });
    await expect(saveReading(chart, { fortuneType: "love" })).resolves.toBeUndefined();
    getSupabase.mockReturnValue({ from: () => ({ insert: () => ({ abortSignal: async () => ({ error: { message: "secret" } }) }) }) });
    await expect(saveReading(chart, { fortuneType: "love" })).resolves.toBeUndefined();
    expect(JSON.stringify(warn.mock.calls)).not.toContain("secret");
    expect(warn).toHaveBeenCalledTimes(2);
  });
});

describe("statistics", () => {
  it("handles empty records without NaN and counts repeated readings", () => {
    expect(aggregateReadings([]).averageElements.wood).toBe(0);
    const stats = aggregateReadings([row, { ...row, fortune_type: "legacy", time_accuracy: "known" }]);
    expect(stats.total).toBe(2);
    expect(stats.dayMasters[chart.pillars.day.stemElement]).toBe(2);
    expect(stats.averageElements).toEqual(chart.fiveElements);
    expect(stats.timeAccuracy).toEqual({ known: 1, unknown: 1 });
    expect(stats.topics.other).toBe(1);
  });
  it("reads all pages even when the server row cap is lower than requested", async () => {
    const query = { select: vi.fn().mockReturnThis(), lte: vi.fn().mockReturnThis(), order: vi.fn().mockReturnThis(), range: vi.fn().mockReturnThis(), abortSignal: vi.fn().mockResolvedValueOnce({ data: [row], count: 2, error: null }).mockResolvedValueOnce({ data: [{ ...row, id: "00000000-0000-4000-8000-000000000002" }], count: 2, error: null }) };
    getSupabase.mockReturnValue({ from: () => query });
    expect(await getReadings()).toHaveLength(2);
    expect(query.range.mock.calls).toEqual([[0, 999], [1, 1000]]);
    expect(query.lte.mock.calls[0]).toEqual(query.lte.mock.calls[1]);
  });
  it("rejects a failed query instead of presenting an empty dataset", async () => {
    const query = { select: vi.fn().mockReturnThis(), lte: vi.fn().mockReturnThis(), order: vi.fn().mockReturnThis(), range: vi.fn().mockReturnThis(), abortSignal: vi.fn().mockResolvedValue({ data: null, count: null, error: { message: "failed" } }) };
    getSupabase.mockReturnValue({ from: () => query });
    await expect(getReadings()).rejects.toThrow("Statistics unavailable");
  });
});
