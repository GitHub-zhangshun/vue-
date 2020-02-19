<template>
  <section class="tags-list_wrapper">
    <div
      class="tags-item_wrapper"
      v-for="(item, idx) in listTagsData"
      :key="idx"
      @click="handleClick2TagDetailsPage(item.id)"
    >
      <img v-lazy="item.list_image.original_url" alt="ラベル詳細マップ" />
    </div>
  </section>
</template>

<script>
import { listTagsData } from "@/api/common";
export default {
  name: "showTagsPage",
  data() {
    return {
      // 存放标签数据的数组。
      listTagsData: []
    };
  },
  mounted() {
    this.getTagsListData();
  },
  methods: {
    // 获取标签详细数据的方法。
    async getTagsListData() {
      let res = await listTagsData();
      this.listTagsData = res.data;
      console.info(this.listTagsData);
    },
    // 点击标签跳转对应详情页，并传递 id 。
    handleClick2TagDetailsPage(id) {
      this.$router.push({
        name: 'tagDetailsPage',
        params: {
          tag_id: id
        }
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
