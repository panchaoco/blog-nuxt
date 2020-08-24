<template>
  <div class="slide-container">
    <div v-swiper:mySwiper="swiperOption" class="music-slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(slide, index) in banners" :key="index">
          <div class="content">
            <a :href="slide.link" target="_blank">
              <img :src="slide.image" alt="" v-show="show">
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" />
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "slide",
    props: [
      'banners'
    ],
    data() {
      return {
        swiperOption: {
          autoplay: {
            delay: 3500,
            disableOnInteraction: false
          },
          pagination: {
            clickable: true,
            el: '.swiper-pagination'
          },
          setWrapperSize: true,
          mousewheel: true,
          observeParents: true,
          // 禁用 PC 拖动手指样式
          grabCursor: true,
          // 警用 PC 拖动
          simulateTouch : false,
          preloadImages: false,
          lazy: true
        },
        show: false

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
</script>

<style lang="less">
  .music-slider {
    .swiper-pagination {
      .swiper-pagination-bullet {
        &.swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 10px;
          background-color: #ffffff;
          transition: all .2s;
          transform-origin: left;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  .slide-container {
    overflow: hidden;
    position: relative;
    z-index: 2;
  }
  .music-slider {
    margin-bottom: 10px;
    position: relative;
    .swiper-slide {
      width: 100%;
    }
    .swiper-wrapper {
      display: flex;
    }
    .content {
      width: 100%;
      position: relative;
      overflow: hidden;
    }
    img {
      min-width: 610px;
      width: 100%;
      display: block;
      height: 220px;
    }
  }
</style>
