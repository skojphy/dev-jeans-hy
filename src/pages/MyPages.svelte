<script lang="ts">
  import {getUserPhotos} from 'src/api/service/user'
  import devJeans from 'src/assets/dev-jeans.png'
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import Profile from 'src/components/MyPage/Profile.svelte'
  import {userInfo} from 'src/store/user'
  import type {PhotoRes} from 'src/types/photo'
  import {onMount} from 'svelte'
  import {link} from 'svelte-spa-router'

  let photos: PhotoRes[] = []

  $: {
    console.log({$userInfo, photos})
  }

  onMount(async () => {
    if ($userInfo) {
      photos = await getUserPhotos()
    }
  })
</script>

<Layout title="나의 버니들">
  {#if !$userInfo}
    <MyLogin />
  {:else}
    <Profile />

    <div class="bunny-list">
      {#if !photos.length}
        <div class="no-bunny">
          <h2>나의 버니가 없어요!</h2>
          <span>나만의 버니를 업로드해보세요.</span>

          <img src={devJeans} alt="버니" class="no-bunny-img" />
        </div>
      {:else}
        <!-- TODO. 그리드로 갤러리 보여주기 -->
        <ul>
          {#each photos as photo}
            <li>
              <a href={`/${photo.id}`} use:link>
                <img src={photo.thumbnailImageUrl} alt={photo.photoTitle} />
              </a>
            </li>
          {/each}
        </ul>
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
</style>
