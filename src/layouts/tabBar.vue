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
          icon: "icon-shouye",
          name: "home"
        },
        {
          label: "社区",
          icon: "icon-shequ",
          name: "community"
        },
        {
          label: "购物车",
          icon: "icon-gouwuche",
          name: "shop-cart"
        },
        {
          label: "个人中心",
          icon: "icon-gerenzhongxin",
          name: "my"
        }
      ],
      // 进入该项目就高亮社区。
      tabBar: "community"
    };
  },
  watch: {
    // 判断 tabBar 中存在的路由，进行对应跳转。
    $route(to, from) {
      if (["home", "community", "shop-cart", "my"].includes(to.name)) {
        this.tabBar = to.name;
      }
    }
  },
  methods: {
    // 点击 tabBar 切换项。
    handleClick2TabDetails(routerName) {
      this.tabBar = routerName;
      if (routerName === "community") {
        this.$router.push({
          name: "show-details-content/recommend"
        });
      }
      else if(routerName === "home") {
        window.location.href = "https://m.sisilily.com";
      }
      else if(routerName === "shop-cart") {
        window.location.href = "https://m.sisilily.com/checkout/cart.html";
      }
      else if(routerName === "my") {
        window.location.href = "https://m.sisilily.com/account/dashboard.html";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
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
