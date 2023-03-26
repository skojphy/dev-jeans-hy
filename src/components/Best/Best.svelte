<script>
  import {register} from 'swiper/element/bundle'
  import BestItem from './BestItem.svelte'

  register()

  const swiperConfig = {
    spaceBetween: 10,
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
</script>

<div class="container">
  <h2>Best Bunnies🐰</h2>
  <swiper-container class="mySwiper" {...swiperConfig} pagination-dynamic-bullets={true}>
    <swiper-slide><BestItem id={1} /></swiper-slide>
    <swiper-slide><BestItem id={2} /></swiper-slide>
    <swiper-slide><BestItem id={3} /></swiper-slide>
    <swiper-slide><BestItem id={4} /></swiper-slide>
    <swiper-slide><BestItem id={5} /></swiper-slide>
    <swiper-slide><BestItem id={6} /></swiper-slide>
    <swiper-slide><BestItem id={7} /></swiper-slide>
    <swiper-slide><BestItem id={8} /></swiper-slide>
    <swiper-slide><BestItem id={9} /></swiper-slide>
    <swiper-slide><BestItem id={10} /></swiper-slide>
    <swiper-slide><BestItem id={11} /></swiper-slide>
    <swiper-slide><BestItem id={12} /></swiper-slide>
    <swiper-slide><BestItem id={13} /></swiper-slide>
    <swiper-slide><BestItem id={14} /></swiper-slide>
    <swiper-slide><BestItem id={15} /></swiper-slide>
    <swiper-slide><BestItem id={16} /></swiper-slide>
    <swiper-slide><BestItem id={17} /></swiper-slide>
  </swiper-container>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
    word-break: keep-all;
  }
  swiper-container {
    width: 600px;
    height: 150px;
    padding: 0 12px 0 12px;
    --swiper-navigation-size: 25px;
    --swiper-navigation-top-offset: 50%;
    --swiper-navigation-sides-offset: 0;
    --swiper-theme-color: #dee2e6;
    --swiper-navigation-color: var(--swiper-theme-color);
  }

  swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
