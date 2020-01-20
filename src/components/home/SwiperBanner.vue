<template>
  <section class="swiper-banner_wrapper">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, idx) in bannerListData"
        :key="idx"
        :style="[item.bgImg]"
      >
      </van-swipe-item>
    </van-swipe>
  </section>
</template>

<script>
export default {
  name: "SwiperBanner",
  data() {
    return {
      bannerListData: [
        {
          bgImg: {
            backgroundColor: 'skyblue',
            backgroundImg: ''
          }
        },
        {
          bgImg: {
            backgroundColor: 'yellowgreen',
            backgroundImg: ''
          }
        }
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
    }
    .van-swipe-item:nth-child(1) {
      background: skyblue;
    }
    .van-swipe-item:nth-child(2) {
      background: yellowgreen;
    }
  }
}
</style>
