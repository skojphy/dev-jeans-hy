<script lang="ts">
  import {fabric} from 'fabric'
  import ColorPicker from 'svelte-awesome-color-picker'
  import {background, canvas, width} from 'src/store/canvas'

  let inputImage: HTMLInputElement
  let imageType: 'item' | 'background' = 'background'

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

    if (imageType === 'background') {
      fabric.Image.fromURL(url, function (img) {
        img.set('imageType', 'background')
        img.scaleToWidth($width)
        $canvas.add(img)
        img.sendToBack()
      })
    }
    $canvas.renderAll()
  }

  const removeImage = () => {
    const objects = $canvas.getObjects()
    const costumeObjects = objects.filter((obj) => obj.imageType === 'item')
    costumeObjects.forEach((obj) => $canvas.remove(obj))
  }
</script>

<div class="toolbar">
  <div>
    <h2>배경을 꾸며보세요!</h2>
    <ColorPicker bind:hex={$background} isA11yClosable={false} label="선택하기" />
    <button
      on:click={() => {
        inputImage.click()
        imageType = 'background'
      }}>이미지</button
    >
    <button on:click={removeImage}>제거</button>
  </div>

  <input bind:this={inputImage} on:change={handleAddImage} type="file" accept="image/*" style="display: none" />
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
