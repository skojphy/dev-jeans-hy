<script lang="ts">
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {onDestroy, onMount} from 'svelte'
  import {canvas} from 'src/store/canvas'
  import {drawing, offDrawingMode, onDrawingMode} from 'src/store/drawing'
  import {penColors} from 'src/const/colors'
  import Selection from 'src/assets/icons/selection.svg'
  import Eraser from 'src/assets/icons/eraser.svg'

  const penWidths = [5, 11, 17]

  onMount(() => {
    logEvent(analytics, '그리기 탭 진입')
    onDrawingMode()
  })

  onDestroy(() => {
    $canvas.isDrawingMode = false
    offDrawingMode()
  })

  $: if ($drawing) {
    $canvas.freeDrawingBrush.color = $drawing.color
    $canvas.freeDrawingBrush.width = $drawing.width
    $canvas.isDrawingMode = $drawing.isDrawingMode
  }

  // TODO. 그림 선택 후 삭제 기능 추가
</script>

<div class="container">
  <div class="header">
    <h2>그림을 그려 보세요!</h2>
    <span>펜 색상을 선택해서 그려 보세요.</span>
    <span>지우고 싶은 것을 선택 후 지우개를 클릭하면 지워집니다.</span>
  </div>

  <div class="sub-container">
    <div class="option-container">
      <div>
        <ul class="option-wrapper">
          <li>
            <button
              class={$drawing.isDrawingMode ? '' : 'active'}
              on:click={() => ($drawing.isDrawingMode = false)}
              aria-label="선택 모드"
            >
              <img src={Selection} aria-hidden alt="선택" width="30" /></button
            >
          </li>
          <li>
            <button
              aria-label="삭제"
              on:click={() => {
                // 활성화된 모든 객체 삭제
                $canvas.getActiveObjects().forEach((obj) => {
                  // 그림과 추가된 사진만 삭제함. (버니, 배경화면은 삭제 안함)
                  if (!obj.itemType || obj.itemType === 'photo') $canvas.remove(obj)
                })
                $canvas.discardActiveObject()
              }}
            >
              <img src={Eraser} aria-hidden alt="삭제" width="25" />
            </button>
          </li>
          {#each penWidths as width, i}
            <li class={$drawing.isDrawingMode && $drawing.width === width ? 'active round-border' : ''}>
              <button
                on:click={() => {
                  $drawing.isDrawingMode = true
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
              $drawing.isDrawingMode && color === $drawing.color ? 'active round-border' : ''
            } `}
          >
            <button
              on:click={() => {
                $drawing.isDrawingMode = true
                $drawing.color = color
              }}
            >
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
