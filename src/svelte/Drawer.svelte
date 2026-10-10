<script lang="ts">
  import type { Snippet } from "svelte";
  import IconButton from "./IconButton.svelte";
  import { locale } from "./locale.svelte.js";
  import { isAtLeast, onBreakpointChange } from "./utils.js";
  /** 옆에서 미끄러져 들어오는 두꺼운 크레마 패널. bind:open. 네이티브 <dialog>를 showModal()로 열어 최상위 층에 뜨고 뒤 화면은 inert,
      Esc·바깥 누르기로 닫히며 닫힐 때는 반대로 미끄러져 나갑니다(data-closing → animationend → close()).
      persistentFrom("lg"·"xl")을 주면 그 단계부터 불투명한 <aside class="bl-drawer-persistent">가 대신 보이고(미디어쿼리) 다이얼로그는 열지 않습니다. */
  let { open = $bindable(false), onclose, side = "left", title, label, width = 320, persistentFrom = false, children, class: className }: {
    open?: boolean; onclose?: () => void;
    /** 기본 "left" */
    side?: "left" | "right";
    /** 머리글 제목(h2, aria-labelledby) */
    title?: string;
    /** title이 없을 때 스크린리더용 이름 */
    label?: string;
    /** 기본 320(px). 85vw를 넘지 않습니다 */
    width?: number | string;
    /** 이 단계부터는 다이얼로그 대신 인라인 <aside>. 기본 false */
    persistentFrom?: "lg" | "xl" | false;
    children?: Snippet; class?: string;
  } = $props();
  const id = $props.id();
  const L = $derived(locale.current);
  const FOCUSABLE = "button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";
  const cssWidth = $derived(typeof width === "number" ? width + "px" : width);
  let box = $state<HTMLDialogElement>();
  let closing = $state(false);
  let wide = $state(false);
  $effect(() => {
    const bp = persistentFrom;
    if (!bp) { wide = false; return; }
    wide = isAtLeast(bp);
    return onBreakpointChange(() => { wide = isAtLeast(bp); });
  });
  const modalOpen = $derived(open && !wide);
  const visible = $derived(modalOpen || closing);
  function close() { open = false; onclose?.(); }
  function finish() { closing = false; if (box?.open) box.close(); }
  $effect(() => {
    const d = box;
    if (!d) return;
    if (!modalOpen) { if (d.open) closing = true; return; }   // 열려 있던 것을 닫을 때: 애니메이션이 끝난 뒤 close()
    closing = false;
    const prev = document.activeElement as HTMLElement | null;
    if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
    (d.querySelector<HTMLElement>(FOCUSABLE) ?? d).focus();
    return () => { prev?.focus?.(); };
  });
  $effect(() => {   // 동작 줄이기 등으로 애니메이션이 없으면 바로 닫습니다
    if (!closing) return;
    const t = setTimeout(finish, 400);
    return () => clearTimeout(t);
  });
  function onclick(e: MouseEvent) {
    if (e.target !== e.currentTarget) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions — 바깥(backdrop) 누르기. 키보드는 Esc(cancel) -->
<dialog bind:this={box} class={["bl-drawer bl-crema-thick", persistentFrom && "bl-hide-from-" + persistentFrom, className]} data-side={side}
  data-closing={closing ? "true" : undefined} style:--bl-drawer-width={cssWidth}
  aria-labelledby={title ? id : undefined} aria-label={title ? undefined : label} tabindex="-1"
  oncancel={(e) => { e.preventDefault(); close(); }} {onclick}
  onanimationend={(e) => { if (closing && e.target === box) finish(); }}>
  {#if visible}
    <div class="bl-drawer-head">
      {#if title}<h2 {id} class="bl-drawer-title">{title}</h2>{:else}<span></span>{/if}
      <IconButton icon="close" label={L.close} plain class="bl-drawer-close" onclick={close} />
    </div>
    <div class="bl-drawer-body">{@render children?.()}</div>
  {/if}
</dialog>
{#if persistentFrom}
  <aside class={["bl-drawer bl-drawer-persistent", "bl-hide-below-" + persistentFrom, className]} data-side={side} style:--bl-drawer-width={cssWidth}
    aria-labelledby={title ? id + "-p" : undefined} aria-label={title ? undefined : label}>
    {#if title}<div class="bl-drawer-head"><h2 id={id + "-p"} class="bl-drawer-title">{title}</h2></div>{/if}
    <div class="bl-drawer-body">{@render children?.()}</div>
  </aside>
{/if}
