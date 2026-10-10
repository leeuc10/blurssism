// blurssism 시각 회귀 테스트 설정 · © caffeinecat · MIT
// `npm run visual`: 예시 페이지를 Chromium으로 찍어 scripts/visual/snapshots의 기준 이미지와 비교합니다. 기준을 갱신하려면 `npm run visual:update`.
// 기준 이미지는 찍은 OS의 글꼴 렌더링을 따르므로, 로컬(macOS)에서 비교하고 CI는 스크린샷을 artifact로 올려 눈으로 봅니다.
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "scripts/visual",
  snapshotPathTemplate: "{testDir}/snapshots/{arg}{ext}",
  fullyParallel: true,
  workers: 4,
  retries: 0,
  reporter: process.env.CI ? "list" : [["list"], ["html", { open: "never", outputFolder: "scripts/visual/report" }]],
  outputDir: "scripts/visual/results",
  use: { baseURL: "http://127.0.0.1:8766", colorScheme: "light", locale: "ko-KR", deviceScaleFactor: 1 },
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.005, animations: "disabled", caret: "hide" } },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1200, height: 800 } } },
    { name: "phone", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, hasTouch: true } },
  ],
  webServer: { command: "python3 -m http.server 8766", url: "http://127.0.0.1:8766/index.html", reuseExistingServer: !process.env.CI, timeout: 20000 },
});
