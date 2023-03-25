<script lang="ts">
  export let title = ''
  import {width} from 'src/store/canvas'
</script>

<header>
  <h1>{title}</h1>
</header>

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
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-weight: 800;
  }
  main,
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(56, 56, 56);
  }

  footer {
    flex-direction: row;
    gap: 10px;
    font-weight: 800;
    color: rgb(98, 98, 98);
    padding: 30px;
  }
  a {
    color: #0098fa;
    text-decoration: none;
  }
</style>
