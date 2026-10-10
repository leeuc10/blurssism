<script module lang="ts">
  /** trigger 스니펫이 받는 props. 여는 버튼에 그대로 펼칩니다 */
  export type PopoverTriggerProps = {
    onclick: (e: MouseEvent) => void; onpointerdown: (e: PointerEvent) => void;
    "aria-expanded": "true" | "false"; "aria-controls": string; "aria-haspopup": "dialog" | "menu" | "listbox" | "true";
  };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  /** 버튼을 누르면 그 아래(위)에 뜨는 두꺼운 크레마 패널(role="dialog"). bind:open. 네이티브 popover="auto"라 최상위 층에 뜨고 바깥 누르기·Esc로 닫힙니다.
      trigger 스니펫이 받은 props({ onclick, onpointerdown, "aria-expanded", "aria-controls", "aria-haspopup" })를 버튼에 펼칩니다:
      {#snippet trigger(props)}<Button {...props}>필터</Button>{/snippet} */
  let { open = $bindable(false), onopenchange, placement = "bottom-start", label, labelledby, haspopup = "dialog", trigger, children, class: className }: {
    open?: boolean; onopenchange?: (open: boolean) => void;
    /** 기본 "bottom-start". 아래가 모자라면 위로 뒤집힙니다 */
    placement?: "bottom-start" | "bottom-end" | "bottom" | "top";
    /** 스크린리더용 이름(aria-label). labelledby가 없으면 넣습니다 */
    label?: string; labelledby?: string;
    haspopup?: PopoverTriggerProps["aria-haspopup"];
    trigger?: Snippet<[PopoverTriggerProps]>; children?: Snippet; class?: string;
  } = $props();
  const id = $props.id();
  const FOCUSABLE = "button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";
  let anchor = $state<HTMLSpanElement>();
  let pop = $state<HTMLDivElement>();
  let downAt = 0;   // 열린 채로 트리거를 누르기 시작한 시각. 브라우저가 바깥 누르기로 먼저 닫은 뒤 click이 다시 열지 않게
  function set(next: boolean) { if (open === next) return; open = next; onopenchange?.(next); }
  const triggerProps = $derived<PopoverTriggerProps>({
    "aria-expanded": open ? "true" : "false", "aria-controls": id, "aria-haspopup": haspopup,
    onpointerdown: () => { downAt = open ? Date.now() : 0; },
    onclick: (e) => { if (e.defaultPrevented) return; const dismissed = downAt && Date.now() - downAt < 500; downAt = 0; set(dismissed ? false : !open); },
  });

  /** 트리거 기준으로 놓고, 아래(위)가 모자라면 반대쪽으로, 상하좌우는 화면 안으로 */
  function place(t: HTMLElement, a: Element) {
    const r = a.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight, gap = 8, pad = 8, vw = window.innerWidth, vh = window.innerHeight;
    let above = placement === "top";
    if (!above && r.bottom + gap + h > vh - pad && r.top - gap - h >= pad) above = true;
    else if (above && r.top - gap - h < pad && r.bottom + gap + h <= vh - pad) above = false;
    const x = placement === "bottom-end" ? r.right - w : placement === "bottom-start" ? r.left : r.left + r.width / 2 - w / 2;
    const y = above ? r.top - gap - h : r.bottom + gap;
    t.style.left = Math.round(Math.min(Math.max(x, pad), Math.max(pad, vw - w - pad))) + "px";
    t.style.top = Math.round(Math.min(Math.max(y, pad), Math.max(pad, vh - h - pad))) + "px";
    t.setAttribute("data-place", above ? "top" : "bottom");
  }
  $effect(() => {
    const t = pop, a = anchor?.firstElementChild ?? anchor;
    if (!t || !a || t === a) return;
    if (!open) {
      if (typeof t.showPopover === "function") { if (t.matches(":popover-open")) t.hidePopover(); } else t.removeAttribute("data-open");
      return;
    }
    if (typeof t.showPopover === "function") { if (!t.matches(":popover-open")) t.showPopover(); } else t.setAttribute("data-open", "");   // popover API가 없는 브라우저는 data-open
    const re = () => place(t, a);
    re();
    (t.querySelector<HTMLElement>(FOCUSABLE) ?? t).focus();
    window.addEventListener("resize", re);
    window.addEventListener("scroll", re, true);
    return () => {
      window.removeEventListener("resize", re);
      window.removeEventListener("scroll", re, true);
      const ae = document.activeElement;   // 다른 입력창을 눌러서 닫혔으면 그 포커스는 두고, 아니면 트리거로
      if (!ae || ae === document.body || t.contains(ae)) (a as HTMLElement).focus?.();
    };
  });
</script>

<span class="bl-popover-anchor" bind:this={anchor}>{@render trigger?.(triggerProps)}<div
  {id} bind:this={pop} popover="auto" role="dialog" aria-label={label} aria-labelledby={labelledby} tabindex="-1"
  class={["bl-popover bl-crema-thick", className]}
  ontoggle={(e) => { if (e.newState === "closed" && open) set(false); }}
  onkeydown={(e) => { if (e.key === "Escape") { e.stopPropagation(); set(false); } }}>{@render children?.()}</div></span>
