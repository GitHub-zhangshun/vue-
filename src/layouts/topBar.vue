<template>
  <section class="top-bar">
    <div>
      <i v-show="isBackButton" class="iconfont icon-fanhui" @click="handleClickGoBack">&nbsp;&nbsp;</i>
      <i class="iconfont icon-nav" @click="handleClick2Sidebar"></i>
    </div>
    <div @click="handleClick2HomePage">
      {{ titleText }}
    </div>
    <div>
      <i class="iconfont icon-yonghu" v-show="isUserButton" @click="handleClick2UserPage"></i>
      <!-- <i class="iconfont icon-fenxiang" v-show="isShareButton" @click="handleClickShowShareContent"></i> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      // 站点标题文本。
      titleText: 'SISILILY'
    }
  },
  computed: {
    // 需要显示对应按钮的，将路由名字添加到 isShownTheBackButton、isShownTheUserButton、isShownTheShareButton 对应白名单即可。
    isBackButton() {
      let isShownTheBackButton = [
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
      isShownTheBackButton.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      return flag;
    },
    isUserButton() {
      let isShownTheUserButton = [
        "community",
        "show-details-content",
        "show-details-content/recommend",
        "show-details-content/attention",
        "shield",
        "showTagsPage",
        "tagDetailsPage",
        "othersHomepage",
        "othersInteraction",
        "showDetailsPage"
      ],
        flag = new Boolean();
      isShownTheUserButton.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      return flag;
    }
    // isShareButton() {
    //   let isShownTheShareButton = [
    //     "community",
    //     "show-details-content",
    //     "showDetailsPage",
    //     "tagDetailsPage",
    //     "personalHomepage"
    //   ],
    //     flag = new Boolean();
    //   isShownTheShareButton.includes(this.$route.name)
    //     ? (flag = true)
    //     : (flag = false);
    //   return flag;
    // }
  },
  methods: {
    // 点击 topbar 中各项对应方法。
    handleClickGoBack() {
      this.$router.go(-1);
    },
    handleClick2Sidebar() {
      window.location.href = "https://m-test.sisilily.com/sidebar-page.html";
    },
    handleClick2HomePage() {
      window.location.href = "https://m-test.sisilily.com/";
    },
    handleClick2UserPage() {
      this.$router.push({
        name: "personalHomepage"
      });
    }
    // handleClickShowShareContent() {
    //   console.info('分享');
    // }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: grid;
  grid-template: 100% / 1fr 2fr 1fr;
  height: 47PX;
  padding: 0 12px;
  .iconfont {
    color: rgba(30,30,30,1);
  }
  div:nth-child(1) {
    place-self: center start;
    .icon-fanhui {
      font-size: 18px;
    }
    .icon-nav {
      font-size: 17px;
      font-weight: bold;
    }
  }
  div:nth-child(2) {
    place-self: center center;
    font-size: 20px;
    font-family: Amy;
    color: rgba(0,0,0,1);
  }
  div:nth-child(3) {
    place-self: center end;
    .icon-yonghu {
      font-size: 18px;
    }
  }
}
</style>
