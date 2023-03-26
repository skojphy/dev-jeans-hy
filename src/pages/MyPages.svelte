<script lang="ts">
  import {createQuery} from '@tanstack/svelte-query'
  import devJeans from 'src/assets/dev-jeans.png'
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import Profile from 'src/components/MyPage/Profile.svelte'
  import {userInfo} from 'src/store/user'
  import Gallery from 'src/components/Photo/Gallery.svelte'
  import {getUserPhotos} from 'src/api/service/user'

  // TODO. 로그인 되어있는지 여부에 따라 활성여부 결정
  const query = createQuery({
    queryKey: ['myPhotos'],
    queryFn: getUserPhotos,
  })

  $: console.log({loading: $query?.isLoading})
</script>

<Layout title="나의 버니들">
  {#if !$userInfo}
    <MyLogin />
  {:else}
    <Profile />

    <div class="bunny-list">
      {#if !$query?.data?.length}
        <div class="no-bunny">
          <h2>나의 버니가 없어요!</h2>

          <!-- TODO. 버니가 6개가 넘어가면 경고 토스트 팝업 노출 -->
          <span>나만의 버니를 업로드해보세요.</span>

          <img src={devJeans} alt="버니" class="no-bunny-img" />
        </div>
      {:else}
        <div class="gallery">
          <Gallery photos={$query?.data} />
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
