<script lang="ts">
  import {createQuery} from '@tanstack/svelte-query'
  import devJeans from 'src/assets/dev-jeans.png'
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import Profile from 'src/components/MyPage/Profile.svelte'
  import {userInfo} from 'src/store/user'
  import Gallery from 'src/components/Photo/Gallery.svelte'
  import {getUserPhotos} from 'src/api/service/user'
  import {logout} from 'src/api/service/auth'

  $: query = createQuery({
    queryKey: ['myPhotos'],
    queryFn: getUserPhotos,
    enabled: !!$userInfo,
  })
</script>

<Layout title="나의 버니들!">
  {#if !!$userInfo}
    <Profile />

    <div class="bunny-list">
      {#if !$query?.data?.length}
        <div class="no-bunny">
          <h2>나의 버니가 없어요!</h2>
          <span>나만의 버니를 업로드해 보세요.</span>
          <img src={devJeans} alt="버니" class="no-bunny-img" />
        </div>
      {:else}
        <div class="gallery">
          <Gallery photos={$query?.data} />
          <button type="button" on:click={logout} class="logout">로그아웃</button>
        </div>
      {/if}
    </div>
  {:else}
    <MyLogin />
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

  .logout {
    background-color: transparent;
    width: 100%;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-radius: 6px;
    margin-top: 30px;
    color: rgb(104, 104, 104);
    cursor: pointer;
  }
</style>
