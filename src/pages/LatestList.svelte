<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import Gallery from 'src/components/Photo/Gallery.svelte'
  import Noti from 'src/components/Noti.svelte'
  import {createInfiniteQuery} from '@tanstack/svelte-query'
  import {getPhotos} from 'src/api/service/photo'
  import {pageFlater} from 'src/lib/pageFlatten'
  import type {PhotoRes} from 'src/types/photo'
  import {infiniteScroll} from 'src/lib/infiniteScroll'

  let title = '새로운 버니들!'
  let detail = '최근에 올라온 버니들을 확인해보세요!'
  let icon = '💘'
  let photos: PhotoRes[] = []
  let infiniteRef: HTMLDivElement

  const query = createInfiniteQuery({
    queryKey: ['bunny-list', 'latest'],
    queryFn: getPhotos('latest'),
    getNextPageParam: (lastPage) => {
      const {last, number} = lastPage.data
      if (!last) {
        return number + 1
      }
      return undefined
    },
  })
  $: if (infiniteRef) infiniteScroll({fetch: $query.fetchNextPage, element: infiniteRef})

  $: if ($query?.data?.pages) photos = pageFlater($query?.data?.pages)
</script>

<Layout title="버니 모아보기">
  <div class="container">
    <h1>{title}</h1>
    <Noti {icon} style="margin: 10px 0" text={detail} />
    <Gallery {photos} />
    {#if $query.hasNextPage}
      <div bind:this={infiniteRef}>loading ...</div>
    {/if}
  </div>
</Layout>

<style>
  h1 {
    font-family: 'Staatliches', cursive;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    color: #f1c164;
    text-shadow: 1px 1px #16345a, 3px 3px #284d8e, 5px 5px #4d8cbf, 7px 7px #5fa9d9;
    margin: 0;
  }

  .container {
    padding: 10px;
  }
</style>
