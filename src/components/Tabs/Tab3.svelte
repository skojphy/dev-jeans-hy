<script lang="ts">
  import {fabric} from 'fabric'
  import {canvas, width} from '../../store/canvas'
  import watermark from '../../assets/watermark.png'
  import Modal from '../Modal/Modal.svelte'

  let showModal = false
  let resultImage: string = ''

  const createImage = () => {
    fabric.Image.fromURL(watermark, function (img) {
      img.scaleToWidth($width)
      img.scaleToWidth($width)
      img.selectable = false
      $canvas.add(img)
      $canvas.renderAll()

      resultImage = $canvas.toDataURL({format: 'png', quality: 1, multiplier: 4})

      $canvas.remove(img)
      showModal = true
    })
  }

  const saveImage = () => {
    const link = document.createElement('a')
    link.download = 'dev-jeans.png'
    link.href = resultImage
    link.click()
  }
</script>

<Modal bind:showModal>
  <h2 slot="header">짜잔~ 완성된 이미지에요.</h2>
  <img src={resultImage} alt="데브진스" />
  <button class="save" on:click={saveImage}>저장하기</button>
</Modal>

<div class="toolbar">
  <h2>최종 결과물이 맘에 드시나요?</h2>
  <button on:click={createImage}>만족해요!</button>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
    word-break: keep-all;
  }

  .toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
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
    margin-bottom: 5px;
    font-size: 12px;
    max-width: 300px;
  }

  .save {
    margin-top: 20px;
  }
</style>
