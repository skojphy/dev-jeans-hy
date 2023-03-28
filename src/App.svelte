<script lang="ts">
  import devJeans from './assets/dev-jeans.png'
  import {fabric} from 'fabric'
  import {onMount} from 'svelte'
  import Toolbar from './components/Toolbar.svelte'
  import {canvas, width, background} from './store/canvas'
  import {activeTabValue} from './store/tab'
  import {TabValue} from './const/tab'

  $: isLocalhost = window.location.hostname === 'localhost'

  const getWidth = () => {
    if (window.innerWidth < 600) return window.innerWidth
    return 600
  }

  const initCanvas = () => {
    $canvas = new fabric.Canvas('canvas')
    $width = getWidth()

    $canvas.setWidth($width * $canvas.getZoom())
    $canvas.setHeight($width * $canvas.getZoom())

    fabric.Image.fromURL(
      devJeans,
      function (img) {
        img.scaleToWidth($width)
        img.scaleToWidth($width)
        img.selectable = false
        img.set('itemType', 'bunny')
        $canvas.add(img)
        $canvas.renderAll()
      },
      {crossOrigin: 'anonymous'},
    )
  }

  onMount(initCanvas)

  $: if ($canvas) {
    $canvas.setBackgroundImage(null, $canvas.renderAll.bind($canvas))
    $canvas.setBackgroundColor($background, () => {
      $canvas.renderAll()
    })
  }

  $: if ($canvas && $activeTabValue) {
    const objects = $canvas.getObjects()
    $canvas.discardActiveObject()

    if ($activeTabValue === TabValue.Background) {
      const bunnyObjects = objects.filter((obj) => obj.itemType !== 'background')
      bunnyObjects.forEach((obj) => {
        obj.opacity = 0.5
      })
    } else {
      const bunnyObjects = objects.filter((obj) => obj.itemType !== 'background')
      bunnyObjects.forEach((obj) => {
        obj.opacity = 1
      })
    }
    $canvas.renderAll()
  }
</script>

<main style={`width: ${width}`}>
  <h1>~개발진스 짤 만들어 쓰기~</h1>
  <canvas id="canvas" width="2400" height="2400" style="border:1px solid #ccc" />
</main>

<Toolbar />

<footer style={`width: ${$width}`}>
  <span>
    Instagram: <a href="https://www.instagram.com/dev_hee/">@dev_hee</a>
  </span>
  <span>
    Blog: <a href="https://velog.io/@heelieben">@pigme</a>
  </span>
  {#if !isLocalhost}
    <a href="https://hits.sh/devjeans.dev-hee.com/"
      ><img
        alt="Hits"
        src="https://hits.sh/devjeans.dev-hee.com.svg?view=today-total&style=for-the-badge&color=f1c164&labelColor=284d8e"
      /></a
    >
  {/if}
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
