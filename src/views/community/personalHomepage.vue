<template>
  <section class="user-info_wrapper">
    <section class="bg-avatar_wrapper">
      <div>
        <img
          :src="personalInfo.background_image"
          @click="handleClick2ChangePage"
          @error="defaultBgImg(personalInfo)"
          alt="背景画像"
        />
      </div>
      <div>
        <img
          :src="personalInfo.avatar"
          @error="defaultAvatarImg(personalInfo)"
          alt="アバター"
        />
      </div>
      <div>
        <img :src="editIcon" alt="変更する" @click="handleClick2ChangeInfo" />
      </div>
    </section>
    <section class="name-des_wrapper">
      <div>{{ personalInfo.nickname }}</div>
      <div>{{ personalInfo.summary }}</div>
      <div>
        <section @click="handleClick2AttentionPage(personalInfo.id)">
          <span class="interaction-num">{{ personalInfo.followings }} </span
          ><span class="interaction-text">フォロー中</span>
        </section>
        <section @click="handleClick2FansPage(personalInfo.id)">
          <span class="interaction-num">{{ personalInfo.followers }} </span
          ><span class="interaction-text">フォロワー</span>
        </section>
        <section>
          <span class="interaction-num">{{ personalInfo.likes }} </span
          ><span class="interaction-text">いいね！</span>
        </section>
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
        <van-tab v-for="(item, idx) in tabList" :key="idx" :title="item.title">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            :offset="300"
            finished-text="END"
            @load="onLoad"
          >
            <waterfall
              :col="2"
              :data="showData"
              height="559"
              @loadmore="handleScrollLoadmore"
              @scroll="handleScroll"
              @finish="handleScrollFinish"
            >
              <template>
                <div
                  class="cell-item"
                  v-for="(item, index) in showData"
                  :key="index"
                >
                  <img
                    :src="item.thumb"
                    @click="handleClick2DetailPage(item)"
                    alt="読み込みエラー"
                  />
                  <div class="item-footer">
                    <div
                      v-if="item.avatar"
                      class="avatar"
                      @click="handleClick2OthersHomepage(item.user_id)"
                    >
                      <img
                        :src="item.avatar"
                        @error="defaultAvatarImg(item)"
                        alt="アバター"
                      />
                    </div>
                    <div v-if="item.nickname" class="name">
                      {{ item.nickname }}
                    </div>
                    <div
                      class="like"
                      :class="item.is_like === 1 ? 'active' : ''"
                      @click="handleClickLikeShow(item)"
                    >
                      <i class="iconfont icon-zan"></i>
                      <div class="like-total">{{ item.likes }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </waterfall>
          </van-list>
        </van-tab>
      </van-tabs>
    </nav>
  </section>
</template>

<script>
import editPersonalInfoIcon from "@assets/img/edit-personal-info.png";
import BlockInterval from "@components/community/BlockInterval";
import { getStore } from "@/common/util";
import * as types from "@/store/mutation-types";
import {
  personalInfoData,
  userReleaseShowData,
  userLikeShowData,
  likeUnlikeShow
} from "@/api/common";
export default {
  name: "personalHomepage",
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
      // 存放个人信息的对象。
      personalInfo: {},
      // 存放当前用户的 id 。
      userId: 0,
      // 存放 show 的数据。
      showData: [],
      // 当前是否处于可点赞区域。
      isLike: false,
      // 用于加载更多的数据。
      currentPage: 1,
      lastPage: 0,
      loading: false,
      finished: false
    };
  },
  components: {
    BlockInterval
  },
  beforeMount() {
    this.login();
  },
  mounted() {
    this.getPersonalInfoData();
  },
  methods: {
    // 获取个人信息数据的方法。
    async getPersonalInfoData() {
      let res = await personalInfoData();
      this.personalInfo = res.data;
      this.userId = res.data.id;
      await this.getUserReleaseShowData();
    },
    // 背景为空展示默认图片。
    defaultBgImg(item) {
      item.background_image = require("../../assets/img/default-user-bg.png");
    },
    // 用户个人头像为空、show 头像为空，展示默认图片。
    defaultAvatarImg(item) {
      item.avatar = require("../../assets/img/default-user-avatar.png");
    },
    // 点击跳转切换背景页面。
    handleClick2ChangePage() {
      this.$router.push({
        name: "changePersonalPageBg"
      });
    },
    // 点击跳转编辑个人信息页面。
    handleClick2ChangeInfo() {
      this.$router.push({
        name: "changePersonalInfo"
      });
    },
    // 点击跳转我的关注页面。
    handleClick2AttentionPage(id) {
      this.$router.push({
        name: "personalInteraction",
        params: {
          userId: id,
          tabId: 0
        }
      });
    },
    // 点击跳转我的粉丝页面。
    handleClick2FansPage(id) {
      this.$router.push({
        name: "personalInteraction",
        params: {
          userId: id,
          tabId: 1
        }
      });
    },
    // 点击跳转详 show 情页面。
    handleClick2DetailPage(item) {
      if(item.status !== 1) {
        this.$router.push({
          name: "showDetailsPage",
          params: {
            id: item.id
          }
        });
      }
      else {
        this.$toast('コンテンツ違反');
      }
    },
    // 点击头像跳转他人主页。
    handleClick2OthersHomepage(id) {
      this.$router.push({
        name: "othersHomepage",
        params: {
          user_id: id
        }
      });
    },
    // 点赞。
    async handleClickLikeShow(item) {
      if (this.isLike) {
        let res = await likeUnlikeShow(item.id);
        if (res.code === 200) {
          item.is_like = res.data.is_liked;
          item.likes = res.data.likes;
        } else {
          this.$toast("操作に失敗しました！");
        }
      }
    },
    // 点击 tab item 改变请求的 show 数据。
    handleClickGetId(name) {
      this.currentPage = 1;
      if (name === 0) {
        this.getUserReleaseShowData();
      } else if (name === 1) {
        this.isLike = true;
        this.getUserLikeShowData();
      }
    },
    // 获取用户发布的 show 数据。
    async getUserReleaseShowData() {
      this.showData = [];
      let res = await userReleaseShowData({
        id: this.userId,
        page: 1
      });
      this.lastPage = res.data.last_page;
      res.data.data.map(item => {
        this.showData.push(item);
      });
    },
    // 获取更多用户发布的 show 数据。
    async getMoreUserReleaseShowData(page) {
      let res = await userReleaseShowData({
        id: this.userId,
        page: page
      });
      if (res.data.data) {
        res.data.data.map(item => {
          this.showData.push(item);
        });
      }
    },
    // 获取用户点赞的 show 数据。
    async getUserLikeShowData() {
      this.showData = [];
      let res = await userLikeShowData({
        id: this.userId,
        page: 1
      });
      this.lastPage = res.data.last_page;
      res.data.data.map(item => {
        this.showData.push(item);
      });
    },
    // 获取更多用户点赞的 show 数据。
    async getMoreUserLikeShowData(page) {
      let res = await userLikeShowData({
        id: this.userId,
        page: page
      });
      if (res.data.data) {
        res.data.data.map(item => {
          this.showData.push(item);
        });
      }
    },
    // 滚动触底加载更多数据。
    onLoad() {
      this.loading = true;
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
        if (!this.isLike) {
          this.getMoreUserReleaseShowData(this.currentPage);
        } else if (this.isLike) {
          this.getMoreUserLikeShowData(this.currentPage);
        }
        this.loading = false;
        this.finished = true;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
    login() {
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
    },
    // 判断是否加载完毕数据的方法。
    handleScrollFinish() {},
    // 滚动加载数据信息的方法。
    handleScroll(scrollData) {},
    // 滚动加载更多数据的方法。
    handleScrollLoadmore() {}
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
          color: rgba(36, 36, 36, 1);
        }
        .interaction-text {
          margin-top: 7.5px;
          font-size: 12px;
          color: rgba(135, 135, 135, 1);
        }
      }
    }
  }
  .vue-waterfall {
    padding: 12.5px 7px 28.5px;
    .cell-item {
      width: 100%;
      padding: 0px 5px 5px;
      overflow: hidden;
      box-sizing: border-box;
      img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 10px;
      }
      .item-footer {
        position: relative;
        display: flex;
        align-items: center;
        min-height: 24px;
        .avatar {
          width: 18px;
          height: 18px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .name {
          width: 85px;
          margin-left: 3px;
          font-size: 13px;
          color: rgba(165, 165, 165, 1);
          @include ellipsis($line: 1, $line-height: 1.2);
        }
        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          &.active {
            i {
              color: #e26a9a;
            }
            .like-total {
              color: #e26a9a;
            }
          }
          i {
            display: block;
            width: 17.5px;
            font-size: 12px;
          }
          .like-total {
            width: 22px;
            font-size: 12px;
            color: rgba(21, 21, 21, 1);
          }
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
