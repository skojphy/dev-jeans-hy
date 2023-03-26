<script lang="ts">
  import {initAuth2} from 'src/api/auth/googleAuth'
  import {onMount} from 'svelte'

  let ref: HTMLButtonElement

  onMount(() => {
    initAuth2({ref})
  })
</script>

<button bind:this={ref} />

<style>
  button {
    background-color: transparent;
    border: none;
    padding: none;
  }
</style>
