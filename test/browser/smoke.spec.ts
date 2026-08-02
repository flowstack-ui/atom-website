import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("representative documentation routes render their primary heading", async ({ page }) => {
  for (const [path, heading] of [
    ["/", "Introduction"],
    ["/docs/overview/getting-started/", "Getting started"],
    ["/docs/components/button/", "Button"],
    ["/docs/utilities/hooks/", "Hooks"],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }
});

test("the page has no viewport-level horizontal overflow", async ({ page }) => {
  await page.goto("/docs/components/data-grid/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("the rendered documentation shell has no automated accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test("published internal navigation links resolve", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "one clean crawl owns route availability");
  await page.goto("/");
  const paths = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => (link as HTMLAnchorElement).pathname))],
  );
  expect(paths.length).toBeGreaterThan(70);
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), `${path} did not resolve`).toBeLessThan(400);
  }
});

test("mobile navigation opens, closes, and exposes documentation links", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation belongs to mobile profiles");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Atom UI documentation" })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation" }).click();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
});
