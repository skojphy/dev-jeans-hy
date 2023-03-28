<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import type {PhotoRes} from 'src/types/photo'
  import Gallery from 'src/components/Photo/Gallery.svelte'
  import Noti from 'src/components/Noti.svelte'
  import {createInfiniteQuery} from '@tanstack/svelte-query'
  import {getPhotos} from 'src/api/service/photo'
  import {pageFlater} from 'src/lib/pageFlatten'
  import {infiniteScroll} from 'src/lib/infiniteScroll'
  import {onMount} from 'svelte'
  import {SyncLoader} from 'svelte-loading-spinners'

  let title = '최고의 버니들!'
  let detail = '좋아요를 많이 받은 버니들을 확인해 보세요!'
  let icon = '🔥'
  let photos: PhotoRes[] = []
  let infiniteRef: HTMLDivElement

  onMount(() => {
    scrollTo(0, 0)
  })

  const query = createInfiniteQuery({
    queryKey: ['bunny-list', 'ranked'],
    queryFn: getPhotos('ranked'),
    getNextPageParam: (lastPage) => {
      const {last, number} = lastPage.data
      if (!last) {
        return number + 1
      }
      return undefined
    },
  })

  $: if ($query?.data?.pages) photos = pageFlater($query?.data?.pages)

  $: if (infiniteRef) infiniteScroll({fetch: $query.fetchNextPage, element: infiniteRef})
</script>

<Layout {title}>
  <div class="container">
    <Noti {icon} style="margin-bottom: 10px" text={detail} />
    <Gallery {photos} />
    {#if $query.hasNextPage}
      <div class="loading" bind:this={infiniteRef}>
        <SyncLoader size="40" color="#ff595e" unit="px" duration="1s" />
      </div>
    {/if}
  </div>
</Layout>

<style>
  .container {
    padding: 0 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .loading {
    margin-top: 30px;
  }
</style>
