<script lang="ts">
  import {fabric} from 'fabric'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {onDestroy, onMount} from 'svelte'
  import {canvas} from 'src/store/canvas'
  import {drawing, offDrawingMode, onDrawingMode, onErasingMode, resetDrawing} from 'src/store/drawing'
  import {penColors} from 'src/const/colors'
  import Selection from 'src/assets/icons/selection.svg'
  import Eraser from 'src/assets/icons/eraser.svg'

  const penWidths = [5, 11, 17]

  onMount(() => {
    logEvent(analytics, '그리기 탭 진입')
    onDrawingMode()

    // 활성화된 오브젝트가 생기면 로그를 남김
    $canvas.on('selection:created', () => {
      // 활성화된 오브젝트 가져옴
      const activeObjects = $canvas.getActiveObjects()
      console.log({activeObjects, eraser: activeObjects[0].eraser})
    })
  })

  onDestroy(() => {
    resetDrawing()
    offDrawingMode()
  })

  $: if ($drawing) {
    $canvas.freeDrawingBrush.color = $drawing.color
    $canvas.freeDrawingBrush.width = $drawing.width
    $canvas.isDrawingMode = $drawing.mode === 'drawing' || $drawing.mode === 'erasing'
  }

  // TODO. 그림 선택 후 삭제 기능 추가
</script>

<div class="container">
  <div class="header">
    <h2>그림을 그려보세요!</h2>
    <span>펜 색상을 선택해서 그려보세요.</span>
    <span>그림을 선택해서 이동 및 크기 조정을 할 수 있어요.</span>
  </div>

  <div class="sub-container">
    <div class="option-container">
      <div>
        <ul class="option-wrapper">
          <li>
            <button class={$drawing.mode === null ? 'active' : ''} on:click={offDrawingMode} aria-label="선택 모드">
              <img src={Selection} aria-hidden alt="선택" width="30" /></button
            >
          </li>
          <li>
            <button class={$drawing.mode === 'erasing' ? 'active' : ''} aria-label="지우개" on:click={onErasingMode}>
              <img src={Eraser} aria-hidden alt="지우개" width="25" />
            </button>
          </li>
          {#each penWidths as width, i}
            <li class={$drawing.mode !== null && $drawing.width === width ? 'active round-border' : ''}>
              <button
                on:click={() => {
                  $drawing.width = width
                }}
              >
                <div
                  class="pen-width"
                  style={`
                  width: ${10 + (i + 1) * 8}px; 
                  height: ${10 + (i + 1) * 8}px; 
                  `}
                >
                  {width}
                </div>
              </button>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="pen-container">
      <ul class="option-wrapper">
        {#each penColors as color}
          <li
            class={`pen-color-wrapper ${
              $drawing.mode === 'drawing' && color === $drawing.color ? 'active round-border' : ''
            } `}
          >
            <button on:click={onDrawingMode}>
              <div class="pen-color" style={`background-color:${color}`} />
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  h2 {
    font-size: 20px;
    word-break: keep-all;
  }
  .container,
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .header {
    margin-bottom: 20px;
  }
  .container {
    margin: 20px 0;
  }
  .sub-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
  .sub-container > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .pen-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .option-container {
    background-color: #edf0f3;
    border-radius: 10px;
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .option-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
  }

  .option-wrapper > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
  }
  .pen-color-wrapper {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
  }
  .pen-color,
  .pen-width {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: black;
  }

  .pen-width {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    border: none;
    color: #fff;
  }

  .active {
    display: block;
    border: 3px solid rgb(75, 255, 30);
    border-radius: 5px;
  }

  .round-border {
    border-radius: 50%;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
  }
</style>
