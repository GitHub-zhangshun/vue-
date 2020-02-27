<template>
  <section class="swiper-tags--list_wrapper">
    <div
      class="swiper-tags--list_item"
      v-for="(item, idx) in tagsListData"
      :key="idx"
      @click="handleClick2TagDetailsPage(item.id)"
    >
      <img :src="item.index_image.original_url" alt="ラベルのサムネイル" />
    </div>
    <span
      class="more-button"
      v-show="isShownMoreButton"
      @click="handleClickShowMoreTags"
    >
      more>>
    </span>
  </section>
</template>

<script>
import { indexTagListData, listTagsData } from "@/api/common";
export default {
  name: "SwiperTagsList",
  data() {
    return {
      // 存放标签数据源数据数组。
      originalData: [],
      // 存放标签数据的数组。
      tagsListData: []
    };
  },
  computed: {
    // 是否显示更多按钮。
    isShownMoreButton() {
      return this.originalData.length >= 6 ? true : false;
    },
  },
  mounted() {
    this.getindexTagListData();
    this.getListTagsData();
  },
  methods: {
    // 点击标签跳转对应详情页，并传递 id 。
    handleClick2TagDetailsPage(id) {
      this.$router.push({
        name: 'tagDetailsPage',
        params: {
          tag_id: id
        }
      });
    },
    // 点击 more 按钮显示更多 Tags 页面。
    handleClickShowMoreTags() {
      this.$router.push({
        name: 'showTagsPage'
      });
    },
    // 获取预览 tag 图数据方法。
    async getindexTagListData() {
      let res = await indexTagListData();
      this.tagsListData = res.data.slice(0, 5);
    },
    // 获取列表 tag 图数据方法。
    async getListTagsData() {
      let res = await listTagsData();
      this.originalData = res.data;
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
    text-align: center;
    line-height: 80px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    img:last-child {
      margin-right: 12px;
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
