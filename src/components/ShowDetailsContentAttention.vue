<template>
  <div class="container-water-fall">
    <h1 class="details-title_wrapper" v-show="title">{{ title }}</h1>
    <waterfall
      :col="2"
      :data="data"
      @loadmore="handleScrollLoadmore"
      @scroll="handleScroll"
      @finish="handleScrollFinish"
    >
      <template>
        <div class="cell-item" v-for="(item, index) in data" :key="index">
          <img
            v-if="item.thumb"
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
              <div class="like" :class="item.is_like === 1 ? 'active' : ''">
                <i class="iconfont icon-zan"></i>
                <div class="like-total">{{ item.likes }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
    <div class="show-details--bottom_area" v-show="isShownTheEndFlag">
      <span class="show-details--bottom_area__text">END</span>
    </div>
  </div>
</template>

<script>
import { sessionSetItem } from "@/common/util";
import { waterFallData } from "@/api/common";
export default {
  name: "ShowDetailsContentAttention",
  props: {
    requestObj: {
      type: Object
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      // 瀑布流数据数组。
      data: [],
      // 用于懒加载的定时器 ID 。
      loadMoreId: "",
      // 是否显示数据完结的标志布尔值。
      isShownTheEndFlag: false
    };
  },
  watch: {
    // 实时监听路由改变。
    $route(to, from) {
      sessionSetItem("tabBar", "community");
      this.getWaterFallData();
    }
  },
  computed: {
    itemWidth() {
      // rem 布局，计算宽度。
      return 138 * 0.5 * (document.documentElement.clientWidth / 375);
    },
    gutterWidth() {
      // rem 布局，计算 x 轴方向 margin（ y 轴方向的 margin 自定义在 css 中即可）。
      return 9 * 0.5 * (document.documentElement.clientWidth / 375);
    }
  },
  mounted() {
    this.getWaterFallData();
  },
  beforeDestroy() {
    // 离开页面清除用于加载更多的定时器。
    clearTimeout(this.loadMoreId);
  },
  methods: {
    // 头像为空显示默认图片。
    defaultUserAvatar(item) {
      item.user.avatar = require("../assets/img/default-user-avatar.png");
    },
    // 判断是否加载完毕数据的方法。
    handleScrollFinish() {
      this.isShownTheEndFlag = !this.isShownTheEndFlag;
    },
    // 滚动加载数据信息的方法。
    handleScroll(scrollData) {
      // console.info(scrollData);
    },
    // 滚动加载更多数据的方法。
    handleScrollLoadmore() {
      this.loadMoreId = setTimeout(() => {
        this.data = this.data.concat(waterFallData(this.requestObj));
      }, 1500);
      // 强制更新展示 show 的数据，并重绘板式。
      this.$waterfall.forceUpdate();
      // this.$waterfall.resize();
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
    // 获取瀑布流 show 详情数据的方法。
    async getWaterFallData() {
      this.data = [];
      let res = await waterFallData(this.requestObj);
      this.data = res.data.data;
      // 强制更新展示 show 的数据。
      this.$waterfall.forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.container-water-fall {
  width: 100vw;
  box-sizing: border-box;
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
  .show-details--bottom_area {
    width: 100%;
    height: 30px;
    text-align: center;
    background: rgba(250, 250, 250, 1);
    .show-details--bottom_area__text {
      width: 29px;
      height: 11px;
      font-size: 13px;
      line-height: 30px;
      color: rgba(177, 177, 177, 1);
    }
  }
}
</style>
