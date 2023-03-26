<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import Login from 'src/components/Login.svelte'
  import {userInfo} from 'src/store/user'

  $: {
    console.log({$userInfo})
  }
</script>

<Layout title="나의 버니들">
  {#if !$userInfo}
    <Login />
  {:else}
    <div class="profile-wrapper">
      <img src={$userInfo.profilePictureUrl} alt={$userInfo.email} aria-hidden="true" />
      <span>{$userInfo.lastName} {$userInfo.firstName}</span>
    </div>
  {/if}
</Layout>

<style>
  .profile-wrapper {
  }
</style>
