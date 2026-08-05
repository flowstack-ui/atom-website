import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { atomVersion } from "../../src/lib/site";

const navigation = JSON.parse(readFileSync(new URL("../../content/navigation.json", import.meta.url), "utf8")) as {
  sections: Array<{ slug: string; documents: Array<{ slug: string; title: string }> }>;
};

const primitiveRoutes = navigation.sections
  .filter((section) => section.slug === "components" || section.slug === "utilities")
  .flatMap((section) => section.documents.map((document) => ({
    path: `/docs/${section.slug}/${document.slug}/`,
    title: document.title,
  })));

const representativeRoutes = [
  ["/", /Behavior at the smallest useful unit/i],
  ["/docs/", /Learn the behavior beneath the interface/i],
  ["/docs/overview/getting-started/", "Getting started"],
  ["/docs/components/", /Find the smallest contract/i],
  ["/docs/components/button/", "Button"],
  ["/docs/components/data-grid/", "Data Grid"],
  ["/docs/utilities/hooks/", "Hooks"],
] as const;

test("representative public routes render their primary heading", async ({ page }) => {
  for (const [path, heading] of representativeRoutes) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }
});

test("public routes expose route-specific social metadata and an isolated 404 identity", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "one canonical browser owns metadata qualification");

  const routes = [
    { path: "/docs/", title: "Documentation — Atom UI", description: "Learn Atom’s headless React primitives, accessibility contracts, composition model, and public API." },
    { path: "/docs/components/", title: "Primitives — Atom UI", description: "Browse Atom’s accessible headless React primitives by behavior and purpose." },
    { path: "/docs/components/button/", title: "Button — Atom UI", description: "Action primitive for native buttons, links, and custom button-like elements." },
  ];

  for (const route of routes) {
    await page.goto(route.path);
    const canonical = `https://atom-ui.com${route.path}`;
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", route.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", route.title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", route.description);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", route.title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", route.description);
  }

  const response = await page.goto("/missing-publication-check/");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle("Page not found — Atom UI");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
});

