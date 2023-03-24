<script lang="ts">
  import devJeans from './assets/dev-jeans.png'
  import {fabric} from 'fabric'
  import {onMount} from 'svelte'
  import Toolbar from './components/Toolbar.svelte'
  import {canvas, width} from './store/canvas'
  import Login from './components/Login.svelte'

  const getWidth = () => {
    if (window.innerWidth < 600) return window.innerWidth
    return 600
  }

  const initCanvas = () => {
    $canvas = new fabric.Canvas('canvas')
    $width = getWidth()

    $canvas.setWidth($width * $canvas.getZoom())
    $canvas.setHeight($width * $canvas.getZoom())

    fabric.Image.fromURL(devJeans, function (img) {
      img.scaleToWidth($width)
      img.scaleToWidth($width)
      img.selectable = false
      $canvas.add(img)
      $canvas.renderAll()
    })
  }

  onMount(initCanvas)
</script>

<main style={`width: ${width}`}>
  <h1>~개발진스 짤 만들어 쓰기~</h1>
  <canvas id="canvas" width="2400" height="2400" style="border:1px solid #ccc" />
</main>

<Login />

<Toolbar />

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
    margin: 20px 0;
  }
  a {
    color: #0098fa;
    text-decoration: none;
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
  }
</style>
