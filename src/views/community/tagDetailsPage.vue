<template>
  <section class="tag-details_wrapper">
    <section class="activity-area_wrapper">
      <div class="image-wrapper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, idx) in bannerImg" :key="idx">
            <img v-lazy="item.original_url" alt="活動写真" />
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator"></div>
        </van-swipe>
      </div>
      <div class="text-wrapper">
        <div @click="handleClickShowCommentDialog">
          #{{ tagDetailsData.name }}
          <i
            class="iconfont icon-fanhui"
            @click="handleClickHideCommentDialog"
          ></i>
        </div>
        <div>
          {{ tagDetailsData.explanation }}
        </div>
        <div>
          {{ tagDetailsData.content }}
        </div>
        <div>
          <p>ENDS IN</p>
          <p v-show="tagDetailsData.is_period_enabled === 0 ? true : false">
            ——&nbsp;&nbsp;&nbsp;イベント終了&nbsp;&nbsp;&nbsp;——
          </p>
          <CountDown
            v-show="tagDetailsData.is_period_enabled === 1 ? true : false"
            :startTime="start_at"
            :endTime="end_at"
            :tipText="''"
            :tipTextEnd="''"
            :endText="''"
            :dayTxt="'D'"
            :hourTxt="'H :'"
            :minutesTxt="'M :'"
            :secondsTxt="'S'"
          ></CountDown>
        </div>
      </div>
    </section>
    <BlockInterval />
    <section>
      <van-tabs
        v-model="activeNavItem"
        title-inactive-color="#7C7C7C"
        title-active-color="#D22F2F"
        line-width="28"
        line-height="3"
        animated
        :swipeable="true"
        @click="handleClickGetType"
      >
        <van-tab v-for="(item, idx) in tabList" :key="idx" :title="item.title">
          <van-list
            v-if="tagDetailsData.is_period_enabled === 1 ? true : false"
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
                        @click="handleClickLikeShow(item.id)"
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
          <section
            v-show="tagDetailsData.is_period_enabled === 0 ? true : false"
            class="no-activity_wrapper"
          >
            <div>
              <img :src="noActIcon" alt="" />
            </div>
            <div>投稿がありません</div>
          </section>
        </van-tab>
      </van-tabs>
    </section>
    <van-popup
      v-model="isCommentDialog"
      closeable
      close-icon-position="top-right"
      round
      position="bottom"
      :style="{ height: '30%' }"
      :close-on-click-overlay="false"
    >
      <section class="popup-content_wrapper">
        <div>ルール説明</div>
        <div>{{ tagDetailsData.description }}</div>
        <div @click="handleClickHideCommentDialog">オッケー</div>
      </section>
    </van-popup>
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
import noActivityIcon from "@/assets/img/no-activity-icon.png";
import BlockInterval from "@components/community/BlockInterval";
import ShowDetailsContent from "@components/ShowDetailsContent";
import CountDown from "@components/CountDown.vue";
import EditShowButton from "@components/community/EditShowButton";
import PopupDialog from "@components/community/PopupDialog";
import { tagDetailsData, tagRelatedShowData, likeUnlikeShow } from "@/api/common";
export default {
  name: "tagDetailsPage",
  components: {
    BlockInterval,
    ShowDetailsContent,
    CountDown,
    EditShowButton,
    PopupDialog
  },
  data() {
    return {
      // 当前高亮的 tab item 。
      activeNavItem: 0,
      // 存放 tab item 的数组。
      tabList: [
        {
          title: "HOT"
        },
        {
          title: "NEW"
        }
      ],
      // 没有活动的图标。
      noActIcon: noActivityIcon,
      // 用来请求 show 数据的 type 。
      type: 'hot',
      // 显示标签解释弹窗的标志布尔值。
      isCommentDialog: false,
      // 存放标签详细数据的数组。
      tagDetailsData: {},
      // 存放轮播图片数据。
      bannerImg: [],
      // 活动开始和结束时间。
      start_at: "",
      end_at: "",
      // 是否展示弹窗的标志变量。
      isShownTheEditShowDialog: false,
      // show 列表数据。
      showData: [],
      // 加载更多数据的标志。
      currentPage: 1,
      lastPage: 0,
      loading: false,
      finished: false
    };
  },
  mounted() {
    this.getTagDetailsData();
    this.getTagRelatedShowData();
  },
  methods: {
    // 点击 tab item 改变用于请求数据的 id 。
    handleClickGetType(name) {
      if(name === 0) {
        this.type = 'hot';
      }
      else if(name === 1) {
        this.type = 'new';
      }
    },
    // 点击跳转详 show 情页面。
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
    // 点赞。
    async handleClickLikeShow(id) {
      let res = await likeUnlikeShow(id);
      if (res.code !== 200) {
        this.$toast("もう一度やり直してください！");
      }
      this.reload();
    },
    // 头像为空显示默认图片。
    defaultUserAvatar(item) {
      item.user.avatar = require("../../assets/img/default-user-avatar.png");
    },
    // 显示、关闭标签解释弹窗的方法。
    handleClickShowCommentDialog() {
      this.isCommentDialog = !this.isCommentDialog;
    },
    handleClickHideCommentDialog() {
      this.isCommentDialog = !this.isCommentDialog;
    },
    // 获取 tag 详细数据方法。
    async getTagDetailsData() {
      let res = await tagDetailsData(this.$route.params.tag_id);
      // console.info(res);
      this.tagDetailsData = res.data;
      this.bannerImg = res.data.show_image;
      this.start_at = String(res.data.start_at);
      this.end_at = String(res.data.end_at);
    },
    // 显示、关闭编辑 show 弹窗的方法。
    handleClick2ShowEditShowDialog() {
      this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
    },
    handleClick2CloseEditShowDialog() {
      this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
    },
    // 获取标签下 show 列表数据。
    async getTagRelatedShowData() {
      let res = await tagRelatedShowData({
        tag_id: this.$route.params.tag_id,
        type: this.type,
        page: this.currentPage
      });
      this.lastPage = res.data.last_page;
      this.showData = res.data.data;
    },
    // 获取更多 show 数据。
    async getMoreShowData() {
      let res = await tagRelatedShowData({
        tag_id: this.$route.params.tag_id,
        type: this.type,
        page: this.currentPage
      });
      if(res.data.data) {
        res.data.data.map(item => {
          this.showData.push(item);
        });
      }
    },
    // 触底加载更多方法。
    onLoad() {
      this.loading = true;
      if(this.currentPage < this.lastPage) {
        this.getMoreShowData();
        this.loading = false;
        this.finished = true;
      }
      else {
        this.loading = false;
        this.finished = true;
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
.tag-details_wrapper {
  width: 100%;
  .activity-area_wrapper {
    width: 100%;
    .image-wrapper {
      width: 100%;
      height: 160px;
      .van-swipe {
        width: 100%;
        height: 100%;
        .van-swipe-item {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .text-wrapper {
      width: 100%;
      min-height: 123px;
      font-family: Source Han Sans CN;
      text-align: center;
      div:nth-child(1) {
        padding: 19px 0px 16px 0px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(21, 21, 21, 1);
        i {
          display: inline-block;
          font-size: 15px;
          transform: rotate(180deg);
        }
      }
      div:nth-child(2) {
        padding: 0px 30px 17.5px;
        font-size: 12px;
        font-weight: 300;
        color: rgba(36, 36, 36, 1);
      }
      div:nth-child(3) {
        padding: 0px 46px 16px;
        font-size: 12px;
        color: rgba(183, 138, 32, 1);
      }
      div:nth-child(4) {
        width: 281px;
        height: 52px;
        margin: 0 auto 15.5px;
        text-align: center;
        background: rgba(182, 155, 128, 1);
        p:nth-child(1) {
          padding: 7px;
          font-size: 13px;
          color: rgba(242, 224, 207, 1);
        }
        p:nth-child(2) {
          font-size: 13px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .no-activity_wrapper {
    width: 100%;
    height: 100%;
    div:nth-child(1) {
      width: 44.5px;
      height: 38px;
      margin: 56px 165px 13.5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2) {
      padding: 0px 0px 0px 136px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(232, 147, 165, 1);
    }
  }
  .popup-content_wrapper {
    width: 100%;
    height: 100%;
    font-family: Source Han Sans CN;
    div:nth-child(1) {
      padding: 27px 0px 26px 146px;
      font-size: 17px;
      font-weight: bold;
      color: rgba(21, 21, 21, 1);
    }
    div:nth-child(2) {
      min-height: 80px;
      padding: 0px 30px 20px;
      font-size: 12px;
      font-weight: 300;
      color: rgba(36, 36, 36, 1);
    }
    div:nth-child(3) {
      width: 100%;
      height: 45px;
      padding-top: 15px;
      font-size: 18px;
      text-align: center;
      box-shadow: 0px -1px 0px 0px rgba(243, 243, 243, 1);
      border-radius: 0px 0px 5px 5px;
      color: rgba(21, 21, 21, 1);
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
/deep/ .van-popup__close-icon--top-right {
  top: 28px;
  right: 15px;
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
</style>
