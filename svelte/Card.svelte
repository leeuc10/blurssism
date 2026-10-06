<script lang="ts">
  import type { Snippet } from "svelte";
  /** children = 하단 버튼들 (최대 2개) */
  let { eyebrow, title, quote, body, children, class: className }:
    { eyebrow?: string; title?: string; quote?: string; body?: string; children?: Snippet; class?: string } = $props();
</script>

<article class={["bl-card", className]}>
  {#if eyebrow}<p class="bl-card-eyebrow">{eyebrow}</p>{/if}
  {#if title}<h3 class="bl-card-title">{title}</h3>{/if}
  {#if quote}<p class="bl-card-quote">{quote}</p>{/if}
  {#if body}<p class="bl-card-body">{body}</p>{/if}
  {#if children}<div class="bl-card-actions">{@render children()}</div>{/if}
</article>
