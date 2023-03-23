<script>
  import Tab1 from './Tabs/Tab1.svelte'
  import Tab2 from './Tabs/Tab2.svelte'
  import Tab3 from './Tabs/Tab3.svelte'
  import Tabs from './Tabs/Tabs.svelte'

  let items = [
    {label: '편집 하기', value: 1, component: Tab1},
    {label: '꾸미기', value: 2, component: Tab2},
    {label: '저장하기', value: 3, component: Tab3},
  ]
</script>

<div class="container">
  <Tabs {items} />
</div>

<style>
  .container {
    max-width: 600px;
    width: 100%;
    margin: 20px auto;
  }
</style>
