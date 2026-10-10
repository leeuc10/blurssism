/* blurssism React · useBreakpoint · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React } from "./_shared.js";
import { getBreakpoint, onBreakpointChange } from "../utils.js";

/* 화면 단계("xs"…"xl"). 서버와 첫 렌더에서는 null이라 하이드레이션이 어긋나지 않습니다. */
export function useBreakpoint() {
  return React.useSyncExternalStore(onBreakpointChange, function () { return getBreakpoint(); }, function () { return null; });
}
