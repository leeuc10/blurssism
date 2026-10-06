<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";
  import type { Option } from "./types.js";
  type Props = HTMLSelectAttributes & { label: string; options: (Option | string)[]; placeholder?: string; help?: string; error?: string };
  let { label, options, placeholder, help, error, value = $bindable(""), id, class: className, ...rest }: Props = $props();
  const uid = $props.id();
  const fid = $derived(id ?? uid);
  const opts = $derived(options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)));
</script>

<div class={["bl-field", className]} data-invalid={error ? "true" : undefined}>
  <label class="bl-field-label" for={fid}>{label}</label>
  <div class="bl-select">
    <select id={fid} class="bl-field-input" bind:value aria-invalid={error ? "true" : undefined}
      aria-describedby={error || help ? fid + "-help" : undefined} {...rest}>
      {#if placeholder}<option value="" disabled>{placeholder}</option>{/if}
      {#each opts as o (o.value)}<option value={o.value} disabled={o.disabled}>{o.label}</option>{/each}
    </select>
  </div>
  {#if error || help}<p id={fid + "-help"} class="bl-field-help">{error ? "오류: " + error : help}</p>{/if}
</div>
