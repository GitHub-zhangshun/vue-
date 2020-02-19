<template>
  <section class="change-bg_wrapper">
    <div class="bg-wrapper">
      <img :src="bgImgSrc" @error="defaultBgImg(bgImgSrc)" alt="背景画像" />
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
      @click="handleClickSubmitBg"
    >
      確認する
    </div>
  </section>
</template>

<script>
import {
  personalInfoData,
  commonUploadSingleImg,
  editPersonalInfo
} from "@/api/common";
export default {
  name: "changePersonalPageBg",
  data() {
    return {
      // 存放背景图链接。
      bgImgSrc: "",
      // 上传背景图之后获取的 code 。
      bgCode: 0,
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
    // 背景图为空显示默认图片。
    defaultBgImg(item) {
      item = require("../../assets/img/default-user-bg.png");
    },
    // 获取个人信息数据的方法。
    async getPersonalInfoData() {
      let res = await personalInfoData();
      this.bgImgSrc = res.data.background_image;
    },
    // 背景图上传完毕之后的回调函数。
    async afterUploading(file) {
      this.bgImgSrc = this.fileList[0].content;
      this.fileList = [];
      this.whichButtonShown = !this.whichButtonShown;
      // 上传文件到服务器，并获取 id 。
      let formData = new FormData();
      formData.append("image", file.file);
      let res = await commonUploadSingleImg(1, formData);
      this.bgCode = res.data;
    },
    // 点击取消回退页面。
    handleClickCancelUpload() {
      this.$router.go(-1);
    },
    // 点击修改个人信息页面背景图。
    async handleClickSubmitBg() {
      let res = await editPersonalInfo({
        background_image: this.bgCode
      });
      if(res.code === 200) {
        this.$toast('個人情報が正常に変更されました！');
      }
      else {
        this.$toast('個人情報の変更に失敗しました。再編集してください！');
      }
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