test("representative routes avoid viewport-level horizontal overflow", async ({ page }) => {
  for (const path of ["/", "/docs/", "/docs/components/", "/docs/components/data-grid/"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${path} overflowed the viewport`).toBeLessThanOrEqual(1);
  }
});

test("light and dark homepage and documentation have no automated accessibility violations", async ({ page }) => {
  for (const appearance of ["light", "dark"] as const) {
    await page.addInitScript((value) => localStorage.setItem("atom-website-appearance", value), appearance);
    for (const path of ["/", "/docs/overview/accessibility/", "/docs/components/button/"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-brick-appearance", appearance);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${appearance} ${path}\n${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
    }
  }
});

test("Command or Control K opens search and focuses the input", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
  const input = page.getByRole("searchbox", { name: "" });
  await expect(input).toBeVisible();
  await expect(input).toBeFocused();
  await input.fill("dialog focus");
  await expect(page.getByRole("button", { name: /Dialog/i }).first()).toBeVisible();
});

test("published internal navigation links resolve", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "one clean crawl owns route availability");
  const paths = new Set<string>();
  for (const entryPoint of ["/", "/docs/", "/docs/components/"]) {
    await page.goto(entryPoint);
    const discovered = await page.locator('a[href^="/"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).pathname));
    discovered.forEach((path) => paths.add(path));
  }
  expect(paths.size).toBeGreaterThan(70);
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), `${path} did not resolve`).toBeLessThan(400);
  }
});

test("mobile navigation opens, closes, and exposes the branded route set", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation belongs to mobile profiles");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await expect(page.getByText("Behavior at the smallest useful unit", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation" }).click();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
});

test("documentation mobile navigation exposes browse and page-outline drawers", async ({ page, isMobile }) => {
  test.skip(!isMobile, "responsive documentation controls belong to mobile profiles");
  await page.goto("/docs/components/button/");
  await page.getByRole("button", { name: "Browse" }).click();
  await expect(page.getByRole("navigation", { name: "Atom documentation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Atom primitives" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Actions \+ input\s+15/ })).toHaveAttribute("data-state", "open");
  await expect(page.getByRole("button", { name: /Utilities\s+6/ })).toBeVisible();
  await page.getByRole("button", { name: "Close documentation navigation" }).click();
  await page.getByRole("button", { name: "Open page outline" }).click();
  await expect(page.getByRole("navigation", { name: "Sections on this page" })).toBeVisible();
});

test("global documentation navigation has one mutually exclusive current section", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop header navigation owns visible section state");
  const routes = [
    ["/docs/guides/styling/", "Guides"],
    ["/docs/components/button/", "Primitives"],
    ["/docs/utilities/hooks/", "Primitives"],
    ["/docs/overview/accessibility/", "Accessibility"],
  ] as const;
  for (const [path, current] of routes) {
    await page.goto(path);
    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(navigation.locator("a.is-current")).toHaveCount(1);
    await expect(navigation.getByRole("link", { name: current })).toHaveClass(/is-current/);
  }
});

test("guide and primitive rails expose only their own information architecture", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop rail is replaced by scoped responsive drawers");
  await page.goto("/docs/guides/styling/");
  let navigation = page.getByRole("navigation", { name: "Atom documentation" });
  await expect(navigation.getByRole("link", { name: "Introduction", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Button", exact: true })).toHaveCount(0);
  await expect(navigation.getByRole("link", { name: "Hooks", exact: true })).toHaveCount(0);

  await page.goto("/docs/utilities/hooks/");
  navigation = page.getByRole("navigation", { name: "Atom documentation" });
  await expect(navigation.getByRole("button", { name: /Utilities\s+6/ })).toHaveAttribute("data-state", "open");
  await expect(navigation.getByRole("link", { name: "Hooks", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Introduction", exact: true })).toHaveCount(0);
});

test("primitive overview groups compact cards across components and utilities", async ({ page }) => {
  await page.goto("/docs/components/");
  await expect(page.getByText("70 primitives")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Utilities", exact: true })).toBeVisible();
  const hooksCard = page.locator("#primitive-category-utilities article").filter({ hasText: /^Hooks/ });
  await expect(hooksCard.locator('[data-slot="card-action"] [data-slot="badge"]')).toHaveText("Utilities");
  await expect(hooksCard).toHaveCSS("min-height", "0px");
  await expect(page.locator(".catalog-page__hero > .brick-badge")).toHaveCSS("gap", "6.4px");
});

test("documentation overview badge separates its icon from its label", async ({ page }) => {
  await page.goto("/docs/");
  await expect(page.locator(".docs-overview__hero > .brick-badge")).toHaveCSS("gap", "6.4px");
});

test("every public primitive route presents one live specimen and semantic feature signals", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "one canonical browser owns the complete primitive crawl");
  test.setTimeout(120_000);

  expect(primitiveRoutes).toHaveLength(70);
  for (const route of primitiveRoutes) {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { level: 1, name: route.title })).toBeVisible();
    await expect(page).toHaveTitle(`${route.title} — Atom UI`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://atom-ui.com${route.path}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${route.title} — Atom UI`);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `https://atom-ui.com${route.path}`);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", `${route.title} — Atom UI`);
    await expect(page.locator(".atom-example")).toHaveCount(1);
    await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
    await expect(page.locator(".atom-example__loading")).toHaveCount(0);
    const signals = page.locator(".feature-signals");
    await expect(signals, `${route.path} did not render Feature Signals`).toHaveCount(1);
    expect(await signals.locator(":scope > li").count(), `${route.path} has no feature entries`).toBeGreaterThan(0);
  }
});

test("live specimens expose meaningful behavior across every example family", async ({ page }) => {
  const cases = [
    ["/docs/components/button/", "button", "Launch sequence", /activation count: 1/],
    ["/docs/components/checkbox/", "checkbox", "Automatic launch window", /aria-checked: true/],
    ["/docs/components/tabs/", "tab", "Voice", /tab: voice/],
    ["/docs/components/accordion/", "button", "Keyboard behavior", /open panels: none/],
    ["/docs/components/data-grid/", "row", /Horizon Review Touch/, /selected row: Horizon/],
    ["/docs/utilities/virtualizer/", "button", "Advance virtual window", /offset 190px/],
  ] as const;

  for (const [path, role, name, signal] of cases) {
    await page.goto(path);
    const example = page.locator(".atom-example");
    await expect(example).toHaveAttribute("data-ready", "");
    await example.getByRole(role, { name }).click();
    await expect(example.locator(".atom-example__footer code")).toHaveText(signal);
  }

  await page.goto("/docs/components/dialog/");
  await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
  await page.locator(".atom-example").getByRole("button", { name: "Review launch" }).click();
  await expect(page.getByRole("dialog", { name: "Ready for launch?" })).toBeVisible();
  await page.getByRole("button", { name: "Keep editing" }).click();
  await expect(page.getByRole("dialog", { name: "Ready for launch?" })).toHaveCount(0);
});

