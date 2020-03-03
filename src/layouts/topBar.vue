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
    <van-dialog
      v-model="noLoginDialog"
      :showConfirmButton="false"
      :show-cancel-button="false"
    >
      <img :src="avatar" />
      <span>会員登録・ログインをお願いします</span>
      <p class="confirm-button" @click="handleClick2Login">新規作成・ログイン</p>
      <p class="cancel-button" @click="handleClickClose">構いません</p>
    </van-dialog>
  </section>
</template>

<script>
import userAvatar from "@/assets/img/default-user-avatar.png";
import closeIcon from "@/assets/img/no-login-close.png";
import { Dialog } from "vant";
import { getStore } from "@/common/util";
export default {
  name: "TopBar",
  components: {
    "van-dialog": Dialog.Component
  },
  data() {
    return {
      // 站点标题文本。
      titleText: 'SISILILY',
      // 未登陆弹窗的数据。
      noLoginDialog: false,
      avatar: userAvatar,
      close: closeIcon
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
      // 舍弃路由返回，首先因为数据缓存的原因；其次就是嵌套路由导致的 Bug 。
      window.history.go(-1);
      // this.$router.go(-1)
    },
    handleClick2Sidebar() {
      window.location.href = "https://m-test.sisilily.com/sidebar-page.html";
    },
    handleClick2HomePage() {
      window.location.href = "https://m-test.sisilily.com/";
    },
    handleClick2UserPage() {
      if(getStore('token') === 'null' || !getStore('token')) {
        this.noLoginDialog = true;
      }
      else {
        this.$router.push({
          name: "personalHomepage"
        });
      }
    },
    // 点击弹窗中确定去登陆。
    handleClick2Login() {
      window.location.href = "https://m-test.sisilily.com/account/login.html";
    },
    // 关闭未登陆弹窗。
    handleClickClose() {
      this.noLoginDialog = !this.noLoginDialog;
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
// 修改 vant dialog 样式。
/deep/ .van-dialog {
  width: 234px;
  min-height: 289px;
  img {
    display: block;
    margin: 25px auto 0px;
    width: 85px;
    height: 85px;
  }
  span {
    display: block;
    margin-top: 28px;
    font-size: 13px;
    font-family: Yu Gothic;
    font-weight: bold;
    text-align: center;
    color: rgba(21, 21, 21, 1);
  }
  p {
    width: 164px;
    height: 37px;
    margin: 0 auto;
    font-size: 13px;
    font-family: Yu Gothic;
    font-weight: bold;
    text-align: center;
    line-height: 37px;
    border-radius: 19px;
  }
  .confirm-button {
    margin-top: 24px;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(235, 129, 154, 1);
  }
  .cancel-button {
    margin-top: 13px;
    color: rgba(60, 60, 60, 1);
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(50, 50, 50, 1);
  }
}
</style>
