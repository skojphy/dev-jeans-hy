<script>
  import arrow from 'src/assets/icons/arrow-right.svg'
  export let text = ''
  export let icon = '💡'
  export let style = ''
  export let href = ''
</script>

{#if href}
  <a {href} class="noti {href ? 'link' : ''}" {style}>
    {icon}
    {text}
    <img src={arrow} alt="arrow" />
  </a>
{:else}
  <div class="noti" {style}>
    {icon}
    {text}
  </div>
{/if}

<style>
  .noti {
    background-color: #ecf0f3;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 6px;
    color: #666;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  .link {
    color: #ff924c;
    background-color: #fff3ec;
  }
</style>
