<template>
  <section class="show-details--content_erapper">
    <section class="show-details_banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, idx) in productImg" :key="idx">
          <img :src="item.original_url" />
        </van-swipe-item>
      </van-swipe>
      <div class="show-details_number">NO.{{ showData.id }}</div>
    </section>
    <section class="show-details_info">
      <div class="info-top_wrapper">
        <div>
          <img
            :src="showData.user.avatar"
            @error="defaultAvatarImg(showData)"
            @click="handleClick2UserPage(showData)"
            alt="アバター"
          />
        </div>
        <div>
          <p>{{ showData.user.nickname }}</p>
          <p class="ellipsis">{{ showData.user.summary }}</p>
        </div>
        <div
          class="del-icon_wrapper"
          v-if="showData.is_show === 1 ? true : false"
        >
          <i
            class="iconfont icon-delete"
            @click="handleClickDeleteShow(showData.id)"
          ></i>
        </div>
        <div
          class="button-wrapper"
          v-if="showData.is_show === 0 ? true : false"
        >
          <div
            class="follow-button_wrapper"
            v-if="showData.is_follow === 1 ? true : false"
            @click="handleClickUnfollowUser(showData)"
          >
            フォロー中
          </div>
          <div
            class="unfollow-button_wrapper"
            v-if="showData.is_follow === 0 ? true : false"
            @click="handleClickFollowUser(showData)"
          >
            フォローする
          </div>
        </div>
      </div>
      <div class="info-middle_wrapper">
        {{ showData.content }}
      </div>
      <div class="info-bottom_wrapper">
        <div v-for="(item, idx) in productTags" :key="idx">
          #{{ item.name }}
        </div>
      </div>
      <div class="info-extra_wrapper">
        <div>
          <i class="iconfont icon-eye"></i>{{ showData.views }}
          <p>
            <i class="iconfont icon-zan"></i><span>{{ showData.likes }}</span>
          </p>
        </div>
        <div><i class="iconfont icon-Clock"></i>{{ showData.created_at }}</div>
      </div>
    </section>
    <BlockInterval />
    <section
      class="show-related_goods"
      v-if="relatedGoodsData.length > 0 ? true : false"
    >
      <h1 class="related-area_title">関連商品</h1>
      <div class="related-area_list">
        <div
          class="goods-wrapper"
          v-for="(item, idx) in relatedGoodsData"
          :key="idx"
        >
          <div @click="handleClick2ProductPage">
            <img :src="item.product_thumb" alt="関連製品図" />
          </div>
          <div>
            <span>¥{{ item.product_price | formatFloat(0) | delDot }}</span>
            <span v-if="item.discount !== '' ? true : false">税入</span>
            <span v-if="item.discount !== '' ? true : false"
              >¥{{ item.product_list_price | formatFloat(0) | delDot }}</span
            >
          </div>
          <div v-if="item.relation_type === 2 ? true : false">
            <img :src="remIcon" alt="お勧め" />
          </div>
          <SaleIcon
            v-if="item.discount !== '' ? true : false"
            wrapperTop="3rem"
            wrapperLeft="0px"
            :discount="item.discount"
          />
        </div>
      </div>
    </section>
    <BlockInterval />
    <van-list
      v-if="total === 0 ? false : true"
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :offset="300"
      finished-text="END"
      @load="onLoad"
    >
      <h1 class="details-title_wrapper">関連SHOW</h1>
      <waterfall
        :col="2"
        :data="showListData"
        height="559"
        @loadmore="handleScrollLoadmore"
        @scroll="handleScroll"
        @finish="handleScrollFinish"
      >
        <template>
          <div
            class="cell-item"
            v-for="(item, index) in showListData"
            :key="index"
          >
            <img
              :src="item.thumb"
              @click="handleClick2DetailPage(item.id)"
              alt="読み込みエラー"
            />
            <div class="item-body">
              <div class="item-desc">{{ item.content }}</div>
              <div class="item-footer">
                <div
                  class="avatar"
                  @click="handleClick2OthersHomepage(item.user_id)"
                >
                  <img
                    :src="item.user.avatar"
                    @error="defaultUserAvatar(item)"
                    alt="アバター"
                  />
                </div>
                <div class="name">{{ item.user.nickname }}</div>
                <div
                  class="like"
                  :class="item.is_like === 1 ? 'active' : ''"
                  @click="handleClickLikeShowInList(item)"
                >
                  <i class="iconfont icon-zan"></i>
                  <div class="like-total">{{ item.likes }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </van-list>
    <section class="like-wrapper" v-if="showData.is_show === 0 ? true : false">
      <div
        v-if="showData.is_like === 0 ? true : false"
        @click="handleClickLikeShow(showData)"
      >
        <img :src="unLikeIcon" alt="いいね" />
        <span>{{ showData.likes }}</span>
      </div>
      <div
        v-if="showData.is_like === 1 ? true : false"
        @click="handleClickUnlikeShow(showData)"
      >
        <img :src="likeIcon" alt="いいね" />
        <span>{{ showData.likes }}</span>
      </div>
    </section>
    <van-dialog
      v-model="noLoginDialog"
      :showConfirmButton="false"
      :show-cancel-button="false"
    >
      <img :src="avatar" />
      <span>会員登録・ログインをお願いします</span>
      <p class="confirm-button" @click="handleClick2Login">
        新規作成・ログイン
      </p>
      <p class="cancel-button" @click="handleClickClose">構いません</p>
    </van-dialog>
  </section>
</template>

<script>
import recommandIcon from "@/assets/img/is-recommand-icon.png";
import beforeLikeIcon from "@/assets/img/before-like-icon.png";
import afterLikeIcon from "@/assets/img/after-like-icon.png";
import userAvatar from "@/assets/img/default-user-avatar.png";
import closeIcon from "@/assets/img/no-login-close.png";
import SaleIcon from "@components/community/SaleIcon";
import BlockInterval from "@components/community/BlockInterval";
import { Dialog } from "vant";
import * as types from "@/store/mutation-types";
import { getStore } from "@/common/util";
import {
  showDetailsData,
  unFollowUser,
  deleteShow,
  likeUnlikeShow,
  detailsRelatedShowData,
  productConfig
} from "@/api/common";
export default {
  name: "ShowDetailsPage",
  components: {
    BlockInterval,
    SaleIcon,
    "van-dialog": Dialog.Component
  },
  data() {
    return {
      // 是否推荐 icon 。
      remIcon: recommandIcon,
      // 点赞前后 icon 。
      unLikeIcon: beforeLikeIcon,
      likeIcon: afterLikeIcon,
      // show 轮播数据。
      productImg: [],
      // show 标签数据。
      productTags: [],
      // show 关联商品数据。
      relatedGoodsData: [],
      // show 详细数据。
      showData: {},
      // show 列表数据。
      showListData: [],
      // 是否显示关联 show 区域。
      total: 1,
      // 加载更多所需数据。
      currentPage: 1,
      lastPage: 0,
      loading: false,
      finished: false,
      // 未登陆弹窗的数据。
      noLoginDialog: false,
      avatar: userAvatar,
      close: closeIcon
    };
  },
  watch: {
    // 当前页面点击 show 详情，数据重新获取。
    $route(to, from) {
      this.getShowDetailsData(to.params.id);
      this.getDetailsRelatedShowData(to.params.id);
      next();
    }
  },
  beforeMount() {
    this.login();
  },
  mounted() {
    this.getShowDetailsData(this.$route.params.id);
    this.getDetailsRelatedShowData(this.$route.params.id);
  },
  methods: {
    // 获取 show 详细数据方法。
    async getShowDetailsData(id) {
      let res = await showDetailsData(id);
      this.productImg = res.data.images;
      this.productTags = res.data.tags;
      this.relatedGoodsData = res.data.products;
      this.showData = res.data;
      // 如果 show 违规跳转页面。
      if (res.code !== 200) {
        this.$router.push({
          name: "shield"
        });
      }
    },
    // 未设置头像展示默认图。
    defaultAvatarImg(item) {
      item.user.avatar = require("../../assets/img/default-user-avatar.png");
    },
    // 点击头像跳转用户页。
    handleClick2UserPage(item) {
      if (item.is_show === 1) {
        this.$router.push({
          name: "personalHomepage"
        });
      } else {
        this.$router.push({
          name: "othersHomepage",
          params: {
            user_id: item.user.id
          }
        });
      }
    },
    // 关注、取关 show 所属用户操作。
    async handleClickUnfollowUser(item) {
      let res = await unFollowUser(item.id);
      if (res.code === 200) {
        item.is_follow = 0;
      } else {
        this.$toast("操作に失敗しました！");
      }
    },
    async handleClickFollowUser(item) {
      if (!getStore("token")) {
        this.noLoginDialog = true;
      } else {
        let res = await unFollowUser(item.id);
        if (res.code === 200) {
          item.is_follow = 1;
        } else {
          this.$toast("操作に失敗しました！");
        }
      }
    },
    // 点击弹窗中确定去登陆。
    handleClick2Login() {
      window.location.href = "https://m-test.sisilily.com/account/login.html";
    },
    // 关闭未登陆弹窗。
    handleClickClose() {
      this.noLoginDialog = !this.noLoginDialog;
    },
    // 点击列表 show 跳转详 show 情页面。
    handleClick2DetailPage(id) {
      this.$router.push({
        name: "showDetailsPage",
        params: {
          id: id
        }
      });
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
    // 头像为空显示默认图片。
    defaultUserAvatar(item) {
      item.user.avatar = require("../../assets/img/default-user-avatar.png");
    },
    // 点赞 show 列表。
    async handleClickLikeShowInList(item) {
      let res = await likeUnlikeShow(item.id);
      if (res.code === 200) {
        item.is_like = res.data.is_liked;
        item.likes = res.data.likes;
      } else {
        this.$toast("操作に失敗しました！");
      }
    },
    // 点击删除按钮方法。
    handleClickDeleteShow(id) {
      Dialog.confirm({
        title: "削除してもよろしいですか?",
        message: "一度削除したSHOWを復元することはできませんのでご注意ください",
        width: 250,
        confirmButtonText: "削除します",
        confirmButtonColor: "#DE4644",
        cancelButtonText: "キャンセル",
        cancelButtonColor: "#6D6D6D",
        // 添加回调函数以异步关闭弹窗。
        beforeClose: async (action, done) => {
          if (action === "confirm") {
            let res = await deleteShow(id);
            if (res && res.code === 200) {
              this.$toast("削除しました！");
              done();
              this.$router.push({
                name: "show-details-content/recommend"
              });
            } else {
              this.$toast("削除に失敗しました！");
              done();
            }
          } else {
            done();
          }
        }
      });
    },
    // 点赞和取消点赞的操作。
    async handleClickLikeShow(item) {
      let res = await likeUnlikeShow(item.id);
      if (res.code === 200) {
        item.is_like = res.data.is_liked;
        item.likes = res.data.likes;
      } else {
        this.$toast("操作に失敗しました！");
      }
    },
    async handleClickUnlikeShow(item) {
      let res = await likeUnlikeShow(item.id);
      if (res.code === 200) {
        item.is_like = res.data.is_liked;
        item.likes = res.data.likes;
      } else {
        this.$toast("操作に失敗しました！");
      }
    },
    // 获取产品详情相关 show 列表数据。
    async getDetailsRelatedShowData(id) {
      let res = await detailsRelatedShowData({
        id: id,
        page: this.currentPage
      });
      this.lastPage = res.data.last_page;
      this.total = res.data.total;
      this.showListData = res.data.data;
    },
    // 获取更多产品详情相关 show 列表数据。
    async getMoreShowData(id) {
      let res = await detailsRelatedShowData({
        id: id,
        page: this.currentPage
      });
      if (res.data.data) {
        res.data.data.map(item => {
          this.showListData.push(item);
        });
      }
    },
    // 触底加载更多数据。
    onLoad() {
      this.loading = true;
      if (this.currentPage < this.lastPage) {
        this.getMoreShowData(this.$route.params.id);
        this.loading = false;
        this.finished = true;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
    // 点击关联产品跳转老系统产品详情。
    async handleClick2ProductPage() {
      let res = await productConfig({
        key: "show_web_url"
      });
      if (res.code === 200) {
        window.location.href = `${res.data}`;
      }
    },
    login() {
      let url = window.location.href;
      if (url.indexOf("token") !== -1) {
        let txt = url.split("?")[1];
        let userToken = txt.split("=")[1];
        // 显示提交，存储 token 到 localStorage、vuex 中。
        this.$store.commit(types.USER_LOG_IN, userToken);
      } else {
        // 显示提交，存储 token 到 localStorage、vuex 中。
        this.$store.commit(types.USER_LOG_IN, getStore("token"));
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
.show-details--content_erapper {
  height: 100%;
  .show-details_banner {
    position: relative;
    width: 100%;
    height: 375px;
    .van-swipe {
      width: 100%;
      height: 100%;
      img {
        height: 100%;
      }
    }
    .show-details_number {
      position: absolute;
      right: 14.5px;
      bottom: 9.5px;
      padding: 0;
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .show-details_info {
    min-height: 214px;
    .info-top_wrapper {
      display: flex;
      align-items: center;
      div:nth-child(1) {
        width: 33px;
        height: 33px;
        margin: 20px 13px 0px 15px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      div:nth-child(2) {
        min-width: 200px;
        height: 32px;
        margin-top: 21.5px;
        font-family: Source Han Sans CN;
        p:nth-child(1) {
          height: 12px;
          font-size: 15px;
          color: rgba(21, 21, 21, 1);
        }
        p:nth-child(2) {
          width: 183px;
          height: 12px;
          margin-top: 8.5px;
          font-size: 12px;
          font-weight: 300;
          color: rgba(177, 177, 177, 1);
        }
      }
      .del-icon_wrapper {
        margin: 20px 13.5px 0 auto;
        i {
          font-size: 16px;
        }
      }
      .button-wrapper {
        .follow-button_wrapper {
          width: 82px;
          height: 28px;
          border-radius: 2px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          text-align: center;
          line-height: 28px;
          color: rgba(45, 45, 45, 1);
          @include border(
            $width: 1px,
            $border-color: rgba(21, 21, 21, 1),
            $border-radius: 2px
          );
        }
        .unfollow-button_wrapper {
          width: 82px;
          height: 28px;
          background: rgba(226, 106, 154, 1);
          border-radius: 2px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          text-align: center;
          line-height: 28px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .info-middle_wrapper {
      padding: 18.5px 15px 17px;
    }
    .info-bottom_wrapper {
      display: grid;
      grid-template: 12px / repeat(3, 1fr);
      row-gap: 6.5px;
      padding: 0px 15px 21px;
      div {
        font-size: 12px;
        font-family: Source Han Sans CN;
        color: rgba(91, 121, 188, 1);
        @include ellipsis($line: 1);
      }
    }
    .info-extra_wrapper {
      display: flex;
      justify-content: space-between;
      padding: 0 15px 15px;
      font-size: 12px;
      font-family: DIN;
      color: rgba(177, 177, 177, 1);
      i {
        margin-right: 5.5px;
        font-size: 12px;
      }
      p {
        display: inline;
        margin-left: 26.5px;
        &.active {
          span {
            color: #e26a9a;
          }
          i {
            color: #e26a9a;
          }
        }
      }
    }
  }
  .show-related_goods {
    width: 100%;
    min-height: 200px;
    .related-area_title {
      height: 15px;
      padding: 17px 0 18px 14.5px;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(21, 21, 21, 1);
    }
    .related-area_list {
      display: grid;
      grid-template: 163px / repeat(3, 108px);
      gap: 4.5px 11.5px;
      min-height: 185px;
      padding: 0 15px 19.5px;
      margin-top: 18px;
      .goods-wrapper {
        position: relative;
        div:nth-child(1) {
          width: 100%;
          height: 143px;
          img {
            width: 108px;
            height: 143px;
            border-radius: 10px;
          }
        }
        div:nth-child(2) {
          position: absolute;
          min-height: 20px;
          span {
            margin-right: 2.5px;
            font-size: 10px;
            font-family: PingFang SC;
            font-weight: 500;
          }
          span:nth-child(1) {
            height: 11px;
            font-family: Source Han Sans CN;
            color: rgba(205, 54, 54, 1);
          }
          span:nth-child(2) {
            height: 12px;
            font-size: 12px;
            color: rgba(204, 204, 205, 1);
          }
          span:nth-child(3) {
            height: 9px;
            font-weight: 400;
            text-decoration: line-through;
            color: rgba(21, 21, 21, 1);
          }
        }
        div:nth-child(3) {
          position: absolute;
          top: 0;
          right: 0;
          width: 39px;
          height: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .details-title_wrapper {
    height: 15px;
    padding: 14px 0px 0px 14.5px;
    margin-bottom: 22.5px;
    font-size: 15px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(21, 21, 21, 1);
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
      .item-body {
        padding: 13.5px 14.5px 13px 0px;
        .item-desc {
          width: 157px;
          height: 32px;
          font-size: 12px;
          line-height: 16px;
          @include ellipsis($line: 2, $line-height: 16px);
          color: rgba(44, 44, 44, 1);
        }
        .item-footer {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 13px;
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
  .like-wrapper {
    @include flr();
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 52px;
    text-align: center;
    span {
      display: block;
      margin-bottom: 6px;
      font-size: 12px;
      font-family: DIN;
      font-weight: 400;
    }
    div:nth-child(1) {
      width: 51px;
      height: 51px;
      padding: 12px 16px 19px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -1px 7px 0px rgba(249, 229, 235, 1);
      border-radius: 50%;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        color: rgba(219, 153, 168, 1);
      }
    }
    div:nth-child(2) {
      width: 51px;
      height: 51px;
      padding: 12px 16px 19px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -1px 7px 0px rgba(249, 229, 235, 1);
      border-radius: 50%;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        color: rgba(226, 106, 154, 1);
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
}
</style>
<style lang="scss">
// 修改 vant dialog 自带样式。
.van-dialog__header {
  padding: 31.5px 25.5px 0px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: rgba(31, 31, 31, 1);
}
.van-dialog__message--has-title {
  padding: 25.5px 23.5px 42px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  color: rgba(31, 31, 31, 1);
}
.van-dialog__cancel,
.van-dialog__confirm {
  font-size: 13px;
  font-family: Source Han Sans CN;
}
</style>
