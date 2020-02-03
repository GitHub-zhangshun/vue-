<template>
  <section class="top-bar">
    <div class="nav-button_wrapper">
      <i class="iconfont icon-navicon" @click="handleClickShowTabContent"></i>
    </div>
    <div class="nav-sign_wrapper" @click="handleClick2HomePage">
      {{ title }}
    </div>
    <div class="nav-right_wrapper">
      <i class="iconfont icon-yonghu" @click="handleClick2UserPage"></i>
      <i class="iconfont icon-fenxiang" @click="handleClickShowShareContent"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      title: 'SISILILY'
    }
  },
  methods: {
    handleClickShowTabContent() {
      this.$toast('弹出层');
    },
    handleClick2HomePage() {
      this.$toast('主页');
    },
    handleClick2UserPage() {
      this.$toast('用户页');
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
  .nav-sign_wrapper {
    font-family: Amy;
    font-size: 20px;
  }
  .iconfont {
    font-size: 20px;
  }
  .iconfont:nth-child(1) {
    margin-right: 10PX;
  }
}
.top-bar div:nth-child(1) {
  margin-right: auto;
}
.top-bar div:nth-child(2) {
  margin: auto;
}
.top-bar div:nth-child(3) {
  margin-left: auto;
}
</style>
