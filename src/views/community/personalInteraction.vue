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
          <van-list
            v-show="activeNavItem === 0 ? true : false"
            v-model="attentionLoading"
            :finished="attentionFinished"
            :immediate-check="false"
            :offset="300"
            finished-text="END"
            @load="handleScrollOnLoadAttention"
          >
            <div
              class="attention-wrapper"
              v-for="(item, idx) in attentionData"
              :key="idx"
            >
              <div>
                <img
                  :src="item.avatar"
                  @error="defaultAttentionAvatarImg(item)"
                  alt="ユーザーアバター"
                />
              </div>
              <div>
                <span>{{ item.nickname }}</span>
                <span>{{ item.summary }}</span>
              </div>
              <div>
                <div
                  v-show="
                    attentionUnfollowUserData.indexOf(item.id) === -1
                      ? true
                      : false
                  "
                  class="is-attention_button"
                  @click="handleClickUnfollowAttentionUser(item.id)"
                >
                  フォロー中
                </div>
                <div
                  v-show="
                    attentionUnfollowUserData.indexOf(item.id) !== -1
                      ? true
                      : false
                  "
                  class="non-attention_button"
                  @click="handleClickFollowAttentionUser(item.id)"
                >
                  フォローする
                </div>
              </div>
            </div>
          </van-list>
          <van-list
            v-show="activeNavItem === 1 ? true : false"
            v-model="fansLoading"
            :finished="fansFinished"
            :immediate-check="false"
            :offset="300"
            finished-text="END"
            @load="handleScrollOnLoadFans"
          >
            <div
              class="fans-wrapper"
              v-for="item in fansData"
              :key="item.id"
            >
              <div>
                <img
                  :src="item.avatar"
                  @error="defaultFansAvatarImg(item)"
                  alt="ユーザーアバター"
                />
              </div>
              <div>
                <span>{{ item.nickname }}</span>
                <span>{{ item.summary }}</span>
              </div>
              <div>
                <div
                  v-show="item.is_follow === 1"
                  class="is-attention--button"
                  @click="handleClickUnfollowFansUser(item.id)"
                >
                  フォロー中
                </div>
                <div
                  v-show="item.is_follow !== 1"
                  class="non-attention--button"
                  @click="handleClickFollowFansUser(item.id)"
                >
                  フォローする
                </div>
                <div
                  class="del-icon_wrapper"
                  @click="handleClickShowDelButton(item.id)"
                >
                  <img :src="delIcon" alt="" />
                </div>
              </div>
              <transition
                enter-active-class="animated slideInRight"
                leave-active-class="animated slideOutRight"
              >
                <div
                  v-show="fansDelUserData.indexOf(item.id) !== -1 ? true : false"
                  @click="handleClickShowDialog(item.id)"
                >
                  フォロワーを削除
                </div>
              </transition>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </nav>
  </section>
</template>

