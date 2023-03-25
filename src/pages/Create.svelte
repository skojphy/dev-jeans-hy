<script lang="ts">
  import devJeans from 'src/assets/dev-jeans.png'
  import {fabric} from 'fabric'
  import {onMount} from 'svelte'
  import Toolbar from 'src/components/Toolbar.svelte'
  import {canvas, width, background} from 'src/store/canvas'
  import {activeTabValue} from 'src/store/tab'
  import {TabValue} from 'src/const/tab'
  import Layout from 'src/components/Layout/Layout.svelte'

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

  $: isDisableCanvas = $activeTabValue !== TabValue.Photo && $activeTabValue !== TabValue.Drawing

  $: if (!isDisableCanvas) {
    $canvas.renderAll()
  }

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

<Layout title="~개발진스 짤 만들어 쓰기~">
  <div class:isDisableCanvas>
    <canvas id="canvas" width="2400" height="2400" style="border:1px solid #ccc" />
  </div>
  <Toolbar />
</Layout>

<style>
  .isDisableCanvas {
    pointer-events: none;
    touch-action: none;
  }
</style>
