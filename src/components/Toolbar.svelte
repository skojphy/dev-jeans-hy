<script lang="ts">
  import {fabric} from 'fabric'
  import ColorPicker from 'svelte-awesome-color-picker'

  export let canvas
  export let width

  let inputImage: HTMLInputElement
  let hex = '#F9BB01'

  $: if (canvas) {
    canvas.setBackgroundColor(hex)
    canvas.renderAll()
  }

  const handleAddImage = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    },
  ) => {
    removeImage()
    const files = e.currentTarget.files
    if (!files) return
    const file = files[0]
    const url = URL.createObjectURL(file)

    fabric.Image.fromURL(url, function (img) {
      const left = 235 / 600
      const top = 360 / 600

      img.set({
        left: left * width,
        top: top * width,
        angle: -10,
      })
      img.scaleToWidth(width / 6)
      canvas.add(img)
    })
  }

  const removeImage = () => {
    const objects = canvas.getObjects()
    if (objects.length === 1) return
    const lastObject = objects[objects.length - 1]
    canvas.remove(lastObject)
  }

  const saveImage = () => {
    const data = canvas.toDataURL({format: 'png', quality: 1, multiplier: 4})
    const link = document.createElement('a')
    link.download = 'dev-jeans.png'
    link.href = data
    link.click()
  }
</script>

<div class="toolbar">
  <div>
    <h2>배경색</h2>
    <ColorPicker bind:hex isA11yClosable={false} label="배경색" />
  </div>

  <div>
    <h2>사진 추가</h2>

    <div>
      <button on:click={() => inputImage.click()}>추가</button>
      <button on:click={removeImage}>제거</button>
    </div>
    <input bind:this={inputImage} on:change={handleAddImage} type="file" accept="image/*" style="display: none" />
  </div>

  <div>
    <h2>내보내기</h2>
    <button on:click={saveImage}>저장</button>
  </div>
</div>

<style>
  .toolbar {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .toolbar > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    padding: 5px 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
  }
</style>
