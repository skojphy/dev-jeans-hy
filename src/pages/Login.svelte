<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import {querystring, push} from 'svelte-spa-router'
  import {userInfo} from 'src/store/user'

  let title = '마이페이지를 이용하려면 로그인 하세요.'

  $: {
    const redirect = $querystring.split('=')[1]
    if (redirect === 'decorate') title = '나의 버니를 자랑하기 위해 로그인하세요.'
  }

  $: if ($userInfo) push('/?redirect=logined')
</script>

<Layout title="로그인">
  <MyLogin {title} />
</Layout>

<style>
</style>
