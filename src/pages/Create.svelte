<script lang="ts">
  import devJeans from 'src/assets/dev-jeans.png'
  import {fabric} from 'fabric'
  import {onDestroy, onMount} from 'svelte'
  import Toolbar from 'src/components/Toolbar.svelte'
  import Best from 'src/components/Best/Best.svelte'
  import {
    canvas,
    width,
    background,
    savedCanvas,
    hasCostume,
    type CostumeKeys,
    removeCostume,
    addCostume,
    backgroundImage,
  } from 'src/store/canvas'
  import {activeTabValue} from 'src/store/tab'
  import {TabValue} from 'src/const/tab'
  import Layout from 'src/components/Layout/Layout.svelte'
  import {querystring} from 'svelte-spa-router'
  import {resultBunny} from 'src/store/resultBunny'

  const getWidth = () => {
    if (window.innerWidth < 600) return window.innerWidth
    return 600
  }

  const setSavedCanvas = () => {
    $canvas.loadFromJSON($savedCanvas, () => {
      // $canvas의 backgroundImage를 scaleX: $canvas.width / img.width, scaleY: $canvas.height / img.height 로 속성 설정
      if ($backgroundImage) {
        fabric.Image.fromURL($backgroundImage, function (img) {
          img.set('itemType', 'background')
          $canvas.setBackgroundImage(img, $canvas.renderAll.bind($canvas), {
            scaleX: $canvas.width / img.width,
            scaleY: $canvas.height / img.height,
          })
          $savedCanvas = null
        })
      }
      $savedCanvas = null

      $canvas.renderAll()
    })
  }

  const initCanvas = () => {
    $canvas = new fabric.Canvas('canvas')
    $width = getWidth()

    $canvas.setWidth($width * $canvas.getZoom())
    $canvas.setHeight($width * $canvas.getZoom())

    $resultBunny = null

    if ($savedCanvas) {
      setSavedCanvas()
      return
    }

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

  onDestroy(() => {
    // 캔버스 json으로 저장
    const json = $canvas.toDatalessJSON(['itemType', 'costume'])
    $savedCanvas = json
  })

  onMount(initCanvas)

  onMount(() => {
    scrollTo(0, 0)
  })

  $: isDisableCanvas = $activeTabValue !== TabValue.Photo && $activeTabValue !== TabValue.Drawing

  $: if (!isDisableCanvas) {
    $canvas.renderAll()
  }

  $: if ($canvas) {
    $canvas.setBackgroundColor($background, () => {
      $canvas.renderAll()
    })
    // 캔버스의 오브젝트를 순회하며 버니는 selectable = false, 사진은 selectable = true로 설정
    $canvas.getObjects().forEach((obj) => {
      if (obj.itemType === 'bunny' || obj.itemType === 'costume') {
        obj.selectable = false
      }
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

  // 로그인페이지에서 리다이렉트 되었다면 저장탭으로 이동
  $: {
    const redirect = $querystring.split('=')[1]
    if (redirect === 'logined') {
      $activeTabValue = TabValue.Save
    }
  }

  // 아이템 추가 및 삭제
  $: if ($canvas && !$savedCanvas) {
    const objects = $canvas.getObjects()

    for (const costume in $hasCostume) {
      const hasObj = objects.find((obj) => obj.costume === costume)

      if (hasObj && !$hasCostume[costume]) removeCostume(costume as CostumeKeys)
      if (!hasObj && $hasCostume[costume]) addCostume(costume as CostumeKeys)
    }
  }
</script>

<Layout title="~개발진스 짤 만들어 쓰기~">
  <div class:isDisableCanvas>
    <canvas id="canvas" width="2400" height="2400" style="border:1px solid #ccc" />
  </div>
  <Toolbar />
  <Best />
</Layout>

<style>
  .isDisableCanvas {
    pointer-events: none;
    touch-action: none;
  }
</style>
