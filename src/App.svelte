<script lang="ts">
  import devJeans from './assets/dev-jeans.png'
  import {fabric} from 'fabric'
  import {onMount} from 'svelte'
  import Toolbar from './components/Toolbar.svelte'

  let canvas
  let width = 600

  const getWidth = () => {
    if (window.innerWidth < 600) return window.innerWidth
    return 600
  }

  const initCanvas = () => {
    canvas = new fabric.Canvas('canvas')
    width = getWidth()

    canvas.setWidth(width * canvas.getZoom())
    canvas.setHeight(width * canvas.getZoom())

    fabric.Image.fromURL(devJeans, function (img) {
      img.scaleToWidth(width)
      img.scaleToWidth(width)
      img.selectable = false
      canvas.add(img)
      canvas.renderAll()
    })
  }

  onMount(initCanvas)
</script>

<main style={`width: ${width}`}>
  <h1>~개발진스짤 만들어 쓰기~</h1>
  <canvas id="canvas" width="2400" height="2400" style="border:1px solid #ccc" />
</main>

<Toolbar {canvas} {width} />

<footer style={`width: ${width}`}>
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
  .toolbar {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .toolbar > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    padding: 5px 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
  }
</style>