test("repaired primitive specimens expose truthful state and stable geometry", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "one canonical browser owns the detailed specimen contract");

  await page.goto("/docs/components/field/");
  const fieldLabel = page.locator('.atom-example [data-slot="field-label"]');
  await expect(fieldLabel).toContainText("Project *");
  expect((await fieldLabel.textContent())?.match(/\*/g)).toHaveLength(1);

  await page.goto("/docs/components/nav-list/");
  await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
  const navList = page.locator(".atom-demo-nav-list");
  await navList.getByRole("link", { name: "Telemetry" }).click();
  await expect(navList.getByRole("link", { name: "Telemetry" })).toHaveAttribute("data-active", "");
  await expect(navList.getByRole("link", { name: "Overview" })).not.toHaveAttribute("data-active", "");

  await page.goto("/docs/components/pagination/");
  const pageControls = page.locator(".atom-demo-pagination li");
  const controlTops = await pageControls.evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().top)));
  expect(Math.max(...controlTops) - Math.min(...controlTops)).toBeLessThanOrEqual(2);
  await page.locator(".atom-demo-pagination").getByRole("button", { name: /Go to page 3/ }).click();
  await expect(page.getByText("Page 3 of 7", { exact: true })).toBeVisible();

  await page.goto("/docs/components/sidebar/");
  const sidebar = page.locator(".atom-demo-sidebar");
  await expect(sidebar).toHaveAttribute("data-state", "expanded");
  await sidebar.getByRole("button", { name: "Toggle navigation" }).click();
  await expect(sidebar).toHaveAttribute("data-state", "rail");
  const railContainment = await sidebar.evaluate((root) => {
    const panel = root.querySelector('[data-slot="sidebar-panel"]')!.getBoundingClientRect();
    const active = root.querySelector('nav a[data-active]')!.getBoundingClientRect();
    return { left: active.left - panel.left, right: panel.right - active.right };
  });
  expect(railContainment.left).toBeGreaterThanOrEqual(0);
  expect(railContainment.right).toBeGreaterThanOrEqual(0);

  await page.goto("/docs/components/context-menu/");
  await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
  const contextTarget = page.locator(".atom-demo-context-target");
  await expect(contextTarget).toHaveCSS("display", "grid");
  await expect(contextTarget).toHaveCSS("border-top-style", "dashed");
  await contextTarget.focus();
  await contextTarget.press("Shift+F10");
  await expect(page.getByRole("menu")).toBeVisible();
  await page.keyboard.press("Escape");

  await page.goto("/docs/components/popover/");
  await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
  await page.getByRole("button", { name: "Launch settings" }).click();
  await expect(page.locator(".atom-demo-popover")).toHaveCSS("gap", "16px");
  await expect(page.locator(".atom-demo-popover__footer")).toHaveCSS("padding-top", "16px");

  await page.goto("/docs/components/toast/");
  await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
  await page.locator(".atom-example").getByRole("button", { name: "Save mission" }).click();
  await expect(page.locator(".atom-demo-toast")).toBeVisible();
  await expect(page.locator(".atom-demo-toast")).toContainText("Mission saved");
  await page.getByRole("button", { name: "Dismiss notification" }).click();
  await expect(page.locator(".atom-demo-toast")).toBeHidden();

  await page.goto("/docs/components/progress/");
  const indicator = page.locator('.atom-demo-progress [data-slot="progress-indicator"]');
  await expect(indicator).toHaveAttribute("data-percent", "68");
  const initialWidth = await indicator.evaluate((element) => element.getBoundingClientRect().width);
  await page.getByRole("button", { name: "Advance validation" }).click();
  await page.waitForTimeout(250);
  expect(await indicator.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(initialWidth);

  await page.goto("/docs/components/swipeable-item/");
  const swipeGeometry = await page.locator(".atom-demo-swipe").evaluate((root) => {
    const content = root.querySelector('[data-slot="swipeable-item-content"]')!;
    const rootBox = root.getBoundingClientRect();
    const contentBox = content.getBoundingClientRect();
    return { left: contentBox.left - rootBox.left, right: rootBox.right - contentBox.right };
  });
  expect(Math.abs(swipeGeometry.left)).toBeLessThanOrEqual(2);
  expect(Math.abs(swipeGeometry.right)).toBeLessThanOrEqual(2);

  await page.goto("/docs/components/tree/");
  await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
  const treeBranch = page.locator('.atom-demo-tree [role="treeitem"][data-value="northstar"]');
  await expect(treeBranch).toHaveAttribute("aria-expanded", "true");
  await treeBranch.locator(':scope > [data-slot="tree-item-text"]').click();
  await expect(treeBranch).toHaveAttribute("aria-expanded", "false");

  await page.goto("/docs/components/tree-grid/");
  await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
  const treeGridBranch = page.locator('.atom-demo-tree-grid [role="row"][data-value="flight"]');
  await expect(treeGridBranch).toHaveAttribute("aria-expanded", "true");
  await treeGridBranch.getByRole("rowheader").click();
  await expect(treeGridBranch).toHaveAttribute("aria-expanded", "false");

  const expandableWidths: number[] = [];
  for (const slug of ["accordion", "collapsible", "tree", "tree-grid"]) {
    await page.goto(`/docs/components/${slug}/`);
    await expect(page.locator(".atom-example")).toHaveAttribute("data-ready", "");
    expandableWidths.push(await page.locator(`.atom-demo-${slug}`).evaluate((element) => element.getBoundingClientRect().width));
  }
  expect(Math.max(...expandableWidths) - Math.min(...expandableWidths)).toBeLessThanOrEqual(1);
});

