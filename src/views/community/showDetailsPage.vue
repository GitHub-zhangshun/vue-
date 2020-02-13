<template>
  <section class="show-details--content_erapper">
    <section class="show-details_banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, idx) in bannerImg" :key="idx">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="show-details_number">NO.{{ goodsNumber }}</div>
    </section>
    <section class="show-details_info">
      <div class="info-top_wrapper">
        <div
          v-if="userData.avatar"
          :style="{ backgroundImage: `url(${userData.avatar})` }"
        ></div>
        <div>
          <p>{{ userData.user }}</p>
          <p class="ellipsis">{{ userData.intro }}</p>
        </div>
        <div>
          <i class="iconfont icon-delete" @click="handleClickDeleteShow"></i>
        </div>
      </div>
      <div class="info-middle_wrapper">
        {{ userData.des }}
      </div>
      <div class="info-bottom_wrapper">
        <div v-for="(item, idx) in userData.tags" :key="idx">
          #{{ item }}
        </div>
      </div>
      <div class="info-extra_wrapper">
        <div>
          <i class="iconfont icon-eye"></i>{{ userData.views }}
          <p :class="userData.liked ? 'active' : ''"><i class="iconfont icon-zan"></i><span>{{ userData.like || userData.liked }}</span></p>
        </div>
        <div>
          <i class="iconfont icon-Clock"></i>{{ userData.time }}
        </div>
      </div>
    </section>
    <BlockInterval />
    <ShowRelatedGoods title="関連商品" />
    <BlockInterval />
    <ShowDetailsContent title="関連SHOW" :tabId="2" />
  </section>
</template>

<script>
import BlockInterval from "@components/community/BlockInterval";
import ShowRelatedGoods from "@components/community/ShowRelatedGoods";
import ShowDetailsContent from "@components/ShowDetailsContent";
import { Dialog } from 'vant';
import { showBannerData, userDetailsData } from "@/api/common";
export default {
  name: "ShowDetailsPage",
  components: {
    BlockInterval,
    ShowRelatedGoods,
    ShowDetailsContent,
    "van-dialog":  Dialog.Component
  },
  data() {
    return {
      // 商品编号。
      goodsNumber: 134,
      // 商品 banner 图片。
      bannerImg: [],
      // 用户详细数据。
      userData: []
    };
  },
  methods: {
    // 获取商品 banner 图方法。
    async getShowBannerData() {
      this.bannerImg = await showBannerData();
    },
    // 获取用户详细数据方法。
    async getUserData() {
      let res = await userDetailsData();
      this.userData = res[0];
    },
    // 点击删除按钮方法。
    handleClickDeleteShow() {
      Dialog.confirm({
        title: '削除してもよろしいですか?',
        message: '一度削除したSHOWを復元することはできませんのでご注意ください',
        width: 250,
        confirmButtonText: '削除します',
        confirmButtonColor: '#DE4644',
        cancelButtonText: 'キャンセル',
        cancelButtonColor: '#6D6D6D',
        // 添加回调函数以异步关闭弹窗。
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            setTimeout(done, 1500);
          } else {
            done();
          }
        }
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  },
  mounted() {
    this.getShowBannerData();
    this.getUserData();
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
    height: 214px;
    .info-top_wrapper {
      display: flex;
      align-items: center;
      div:nth-child(1) {
        width: 33px;
        height: 33px;
        margin: 20px 13px 0px 15px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: contain;
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
      div:nth-child(3) {
        margin: 20px 13.5px 0 auto;
        i {
          font-size: 16px;
        }
      }
    }
    .info-middle_wrapper {
      padding: 18.5px 15px 17px;
    }
    .info-bottom_wrapper {
      display: grid;
      grid-template: repeat(2, 12px) / repeat(3, 1fr);
      row-gap: 6.5px;
      padding: 0px 15px 21px;
      div {
        font-size: 12px;
        font-family: Source Han Sans CN;
        color: rgba(91, 121, 188, 1);
      }
    }
    .info-extra_wrapper {
      display: flex;
      justify-content: space-between;
      padding: 0 15px 15px;
      font-size: 12px;
      font-family: DIN;
      color: rgba(177,177,177,1);
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
}
</style>
<style lang="scss">
// 修改 vant dialog 自带样式。
.van-dialog__header {
  padding: 31.5px 25.5px 0px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: rgba(31,31,31,1);
}
.van-dialog__message--has-title {
  padding: 25.5px 23.5px 42px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  color: rgba(31,31,31,1);
}
.van-dialog__cancel,
.van-dialog__confirm {
  font-size: 13px;
  font-family: Source Han Sans CN;
}
</style>
