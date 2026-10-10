<script lang="ts">
  import type { Snippet } from "svelte";
  import { openModal } from "./a11y.js";
  /** 가운데 모달(md 미만에선 아래 시트). bind:open. 네이티브 <dialog>를 showModal()로 열어 최상위 층에 뜨고, 뒤 화면은 inert가 됩니다.
      Esc·바깥 누르기로 닫힘(alert면 바깥 누르기로는 닫히지 않음). 닫으면 원래 자리로 포커스를 돌려줍니다. 2.1: 닫힐 때 애니메이션이 끝난 뒤 사라집니다. children = 버튼들 */
  let { open = $bindable(false), title, description, alert = false, onclose, children, class: className }:
    { open?: boolean; title: string; description?: string; alert?: boolean; onclose?: () => void; children?: Snippet; class?: string } = $props();
  const id = $props.id();
  let box = $state<HTMLDialogElement>();
  let closing = $state(false);
  function close() { open = false; onclose?.(); }
  $effect(() => openModal(box, open, { onClosing: (v) => (closing = v) }));
  function onclick(e: MouseEvent) {
    if (alert || e.target !== e.currentTarget) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
  }
</script>

{#if open || closing}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions — 바깥(backdrop) 누르기. 키보드는 Esc(cancel) -->
  <dialog bind:this={box} class={["bl-dialog bl-crema-thick", className]} role={alert ? "alertdialog" : undefined} data-closing={closing ? "true" : undefined}
    aria-labelledby={id} aria-describedby={description ? id + "-desc" : undefined} tabindex="-1"
    oncancel={(e) => { e.preventDefault(); close(); }} {onclick}>
    <h2 {id} class="bl-dialog-title">{title}</h2>
    {#if description}<p id={id + "-desc"} class="bl-dialog-body">{description}</p>{/if}
    {#if children}<div class="bl-dialog-actions">{@render children()}</div>{/if}
  </dialog>
{/if}
