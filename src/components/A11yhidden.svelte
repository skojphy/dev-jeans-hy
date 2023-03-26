<script lang="ts">
  export let as = 'span'
</script>

<svelte:element this={as} class="a11yHidden">
  <slot />
</svelte:element>

<style>
  .a11yHidden {
    overflow: hidden;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    clip-path: circle(0);
    width: 1px;
    height: 1px;
    margin: -1px;
    white-space: nowrap;
  }
</style>
