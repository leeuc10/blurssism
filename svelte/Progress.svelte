<script lang="ts">
  let { value, max = 100, label, valueText, class: className }: { value: number; max?: number; label?: string; valueText?: string; class?: string } = $props();
  const pct = $derived(Math.max(0, Math.min(100, (value / max) * 100)));
</script>

<div class={["bl-progress", className]}>
  {#if label}<div class="bl-progress-head"><span>{label}</span><span>{valueText ?? Math.round(pct) + "%"}</span></div>{/if}
  <div class="bl-progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
    <div class="bl-progress-fill" style:width={pct + "%"}></div>
  </div>
</div>
