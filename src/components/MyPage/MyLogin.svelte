<script lang="ts">
  import Login from '../Login.svelte'
  import Noti from '../Noti.svelte'

  export let title = '마이페이지를 이용하려면 로그인하세요.'
</script>

<div class="container">
  <div class="wrapper">
    <h2>{title}</h2>

    <Login />
  </div>
  <Noti style="margin: 30px 0;" icon="❤️" text="로그인 후 나만의 버니를 올려 자랑해 보세요!" />
</div>

<style>
  .container {
    width: 100%;
    padding: 10px;
  }
  .wrapper {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    padding-bottom: 20px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin: 20px 0;
    font-size: 18px;
  }
</style>
