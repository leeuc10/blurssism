<script>
  import "@caffeinecatkr/blurssism/fonts.css";
  import "@caffeinecatkr/blurssism/tokens.css";
  import "@caffeinecatkr/blurssism/bundle.css";
  import { applyCremaPreference } from "@caffeinecatkr/blurssism/svelte";
  import { onMount } from "svelte";
  let { children } = $props();
  onMount(() => applyCremaPreference());
</script>

{@render children()}
