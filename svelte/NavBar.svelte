<script lang="ts">
  import type { Snippet } from "svelte";
  import IconButton from "./IconButton.svelte";
  /** 앱: onback + title + actions · 웹: title + links + actions. md 미만에서는 links가 숨겨집니다. */
  let { title, onback, links, actions, class: className }: {
    title: string | Snippet; onback?: () => void; links?: { href: string; label: string; current?: boolean }[]; actions?: Snippet; class?: string;
  } = $props();
</script>

<header class={["bl-navbar bl-glass", className]}>
  {#if onback}<IconButton icon="chevron-left" label="뒤로" plain onclick={onback} />{/if}
  <p class="bl-navbar-title">{#if typeof title === "string"}{title}{:else}{@render title()}{/if}</p>
  {#if links}
    <nav class="bl-navbar-links" aria-label="주요 메뉴">
      {#each links as l (l.href)}<a href={l.href} class="bl-navbar-link" aria-current={l.current ? "page" : undefined}>{l.label}</a>{/each}
    </nav>
  {/if}
  {@render actions?.()}
</header>
