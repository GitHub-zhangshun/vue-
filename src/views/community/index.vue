<template>
  <section class="community">
    <SwiperBanner />
    <SwiperTagsList />
    <BlockInterval />
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
    <van-sticky :offset-top="47">
      <nav class="switch-list_wrapper">
        <van-tabs
          v-model="activeNavItem"
          title-inactive-color="#7C7C7C"
          title-active-color="#D22F2F"
          line-width="28"
          line-height="3"
          animated
          @click="handleClick2Details"
        >
          <van-tab v-for="(item, idx) in tabList" :key="idx" :title="item.name">
          </van-tab>
        </van-tabs>
      </nav>
    </van-sticky>
    <router-view></router-view>
    <EditShowButton
      wrapperBottom="100px"
      wrapperWidth="35px"
      wrapperHeight="35px"
      @open="handleClick2ShowEditShowDialog"
    />
    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <PopupDialog
        style="animation-duration: 0.5s"
        v-show="isShownTheEditShowDialog"
        outterTop="0"
        outterHeight="100%"
        maskBottom="0"
        maskHeight="0"
        isPopupHead="Yes"
        isOnlyCloseIcon="No"
        :isEditArea="true"
        @close="handleClick2CloseEditShowDialog"
      />
    </transition>
  </section>
</template>

<script>
import userAvatar from "@/assets/img/default-user-avatar.png";
import closeIcon from "@/assets/img/no-login-close.png";
import animate from "animate.css";
import SwiperBanner from "@components/community/SwiperBanner";
import SwiperTagsList from "@components/community/SwiperTagsList";
import EditShowButton from "@components/community/EditShowButton";
import BlockInterval from "@components/community/BlockInterval";
import PopupDialog from "@components/community/PopupDialog";
import { Dialog } from "vant";
import { getStore } from "@/common/util";
import * as types from "@/store/mutation-types";
import { getUserToken, indexStadiumData, waterFallData } from "@/api/common";
export default {
  name: "home",
  components: {
    SwiperBanner,
    SwiperTagsList,
    EditShowButton,
    BlockInterval,
    PopupDialog,
    "van-dialog": Dialog.Component
  },
  data() {
    return {
      // 当前高亮的 tab item 。
      activeNavItem: 1,
      // 存放 tab item 的数组。
      tabList: [
        {
          name: "フォロー"
        },
        {
          name: "おすすめ"
        }
      ],
      // 是否展示弹窗的标志变量。
      isShownTheEditShowDialog: false,
      // 未登陆弹窗的数据。
      noLoginDialog: false,
      avatar: userAvatar,
      close: closeIcon
    };
  },
  beforeMount() {
    this.login();
  },
  mounted() {
    this.getIndexStadiumData();
  },
  methods: {
    // 获取首页场馆 item 数据的方法。
    async getIndexStadiumData() {
      let res = await indexStadiumData();
      this.tabList.push(...res.data);
    },
    // 点击 tab 显示对应请求的 show 详情数据。
    handleClick2Details(index) {
      if (index === 0) {
        this.$router.push({
          name: `show-details-content/attention`,
          params: {
            subscribes: 1,
            page: 1
          }
        });
      } else if (index === 1) {
        this.$router.push({
          name: `show-details-content/recommend`,
          params: {
            subscribes: 0,
            page: 1
          }
        });
      } else {
        this.$router.push({
          name: `show-details-content`,
          params: {
            stadium_id: this.tabList[index].id,
            page: 1
          }
        });
      }
    },
    // 打开关闭弹窗的方法。
    handleClick2ShowEditShowDialog() {
      if(getStore('token') === 'null' || !getStore('token')) {
        this.noLoginDialog = true;
      }
      else {
        this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
      }
    },
    handleClick2CloseEditShowDialog() {
      this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
    },
    // 点击弹窗中确定去登陆。
    handleClick2Login() {
      window.location.href = "https://m-test.sisilily.com/account/login.html";
    },
    // 关闭未登陆弹窗。
    handleClickClose() {
      this.noLoginDialog = !this.noLoginDialog;
    },
    // 模拟登陆获取用户 token 。
    // async login() {
    login() {
      // let res = await getUserToken({
      //     username: "111111@qq.com",
      //     password: "123456"
      //   }),
      //   userToken = res.data.token;
      // this.$store.commit(types.USER_LOG_IN, userToken);
      let url = window.location.href;
      if(url.indexOf('token') !== -1) {
        let txt = url.split('?')[1];
        let userToken = txt.split('=')[1];
        // 显示提交，存储 token 到 localStorage、vuex 中。
        this.$store.commit(types.USER_LOG_IN, userToken);
      }
      else {
        // 显示提交，存储 token 到 localStorage、vuex 中。
        this.$store.commit(types.USER_LOG_IN, getStore('token'));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// 修改 vant nav 自带样式。
/deep/ .van-tab__text {
  font-size: 14px;
  font-weight: bold;
}
/deep/ .van-tabs__line {
  bottom: 20px;
  background: linear-gradient(
    90deg,
    rgba(219, 67, 64, 1),
    rgba(255, 163, 172, 1)
  );
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
<style lang="scss">
// 修改 van-list 加载结束文字样式。
.van-list__finished-text {
  width: 100%;
  height: 30px;
  font-size: 13px;
  font-family: ADAM PRO;
  text-align: center;
  line-height: 30px;
  color: rgba(177, 177, 177, 1);
  background: rgba(250, 250, 250, 1);
}
</style>
