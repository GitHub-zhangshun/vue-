<template>
  <section class="change-info_wrapper">
    <section class="avatar-wrapper">
      <img :src="avatarSrc" alt="" />
    </section>
    <van-uploader
      v-model="fileList"
      :preview-image="false"
      :max-count="1"
      :after-read="afterUploading"
    >
      <div class="upload-button">プロフィール写真を変更</div>
    </van-uploader>
    <van-radio-group v-model="radio">
      <van-radio name="2" checked-color="#EE809E">女性<i class="iconfont icon-female"></i></van-radio>
      <van-radio name="1" checked-color="#EE809E">男性<i class="iconfont icon-nan"></i></van-radio>
      <van-radio name="0" checked-color="#EE809E">保密<i class="iconfont icon-secret"></i></van-radio>
    </van-radio-group>
    <section class="input-area">
      <div class="edit-name_wrapper">
        <input type="text" v-model="name" placeholder="ニックネーム">
      </div>
      <div class="edit-info_wrapper">
        <textarea name="" v-model="info" id="" placeholder="プロフィールを書く"></textarea>
      </div>
    </section>
    <section class="submit-button" @click="handleClickSubmitPersonalInfo">確認</section>
  </section>
</template>

<script>
import { personalInfoData, editPersonalInfo, commonUploadSingleImg } from "@/api/common";
export default {
  name: "changePersonalInfo",
  data() {
    return {
      // 头像链接。
      avatarSrc: "",
      // 上传头像之后获取的 code 。
      avatarCode: 0,
      // 性别选项默认选中项。
      radio: "",
      // 存放名字的字符串。
      name: '',
      // 存放简介的字符串。
      info: '',
      // 存放上传图片的数组。
      fileList: []
    };
  },
  mounted() {
    this.getPersonalInfoData();
  },
  methods: {
    // 获取个人信息数据的方法。
    async getPersonalInfoData() {
      let res = await personalInfoData();
      this.avatarSrc = res.data.avatar;
      this.radio = String(res.data.gender);
      this.name = res.data.nickname;
      this.info = res.data.summary;
    },
    // 头像上传完毕之后的回调函数。
    async afterUploading(file) {
      this.avatarSrc = this.fileList[0].content;
      this.fileList = [];
      // 上传文件到服务器，并获取 id 。
      let formData = new FormData();
      formData.append('image', file.file);
      let res = await commonUploadSingleImg(1, formData);
      this.avatarCode = res.data;
    },
    // 点击提交按钮提交修改的个人信息。
    async handleClickSubmitPersonalInfo() {
      let res = await editPersonalInfo({
        nickname: this.name,
        gender: Number(this.radio),
        summary: this.info,
        avatar: this.avatarCode
      });
      if(res.code === 200) {
        this.$toast('個人情報が正常に変更されました！');
        this.$router.push({
          name: 'personalHomepage'
        });
      }
      else {
        this.$toast('個人情報の変更に失敗しました。再編集してください！');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.change-info_wrapper {
  width: 100%;
  .avatar-wrapper {
    width: 147px;
    height: 147px;
    margin: 39.5px auto 0px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .upload-button {
    width: 155px;
    height: 38px;
    margin: 12.5px auto 0px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    text-align: center;
    line-height: 38px;
    color: rgba(21, 21, 21, 1);
    background-color: rgba(255, 255, 255, 1);
    @include border(
      $width: 1px,
      $border-color: rgba(177, 177, 177, 1),
      $border-radius: 5px
    );
  }
  .input-area {
    width: 100%;
    height: 174px;
    .edit-name_wrapper {
      width: 280px;
      height: 45px;
      margin: 0 auto;
      input {
        width: 100%;
        height: 100%;
        padding-left: 16px;
        background-color: rgba(249,249,249,1);
        border: none;
        border-radius: 23px;
      }
      input::placeholder,
      input::-webkit-input-placeholder,
      input::-moz-placeholder {
        font-size: 14px;
        font-family: Source Han Sans CN;
        color: rgba(177,177,177,1);
      }
    }
    .edit-info_wrapper {
      width: 280px;
      height: 116px;
      margin: 13px auto 0px;
      textarea {
        width: 100%;
        height: 100%;
        padding: 16px 0px 0px 16px;
        background: rgba(249,249,249,1);
        border: none;
        border-radius: 5px;
        resize: none;
      }
      textarea::placeholder,
      textarea::-webkit-input-placeholder,
      textarea::-moz-placeholder {
        font-size: 14px;
        font-family: Source Han Sans CN;
        color: rgba(177,177,177,1);
      }
    }
  }
  .submit-button {
    width: 280px;
    height: 45px;
    margin: 20px auto 0px;
    font-size: 16px;
    font-family: Adobe Heiti Std;
    text-align: center;
    line-height: 45px;
    color: rgba(255,255,255,1);
    background-color: rgba(235,129,154,1);
    border-radius:23px;
  }
}
// 修改 vant 上传按钮样式。
/deep/ .van-uploader {
  margin-left: 110px;
}
// 修改 vant 单选框组样式。
/deep/ .van-radio-group {
  display: grid;
  grid-template: 100% / repeat(3, 1fr);
  place-items: center center;
  width: 280px;
  height: 82px;
  margin: 0 auto;
  .van-radio__icon {
    font-size: 16px;
  }
  .van-radio__label {
    font-size: 13px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(0,0,0,1);
    i {
      display: inline-block;
    }
    .icon-female {
      font-size: 18px;
      color: rgba(238, 128, 158, 1);
    }
    .icon-nan {
      font-size: 16px;
      color: rgba(152, 188, 237, 1);
    }
    .icon-secret {
      font-size: 11px;
      color: yellowgreen;
    }
  }
}
</style>
