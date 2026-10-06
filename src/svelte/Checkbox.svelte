<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  type Props = Omit<HTMLInputAttributes, "type"> & { label: string; description?: string };
  let { label, description, checked = $bindable(false), class: className, ...rest }: Props = $props();
</script>

<label class={["bl-check", className]}>
  <input type="checkbox" bind:checked {...rest} />
  <span>{label}{#if description}<span class="bl-check-sub">{description}</span>{/if}</span>
</label>
