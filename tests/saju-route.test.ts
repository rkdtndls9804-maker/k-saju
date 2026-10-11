import { afterEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ save: vi.fn(), gemini: vi.fn(), after: vi.fn() }));
vi.mock("@/lib/supabase/readings", () => ({ saveReading: mocks.save }));
vi.mock("@/lib/reading/gemini", () => ({ buildGeminiReading: mocks.gemini }));
vi.mock("next/server", async (original) => ({ ...await original<typeof import("next/server")>(), after: mocks.after }));
import { POST } from "@/app/api/saju/route";
afterEach(() => vi.resetAllMocks());

it("starts persistence before AI and retains the local reading on AI failure", async () => {
  mocks.save.mockResolvedValue(undefined);
  mocks.gemini.mockImplementation(async () => {
    expect(mocks.save).toHaveBeenCalledOnce();
    throw new Error("AI unavailable");
  });
  const response = await POST(new Request("http://localhost/api/saju", { method: "POST", body: JSON.stringify({ birthDate: "1990-03-15", birthTimeKnown: false, gender: "female", topic: "love" }) }));
  expect(response.status).toBe(200);
  expect((await response.json()).reading.source).toBe("local");
  expect(mocks.save.mock.calls[0][1]).toEqual({ gender: "female", fortuneType: "love" });
  expect(mocks.save.mock.calls[0][0]).not.toHaveProperty("birthDate");
  expect(mocks.after).toHaveBeenCalledOnce();
  await mocks.after.mock.calls[0][0]();
});

it("does not save invalid requests", async () => {
  const response = await POST(new Request("http://localhost/api/saju", { method: "POST", body: "{}" }));
  expect(response.status).toBe(400);
  expect(mocks.save).not.toHaveBeenCalled();
});