<script>
import delFansIcon from "@assets/img/delete-fans-icon.png";
import animate from "animate.css";
import { Dialog } from "vant";
import { delTheEleInArray } from "@/common/util";
import {
  personalAttentionData,
  personalFansData,
  unFollowUser,
  deleteUser
} from "@/api/common";
export default {
  name: "personalInteraction",
  components: {
    "van-dialog": Dialog.Component
  },
  inject: ["reload"],
  data() {
    return {
      // 删除粉丝的图标。
      delIcon: delFansIcon,
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
      // 关注原始数据。
      attentionOriginalData: {},
      // 关注详细数据数组。
      attentionData: [],
      // 粉丝原始数据。
      fansOriginalData: {},
      // 粉丝详细数据数组。
      fansData: [],
      // 我的关注中需要取关的用户 id 数组。
      attentionUnfollowUserData: [],
      // 我的粉丝中需要删除的用户 id 数组。
      fansDelUserData: [],
      // 关注分页加载所需数据。
      attentionPage: 1,
      attentionLoading: false,
      attentionFinished: false,
      // 粉丝分页加载所需数据。
      fansPage: 1,
      fansLoading: false,
      fansFinished: false
    };
  },
  inject: ["reload"],
  mounted() {
    this.getPersonalAttentionData();
    this.getPersonalFansData();
  },
  destroyed() {
    this.hanldeUnFollowUser();
  },
  methods: {
    // 关注头像为空展示默认图片。
    defaultAttentionAvatarImg(item) {
      item.avatar = require("../../assets/img/default-user-avatar.png");
    },
    // 粉丝头像为空展示默认图片。
    defaultFansAvatarImg(item) {
      item.avatar = require("../../assets/img/default-user-avatar.png");
    },
    // 获取关注详细数据。
    async getPersonalAttentionData() {
      let res = await personalAttentionData({
        id: this.$route.params.userId,
        page: 1
      });
      this.attentionOriginalData = res.data;
      this.attentionData = res.data.data;
      // 获取数据的时候更新我的关注中需要取关的用户 id 数组。
      this.attentionData.map(item => {
        if (item.is_follow === 0) {
          this.attentionUnfollowUserData.push(item.id);
        }
      });
    },
    // 关注分页请求数据拼接。
    async getMoreAttentionData(curPage) {
      this.attentionLoading = true;
      let res = await personalAttentionData({
        id: this.$route.params.userId,
        page: curPage
      }),
        concatData = res.data.data;
      if(res.code === 200) {
        concatData.map(item => {
          this.attentionData.push(item);
        });
        setTimeout(() => {
          this.attentionLoading = false;
          this.attentionFinished = true;
        }, 500);
      }
    },
    // 下滑请求更多关注数据。
    handleScrollOnLoadAttention() {
      if(this.attentionPage < this.attentionOriginalData.last_page) {
        this.attentionPage++;
        this.getMoreAttentionData(this.attentionPage);
      }
    },
    // 获取粉丝详细数据。
    async getPersonalFansData() {
      let res = await personalFansData({
        id: this.$route.params.userId,
        page: 1 
      });
      this.fansOriginalData = res.data;
      this.fansData = res.data.data;
      // console.info(this.fansData);
    },
    // 粉丝分页请求数据拼接。
    async getMoreFansData(curPage) {
      this.attentionLoading = true;
      let res = await personalFansData({
        id: this.$route.params.userId,
        page: curPage
      }),
        concatData = res.data.data;
      if(res.code === 200) {
        concatData.map(item => {
          this.fansData.push(item);
        });
        setTimeout(() => {
          this.fansLoading = false;
          this.fansFinished = true;
        }, 500);
      }
    },
    // 粉丝请求更多关注数据。
    handleScrollOnLoadFans() {
      if(this.fansPage < this.fansOriginalData.last_page) {
        this.fansPage++;
        this.getMoreAttentionData(this.fansPage);
      }
    },
    // 点击按钮取消关注用户（我的关注中）。
    handleClickUnfollowAttentionUser(id) {
      this.attentionUnfollowUserData.push(id);
    },
    // 点击按钮继续关注用户（我的关注中）。
    handleClickFollowAttentionUser(id) {
      delTheEleInArray(id, this.attentionUnfollowUserData);
    },
    // 点击按钮取消关注用户（我的粉丝中）。
    handleClickUnfollowFansUser(id) {
      console.info(id);
      unFollowUser(id);
      this.reload();
    },
    // 点击按钮继续关注用户（我的粉丝中）。
    handleClickFollowFansUser(id) {
      console.info(id);
      unFollowUser(id);
      this.reload();
    },
    // 调用取关接口进行用户取关操作。
    hanldeUnFollowUser() {
      this.attentionUnfollowUserData.map(item => {
        unFollowUser(item);
      });
    },
    // 点击小叉弹出删除用户的按钮。
    handleClickShowDelButton(id) {
      this.fansDelUserData.push(id);
    },
    // 点击对应小叉其他部分隐藏删除用户按钮。
    handleClickHideDelButton(id) {
      delTheEleInArray(id, this.fansDelUserData);
    },
    // 点击右边弹出的删除按钮，进行弹窗。
    handleClickShowDialog(id) {
      Dialog.confirm({
        title: "フォロワーを削除してもよろしいですか",
        message: "削除後、彼女の投稿を確認できなくなります",
        width: 250,
        confirmButtonText: "はい",
        confirmButtonColor: "#8B8B8B",
        cancelButtonText: "いいえ",
        cancelButtonColor: "#151515",
        // 添加回调函数以异步关闭弹窗。
        beforeClose: async (action, done) => {
          if (action === "confirm") {
            let res = await deleteUser(id);
            // console.info(res);
            if (res.code === 200) {
              setTimeout(done, 1500);
              this.reload();
            }
          } else if (action === "cancel") {
            done();
            this.handleClickHideDelButton(id);
          } else {
            done();
          }
        }
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
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
    position: relative;
    display: grid;
    grid-template: 100% / 80px 162px 133px;
    width: 100%;
    height: 81px;
    // 解决删除按钮从右边出来时，创建一个重复的按钮。
    overflow: hidden;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-family: Source Han Sans CN;
      text-align: center;
      line-height: 28px;
      .is-attention--button {
        width: 88px;
        height: 28px;
        color: rgba(21, 21, 21, 1);
        @include border(
          $width: 1px,
          $border-color: rgba(23, 23, 23, 1),
          $border-radius: 2px
        );
      }
      .non-attention--button {
        width: 88px;
        height: 28px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(235, 129, 154, 1);
        border-radius: 2px;
      }
      .del-icon_wrapper {
        width: 17px;
        height: 17px;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    div:nth-child(4) {
      position: absolute;
      top: 16px;
      right: 0;
      width: 133px;
      height: 51px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      text-align: center;
      line-height: 51px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(235, 71, 71, 1);
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
