import { expect, test } from "@playwright/test";

test("completes the core chart flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /You know your zodiac/i })).toBeVisible();
  await page.getByRole("button", { name: /Discover my core element/i }).click();
  await page.getByLabel(/Birth date/).fill("1990-03-15");
  await page.getByLabel("Birth time", { exact: true }).fill("10:30");
  await page.getByRole("button", { name: /Read my chart/i }).click();
  await expect(page.getByRole("heading", { name: "Yin Earth" })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText("Your Four Pillars")).toBeVisible();
  await expect(page.getByLabel(/Birth date/)).toHaveValue("1990-03-15");
  await page.getByRole("button", { name: "Love", exact: true }).click();
  await expect(page.getByRole("button", { name: "Love", exact: true })).toHaveAttribute("aria-pressed", "true", { timeout: 30_000 });
  await expect(page.getByLabel(/Birth date/)).toHaveValue("1990-03-15");
});

test("switches the interface to Korean", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "한국어", exact: true }).click();
  await expect(page.getByRole("heading", { name: "별자리는 알고 있죠. 이제 나의 사주를 만나보세요." })).toBeVisible();
  await expect(page.getByRole("button", { name: "나의 중심 기운 알아보기" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "내 사주 보기" })).toBeVisible();
});
