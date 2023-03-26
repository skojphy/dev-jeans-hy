<script lang="ts">
  import Layout from 'src/components/Layout/Layout.svelte'
  import devJeans from 'src/assets/dev-jeans.png'
  import type {PhotoRes} from 'src/types/photo'
  import Gallery from 'src/components/Photo/Gallery.svelte'
  import {link, location, params} from 'svelte-spa-router'
  import Noti from 'src/components/Noti.svelte'

  let title = '새로운 버니들!'
  let detail = '최근에 올라온 버니들을 확인해보세요!'
  let icon = '💘'

  $: {
    if ($params?.sort === 'new') {
      title = '새로운 버니들!'
      detail = '최근에 올라온 버니들을 확인해보세요!'
      icon = '💘'
    } else if ($params?.sort === 'trends') {
      title = '최고의 버니들!'
      detail = '좋아요가 많은 버니들을 확인해보세요!'
      icon = '🔥'
    }
  }

  // 목데이터
  let photos: PhotoRes[] = [
    {
      photoId: 1,
      photoTitle: '버니1',
      thumbnailImageUrl: devJeans,
      imageUrl: devJeans,
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 2,
      photoTitle: '버니2',
      thumbnailImageUrl: devJeans,
      imageUrl: devJeans,
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 3,
      photoTitle: '버니3',
      thumbnailImageUrl: devJeans,
      imageUrl: devJeans,
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 4,
      photoTitle: '버니4',
      thumbnailImageUrl: devJeans,
      imageUrl: devJeans,
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 5,
      photoTitle: '버니5',
      thumbnailImageUrl: devJeans,
      imageUrl: devJeans,
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 6,
      photoTitle: '버니6',
      thumbnailImageUrl: devJeans,
      imageUrl: devJeans,
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
  ]
</script>

<Layout title="버니 모아보기">
  <div class="container">
    <h1>{title}</h1>
    <Noti {icon} style="margin: 10px 0" text={detail} />
    <!-- TODO. 클릭하면 디테일 페이지로 -->
    <!-- TODO. 좋아요/최신순 정렬 -->
    <Gallery {photos} />
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
