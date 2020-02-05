<template>
  <section class="community">
    <SwiperBanner />
    <SwiperTagsList />
    <BlockInterval />
    <van-sticky :offset-top="47">
      <nav class="switch-list_wrapper">
        <van-tabs
          v-model="active"
          title-inactive-color="#7C7C7C"
          title-active-color="#D22F2F"
          line-width="28"
          line-height="3"
          @click="handleClick2Details"
        >
          <van-tab
            v-for="(item, idx) in tabList"
            :key="idx"
            :title="item.title"
          >
          </van-tab>
        </van-tabs>
      </nav>
    </van-sticky>
    <router-view></router-view>
    <van-cell is-link @click="handleClick2ShowEditShowDialog">
      <EditShowButton
        wrapperBottom="100px"
        wrapperWidth="35px"
        wrapperHeight="35px"
      />
    </van-cell>
    <van-popup
      v-model="isShownTheEditShowDialog"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    ></van-popup>
  </section>
</template>

<script>
import { sessionGetItem } from "@/common/util";
import SwiperBanner from "@components/community/SwiperBanner";
import SwiperTagsList from "@components/community/SwiperTagsList";
import EditShowButton from "@components/community/EditShowButton";
import BlockInterval from "@components/community/BlockInterval";
export default {
  name: "home",
  components: {
    SwiperBanner,
    SwiperTagsList,
    EditShowButton,
    BlockInterval
  },
  data() {
    return {
      // 当前高亮的 tab item 。
      active: sessionGetItem("activeTabItem"),
      // 存放 tab item 的数组。
      tabList: [
        {
          title: "フォロー"
        },
        {
          title: "おすすめ"
        },
        {
          title: "girl"
        },
        {
          title: "lady"
        },
        {
          title: "madam"
        },
        {
          title: "home"
        }
      ],
      // 是否展示弹窗的标志变量。
      isShownTheEditShowDialog: false
    };
  },
  methods: {
    // 点击 tab 显示对应请求的 show 详情数据。
    handleClick2Details(index, title) {
      this.$router.push({
        name: `show-details-content`,
        params: {
          tabId: index
        }
      });
    },
    handleClick2ShowEditShowDialog() {
      this.isShownTheEditShowDialog = true;
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
