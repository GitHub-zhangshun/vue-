<template>
  <section class="swiper-tags--list_wrapper">
    <div
      class="swiper-tags--list_item"
      v-for="(image, idx) in tagsListImg"
      :key="idx"
      @click="handleClick2TagDetailsPage"
    >
      <img v-lazy="image" />
    </div>
    <span
      class="more-button"
      v-show="isShownMoreButton"
      @click="handleClickShowMoreTags"
      >more>></span
    >
  </section>
</template>

<script>
import { indexTagListData } from "@/api/common";
export default {
  name: "SwiperTagsList",
  data() {
    return {
      // 标签图数据存放数组。
      tagsListImg: [],
    };
  },
  computed: {
    // 是否显示更多按钮。
    isShownMoreButton() {
      return this.tagsListImg.length >= 6 ? true : false;
    },
  },
  mounted() {
    this.getindexTagListData();
  },
  methods: {
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
    },
    // 获取 tag 图数据方法。
    async getindexTagListData() {
      this.tagsListImg = await indexTagListData();
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-tags--list_wrapper {
  display: flex;
  height: 114.5px;
  padding: 17.5px 12px;
  overflow-x: scroll;
  overflow-y: hidden;
  .swiper-tags--list_item {
    flex-shrink: 0;
    width: 129px;
    height: 100%;
    margin-right: 10px;
    border-radius: 10px;
    text-align: center;
    line-height: 80px;
    img {
      width: 100%;
    }
  }
  .more-button {
    display: inline-block;
    height: 100%;
    padding-right: 12px;
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
