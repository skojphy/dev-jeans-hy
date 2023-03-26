<script lang="ts">
  import type {PhotoRes} from 'src/types/photo'
  import {register} from 'swiper/element/bundle'
  import BestItem from './BestItem.svelte'

  register()

  const swiperConfig = {
    spaceBetween: 12,
    slidesPerView: 5,
    pagination: true,
    loop: false,
    navigation: true,
    keyboard: true,
    rewind: true,
    a11y: {
      prevSlideMessage: '이전 버니 보기',
      nextSlideMessage: '다음 버니 보기',
    },
    // paginationDynamicBullets: true,
    centeredSlides: true,
  }

  // 목데이터
  let bestBunnies: PhotoRes[] = [
    {
      photoId: 1,
      photoTitle: '버니1',
      thumbnailImageUrl: 'src/assets/dev-jeans.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 2,
      photoTitle: '버니2',
      thumbnailImageUrl: 'src/assets/dev-jeans2.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 3,
      photoTitle: '버니3',
      thumbnailImageUrl: 'src/assets/dev-jeans2.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 4,
      photoTitle: '버니4',
      thumbnailImageUrl: 'src/assets/dev-jeans2.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 5,
      photoTitle: '버니5',
      thumbnailImageUrl: 'src/assets/dev-jeans2.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 6,
      photoTitle: '버니6',
      thumbnailImageUrl: 'src/assets/dev-jeans2.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 7,
      photoTitle: '버니7',
      thumbnailImageUrl: 'src/assets/dev-jeans2.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-08-01',
      lastModifiedDate: '2021-08-01',
      likeCount: 0,
      visitCount: 0,
    },
    {
      photoId: 8,
      photoTitle: '버니8',
      thumbnailImageUrl: 'src/assets/dev-jeans2.png',
      imageUrl: 'src/assets/dev-jeans2.png',
      createdDate: '2021-09-02',
      lastModifiedDate: '2021-09-02',
      likeCount: 0,
      visitCount: 0,
    },
  ]
</script>

<div class="container">
  <h2>Best Bunnies🐰</h2>
  <swiper-container class="mySwiper" {...swiperConfig} pagination-dynamic-bullets={true}>
    {#each bestBunnies as bunny}
      <swiper-slide>
        <BestItem id={bunny.photoId} imageUrl={bunny.thumbnailImageUrl} />
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    word-break: keep-all;
  }
  swiper-container {
    width: 600px;
    height: 135px;
    padding: 0 12px 0 12px;
    --swiper-navigation-size: 20px;
    --swiper-navigation-top-offset: 38%;
    --swiper-navigation-sides-offset: 0;
    --swiper-theme-color: #dee2e6;
    --swiper-navigation-color: var(--swiper-theme-color);
  }

  swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
  }
</style>
