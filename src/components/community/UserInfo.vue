<template>
  <section class="user-info_wrapper">
    <div class="bg-avatar_wrapper">
      <div>
        <img :src="personalInfo.bgImg" alt="背景画像">
      </div>
      <div>
        <img :src="personalInfo.avatar" alt="アバター">
        <div class="edit-info_wrapper">
          <img src="" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { personalInfoData } from "@/api/common";
export default {
  name: 'UserInfo',
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
      console.info(this.personalInfo);
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info_wrapper {
  .bg-avatar_wrapper {
    position: relative;
    width: 100%;
    height: 203.5px;
    div:nth-child(1) {
      width: 100%;
      height: 151px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2) {
      position: absolute;
      top: 91.5px;
      left: 131.5px;
      width: 112px;
      height: 112px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .edit-info_wrapper {
        position: absolute;
        top: 179px;
        left: 214px;
        width: 24px;
        height: 24px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>