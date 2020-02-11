<template>
  <section class="tag-details_wrapper">
    <section class="activity-area_wrapper">
      <div class="image-wrapper">
        <van-swipe :autoplay="3000">
          <van-swipe-item
            v-for="(image, idx) in bannerImg"
            :key="idx"
          >
            <img v-lazy="image" alt="活動写真">
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator"></div>
        </van-swipe>
      </div>
      <div class="text-wrapper">
        <div @click="handleClickShowCommentDialog">
          #标签标题
          <i
            class="iconfont icon-fanhui"
            @click="handleClickHideCommentDialog"
          ></i>
        </div>
        <div>
          标签定义HOWを投稿すると10ポイントプレゼント、またはSHOWに関連する商品を追加したら50ポイント
        </div>
        <div>{{ tagsListData.reward }}</div>
        <div>
          <p>ENDS IN</p>
          <p v-show="!tagsListData.activityStart">
            ——&nbsp;&nbsp;&nbsp;イベント終了&nbsp;&nbsp;&nbsp;——
          </p>
          <count-down
            v-show="tagsListData.activityStart"
            :startTime="'4100829240'"
            :endTime="'4101002040'"
            :tipText="''"
            :tipTextEnd="''"
            :endText="''"
            :dayTxt="'D'"
            :hourTxt="'H :'"
            :minutesTxt="'M :'"
            :secondsTxt="'S'"
          ></count-down>
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
        @click="handleClickGetId"
      >
        <van-tab v-for="(item, idx) in tabList" :key="idx" :title="item.title">
          <ShowDetailsContent
            v-show="tagsListData.activityStart"
            :tabId="computedTabId"
          />
          <section
            v-show="!tagsListData.activityStart"
            class="no-activity_wrapper"
          >
            <div>
              <img :src="noActIcon" alt="">
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
        <div>{{ tagsListData.info }}</div>
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
import { indexTagListData } from "@/api/common";
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
      // 用来请求数据的 id 。
      pushTabId: 0,
      // 显示标签解释弹窗的标志布尔值。
      isCommentDialog: false,
      // 存放标签数据的数组。
      tagsListData: [],
      // 存放轮播图片数据。
      bannerImg: [],
      // 是否展示弹窗的标志变量。
      isShownTheEditShowDialog: false
    };
  },
  computed: {
    // 实时改变用于请求数据的 id ，进行参数传递。
    computedTabId() {
      return this.pushTabId;
    }
  },
  mounted() {
    this.getindexTagListData();
  },
  methods: {
    // 点击 tab item 改变用于请求数据的 id 。
    handleClickGetId(name) {
      this.pushTabId = name;
    },
    // 显示、关闭标签解释弹窗的方法。
    handleClickShowCommentDialog() {
      this.isCommentDialog = !this.isCommentDialog;
    },
    handleClickHideCommentDialog() {
      this.isCommentDialog = !this.isCommentDialog;
    },
    // 获取 tag 详细数据方法。
    async getindexTagListData() {
      let res = await indexTagListData(this.$route.params.id);
      this.tagsListData = res[0];
      this.bannerImg = res[0].activity;
    },
    // 显示、关闭编辑 show 弹窗的方法。
    handleClick2ShowEditShowDialog() {
      this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
    },
    handleClick2CloseEditShowDialog() {
      this.isShownTheEditShowDialog = !this.isShownTheEditShowDialog;
    }
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
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text-wrapper {
      width: 100%;
      height: 193px;
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
        margin: 0 auto;
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
      color: rgba(232,147,165,1);
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
      padding: 0px 30px 20px;
      font-size: 12px;
      font-weight: 300;
      color: rgba(36, 36, 36, 1);
    }
    div:nth-child(3) {
      width: 100%;
      height: 100%;
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
