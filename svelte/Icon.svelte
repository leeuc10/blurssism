<script lang="ts">
  import { PATHS } from "./icons.js";
  import type { IconName } from "./types.js";
  let { name, filled = false, class: className }: { name: IconName; filled?: boolean; class?: string } = $props();
</script>

<svg viewBox="0 0 24 24" aria-hidden="true" fill={filled && name === "heart" ? "currentColor" : "none"} stroke="currentColor"
  stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class={className}><path d={(PATHS as Record<string, string>)[name] ?? ""} /></svg>
