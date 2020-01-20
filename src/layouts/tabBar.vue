<template>
  <section class="tab-bar">
    <div
      v-for="(item, idx) in tabs"
      :key="idx"
      :class="['bar-item', tabBar === item.name ? 'active' : '']"
      @click="handleClick2TabDetails(item.name)"
    >
      <i :class="['iconfont', item.icon]"></i>
      <div class="label">{{ item.label }}</div>
    </div>
  </section>
</template>

<script>
import { sessionGetItem } from "../common/util";

export default {
  name: "TabBar",
  data() {
    return {
      tabs: [
        {
          label: "主页",
          icon: "icon-weibo",
          name: "home"
        },
        {
          label: "社区",
          icon: "icon-weibo",
          name: "community"
        },
        {
          label: "购物车",
          icon: "icon-weibo",
          name: "shop-cart"
        },
        {
          label: "个人中心",
          icon: "icon-weibo",
          name: "my"
        }
      ],
      // 从 session 中获取之前位于哪个 item 下。
      tabBar: sessionGetItem("tabBar") || "home"
    };
  },
  watch: {
    // 判断 tabbar 中存在的路由，对应跳转。
    $route(to, from) {
      if (['home', 'community', 'shop-cart', 'my'].includes(to.name)) {
        this.tabBar = to.name;
      }
    }
  },
  methods: {
    // 点击 tabbar 切换的事件。
    handleClick2TabDetails(routerName) {
      this.tabBar = routerName;
      this.$router.push({ name: routerName });
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60PX;
  @include border-top();
  .bar-item {
    flex: 1;
    font-size: 14px;
    text-align: center;
    .iconfont {
      font-size: 24px;
    }
  }
  .bar-item.active {
    color: red;
  }
}
</style>
