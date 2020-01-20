<template>
  <section>
    <nav class="switch-list_wrapper">
      <van-tabs v-model="active" :line-width="28" @click="handleClick2Details">
        <van-tab
          v-for="(item, idx) in tabList"
          :key="idx"
          :title="item.title"
        >
        </van-tab>
      </van-tabs>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "ShowDetailsArea",
  data() {
    return {
      active: 1,
      tabList: [
        {
          title: '关注'
        },
        {
          title: '推荐'
        },
        {
          title: 'girl'
        },
        {
          title: 'lady'
        },
        {
          title: 'madam'
        },
        {
          title: 'home'
        }
      ]
    }
  },
  methods: {
    handleClick2Details(index) {
      this.$router.push({
        name: `show-details-content`,
        params: {
          tabId: index
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ van-tab {
  touch-action: pan-y;
}
.switch-list_wrapper {
  // 解决谷歌优化移动端新特性 passive event listener 报错。
  touch-action: pan-y;
}
</style>
