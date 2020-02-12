<template>
  <section class="change-bg_wrapper">
    <div class="bg-wrapper">
      <img :src="bgImgSrc" alt="背景画像" />
    </div>
    <van-uploader
      v-model="fileList"
      :preview-image="false"
      :after-read="afterUploading"
    >
      <div class="change-bg_button">背景画像を変更</div>
    </van-uploader>
    <div
      class="cancel_button"
      v-show="whichButtonShown"
      @click="handleClickCancelUpload"
    >
      キャンセルする
    </div>
    <div
      class="submit_button"
      v-show="!whichButtonShown"
    >
      確認する
    </div>
  </section>
</template>

<script>
import { personalInfoData } from "@/api/common";
export default {
  name: "changePersonalPageBg",
  data() {
    return {
      // 存放背景图链接。
      bgImgSrc: "",
      // 存放上传图片的数组。
      fileList: [],
      // 显示取消、确定按钮的标志布尔值。
      whichButtonShown: true
    };
  },
  mounted() {
    this.getPersonalInfoData();
  },
  methods: {
    // 获取个人信息数据的方法。
    async getPersonalInfoData() {
      let res = await personalInfoData();
      this.bgImgSrc = res.bgImg;
    },
    // 背景图上传完毕之后的回调函数。
    afterUploading(file) {
      this.bgImgSrc = this.fileList[0].content;
      this.fileList = [];
      this.whichButtonShown = !this.whichButtonShown;
    },
    // 点击取消回退页面。
    handleClickCancelUpload() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.change-bg_wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  .bg-wrapper {
    width: 100%;
    height: 151px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .change-bg_button {
    width: 345px;
    height: 45px;
    margin: 17.5px auto 0px;
    font-size: 13px;
    font-family: Source Han Sans CN;
    text-align: center;
    line-height: 45px;
    color: rgba(21, 21, 21, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(21, 21, 21, 1);
    border-radius: 5px;
  }
  .cancel_button {
    position: absolute;
    bottom: 10px;
    left: 15px;
    width: 345px;
    height: 45px;
    font-size: 13px;
    font-family: Source Han Sans CN;
    text-align: center;
    line-height: 45px;
    color: rgba(177, 177, 177, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(177, 177, 177, 1);
    border-radius: 5px;
  }
  .submit_button {
    position: absolute;
    bottom: 10px;
    left: 15px;
    width: 345px;
    height: 45px;
    font-size: 13px;
    font-family: Source Han Sans CN;
    text-align: center;
    line-height: 45px;
    color: rgba(21, 21, 21, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(21, 21, 21, 1);
    border-radius: 5px;
  }
}
// 修改 vant 上传按钮样式。
/deep/ .van-uploader {
  margin-left: 15px;
}
</style>
