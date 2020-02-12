<template>
  <section class="my-attention_wrapper">
    <nav>
      <van-tabs
        v-model="activeNavItem"
        title-inactive-color="#7C7C7C"
        title-active-color="#D22F2F"
        line-width="28"
        line-height="3"
        animated
      >
        <van-tab v-for="(item, idx) in tabList" :key="idx" :title="item.title">
          <div
            v-show="activeNavItem === 0 ? true : false"
            class="attention-wrapper"
            v-for="(item, idx) in attentionData"
            :key="idx"
          >
            <div>
              <img :src="item.avatar" alt="ユーザーアバター" />
            </div>
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.des }}</span>
            </div>
            <div>
              <div
                v-show="unfollowUserData.indexOf(item.id) === -1 ? true : false"
                class="is-attention_button"
                @click="handleClickUnfollowUser(item.id)"
              >
                フォロー中
              </div>
              <div
                v-show="unfollowUserData.indexOf(item.id) !== -1 ? true : false"
                class="non-attention_button"
                @click="handleClickFollowUser(item.id)"
              >
                フォローする
              </div>
            </div>
          </div>
          <div
            v-show="activeNavItem === 1 ? true : false"
            class="fans-wrapper"
            v-for="(item, idx) in fansData"
            :key="idx"
          >
            <div>
              <img :src="item.avatar" alt="ユーザーアバター">
            </div>
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.des }}</span>
            </div>
            <div></div>
          </div>
        </van-tab>
      </van-tabs>
    </nav>
  </section>
</template>

<script>
import { personalAttentionData, personalFansData } from "@/api/common";
export default {
  name: "personalInteraction",
  data() {
    return {
      // 当前高亮的 tab item 。
      activeNavItem: this.$route.params.tabId,
      // 存放 tab item 的数组。
      tabList: [
        {
          title: "フォロー中"
        },
        {
          title: "フォロワー"
        }
      ],
      // 关注详细数据数组。
      attentionData: [],
      // 粉丝详细数据数组。
      fansData: [],
      // 需要取关的用户 id 数组。
      unfollowUserData: []
    };
  },
  mounted() {
    this.getPersonalAttentionData();
    this.getPersonalFansData();
  },
  methods: {
    // 获取关注详细数据。
    async getPersonalAttentionData() {
      this.attentionData = await personalAttentionData();
    },
    // 获取粉丝详细数据。
    async getPersonalFansData() {
      this.fansData = await personalFansData();
    },
    // 点击按钮取消关注用户。
    handleClickUnfollowUser(id) {
      this.unfollowUserData.push(id);
    },
    // 点击按钮继续关注用户。
    handleClickFollowUser(id) {
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.unfollowUserData.remove(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-attention_wrapper {
  width: 100%;
  .attention-wrapper {
    display: grid;
    grid-template: 100% / 80px 193px 102px;
    width: 100%;
    height: 81px;
    @include border-bottom(
      $left: 15px,
      $width: calc(100% - 15px),
      $border-color: rgba(243, 243, 243, 1)
    );
    div:nth-child(1) {
      place-self: center center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    div:nth-child(2) {
      align-self: center;
      span {
        display: block;
        font-family: Source Han Sans CN;
      }
      span:nth-child(1) {
        font-size: 15px;
        font-weight: 500;
        color: rgba(21, 21, 21, 1);
      }
      span:nth-child(2) {
        width: 128px;
        margin-top: 9.5px;
        font-size: 12px;
        color: rgba(144, 144, 144, 1);
        @include ellipsis($line: 1);
      }
    }
    div:nth-child(3) {
      align-self: center;
      font-size: 13px;
      font-family: Source Han Sans CN;
      text-align: center;
      line-height: 28px;
      .is-attention_button {
        width: 88px;
        height: 28px;
        color: rgba(21, 21, 21, 1);
        @include border(
          $width: 1px,
          $border-color: rgba(23, 23, 23, 1),
          $border-radius: 2px
        );
      }
      .non-attention_button {
        width: 88px;
        height: 28px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(235, 129, 154, 1);
        border-radius: 2px;
      }
    }
  }
  .fans-wrapper {
    display: grid;
    grid-template: 100% / 80px 162px 133px;
    width: 100%;
    height: 81px;
    @include border-bottom(
      $left: 15px,
      $width: calc(100% - 15px),
      $border-color: rgba(243, 243, 243, 1)
    );
    div:nth-child(1) {
      place-self: center center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    div:nth-child(2) {
      align-self: center;
      span {
        display: block;
        font-family: Source Han Sans CN;
      }
      span:nth-child(1) {
        font-size: 15px;
        font-weight: 500;
        color: rgba(21, 21, 21, 1);
      }
      span:nth-child(2) {
        width: 128px;
        margin-top: 9.5px;
        font-size: 12px;
        color: rgba(144, 144, 144, 1);
        @include ellipsis($line: 1);
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
  border-top: none;
}
</style>
