<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  /** label: 글자 또는 스니펫(링크가 들어간 동의 문구 등) */
  type Props = Omit<HTMLInputAttributes, "type"> & { label: string | Snippet; description?: string };
  let { label, description, checked = $bindable(false), class: className, ...rest }: Props = $props();
</script>

<label class={["bl-check", className]}>
  <input type="checkbox" bind:checked {...rest} />
  <span>{#if typeof label === "string"}{label}{:else}{@render label()}{/if}{#if description}<span class="bl-check-sub">{description}</span>{/if}</span>
</label>
