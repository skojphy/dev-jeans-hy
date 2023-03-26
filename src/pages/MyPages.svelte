<script lang="ts">
  import devJeans from 'src/assets/dev-jeans.png'
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import Profile from 'src/components/MyPage/Profile.svelte'
  import {userInfo} from 'src/store/user'
  import {link} from 'svelte-spa-router'

  $: {
    console.log({$userInfo})
  }
</script>

<Layout title="나의 버니들">
  {#if !$userInfo}
    <MyLogin />
  {:else}
    <Profile />

    <div class="bunny-list">
      {#if !$userInfo.photos.length}
        <div class="no-bunny">
          <h2>나의 버니가 없어요!</h2>
          <span>나만의 버니를 업로드해보세요.</span>

          <img src={devJeans} alt="버니" class="no-bunny-img" />
        </div>
      {:else}
        <!-- TODO. 그리드로 갤러리 보여주기 -->
        <ul>
          {#each $userInfo.photos as bunny}
            <li>
              <a href={`/${bunny.id}`} use:link>
                <img src={bunny.imageUrl} alt={bunny.fileName} />
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
