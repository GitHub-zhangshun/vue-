<template>
  <section class="swiper-tags--list_wrapper">
    <div
      class="swiper-tags--list_item"
      v-for="(image, idx) in tagsListImg"
      :key="idx"
      @click="handleClick2TagDetailsPage"
    >
      <img v-lazy="image">
    </div>
    <span class="more-button" v-show="isShownMoreButtonFlag" @click="handleClickShowMoreTags">more>></span>
  </section>
</template>

<script>
export default {
  name: 'SwiperTagsList',
  data() {
    return {
      tagsListImg: [
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki6etaw1j207604awfi.jpg',
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki6etaw1j207604awfi.jpg',
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki6etaw1j207604awfi.jpg',
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki6etaw1j207604awfi.jpg',
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki6etaw1j207604awfi.jpg',
        'http://ww1.sinaimg.cn/large/ecbd3051gy1gbki6etaw1j207604awfi.jpg'
      ],
      isShownMoreButtonFlag: false
    }
  },
  mounted() {
    this.isShownMoreButton();
  },
  methods: {
    // 是否显示更多按钮。
    isShownMoreButton() {
      if(this.tagsListImg.length >= 6) {
        this.isShownMoreButtonFlag = !this.isShownMoreButtonFlag;
      }
    },
    // 点击标签跳转对应详情页。
    handleClick2TagDetailsPage(el) {
      // this.$router.push({
      //   name: '',
      //   params: {}
      // });
      // 对应取数据
      // this.$route.params.xxx
    },
    // 点击 more 按钮显示更多 Tags 页面。
    handleClickShowMoreTags() {
      // this.$router.push();
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-tags--list_wrapper {
  display: flex;
  height: 114.5px;
  padding: 17.5PX 12PX;
  overflow-x: scroll;
  overflow-y: hidden;
  .swiper-tags--list_item {
    flex-shrink: 0;
    width: 129px;
    height: 100%;
    border-radius: 10PX;
    text-align: center;
    line-height: 80px;
    img {
      width: 100%;
    }
  }
  .swiper-tags--list_item:not(:first-of-type) {
    margin-left: 10PX;
  }
  .more-button {
    display: inline-block;
    height: 100%;
    padding: 0 12PX;
    line-height: 80px;
  }
}
// 隐藏移动端的横向滚动条。
.swiper-tags--list_wrapper::-webkit-scrollbar {
  display: none;
}
.swiper-tags--list_wrapper {
  -ms-overflow-style: none;
}
.swiper-tags--list_wrapper {
  scrollbar-width: none;
}
</style>