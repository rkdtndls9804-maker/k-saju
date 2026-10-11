import { expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import StatsPage from "@/app/stats/page";
import { calculateSaju } from "@/lib/saju/engine";
import { toReadingInsert } from "@/lib/supabase/schema";

const mocks = vi.hoisted(() => ({ readings: vi.fn() }));
vi.mock("@/lib/supabase/readings", () => ({ getReadings: mocks.readings }));
vi.mock("next/server", () => ({ connection: async () => {} }));

it("distinguishes empty data from unavailable statistics", async () => {
  mocks.readings.mockResolvedValueOnce([]);
  expect(renderToStaticMarkup(await StatsPage())).toContain("아직 기록된 사주가 없어요");
  mocks.readings.mockRejectedValueOnce(new Error("private error"));
  const failed = renderToStaticMarkup(await StatsPage());
  expect(failed).toContain("통계를 불러오지 못했어요");
  expect(failed).not.toContain("private error");
});

it("renders real distributions and a count-based explanation", async () => {
  const chart = calculateSaju({ locale: "ko", birthDate: "1990-03-15", birthTimeKnown: false, gender: "female", topic: "love" });
  mocks.readings.mockResolvedValueOnce([{ ...toReadingInsert(chart, { fortuneType: "love" }), id: "test", created_at: "2026-01-01" }]);
  const html = renderToStaticMarkup(await StatsPage());
  for (const text of ["누적 계산 건수", "평균 오행 분포", "일간의 음양", "100%", "재조회와 주제 변경"]) expect(html).toContain(text);
  expect(html).not.toContain("NaN");
});
