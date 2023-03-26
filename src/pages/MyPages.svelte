<script lang="ts">
  import devJeans from 'src/assets/dev-jeans.png'
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import Profile from 'src/components/MyPage/Profile.svelte'
  import {userInfo} from 'src/store/user'
  import {idToken} from 'src/store/user'
  import Gallery from 'src/components/Photo/Gallery.svelte'
  import {mutateMyPhotos, myPhotos} from 'src/store/myPhotos'
  import {onMount} from 'svelte'

  $: {
    console.log({$idToken, $userInfo, $myPhotos})
  }

  onMount(() => {
    if ($userInfo) {
      mutateMyPhotos()
    }
  })

  $: if (!$myPhotos.length && $userInfo) {
    mutateMyPhotos()
  }
</script>

<Layout title="나의 버니들">
  {#if !$userInfo}
    <MyLogin />
  {:else}
    <Profile />

    <div class="bunny-list">
      {#if !$myPhotos.length}
        <div class="no-bunny">
          <h2>나의 버니가 없어요!</h2>

          <!-- TODO. 버니가 6개가 넘어가면 경고 토스트 팝업 노출 -->
          <span>나만의 버니를 업로드해보세요.</span>

          <img src={devJeans} alt="버니" class="no-bunny-img" />
        </div>
      {:else}
        <div class="gallery">
          <Gallery photos={$myPhotos} />
        </div>
      {/if}
    </div>
  {/if}
</Layout>

<style>
  .no-bunny {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: rgb(104, 104, 104);
  }
  .no-bunny-img {
    opacity: 0.4;
    width: 300px;
  }
  .gallery {
    width: 100%;
    padding: 0 10px;
  }
</style>
