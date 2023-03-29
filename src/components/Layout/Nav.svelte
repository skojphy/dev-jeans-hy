<script lang="ts">
  import Bunny from 'src/assets/icons/bunny.svg'
  import New from 'src/assets/icons/new.svg'
  import Best from 'src/assets/icons/best.svg'
  import User from 'src/assets/icons/user.svg'
  import {link, location} from 'svelte-spa-router'
  import A11yhidden from '../A11yhidden.svelte'

  // TODO. 네비게이션바 만들기
  const items = [
    {name: '버니 만들기', icon: Bunny, type: 'link', path: '/'},
    {name: '트렌드', icon: Best, type: 'link', path: '/bunny-list/ranked'},
    {name: '실시간', icon: New, type: 'link', path: '/bunny-list/latest'},
    {name: '나의 버니들', icon: User, type: 'link', path: '/my'},
  ]
</script>

<nav>
  <ul class="list">
    {#each items as item}
      <li class={$location === item.path ? 'active' : ''}>
        <a href={item.path} use:link>
          <A11yhidden>{item.name}</A11yhidden>
          <img src={item.icon} alt={item.name} width="30" />
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    background-color: white;
    border: 1px solid #e6e6e6;
    border-bottom: none;

    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    width: 100%;
    max-width: 600px;
    z-index: 9999;
  }

  .list {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  li {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    background-color: #edf0f3;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  button {
    background-color: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }
</style>
