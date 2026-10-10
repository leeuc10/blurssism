<script lang="ts">
  import type { Snippet } from "svelte";
  import { openModal } from "./a11y.js";
  /** 두꺼운 크레마 바텀시트. 2.1: bind:open을 쓰면 스스로 열고 닫는 모달(네이티브 <dialog>, scrim, Esc·바깥 누르기·손잡이 끌어내리기, 닫힘 애니메이션)이 되고,
      open을 넘기지 않으면 전처럼 자리에 그려지는 면입니다. md 이상에서는 가운데 카드로 뜹니다. children = 버튼들 */
  let { open = $bindable(), title, description, onclose, children, class: className }:
    { open?: boolean; title: string; description?: string; onclose?: () => void; children?: Snippet; class?: string } = $props();
  const id = $props.id();
  const modal = $derived(open !== undefined);
  let box = $state<HTMLDialogElement>();
  let closing = $state(false);
  let y0: number | null = null;
  function close() { open = false; onclose?.(); }
  $effect(() => openModal(box, modal && !!open, { onClosing: (v) => (closing = v) }));
  function onclick(e: MouseEvent) {
    if (e.target !== e.currentTarget) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
  }
  function down(e: PointerEvent) { y0 = e.clientY; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); if (box) box.style.transition = "none"; }
  function move(e: PointerEvent) { if (y0 === null || !box) return; box.style.transform = `translateY(${Math.max(0, e.clientY - y0)}px)`; }
  function up(e: PointerEvent) {
    if (y0 === null || !box) return;
    const dy = Math.max(0, e.clientY - y0); y0 = null;
    box.style.transition = ""; box.style.transform = "";
    if (dy > 80) close();
  }
</script>

{#snippet body()}
  <!-- svelte-ignore a11y_no_static_element_interactions — 손잡이 끌기. 키보드는 Esc -->
  <div class="bl-sheet-grip" aria-hidden="true" onpointerdown={modal ? down : undefined} onpointermove={modal ? move : undefined} onpointerup={modal ? up : undefined} onpointercancel={modal ? up : undefined}></div>
  <h2 {id} class="bl-sheet-title">{title}</h2>
  {#if description}<p id={id + "-desc"} class="bl-sheet-body">{description}</p>{/if}
  <div class="bl-sheet-actions">{@render children?.()}</div>
{/snippet}

{#if !modal}
  <div class={["bl-sheet bl-crema-thick", className]} role="dialog" aria-labelledby={id}>{@render body()}</div>
{:else if open || closing}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions — 바깥 누르기. 키보드는 Esc(cancel) -->
  <dialog bind:this={box} class={["bl-sheet bl-sheet-modal bl-crema-thick", className]} data-closing={closing ? "true" : undefined}
    aria-labelledby={id} aria-describedby={description ? id + "-desc" : undefined} tabindex="-1"
    oncancel={(e) => { e.preventDefault(); close(); }} {onclick}>{@render body()}</dialog>
{/if}
