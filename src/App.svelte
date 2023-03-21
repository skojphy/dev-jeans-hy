<script lang="ts">
  import devJeans from './assets/dev-jeans.png'
  import ColorPicker from 'svelte-awesome-color-picker';
  import {fabric} from "fabric";
  import { onMount } from 'svelte';

  let canvas;
  let inputImage: HTMLInputElement;
  let hex = '#F9BB01';

  onMount(()=>{
    canvas = new fabric.Canvas('canvas');
    fabric.Image.fromURL(devJeans, function(img) {
      img.scaleToWidth(600);
      img.scaleToWidth(600);
      img.selectable = false;
      canvas.add(img)
      canvas.renderAll()
    });
  })

  $: if(canvas){
      canvas.setBackgroundColor(hex)
      canvas.renderAll()
  }

  const handleAddImage = (e: Event & {
    currentTarget: EventTarget & HTMLInputElement;
}) => {
    removeImage();
    const files = e.currentTarget.files;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);

    fabric.Image.fromURL(url, function (img) {
      img.set({
          left: 235,
          top: 360,
          angle: -10,
      });
      img.scaleToWidth(100);
      canvas.add(img);
    });
  }

  const removeImage = ()=> {
    const objects = canvas.getObjects();
    if(objects.length === 1) return;
    const lastObject = objects[objects.length - 1];
    canvas.remove(lastObject);
  }
</script>

<main>
  <h1>~개발진스짤 만들어 쓰기~</h1>
  <canvas id="canvas" width="600" height="600" style="border:1px solid #ccc"></canvas>
  
  <div class="toolbar">
    <div>
      <h2>배경색</h2>
      <ColorPicker bind:hex isA11yClosable={false} label='배경색'/>
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
      <button on:click={(e) => {
        const data = canvas.toDataURL({format: 'png', quality: 1, multiplier: 4});
        const link = document.createElement('a');
        link.download = 'dev-jeans.png';
        link.href = data;
        link.click();
      }}>저장</button>
    </div>
  </div>
</main>

<footer>
  <span>
    Instagram: <a href="https://www.instagram.com/dev_hee/">@dev_hee</a>
  </span>
  <span>
    Blog: <a href="https://velog.io/@heelieben">@pigme</a>
  </span>

</footer>

<style>
  h1{
    margin: 20px 0;
  }
  a {
    color: #0098fa;
    text-decoration: none;
  }
  main, footer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(56, 56, 56);
    min-width: 600px;
  }
  footer{
    flex-direction: row;
    gap: 10px;
    font-weight: 800;
    color: rgb(98, 98, 98)
  }
 .toolbar {
    display: flex;
    justify-content: center;
    width: 600px;
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
