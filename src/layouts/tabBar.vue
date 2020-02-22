<template>
  <section class="tab-bar">
    <div
      v-for="(item, idx) in tabs"
      :key="idx"
      class="bar-item"
      @click="handleClick2TabDetails(item.name)"
    >
      <img :src="item.icon" alt="tabIcon">
    </div>
  </section>
</template>

<script>
import homeIconNs from "@/assets/img/home-noselect.png";
import navbarIconNs from "@/assets/img/navbar-noselect.png";
import communityIconS from "@/assets/img/zone-selected.png";
import shopCartIconNs from "@/assets/img/shop-cart-noselect.png";
import myIconNs from "@/assets/img/my-noselect.png";
import { sessionGetItem } from "../common/util";
export default {
  name: "TabBar",
  data() {
    return {
      tabs: [
        {
          icon: homeIconNs,
          name: "home"
        },
        {
          icon: navbarIconNs,
          name: "menu"
        },
        {
          icon: communityIconS,
          name: "community"
        },
        {
          icon: shopCartIconNs,
          name: "shop-cart"
        },
        {
          icon: myIconNs,
          name: "my"
        }
      ]
    };
  },
  methods: {
    // 点击 tabBar 切换项。
    handleClick2TabDetails(routerName) {
      this.tabBar = routerName;
      switch (routerName) {
        case 'home':
          window.location.href = "https://m-test.sisilily.com/";
          break;
        case 'menu':
          window.location.href = "https://m-test.sisilily.com/sidebar-page.html";
          break;
        case 'community':
          this.$router.push({
            name: "show-details-content/recommend"
          });
          break;
        case 'shop-cart':
          window.location.href = "https://m-test.sisilily.com/checkout/cart.html";
          break;
        case 'my':
          window.location.href = "https://m-test.sisilily.com/account/dashboard.html";
          break;
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
  height: 55px;
  .bar-item {
    flex: 1;
    font-size: 14px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
