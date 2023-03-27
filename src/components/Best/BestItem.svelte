<script lang="ts">
  import {link} from 'svelte-spa-router'
  export let id
  export let imageUrl
</script>

<div>
  <a href={`/detail/${id}`} use:link>
    <img src={imageUrl} alt="토끼토끼" />
  </a>
</div>

<style>
  img {
    display: block;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
</style>
