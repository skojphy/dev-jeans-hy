<script lang="ts">
  import {onMount} from 'svelte'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {toast} from '@zerodevx/svelte-toast'
  import {push, replace} from 'svelte-spa-router'
  import {uploadPhoto} from 'src/api/service/photo'
  import {resultBunny} from 'src/store/resultBunny'
  import {ScaleOut} from 'svelte-loading-spinners'
  import Layout from 'src/components/Layout/Layout.svelte'
  import Noti from 'src/components/Noti.svelte'
  import devJeans from 'src/assets/dev-jeans.png'

  let title

  $: isUploading = false

  onMount(() => {
    logEvent(analytics, '업로드 탭 진입')
  })

  $: if (!$resultBunny?.origin) {
    replace('/')
    toast.push('완성한 버니가 없습니다!', {
      theme: {
        '--toastBackground': '#ff595eaa',
      },
    })
  }

  const handleUpload = async () => {
    isUploading = true

    if (!title) {
      toast.push('제목을 입력해 주세요.', {
        theme: {
          '--toastBackground': '#ff595eaa',
        },
      })
      return
    }
    uploadImage()
  }

  const uploadImage = async () => {
    const {origin, thumbnail} = $resultBunny

    if (!origin || !thumbnail) return

    // 오리지널 이미지
    const originResult = await fetch(origin)
    const originBlob = await originResult.blob()
    const originFile = new File([originBlob], 'bunny.jpg', {type: originBlob.type})

    // 썸네일 이미지
    const thumbnailResult = await fetch(origin)
    const thumbnailBlob = await thumbnailResult.blob()
    const thumbnailFile = new File([thumbnailBlob], 'bunny.jpg', {type: thumbnailBlob.type})

    const formData = new FormData()
    formData.append('image', originFile, originFile.name)
    formData.append('photo_title', title)
    formData.append('thumbnail', thumbnailFile, thumbnailFile.name)

    try {
      const result = await uploadPhoto(formData)
      if (result.photoId) {
        toast.push('업로드 되었어요!', {
          theme: {
            '--toastBackground': '#8ac926aa',
          },
        })
        push(`/detail/${result.photoId}`)
      }
    } catch (e) {
      if (e.response.data.message === '사진을 7개이상 추가할 수 없습니다.')
        toast.push('버니는 6개까지만 업로드 가능합니다.', {
          theme: {
            '--toastBackground': '#ff595eaa',
          },
        })
      else
        toast.push('문제가 발생했습니다.\n 잠시 후에 다시 시도해 주세요.', {
          theme: {
            '--toastBackground': '#ff595eaa',
          },
        })
    } finally {
      isUploading = false
    }
  }
</script>

<Layout title="나의 버니를 자랑해 보세요!">
  <div class="container">
    {#if $resultBunny?.origin}
      <span class="detail">{'짜잔~ 완성된 버니예요! (｡･ω･｡)ﾉ♡'}</span>
    {:else}
      <span class="detail">버니를 업로드해 주세요!</span>
    {/if}
    <img class={$resultBunny?.origin ? '' : 'default'} src={$resultBunny?.origin || devJeans} alt="데브진스" />
    <div class="toolbar">
      <Noti icon="❤️" text="멋진 제목을 입력하고 나의 버니를 자랑해 보세요." />
      <div class="input-wrapper">
        <input placeholder="나의 귀여운 버니 🐰" class="title" type="text" bind:value={title} />

        <button disabled={isUploading} class="save" class:isUploading on:click={handleUpload}>
          {#if isUploading}
            <ScaleOut size="35" color="#1982c4" unit="px" duration="1s" />
          {:else}
            <span>업로드</span>
          {/if}
        </button>
      </div>
    </div>
  </div>
</Layout>

<style>
  .detail {
    color: #666;
    margin-bottom: 10px;
  }
  .default {
    width: 100%;
    background-color: #dee2e6;
    opacity: 0.5;
    filter: grayscale(100%);
  }
  .toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
  }
  .title {
    width: 100%;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
    padding: 10px;
  }

  .input-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .save {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
    width: 100px;
    margin-left: 10px;
    background-color: #f1f3f6;
    max-height: 41px;
  }
  .isUploading {
    background-color: #fff;
  }
</style>
