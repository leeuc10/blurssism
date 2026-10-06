/* 지금 화면 단계를 반응형으로 돌려줍니다. 컴포넌트 초기화 중에 부르세요.
   const bp = breakpoint();  {#if bp.current === "xs"}…{/if}
   서버와 첫 렌더에서는 null이라 하이드레이션이 어긋나지 않습니다. */
import { getBreakpoint, onBreakpointChange } from "./utils.js";
import type { Breakpoint } from "./types.js";

export function breakpoint() {
  let current = $state<Breakpoint | null>(null);
  $effect(() => {
    current = getBreakpoint() as Breakpoint;
    return onBreakpointChange((bp: string) => (current = bp as Breakpoint));
  });
  return { get current() { return current; } };
}
