<script lang="ts">
  import {register} from 'swiper/element/bundle'
  import BestItem from './BestItem.svelte'
  import {getPhotos} from 'src/api/service/photo'
  import {createQuery} from '@tanstack/svelte-query'
  import {link} from 'svelte-spa-router'

  register()

  $: bunnyQuery = createQuery({
    queryKey: ['best bunny'],
    queryFn: getPhotos('ranked'),
  })

  const swiperConfig = {
    spaceBetween: 12,
    slidesPerView: 5,
    pagination: true,
    loop: true,
    navigation: true,
    keyboard: true,
    rewind: true,
    autoPlay: true,
    a11y: {
      prevSlideMessage: '이전 버니 보기',
      nextSlideMessage: '다음 버니 보기',
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: true, // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
    },
  }

  $: bestBunnies = $bunnyQuery?.data?.data?.content || []
</script>

<div class="container">
  <div class="header">
    <h2>가장 인기가 많은 버니들이에요!</h2>
    <a class="link" href="/bunny-list/ranked" use:link>보러 가기</a>
  </div>

  <swiper-container class="mySwiper" {...swiperConfig} pagination-dynamic-bullets={true}>
    {#each bestBunnies as bunny}
      <swiper-slide>
        <BestItem id={bunny.photoId} imageUrl={bunny.thumbnailImageUrl} />
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style>
  .container {
    width: 100%;
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
    padding: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin-bottom: 10px;
  }
  .link {
    color: #ff595e;
    font-size: 12px;
    font-weight: 600;
  }

  h2 {
    font-size: 16px;
    word-break: keep-all;
  }
  swiper-container {
    width: 100%;
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
