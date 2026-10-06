<script lang="ts">
  import type { Option } from "./types.js";
  let { legend, options, value = $bindable(""), name, onchange, class: className }:
    { legend?: string; options: (Option | string)[]; value?: string; name?: string; onchange?: (value: string) => void; class?: string } = $props();
  const uid = $props.id();
  const opts = $derived(options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)));
</script>

<fieldset class={["bl-radios", className]}>
  {#if legend}<legend>{legend}</legend>{/if}
  {#each opts as o (o.value)}
    <label class="bl-check">
      <input type="radio" name={name ?? uid} value={o.value} checked={value === o.value} disabled={o.disabled}
        onchange={() => { value = o.value; onchange?.(o.value); }} />
      <span>{o.label}{#if o.description}<span class="bl-check-sub">{o.description}</span>{/if}</span>
    </label>
  {/each}
</fieldset>
