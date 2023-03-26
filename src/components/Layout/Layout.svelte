<script lang="ts">
  export let title = ''
  import {width} from 'src/store/canvas'
  import A11yhidden from '../A11yhidden.svelte'
  import Nav from './Nav.svelte'
</script>

<Nav />

<main style={`width: ${$width}`}>
  <h1>{title}</h1>

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
  h1 {
    font-family: 'Staatliches', cursive;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    color: #f1c164;
    text-shadow: 1px 1px #16345a, 3px 3px #284d8e, 5px 5px #4d8cbf, 7px 7px #5fa9d9;
    margin: 0;
    margin-bottom: 10px;
  }

  main,
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(56, 56, 56);
    max-width: 600px;
    width: 100%;
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
