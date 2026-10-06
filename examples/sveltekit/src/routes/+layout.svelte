<script>
  import "@caffeinecatkr/blurssism/tokens.css";
  import "@caffeinecatkr/blurssism/bundle.css";
  import { applyGlassPreference } from "@caffeinecatkr/blurssism/svelte";
  import { onMount } from "svelte";
  let { children } = $props();
  onMount(() => applyGlassPreference());
</script>

{@render children()}
