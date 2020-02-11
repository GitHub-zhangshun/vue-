<template>
  <section class="user-info_wrapper">
    <section class="bg-avatar_wrapper">
      <div>
        <img :src="personalInfo.bgImg" alt="背景画像" @click="handleClick2ChangePage" />
      </div>
      <div>
        <img :src="personalInfo.avatar" alt="アバター" />
      </div>
      <div>
        <img :src="editIcon" alt="" />
      </div>
    </section>
    <section class="name-des_wrapper">
      <div>{{ personalInfo.name }}</div>
      <div>{{ personalInfo.des }}</div>
      <div v-show="personalInfo.id">フォロー中</div>
      <div>
        <section><span class="interaction-num">{{ personalInfo.attention }} </span><span class="interaction-text">フォロー中</span></section>
        <section><span class="interaction-num">{{ personalInfo.fans }} </span><span class="interaction-text">フォロワー</span></section>
        <section><span class="interaction-num">{{ personalInfo.liked }} </span><span class="interaction-text">いいね！</span></section>
      </div>
    </section>
    <BlockInterval />
    <nav>
      <van-tabs
        v-model="activeNavItem"
        title-inactive-color="#7C7C7C"
        title-active-color="#D22F2F"
        line-width="28"
        line-height="3"
        animated
        @click="handleClickGetId"
      >
        <van-tab
          v-for="(item, idx) in tabList"
          :key="idx"
          :title="item.title"
        >
          <ShowDetailsContent :tabId="computedTabId" />
        </van-tab>
      </van-tabs>
    </nav>
  </section>
</template>

<script>
import editPersonalInfoIcon from "@assets/img/edit-personal-info.png";
import BlockInterval from "@components/community/BlockInterval";
import ShowDetailsContent from "@components/ShowDetailsContent";
import { personalInfoData } from "@/api/common";
export default {
  name: "UserInfo",
  data() {
    return {
      // 编辑个人信息的图标。
      editIcon: editPersonalInfoIcon,
      // 当前高亮的 tab item 。
      activeNavItem: 0,
      // 存放 tab item 的数组。
      tabList: [
        {
          title: "投稿"
        },
        {
          title: "いいね！した"
        }
      ],
      // 用来请求数据的 id 。
      pushTabId: 0,
      // 存放个人信息的对象。
      personalInfo: {}
    };
  },
  components: {
    BlockInterval,
    ShowDetailsContent
  },
  computed: {
    // 实时改变用于请求数据的 id ，进行参数传递。
    computedTabId() {
      return this.pushTabId;
    }
  },
  mounted() {
    this.getPersonalInfoData();
  },
  methods: {
    // 点击跳转切换背景页面。
    handleClick2ChangePage() {
      this.$router.push({
        name: 'changePersonalPageBg'
      });
    },
    // 点击 tab item 改变用于请求数据的 id 。
    handleClickGetId(name) {
      this.pushTabId = name;
    },
    // 获取个人信息数据的方法。
    async getPersonalInfoData() {
      this.personalInfo = await personalInfoData();
    }
  }
};
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
    }
    div:nth-child(3) {
      position: absolute;
      top: 179px;
      left: 214px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .name-des_wrapper {
    width: 100%;
    // height: 145px;
    font-family: Source Han Sans CN;
    div:nth-child(1) {
      padding: 10px 0px 10.5px 0px;
      font-size: 21px;
      font-weight: bold;
      text-align: center;
      color: rgba(21, 21, 21, 1);
    }
    div:nth-child(2) {
      padding: 0px 74.5px 23.5px;
      font-size: 12px;
      text-align: center;
      color: rgba(144, 144, 144, 1);
    }
    div:nth-child(3) {
      width: 102px;
      height: 34px;
      margin: 0px 0px 23.5px 136.5px;
      font-size: 13px;
      text-align: center;
      line-height: 34px;
      color: rgba(21,21,21,1);
      @include border($width: 1px, $border-color: rgba(23,23,23,1), $border-radius: 2px);
    }
    div:nth-child(4) {
      display: grid;
      grid-template: 53px / repeat(3, 1fr);
      section {
        place-self: start center;
        span {
        display: block;
        text-align: center;
        }
        .interaction-num {
          font-size: 18px;
          font-family: DIN;
          font-weight: bold;
          color: rgba(36,36,36,1);
        }
        .interaction-text {
          margin-top: 7.5px;
          font-size: 12px;
          color: rgba(135,135,135,1);
        }
      }
    }
  }
}
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
/deep/ .van-hairline--top-bottom::after {
  border-width: 3px;
  border-top: none;
}
</style>
