<template>
  <section class="top-bar">
    <div v-show="isBackButton">
      <i class="iconfont icon-fanhui" @click="handleClickGoBack"></i>
    </div>
    <div>
      <i class="iconfont icon-home" @click="handleClick2Community"></i>
    </div>
    <div @click="handleClick2HomePage">
      {{ titleText }}
    </div>
    <div>
      <i class="iconfont icon-yonghu" v-show="isUserButton" @click="handleClick2UserPage"></i>
      <i class="iconfont icon-fenxiang" v-show="isShareButton" @click="handleClickShowShareContent"></i>
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
        "personalInteraction"
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
        "shield",
        "showTagsPage",
        "tagDetailsPage"
      ],
        flag = new Boolean();
      isShownTheUserButton.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      return flag;
    },
    isShareButton() {
      let isShownTheShareButton = [
        "community",
        "show-details-content",
        "showDetailsPage",
        "tagDetailsPage",
        "personalHomepage"
      ],
        flag = new Boolean();
      isShownTheShareButton.includes(this.$route.name)
        ? (flag = true)
        : (flag = false);
      return flag;
    }
  },
  methods: {
    // 点击 topbar 中各项对应方法。
    handleClickGoBack() {
      this.$router.go(-1);
    },
    handleClick2Community() {
      this.$router.push({
        name: "show-details-content"
      });
    },
    handleClick2HomePage() {
      window.location = "http://m.sisilily.com";
    },
    handleClick2UserPage() {
      this.$router.push({
        name: "personalHomepage"
      });
    },
    handleClickShowShareContent() {
      this.$toast('分享');
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  height: 47PX;
  padding: 0 10PX;
  .iconfont {
    font-size: 20px;
  }
  .iconfont:nth-child(1) {
    margin-right: 10PX;
  }
}
.top-bar div:nth-child(2) {
  margin-right: auto;
}
.top-bar div:nth-child(3) {
  margin: auto;
  font-family: Amy;
  font-size: 20px;
}
.top-bar div:nth-child(4) {
  min-width: 50px;
  margin-left: auto;
  text-align: right;
}
</style>
