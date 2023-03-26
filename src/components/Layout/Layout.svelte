<script lang="ts">
  export let title = ''
  import {width} from 'src/store/canvas'
  import A11yhidden from '../A11yhidden.svelte'
  import Nav from './Nav.svelte'
</script>

<A11yhidden as="h1">{title}</A11yhidden>

<Nav />

<main style={`width: ${$width}`}>
  <slot />
</main>

<footer style={`width: ${$width}`}>
  <span>
    Instagram: <a href="https://www.instagram.com/dev_hee/">@dev_hee</a>
  </span>
  <span>
    Blog: <a href="https://velog.io/@heelieben">@pigme</a>
  </span>
</footer>

<style>
  main,
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(56, 56, 56);
    max-width: 600px;
    margin: 10px auto;
  }

  footer {
    flex-direction: row;
    gap: 10px;
    font-weight: 800;
    color: rgb(98, 98, 98);
    padding: 30px;
    padding-bottom: 100px;
  }
  a {
    color: #0098fa;
    text-decoration: none;
  }
</style>
