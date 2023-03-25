<script lang="ts">
  import {fabric} from 'fabric'
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

    if (imageType === 'item')
      fabric.Image.fromURL(url, function (img) {
        const left = 235 / 600
        const top = 360 / 600

        img.set({
          left: left * $width,
          top: top * $width,
          angle: -10,
        })
        img.set('imageType', 'item')
        img.scaleToWidth($width / 6)
        $canvas.add(img)
      })

    $canvas.renderAll()
  }

  const removeImage = () => {
    const objects = $canvas.getObjects()
    const costumeObjects = objects.filter((obj) => obj.imageType === 'item')
    costumeObjects.forEach((obj) => $canvas.remove(obj))
  }
</script>

<div>
  <h2>사진을 추가해보세요!</h2>

  <div class="photo-buttons">
    <button
      on:click={() => {
        inputImage.click()
        imageType = 'item'
      }}>추가</button
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

  div {
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
    flex-direction: row;
    width: 100%;
  }

  .save {
    margin-top: 20px;
  }
</style>