test("live example families have no automated accessibility violations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "one canonical browser owns the category accessibility matrix");
  test.setTimeout(90_000);

  for (const appearance of ["light", "dark"] as const) {
    await page.addInitScript((value) => localStorage.setItem("atom-website-appearance", value), appearance);
    for (const path of [
      "/docs/components/button/",
      "/docs/components/checkbox/",
      "/docs/components/tabs/",
      "/docs/components/dialog/",
      "/docs/components/data-grid/",
      "/docs/components/accordion/",
      "/docs/utilities/hooks/",
    ]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${appearance} ${path}\n${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
    }
  }
});

test("mobile example canvas keeps its status badge and specimens inside a usable viewport", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile canvas geometry belongs to mobile profiles");
  for (const path of ["/docs/components/button/", "/docs/components/data-grid/", "/docs/components/file-upload/", "/docs/components/tree/"]) {
    await page.goto(path);
    const example = page.locator(".atom-example");
    const badge = example.getByText("Interactive", { exact: true });
    await expect(badge).toBeVisible();
    const geometry = await example.evaluate((element) => ({
      viewportOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      canvasScrollable: element.querySelector(".atom-example__canvas")!.scrollWidth >= element.querySelector(".atom-example__canvas")!.clientWidth,
    }));
    expect(geometry.viewportOverflow, `${path} overflowed the mobile viewport`).toBeLessThanOrEqual(1);
    expect(geometry.canvasScrollable).toBe(true);
  }
});

test("primitive navigation keeps readable rows, continuous dividers, and Atom focus color", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop rail and top navigation are hidden on mobile profiles");
  await page.goto("/docs/components/");

  const primaryLink = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Primitives" });
  await primaryLink.focus();
  await expect(primaryLink).toHaveCSS("outline-style", "solid");
  await expect(primaryLink).toHaveCSS("outline-width", "2px");

  const categoryFilter = page.locator(".catalog-filters").getByRole("button", { name: "All" });
  await categoryFilter.focus();
  const focusColors = await categoryFilter.evaluate((element) => {
    const probe = document.createElement("span");
    probe.style.color = getComputedStyle(document.documentElement).getPropertyValue("--site-focus-ring");
    document.body.append(probe);
    const result = { expected: getComputedStyle(probe).color, actual: getComputedStyle(element).outlineColor };
    probe.remove();
    return result;
  });
  expect(focusColors.actual).toBe(focusColors.expected);

  const rail = page.getByRole("navigation", { name: "Atom documentation" });
  const trigger = rail.getByRole("button", { name: /Actions \+ input\s+15/ });
  await trigger.focus();
  await expect(trigger).not.toHaveCSS("box-shadow", "none");
  await trigger.press("Enter");
  await expect(trigger).toHaveAttribute("data-state", "open");
  await expect(trigger).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(trigger).toHaveCSS("border-radius", "0px");
  const firstPrimitive = rail.getByRole("link", { name: "Button", exact: true });
  await expect(firstPrimitive).toHaveCSS("font-size", "13.44px");
});

