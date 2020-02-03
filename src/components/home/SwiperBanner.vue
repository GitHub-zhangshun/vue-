<template>
  <section class="swiper-banner_wrapper">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(image, idx) in bannerImg"
        :key="idx"
      >
        <img v-lazy="image">
      </van-swipe-item>
    </van-swipe>
  </section>
</template>

<script>
export default {
  name: "SwiperBanner",
  data() {
    return {
      bannerImg: [
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbgxww3b1mj20af04q76v.jpg',
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbgxww3b1mj20af04q76v.jpg'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-banner_wrapper {
  height: 170px;
  // 解决谷歌优化移动端新特性 passive event listener 报错。
  touch-action: pan-y;
  .van-swipe {
    width: 100%;
    height: 100%;
    .van-swipe-item {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
