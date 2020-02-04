<template>
  <section class="layout-container">
    <TopBar v-show="isTopBar" />
    <div class="content-container">
      <slot></slot>
    </div>
    <TabBar v-show="isTabBar" />
  </section>
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
    // 需要显示 tabbar || topbar 的，将路由名字添加到 isShownTheTabBar、isShownTheTopBar 白名单即可。
    isTabBar() {
      let isShownTheTabBar = [
          "home",
          "community",
          "show-details-content",
          "shop-cart",
          "my",
          "showDetailsPage"
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
          "shop-cart",
          "my",
          "shield",
          "showDetailsPage"
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
    height: calc(100vh - 107PX);
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
