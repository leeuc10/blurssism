<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Breakpoint } from "./types.js";
  /** columns: 숫자 또는 { xs, sm, md, lg, xl } — 생략한 단계는 아래 단계 값을 이어받습니다. */
  let { columns = { xs: 1, sm: 2, lg: 3 }, gap, as = "div", children, class: className }: {
    columns?: number | Partial<Record<Breakpoint, number>>;
    gap?: "space-1" | "space-2" | "space-3" | "space-4" | "space-5" | "space-6" | "space-8" | "space-12";
    as?: string; children?: Snippet; class?: string;
  } = $props();
  const style = $derived.by(() => {
    const c = typeof columns === "number" ? { xs: columns } : columns;
    let last = 1;
    const parts = (["xs", "sm", "md", "lg", "xl"] as const).map((bp) => { if (c[bp] != null) last = c[bp]!; return `--bl-cols-${bp}: ${last}`; });
    if (gap) parts.push(`--bl-grid-gap: var(--${gap})`);
    return parts.join("; ");
  });
</script>

<svelte:element this={as} class={["bl-autogrid", className]} {style}>{@render children?.()}</svelte:element>
