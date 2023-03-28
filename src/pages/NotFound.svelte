<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import {link} from 'svelte-spa-router'

  import devJeans from 'src/assets/dev-jeans.png'
  import Noti from 'src/components/Noti.svelte'
</script>

<Layout title="다시 한번 확인해 주세요!">
  <div class="container">
    <Noti icon="⚠️" text="잘못된 경로로 접근했습니다. 주소를 다시 확인해 주세요." />
    <img src={devJeans} alt="버니" />
    <div class="link-list">
      <a href="/" use:link>버니 만들러 가기</a>
      <a href="/bunny-list/latest" use:link>새로운 버니들 보러 가기</a>
      <a href="/bunny-list/ranked" use:link>최고의 버니들 보러 가기</a>
    </div>
  </div>
</Layout>

<style>
  img {
    width: 60%;
    opacity: 0.5;
    filter: grayscale(100%);
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 5px 0;
  }
  .link-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 30px 0;
  }
  .container {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    word-break: keep-all;
  }
</style>
