<template>
  <section class="change-bg_wrapper">
    <div>
      <img :src="personalInfo.bgImg" alt="背景画像">
    </div>
    <div>背景画像を変更</div>
    <div>キャンセルする</div>
  </section>
</template>

<script>
import { personalInfoData } from "@/api/common";
export default {
  name: 'changePersonalPageBg',
  data() {
    return {
      // 存放个人信息的对象。
      personalInfo: {}
    }
  },
  mounted() {
    this.getPersonalInfoData();
  },
  methods: {
    // 获取个人信息数据的方法。
    async getPersonalInfoData() {
      this.personalInfo = await personalInfoData();
    }
  }
}
</script>

<style lang="scss" scoped>
.change-bg_wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  div:nth-child(1) {
    width: 100%;
    height: 151px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  div:nth-child(2) {
    width: 345px;
    height: 45px;
    margin: 17.5px auto 0px;
    font-size: 13px;
    font-family: Source Han Sans CN;
    text-align: center;
    line-height: 45px;
    color: rgba(21,21,21,1);
    background:rgba(255,255,255,1);
    border: 1px solid rgba(21,21,21,1);
    border-radius: 5px;
  }
  div:nth-child(3) {
    position: absolute;
    bottom: 10px;
    left: 15px;
    width: 345px;
    height: 45px;
    font-size: 13px;
    font-family: Source Han Sans CN;
    text-align: center;
    line-height: 45px;
    color: rgba(21,21,21,1);
    background:rgba(255,255,255,1);
    border: 1px solid rgba(21,21,21,1);
    border-radius: 5px;
  }
}
</style>