<script>
  import Tab1 from './Tabs/Tab1.svelte'
  import Tab2 from './Tabs/Tab2.svelte'
  import Tabs from './Tabs/Tabs.svelte'

  let items = [
    {label: '편집 하기', value: 1, component: Tab1},
    {label: '꾸미기', value: 2, component: Tab2},
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
