<script lang="ts">
  import brush from 'src/assets/icons/brush.svg'
  import home from 'src/assets/icons/home.svg'
  import trends from 'src/assets/icons/trends.svg'
  import profile from 'src/assets/icons/profile.svg'

  export let title = ''

  // TODO. 네비게이션바 만들기
  const items = [
    {name: '버니 만들기', icon: brush, type: 'link', path: '/'},
    {name: '나의 버니들', icon: profile, type: 'link', path: '/my-pages'},
    {name: '버니 모아보기', icon: trends, type: 'link', path: '/bunny-list'},
    {name: '버니 모아보기', icon: home, type: 'link', path: '/bunny-list'},
  ]
</script>

<header>
  <h1>{title}</h1>
</header>

<style>
  header {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    background-color: white;
    border: 1px solid #e6e6e6;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-weight: 800;
    width: 100%;
    max-width: 600px;
  }
</style>
