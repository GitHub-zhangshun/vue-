<template>
  <section class="swiper-banner_wrapper">
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="(image, idx) in bannerImg"
        :key="idx"
      >
        <img v-lazy="image">
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator"></div>
    </van-swipe>
  </section>
</template>

<script>
export default {
  name: "SwiperBanner",
  data() {
    return {
      bannerImg: [
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki5clk41j20ku09gqcf.jpg',
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki5clk41j20ku09gqcf.jpg'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-banner_wrapper {
  width: 100%;
  height: 170px;
  // 解决谷歌优化移动端新特性 passive event listener 报错。
  touch-action: pan-y;
  .van-swipe {
    width: 100%;
    height: 100%;
    .van-swipe-item {
      width: 100%;
      img {
        height: 100%;
      }
    }
  }
}
</style>
