<script lang="ts">
  import {fabric} from 'fabric'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {onMount} from 'svelte'
  import {canvas, width, hasCostume, costumeInfo, toggleCostume, resetCostume, type CostumeKeys} from 'src/store/canvas'

  onMount(() => {
    logEvent(analytics, '꾸미기 탭 진입')
  })

  const addCostume = (costume: CostumeKeys) => {
    let costumeImg = costumeInfo[costume].src
    logEvent(analytics, `${costumeInfo[costume].title} 추가`)

    fabric.Image.fromURL(costumeImg, function (img) {
      img.scaleToWidth($width)
      img.scaleToWidth($width)
      img.selectable = false

      img.set('itemType', 'costume')
      img.set('costume', costume)
      $canvas.add(img)

      // 캔버스의 오브젝트들을 순회하며 basketball은 가장 위로 올림
      // TODO. index를 costume 마다 관리해야 함
      $canvas.getObjects().forEach((obj) => {
        if (obj.costume === 'basketball' || obj.costume === 'laptop') {
          $canvas.moveTo(obj, 100)
        }
      })

      $canvas.renderAll()
    })
  }

  const removeCostume = (costume: CostumeKeys) => {
    const objects = $canvas.getObjects()
    logEvent(analytics, `${costumeInfo[costume].title} 제거`)
    const costumeObjects = objects.filter((obj) => obj.costume === costume)
    costumeObjects.forEach((obj) => $canvas.remove(obj))
  }

  const toggleActive = (costume: string) => () => {
    toggleCostume(costume as CostumeKeys)
  }

  const reset = () => {
    logEvent(analytics, '초기화 버튼 클릭')
    resetCostume()
  }
</script>

<div class="container">
  <h2>아이템을 추가해 꾸며 주세요!</h2>
  <ul class="toolbar">
    <li>
      <button class="reset" on:click={reset}>초기화하기</button>
    </li>
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
    flex-wrap: wrap;
  }

  .toolbar > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
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

  .reset {
    color: #fff;
    background-color: #ff595e;
    border: none;
  }

  button.active {
    color: #fff;
    border: 1px solid rgb(80, 234, 137);
    background-color: rgb(80, 234, 137);
  }
</style>
