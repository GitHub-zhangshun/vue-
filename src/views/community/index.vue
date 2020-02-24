<template>
  <section class="community">
    <SwiperBanner />
    <SwiperTagsList />
    <BlockInterval />
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
import animate from "animate.css";
import SwiperBanner from "@components/community/SwiperBanner";
import SwiperTagsList from "@components/community/SwiperTagsList";
import EditShowButton from "@components/community/EditShowButton";
import BlockInterval from "@components/community/BlockInterval";
import PopupDialog from "@components/community/PopupDialog";
import { sessionGetItem } from "@/common/util";
import * as types from "@/store/mutation-types";
import { getUserToken, indexStadiumData, waterFallData } from "@/api/common";
export default {
  name: "home",
  components: {
    SwiperBanner,
    SwiperTagsList,
    EditShowButton,
    BlockInterval,
    PopupDialog
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
      isShownTheEditShowDialog: false
    };
  },
  mounted() {
    this.getIndexStadiumData();
    this.login();
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
      this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
    },
    handleClick2CloseEditShowDialog() {
      this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
    },
    // 模拟登陆获取用户 token 。
    async login() {
      let res = await getUserToken({
          username: "111111@qq.com",
          password: "123456"
        }),
        userToken = res.data.token;
      // 显示提交，存储 token 到 localStorage、vuex 中。
      this.$store.commit(types.USER_LOG_IN, userToken);
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
</style>
<style lang="scss">
// 修改 van-list 加载结束文字样式。
.van-list__finished-text {
  width: 100%;
  height: 30px;
  font-size:13px;
  font-family: ADAM PRO;
  text-align: center;
  line-height: 30px;
  color: rgba(177,177,177,1);
  background: rgba(250,250,250,1);
}
</style>
