import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
});

test("공개 데모의 라디오 묶음은 방향키로 선택과 포커스를 옮긴다", async ({ page }) => {
  await page.goto("/index.html", { waitUntil: "domcontentloaded" });
  const black = page.locator('#picker [data-palette="black"]');
  await black.focus();
  await black.press("ArrowRight");
  const espresso = page.locator('#picker [data-palette="espresso"]');
  await expect(espresso).toHaveAttribute("aria-checked", "true");
  await expect(espresso).toBeFocused();
  await expect(black).toHaveAttribute("tabindex", "-1");

  const cream = page.locator('#bgpicker [data-background="cream"]');
  await cream.focus();
  await cream.press("End");
  const gray = page.locator('#bgpicker [data-background="gray"]');
  await expect(gray).toHaveAttribute("aria-checked", "true");
  await expect(gray).toBeFocused();
});

test("좁은 터치 화면에서 달력은 카드 안에서 스크롤하고 날짜 칸은 44px이다", async ({ page }, info) => {
  test.skip(info.project.name !== "phone", "터치 환경에서만 적용되는 규칙");
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/index.html", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => [...document.styleSheets].some((sheet) => sheet.href?.endsWith("/dist/bundle.css")));
  const dimensions = await page.evaluate(() => {
    const host = document.createElement("div");
    host.className = "bl-root";
    host.style.cssText = "position:fixed;left:0;top:0;width:288px;z-index:9999";
    host.innerHTML = '<div class="bl-cal"><div class="bl-cal-grid">' + '<button class="bl-cal-day">1</button>'.repeat(7) + "</div></div>";
    document.body.append(host);
    const card = host.querySelector(".bl-cal");
    const grid = host.querySelector(".bl-cal-grid");
    const day = host.querySelector(".bl-cal-day");
    return { cardWidth: card.getBoundingClientRect().width, clientWidth: card.clientWidth, scrollWidth: card.scrollWidth,
      gridWidth: grid.getBoundingClientRect().width, gridMinWidth: getComputedStyle(grid).minWidth,
      dayHeight: day.getBoundingClientRect().height, coarse: matchMedia("(pointer: coarse)").matches };
  });
  expect(dimensions.coarse).toBe(true);
  expect(dimensions.cardWidth).toBeLessThanOrEqual(288);
  expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.clientWidth);
  expect(dimensions.dayHeight).toBeGreaterThanOrEqual(44);
});

test("강조색 면적 검사는 토큰 색 그라디언트도 센다", async ({ page }) => {
  await page.goto("/index.html", { waitUntil: "domcontentloaded" });
  const hasAreaWarning = await page.evaluate(async () => {
    const { checkCrema } = await import("/dist/utils.mjs");
    const fill = document.createElement("div");
    fill.style.cssText = "position:fixed;inset:0;background-image:linear-gradient(var(--accent),var(--accent));z-index:9999";
    document.body.append(fill);
    return checkCrema({ accentMax: 0.5 }).some((issue) => issue.code === "accent-area" && issue.elements.includes(fill));
  });
  expect(hasAreaWarning).toBe(true);
});
