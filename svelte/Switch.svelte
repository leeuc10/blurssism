<script lang="ts">
  let { checked = $bindable(false), label, disabled = false, onchange, class: className }:
    { checked?: boolean; /** 스크린리더 문구 (필수) */ label: string; disabled?: boolean; onchange?: (next: boolean) => void; class?: string } = $props();
</script>

<button type="button" role="switch" class={["bl-switch", className]} aria-checked={checked} aria-label={label} {disabled}
  onclick={() => { checked = !checked; onchange?.(checked); }}></button>
