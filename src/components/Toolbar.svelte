<script>
  import {TabValue} from 'src/const/tab'
  import BackgroundTap from './Tabs/BackgroundTap.svelte'
  import Photo from './Tabs/Photo.svelte'
  import Decorate from './Tabs/DecorateTap.svelte'
  import SaveTap from './Tabs/SaveTap.svelte'
  import Tabs from './Tabs/Tabs.svelte'
  import DrawingTap from './Tabs/DrawingTap.svelte'

  let items = [
    {label: '꾸미기', value: TabValue.Decorate, component: Decorate},
    {label: '배경', value: TabValue.Background, component: BackgroundTap},
    {label: '사진', value: TabValue.Photo, component: Photo},
    {label: '드로잉', value: TabValue.Drawing, component: DrawingTap},
    {label: '저장', value: TabValue.Save, component: SaveTap},
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
    font-size: 12px;
  }
</style>
