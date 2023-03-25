<script>
  import {TabValue} from 'src/const/tab'
  import BackgroundTap from './Tabs/BackgroundTap.svelte'
  import Photo from './Tabs/Photo.svelte'
  import Decorate from './Tabs/DecorateTap.svelte'
  import SaveTap from './Tabs/SaveTap.svelte'
  import Tabs from './Tabs/Tabs.svelte'

  let items = [
    {label: '꾸미기', value: TabValue.Decorate, component: Decorate},
    {label: '배경', value: TabValue.Background, component: BackgroundTap},
    {label: '사진 추가', value: TabValue.Photo, component: Photo},
    {label: '저장하기', value: TabValue.Save, component: SaveTap},
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
