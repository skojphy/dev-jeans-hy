<script lang="ts">
  import type {PhotoRes} from 'src/types/photo'
  import {register} from 'swiper/element/bundle'
  import BestItem from './BestItem.svelte'
  import {getBestPhotos} from 'src/api/service/photo'

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
    centeredSlides: true,
  }

  let bestBunnies: PhotoRes[] = []

  getBestPhotos().then(({content}) => {
    bestBunnies = content
  })
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
