<template>
  <section class="tags-list_wrapper">
    <div
      class="tags-item_wrapper"
      v-for="(item, idx) in tagsListData"
      :key="idx"
      @click="handleClick2TagDetailsPage(item.id)"
    >
      <img :src="item.img" alt="ラベル詳細マップ" />
    </div>
  </section>
</template>

<script>
import { indexTagListData } from "@/api/common";
export default {
  name: "showTagsPage",
  data() {
    return {
      // 存放标签数据的数组。
      tagsListData: []
    };
  },
  mounted() {
    this.getTagsListData();
  },
  methods: {
    // 获取标签详细数据的方法。
    async getTagsListData() {
      this.tagsListData = await indexTagListData();
    },
    // 点击标签跳转对应详情页，并传递 id 。
    handleClick2TagDetailsPage(id) {
      this.$router.push({
        name: 'tagDetailsPage',
        params: {id}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-list_wrapper {
  padding: 5.5px 15px 0px 15px;
  .tags-item_wrapper {
    width: 100%; 
    height: 120px;
    margin-bottom: 9.5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
