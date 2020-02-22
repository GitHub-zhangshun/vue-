<template>
  <section class="layout-container">
    <TopBar v-show="isTopBar" />
    <div :class="computedTheHeight">
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
    return {
      // 是否考虑 topbar 和 tabbar 高度影响中间内容计算的标志布尔值。
      noTopHeight: false,
      noTabHeight: false
    };
  },
  computed: {
    // 需要显示 tabbar || topbar 的，将路由名字添加到 isShownTheTabBar、isShownTheTopBar 白名单即可。
    isTopBar() {
      let isShownTheTopBar = [
          "home",
          "community",
          "show-details-content",
          "show-details-content/recommend",
          "show-details-content/attention",
          "shop-cart",
          "my",
          "shield",
          "showDetailsPage",
          "showTagsPage",
          "tagDetailsPage",
          "personalHomepage",
          "changePersonalPageBg",
          "changePersonalInfo",
          "personalInteraction",
          "othersHomepage",
          "othersInteraction"
        ],
        flag = new Boolean();
      isShownTheTopBar.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      this.noTopHeight = flag;
      return flag;
    },
    isTabBar() {
      let isShownTheTabBar = [
          "home",
          "community",
          "show-details-content",
          "show-details-content/recommend",
          "show-details-content/attention",
          "shop-cart",
          "my"
        ],
        flag = new Boolean();
      isShownTheTabBar.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      this.noTabHeight = flag;
      return flag;
    },
    // 根据是否显示 topbar 和 tabbar 来计算中间内容的高度。
    computedTheHeight() {
      if (this.noTopHeight === true && this.noTabHeight === false) {
        return "content-container--no_top";
      } else if (this.noTopHeight === false && this.noTabHeight === true) {
        return "content-container--no_tab";
      } else if (this.noTopHeight === false && this.noTabHeight === false) {
        return "content-container--no_both";
      } else {
        return "content-container";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .content-container {
    height: calc(100vh - 102px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content-container--no_both {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content-container--no_top {
    height: calc(100vh - 55px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content-container--no_tab {
    height: calc(100vh - 47px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
