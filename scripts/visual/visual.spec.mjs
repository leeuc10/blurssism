// blurssism 시각 회귀 테스트 · © caffeinecat · MIT
// 예시 페이지(examples/components/*.html)를 팔레트·테마별로 찍어 기준 이미지와 비교합니다. 질감·간격·색이 바뀌면 여기서 잡힙니다.
import { test, expect } from "@playwright/test";

const PAGES = [
  // [이름, 경로, 열어 둘 것(선택)]
  ["blurema", "Blurema"], ["app-screen", "AppScreen"], ["web-landing", "WebLanding"], ["cover", "Cover"],
  ["button", "Button"], ["navbar", "NavBar"], ["tabbar", "TabBar"], ["textfield", "TextField"], ["card", "Card"],
  ["alert", "Alert"], ["tabs", "Tabs"], ["accordion", "Accordion"], ["pagination", "Pagination"], ["toast", "Toast"], ["sheet", "Sheet"],
  ["dialog", "Dialog"], ["menu", "Menu", "button"], ["popover", "Popover", "button"], ["drawer", "Drawer", "button"],
];
const VARIANTS = [
  ["light-black", "theme=light&palette=black&background=cream"],
  ["dark-matcha", "theme=dark&palette=matcha&background=cream"],
  ["light-pink-white", "theme=light&palette=pink&background=white"],
];

for (const [name, file, open] of PAGES) {
  for (const [variant, query] of VARIANTS) {
    test(`${name} · ${variant}`, async ({ page }) => {
      // 글꼴은 CDN 대신 패키지에 든 파일로, React UMD도 node_modules의 파일로(네트워크·버전과 무관하게 같은 결과)
      await page.route("**/dist/fonts.css", (r) => r.continue({ url: r.request().url().replace("fonts.css", "fonts.local.css") }));
      await page.route("**/react@*/umd/react.production.min.js", (r) => r.fulfill({ path: "node_modules/react/umd/react.production.min.js", contentType: "application/javascript" }));
      await page.route("**/react-dom@*/umd/react-dom.production.min.js", (r) => r.fulfill({ path: "node_modules/react-dom/umd/react-dom.production.min.js", contentType: "application/javascript" }));
      await page.route(/https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (r) => r.abort());   // 그 밖의 네트워크는 막습니다
      await page.goto(`/examples/components/${file}.html?${query}`, { waitUntil: "networkidle" });
      await page.waitForFunction(() => { const r = document.getElementById("root"); return !r || r.children.length > 0; });   // React가 그린 뒤(정적 페이지는 바로)
      await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; animation-duration: 0s !important; }" });   // 색 전환·등장 애니메이션을 끝낸 상태로
      // 글꼴이 실제로 내려와 적용된 뒤에 찍습니다(fonts.ready만으로는 아직 요청 전일 수 있음). 쓰는 굵기를 모두 미리 받습니다.
      await page.evaluate(async () => {
        const loads = [];
        for (const w of [400, 500, 600, 700]) loads.push(document.fonts.load(`${w} 16px "Blurssism Sans"`));
        for (const w of [400, 700]) loads.push(document.fonts.load(`${w} 16px "Blurssism Serif"`));
        await Promise.all(loads);
        await document.fonts.ready;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));   // 글꼴 교체가 그려진 뒤
      });
      if (open) { await page.locator(open).first().click(); await page.waitForTimeout(400); }
      await page.waitForTimeout(200);
      // toHaveScreenshot의 "안정될 때까지 다시 찍기"는 블러 면이 있는 페이지에서 끝나지 않을 수 있어, 한 장만 찍어 비교합니다
      const shot = await page.screenshot({ fullPage: !open, animations: "disabled", caret: "hide" });
      expect(shot).toMatchSnapshot(`${name}--${variant}--${test.info().project.name}.png`, { maxDiffPixelRatio: 0.005 });
    });
  }
}
