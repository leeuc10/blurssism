<script lang="ts">
  let { width = "100%", height = 16, circle = false, class: className }: { width?: number | string; height?: number | string; circle?: boolean; class?: string } = $props();
  const px = (v: number | string) => (typeof v === "number" ? v + "px" : v);
</script>

<span class={["bl-skel", className]} aria-hidden="true" style:width={px(width)} style:height={px(height)}
  style:border-radius={circle ? "var(--radius-full)" : undefined}></span>
