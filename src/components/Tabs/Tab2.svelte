<script lang="ts">
  import {fabric} from 'fabric'
  import {logEvent} from 'firebase/analytics'
  import {onMount} from 'svelte'
  import {analytics} from '../../firebase'
  import {canvas, width, hasCostume, costumeInfo, toggleCostume, type CostumeKeys} from '../../store/canvas'

  onMount(() => {
    logEvent(analytics, '꾸미기 탭 진입')
  })

  const addCostume = (costume: CostumeKeys) => {
    let costumeImg = costumeInfo[costume].src

    fabric.Image.fromURL(costumeImg, function (img) {
      img.scaleToWidth($width)
      img.scaleToWidth($width)
      img.selectable = false

      img.set('costume', costume)
      $canvas.add(img)
      $canvas.renderAll()
    })
  }

  const removeCostume = (costume: CostumeKeys) => {
    const objects = $canvas.getObjects()
    const costumeObjects = objects.filter((obj) => obj.costume === costume)
    costumeObjects.forEach((obj) => $canvas.remove(obj))
  }

  $: {
    const objects = $canvas.getObjects()

    for (const costume in $hasCostume) {
      const hasObj = objects.find((obj) => obj.costume === costume)
      if (hasObj && !$hasCostume[costume]) removeCostume(costume as CostumeKeys)
      if (!hasObj && $hasCostume[costume]) addCostume(costume as CostumeKeys)
    }
  }

  const toggleActive = (costume: string) => () => {
    toggleCostume(costume as CostumeKeys)
  }
</script>

<div class="container">
  <h2>아이템을 추가해 꾸며주세요!</h2>
  <ul class="toolbar">
    {#each Object.keys(costumeInfo) as costume}
      <li>
        <button class={$hasCostume[costume] ? 'active' : ''} on:click={toggleActive(costume)}
          >{costumeInfo[costume].title}</button
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
    word-break: keep-all;
  }
  .container {
    width: 100%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .toolbar > li {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  }

  button {
    box-sizing: border-box;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
  }

  button.active {
    color: #fff;
    border: 1px solid rgb(80, 234, 137);
    background-color: rgb(80, 234, 137);
  }
</style>
