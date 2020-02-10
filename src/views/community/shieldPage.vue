<template>
  <section class="shield">
    <div class="cant-see--img_wrapper">
      <img :src="cantSee" alt="違法な商品" />
    </div>
    <div class="cant-see--text">
      该SHOW因为不符合社区规则而无法展示请移步至社区查看更多精彩
    </div>
    <div class="link-tip--info">
      <span>{{ countNum }}</span>S后将自动跳转到社区主页
    </div>
  </section>
</template>

<script>
import cantSeeIcon from "@/assets/img/cant-see.png";
export default {
  name: "shield",
  data() {
    return {
      // 违规图标。
      cantSee: cantSeeIcon,
      // 跳转倒计时定时器 ID 。
      countDownId: "",
      // 用于跳转的计时秒数。
      countNum: 3
    };
  },
  methods: {
    handleCountDownTheNum() {
      this.countDownId = setInterval(() => {
        this.countNum > 0
          ? this.countNum--
          : this.$router.push({ name: "show-details-content" });
      }, 1000);
    }
  },
  mounted() {
    // 调用倒计时函数。
    this.handleCountDownTheNum();
  },
  beforeDestroy() {
    // 离开页面时清除定时器。
    clearInterval(this.countDownId);
  }
};
</script>

<style lang="scss" scoped>
.shield {
  .cant-see--img_wrapper {
    width: 49px;
    height: 44.5px;
    margin: 105.5px auto 0;
    img {
      width: 100%;
    }
  }
  .cant-see--text {
    width: 250px;
    height: 39px;
    margin: 33px auto 0;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    color: rgba(36, 36, 36, 1);
  }
  .link-tip--info {
    width: 160px;
    height: 13px;
    margin: 105.5px auto 0;
    font-size: 13px;
    line-height: 25px;
    color: rgba(109, 109, 109, 1);
  }
}
</style>
