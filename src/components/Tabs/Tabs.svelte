<script>
  export let items = []
  export let activeTabValue = 1

  const handleClick = (tabValue) => () => (activeTabValue = tabValue)
</script>

<ul class="taps">
  {#each items as item}
    <li class={activeTabValue === item.value ? 'active' : ''}>
      <button type="button" on:click={handleClick(item.value)}>{item.label}</button>
    </li>
  {/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div class="box">
      <svelte:component this={item.component} />
    </div>
  {/if}
{/each}

<style>
  .box {
    margin-bottom: 10px;
    width: 100%;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
  }
  .taps {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    width: 100%;
  }

  li {
    margin-bottom: -1px;
    width: 100%;
    background-color: #fff;
  }

  button {
    border: 1px solid transparent;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    cursor: pointer;
    background-color: #edf0f3;
    color: #495057;
  }

  li.active > button {
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
