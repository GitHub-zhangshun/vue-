<template>
  <!-- <section class="show-details_wrapper"> -->
  <!-- {{ tabId }} -->
  <!-- </section> -->
  <div class="container-water-fall">
    <waterfall
      :col="2"
      :data="data"
      @loadmore="handleScrollLoadmore"
      @scroll="handleScroll"
      @finish="handleScrollFinish"
    >
      <template>
        <div class="cell-item" v-for="(item, index) in data" :key="index">
          <img v-if="item.img" :src="item.img" alt="加载错误" />
          <div class="item-body">
            <div class="item-desc">{{ item.title }}</div>
            <div class="item-footer">
              <div
                v-if="item.avatar"
                class="avatar"
                :style="{ backgroundImage: `url(${item.avatar})` }"
              ></div>
              <div class="name">{{ item.user }}</div>
              <div class="like" :class="item.liked ? 'active' : ''">
                <i></i>
                <div class="like-total">{{ item.like }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class=""></div>
    </waterfall>
  </div>
</template>

<script>
import { waterFallData } from "@/api/common";
import { sessionSetItem } from "@/common/util";
export default {
  name: "ShowDetailsContent",
  props: ["tabId"],
  data() {
    return {
      // 瀑布流数据数组。
      data: []
    };
  },
  watch: {
    // 实时监听路由改变。
    $route(to, from) {
      // 将当前应该高亮显示的 tabId 存到 session，防止刷新页面后，url、高亮的 tab、用于请求对应路由数据的 id 不一致。
      sessionSetItem("activeTabItem", this.tabId);
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
  methods: {
    handleScrollFinish(){
      console.info('finish');
    },
    handleScroll(scrollData) {
      // console.info(scrollData);
    },
    handleScrollLoadmore(){
      const loadMoreId = setTimeout(()=>{
        this.data = this.data.concat(this.data);
        console.info(this.data.length);
      }, 1500);
      this.$waterfall.resize();
    },
    async getWaterFallData() {
      let res = await waterFallData();
      this.data = res;
    }
  },
  mounted() {
    // 调用函数获取瀑布流数据。
    this.getWaterFallData();
  }
};
</script>

<style lang="scss" scoped>
.container-water-fall {
  width: 100vw;
  box-sizing: border-box;
  .cell-item {
    width: 100%;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 10PX;
    }
    .item-body {
      padding: 13.5px 14.5px 13px 0px;
      .item-desc {
        width: 157px;
        height: 32px;
        font-size: 12px;
        line-height: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(44,44,44,1);
      }
      .item-footer {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 13px;
        .avatar {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .name {
          max-width: 150px;
          margin-left: 3px;
          font-size: 13px;
          color:rgba(165,165,165,1);
        }
        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          &.active {
            i {
            }
            .like-total {
              color: #ff4479;
            }
          }
          i {
            width: 28px;
            display: block;
          }
          .like-total {
            width: 18px;
            font-size: 12px;
            color:rgba(21,21,21,1);
          }
        }
      }
    }
  }
}
</style>
