<script lang="ts">
  import {fabric} from 'fabric'
  import ColorPicker from 'svelte-awesome-color-picker'
  import {background, canvas, width} from '../../store/canvas'
  import watermark from '../../assets/watermark.png'
  import Modal from '../Modal/Modal.svelte'

  let inputImage: HTMLInputElement
  let showModal = false
  let resultImage: string = ''

  $: if ($canvas) {
    $canvas.setBackgroundColor($background, () => {
      $canvas.renderAll()
    })
  }

  const handleAddImage = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    },
  ) => {
    const files = e.currentTarget.files
    if (!files) return
    const file = files[0]
    if (!file) return
    removeImage()
    const url = URL.createObjectURL(file)

    fabric.Image.fromURL(url, function (img) {
      const left = 235 / 600
      const top = 360 / 600

      img.set({
        left: left * $width,
        top: top * $width,
        angle: -10,
      })
      img.set('logo', 'logo')
      img.scaleToWidth($width / 6)
      $canvas.add(img)
    })
  }

  const removeImage = () => {
    const objects = $canvas.getObjects()
    const costumeObjects = objects.filter((obj) => obj.logo === 'logo')
    costumeObjects.forEach((obj) => $canvas.remove(obj))
  }

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
  <div>
    <h2>배경색</h2>
    <ColorPicker bind:hex={$background} isA11yClosable={false} label="선택하기" />
  </div>

  <div>
    <h2>사진 추가</h2>

    <div class="photo-buttons">
      <button on:click={() => inputImage.click()}>추가</button>
      <button on:click={removeImage}>제거</button>
    </div>
    <input bind:this={inputImage} on:change={handleAddImage} type="file" accept="image/*" style="display: none" />
  </div>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
    word-break: keep-all;
  }

  .toolbar {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .toolbar > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    margin: 5px;
    font-size: 12px;
  }

  .photo-buttons {
    display: flex;
    width: 100%;
  }

  .save {
    margin-top: 20px;
  }
</style>
