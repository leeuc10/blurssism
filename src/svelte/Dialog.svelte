<script lang="ts">
  import type { Snippet } from "svelte";
  /** 가운데 모달(md 미만에선 아래 시트). bind:open, Esc·바깥 클릭으로 닫힘, 포커스 가두기. children = 버튼들 */
  let { open = $bindable(false), title, description, alert = false, onclose, children, class: className }:
    { open?: boolean; title: string; description?: string; alert?: boolean; onclose?: () => void; children?: Snippet; class?: string } = $props();
  const id = $props.id();
  let box = $state<HTMLDivElement>();
  const FOCUSABLE = "button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex='-1'])";
  function close() { open = false; onclose?.(); }
  $effect(() => {
    if (!open || !box) return;
    const prev = document.activeElement as HTMLElement | null;
    (box.querySelector<HTMLElement>(FOCUSABLE) ?? box).focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !box) return;
      const all = box.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!all.length) return;
      const a = all[0], z = all[all.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus?.(); };
  });
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="bl-scrim" onmousedown={(e) => { if (e.target === e.currentTarget) close(); }}>
    <div bind:this={box} class={["bl-dialog bl-crema-thick bl-glass-thick", className]} role={alert ? "alertdialog" : "dialog"} aria-modal="true" aria-labelledby={id} tabindex="-1">
      <h2 {id} class="bl-dialog-title">{title}</h2>
      {#if description}<p class="bl-dialog-body">{description}</p>{/if}
      {#if children}<div class="bl-dialog-actions">{@render children()}</div>{/if}
    </div>
  </div>
{/if}
