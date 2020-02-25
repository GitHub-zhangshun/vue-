<template>
  <div id="app">
    <Layout>
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <router-view v-if="isRouterAlive" />
        </transition>
    </Layout>
  </div>
</template>

<script>
import animate from "animate.css";
import Layout from "@/layouts";
export default {
  name: "App",
  components: {
    Layout
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    // 模拟刷新当前路由的方法。
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        setTimeout(() => {
          this.isRouterAlive = true;
        }, 500);
      });
    }
  }
};
</script>

<style lang="scss">
@import "./style/normalize.scss";
@import "./style/reset.scss";
@import "./style/common.scss";
@import "~@/assets/iconfont/iconfont.css";
#app {
  font-size: $font-size-base;
  color: $color-common;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "SF UI Text",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
}
</style>