test("accessibility guide presents input channels and shared ownership", async ({ page }) => {
  await page.goto("/docs/overview/accessibility/");
  await expect(page.getByRole("heading", { level: 1, name: "Accessibility" })).toBeVisible();
  const tabs = page.getByRole("tablist", { name: "Inspect accessibility behavior by input channel" });
  await expect(tabs.getByRole("tab")).toHaveCount(4);
  await tabs.getByRole("tab", { name: "Screen reader" }).click();
  await expect(page.getByText("Relationships that can be announced")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Accessibility is a shared contract" })).toBeVisible();
});

test("404 route keeps the site shell and recovery actions", async ({ page }) => {
  const response = await page.goto("/a-particle-that-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
  const actions = page.locator(".not-found .hero-actions");
  await expect(actions).toHaveCSS("gap", "12px");
  const eyebrowGap = await page.locator(".not-found .icon-label-badge").evaluate((element) => Number.parseFloat(getComputedStyle(element).columnGap));
  expect(eyebrowGap).toBeGreaterThanOrEqual(7);
});

test("homepage and documentation load without browser exceptions", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "networkidle" });
  await page.goto("/docs/components/button/", { waitUntil: "networkidle" });
  expect(errors).toEqual([]);
});

test("desktop documentation navigation owns a usable native scroll region", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop rail is replaced by responsive drawers");
  await page.goto("/docs/components/button/");
  const rail = page.locator(".docs-sidebar__scroll");
  await expect(rail).toBeVisible();
  const geometry = await rail.evaluate((element) => ({ clientHeight: element.clientHeight, scrollHeight: element.scrollHeight }));
  expect(geometry.scrollHeight).toBeGreaterThan(geometry.clientHeight);
  await rail.evaluate((element) => element.scrollTo({ top: element.scrollHeight }));
  await expect.poll(() => rail.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
});

test("homepage focus indicators follow their visible control geometry", async ({ page }) => {
  await page.goto("/");

  const eyebrowGap = await page.locator(".home-hero .icon-label-badge").evaluate((element) => Number.parseFloat(getComputedStyle(element).columnGap));
  expect(eyebrowGap).toBeGreaterThanOrEqual(7);

  const brand = page.getByRole("link", { name: `Atom v${atomVersion}` });
  await brand.focus();
  await expect(brand).toHaveCSS("outline-style", "solid");
  await expect(brand).toHaveCSS("border-radius", "11.2px");

  const tab = page.getByRole("tab", { name: "Keyboard" });
  await tab.focus();
  await expect(tab).toHaveCSS("outline-style", "none");
  await expect(tab).not.toHaveCSS("box-shadow", "none");

  const accordionTrigger = page.getByRole("button", { name: /Does Atom include visual styles/i });
  await accordionTrigger.focus();
  await expect(accordionTrigger).toHaveCSS("outline-style", "none");
  await expect(accordionTrigger).not.toHaveCSS("box-shadow", "none");
  await expect(accordionTrigger).not.toHaveCSS("border-radius", "0px");

  const footerLink = page.getByRole("link", { name: "Get started" }).last();
  await footerLink.focus();
  await expect(footerLink).toHaveCSS("outline-style", "none");
  await expect(footerLink.locator("span")).toHaveCSS("outline-style", "solid");
});

test("header brand passes strict visible-label matching", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withRules(["label-content-name-mismatch"]).analyze();
  expect(results.violations).toEqual([]);
});

