<script lang="ts">
  import {fabric} from 'fabric'
  import {canvas, width} from 'src/store/canvas'
  import watermark from 'src/assets/watermark.png'
  import Modal from 'src/components/Modal/Modal.svelte'
  import {onMount} from 'svelte'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {userInfo} from 'src/store/user'
  import {toast} from '@zerodevx/svelte-toast'
  import {push} from 'svelte-spa-router'
  import {uploadPhoto} from 'src/api/service/photo'

  // TODO. 마이 페이지에 저장하기 하면 로그인된 유무에 따라서 로그인 페이지로 이동
  let showModal = false
  let resultImage: string = ''
  let showUploadModal = false

  onMount(() => {
    logEvent(analytics, '저장 탭 진입')
  })

  const createImage =
    (quality = 4) =>
    () => {
      fabric.Image.fromURL(watermark, function (img) {
        img.scaleToWidth($width)
        img.scaleToWidth($width)
        img.selectable = false
        $canvas.add(img)
        $canvas.renderAll()

        resultImage = $canvas.toDataURL({format: 'png', quality: 1, multiplier: quality})
        $canvas.remove(img)
      })
    }

  const handleSaveImage = () => {
    createImage()()
    showModal = true
  }

  const saveImage = () => {
    const link = document.createElement('a')
    link.download = 'dev-jeans.png'
    link.href = resultImage
    link.click()
  }

  const uploadImage = async () => {
    if (!resultImage) return

    const response = await fetch(resultImage)
    const blob = await response.blob()
    const file = new File([blob], 'bunny.jpg', {type: blob.type})

    const formData = new FormData()
    formData.append('image', file, file.name)
    formData.append('photo_title', '버니')
    formData.append('thumbnail', file, file.name)

    try {
      const result = await uploadPhoto(formData)
    } catch (e) {
      if (e.response.data.message === '사진을 7개이상 추가할 수 없습니다.')
        toast.push('버니는 6개까지만 업로드 가능합니다.', {
          theme: {
            '--toastBackground': '#ff595eaa',
          },
        })
    }
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
    createImage()()
    showUploadModal = true
  }
</script>

<Modal bind:showModal>
  <h2 slot="header">짜잔~ 완성된 이미지에요.</h2>
  <img src={resultImage} alt="데브진스" />
  <button class="save" on:click={saveImage}>저장하기</button>
</Modal>

<Modal bind:showModal={showUploadModal}>
  <h2 slot="header">나의 버니를 자랑해보세요!</h2>
  <img src={resultImage} alt="데브진스" />
  <button class="save" on:click={uploadImage}>업로드</button>
</Modal>

<div class="container">
  <h2>최종 결과물이 맘에 드시나요?</h2>
  <button class="upload" on:click={handleUpload}>마이페이지에 업로드할래요</button>
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
