<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Icon from "./Icon.svelte";
  type Props = HTMLButtonAttributes & {
    /** bind:selected로 쓰면 누를 때 자동으로 바뀝니다 */ selected?: boolean;
    onchange?: (selected: boolean) => void;
    children?: Snippet;
  };
  let { selected = $bindable(false), onchange, children, class: className, onclick, ...rest }: Props = $props();
</script>

<button type="button" class={["bl-chip", className]} aria-pressed={selected} {...rest}
  onclick={(e) => { selected = !selected; onchange?.(selected); onclick?.(e); }}>{#if selected}<Icon name="check" />{/if}{@render children?.()}</button>
