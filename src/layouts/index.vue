<template>
  <div class="layout-container">
    <TopBar v-show="isTopBar" />
    <div class="content-container">
      <slot></slot>
    </div>
    <TabBar v-show="isTabBar" />
  </div>
</template>

<script>
import TopBar from "./topBar";
import TabBar from "./tabBar";
export default {
  name: "Layout",
  components: {
    TopBar,
    TabBar
  },
  data() {
    return {};
  },
  computed: {
    // 除首页、社区、购物车、我的，其他页面不显示 tabBar、topBar，需要显示的添加到 isShownTheTabBar、isShownTheTopBar 白名单即可。
    isTabBar() {
      let isShownTheTabBar = [
          "home",
          "community",
          "show-details-content",
          "attention-show-content",
          "shop-cart",
          "my"
        ],
        flag = new Boolean();
      isShownTheTabBar.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      return flag;
    },
    isTopBar() {
      let isShownTheTopBar = [
          "home",
          "community",
          "show-details-content",
          "attention-show-content",
          "shop-cart",
          "my"
        ],
        flag = new Boolean();
      isShownTheTopBar.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      return flag;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .content-container {
    height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
