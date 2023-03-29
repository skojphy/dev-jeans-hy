<script lang="ts">
  import {fabric} from 'fabric'
  import {canvas, width} from 'src/store/canvas'
  import watermark from 'src/assets/watermark.png'
  import Modal from '../Modal/Modal.svelte'
  import {onMount} from 'svelte'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {userInfo} from 'src/store/user'
  import {toast} from '@zerodevx/svelte-toast'
  import {push} from 'svelte-spa-router'
  import {resultBunny} from 'src/store/resultBunny'

  // TODO. 마이 페이지에 저장하기 하면 로그인된 유무에 따라서 로그인 페이지로 이동
  let showModal = false
  let thumbnailImage: string = ''
  let resultImage: string = ''
  let redirectToUpload: boolean = false

  onMount(() => {
    logEvent(analytics, '저장 탭 진입')
  })

  const createImage = () => {
    fabric.Image.fromURL(watermark, function (img) {
      img.scaleToWidth($width)
      img.scaleToWidth($width)
      img.selectable = false
      $canvas.add(img)
      $canvas.renderAll()

      thumbnailImage = $canvas.toDataURL({format: 'jpeg', quality: 0.4})
      resultImage = $canvas.toDataURL({format: 'png', quality: 2})

      $canvas.remove(img)
    })
  }

  const handleSaveImage = () => {
    createImage()
    showModal = true
  }

  const saveImage = () => {
    const link = document.createElement('a')
    link.download = 'dev-jeans.png'
    link.href = resultImage
    link.click()
  }

  const handleUpload = () => {
    if (!$userInfo) {
      toast.push('로그인이 필요한 서비스입니다.', {
        theme: {
          '--toastBackground': '#ff595eaa',
        },
      })
      push('/login?redirect=decorate')
      return
    }
    createImage()
  }

  $: if (resultImage || thumbnailImage) {
    $resultBunny = {
      origin: resultImage,
      thumbnail: thumbnailImage,
    }
    redirectToUpload = true
  }

  $: if (redirectToUpload) {
    push('/upload')
  }
</script>

<Modal bind:showModal>
  <h2 slot="header">짜잔~ 완성된 이미지예요.</h2>
  <img src={resultImage} alt="데브진스" />
  <button class="save" on:click={saveImage}>저장하기</button>
</Modal>

<div class="container">
  <h2>최종 결과물이 맘에 드시나요?</h2>
  <button class="upload" on:click={handleUpload}>업로드해서 자랑할래요</button>
  <button on:click={handleSaveImage}>파일 이미지로 저장할래요</button>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
    word-break: keep-all;
  }

  .upload {
    color: #fff;
    background-color: #8ac926c8;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
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
    max-width: none;
  }
</style>