test("mobile navigation keeps square focus geometry and centers icon-copy pairs", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile drawer geometry belongs to mobile profiles");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();

  const close = page.getByRole("button", { name: "Close navigation" });
  await close.focus();
  const closeGeometry = await close.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height, radius: getComputedStyle(element).borderRadius };
  });
  expect(Math.abs(closeGeometry.width - closeGeometry.height)).toBeLessThanOrEqual(1);
  expect(closeGeometry.radius).not.toBe("0px");

  const home = page.getByRole("link", { name: /Home/ });
  const alignment = await home.evaluate((element) => {
    const icon = element.querySelector(".brick-nav-list__link-start")?.getBoundingClientRect();
    const copy = element.querySelector(".brick-nav-list__link-content")?.getBoundingClientRect();
    return icon && copy ? Math.abs(icon.top + icon.height / 2 - (copy.top + copy.height / 2)) : null;
  });
  expect(alignment).not.toBeNull();
  expect(alignment!).toBeLessThanOrEqual(1);
  const footer = page.locator(".mobile-drawer__footer");
  await expect(footer).toHaveCSS("justify-content", "stretch");
  await expect(footer).toHaveCSS("justify-items", "center");
  await expect(footer).toHaveCSS("text-align", "center");
  const footerCenters = () => footer.evaluate((element) => {
    const center = (rect: DOMRect) => rect.left + rect.width / 2;
    const footerRect = element.getBoundingClientRect();
    const proofRect = element.querySelector(".drawer-proof")?.getBoundingClientRect();
    const buttonRect = element.querySelector(".brick-button")?.getBoundingClientRect();
    return proofRect && buttonRect
      ? Math.max(Math.abs(center(footerRect) - center(proofRect)), Math.abs(center(footerRect) - center(buttonRect)))
      : Number.POSITIVE_INFINITY;
  });
  await expect.poll(footerCenters).toBeLessThanOrEqual(1);
});

test("code block focus geometry follows the rounded lower surface", async ({ page }) => {
  await page.goto("/docs/overview/getting-started/");
  const codeViewport = page.locator(".brick-code-block-content").last();
  await codeViewport.focus();
  await expect(codeViewport).toHaveCSS("outline-style", "solid");
  await expect(codeViewport).toHaveCSS("outline-offset", "-2px");
  await expect(codeViewport).not.toHaveCSS("border-bottom-left-radius", "0px");
  await expect(codeViewport).not.toHaveCSS("border-bottom-right-radius", "0px");

  await page.goto("/docs/components/button/");
  const tableViewport = page.locator(".markdown-table-wrap").first();
  await tableViewport.focus();
  await expect(tableViewport).toHaveCSS("outline-style", "solid");
  await expect(tableViewport).toHaveCSS("outline-offset", "-2px");
});

test("long and short code blocks disable mobile WebKit text inflation", async ({ page, isMobile, browserName }) => {
  test.skip(!isMobile || browserName !== "webkit", "iPhone WebKit owns automatic text-inflation behavior");
  await page.goto("/docs/overview/getting-started/");

  const codeBlocks = page.locator(".brick-code-block-pre");
  await expect(codeBlocks).toHaveCount(5);
  const typography = await codeBlocks.evaluateAll((elements) => elements.map((element) => {
    const style = getComputedStyle(element);
    return { fontSize: style.fontSize };
  }));
  const hasWebKitInflationGuard = await page.evaluate(async () => {
    const stylesheets = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')];
    const css = (await Promise.all(stylesheets.map(async ({ href }) => (await fetch(href)).text()))).join("\n");
    return css.includes(".markdown-body .brick-code-block-pre") && css.includes("-webkit-text-size-adjust:none");
  });

  expect(new Set(typography.map(({ fontSize }) => fontSize))).toEqual(new Set(["16px"]));
  expect(hasWebKitInflationGuard).toBe(true);
});

test("guide pagination keeps content-sized destinations", async ({ page }) => {
  await page.goto("/docs/overview/getting-started/");
  const pagination = page.locator(".guide-pagination");
  const links = pagination.getByRole("link");
  await expect(links.first()).toBeVisible();
  const geometry = await pagination.evaluate((element) => {
    const grid = element.getBoundingClientRect();
    return [...element.querySelectorAll("a")].map((link) => link.getBoundingClientRect().width / grid.width);
  });
  expect(geometry.every((ratio) => ratio < 0.5)).toBe(true);
});
