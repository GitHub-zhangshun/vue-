<template>
  <section class="show-related_goods">
    <h1 class="related-area_title">{{ title }}</h1>
    <div class="related-area_list">
      <div class="goods-wrapper" v-for="(item, idx) in goodsData" :key="idx">
        <div>
          <img :src="item.img" alt="关联商品图" />
        </div>
        <div>
          <span>¥{{ item.currentPrice }}</span>
          <span v-show="item.originalPrice">税入</span>
          <span v-show="item.originalPrice">¥{{ item.originalPrice }}</span>
        </div>
        <SaleIcon
          v-show="item.originalPrice"
          wrapperTop="3rem"
          wrapperLeft="0px"
          :saleArray="[ item.currentPrice, item.originalPrice ]"
        />
      </div>
    </div>
  </section>
</template>

<script>
import SaleIcon from "@components/community/SaleIcon";
import { relatedGoodsData } from "@/api/common";
export default {
  name: "ShowRelatedGoods",
  props: {
    title: {
      type: String,
      default: "関連商品"
    }
  },
  components: {
    SaleIcon
  },
  data() {
    return {
      // 关联商品数据。
      goodsData: []
    };
  },
  methods: {
    // 获取关联商品数据的方法。
    async getRelatedGoodsData() {
      this.goodsData = await relatedGoodsData();
    }
  },
  mounted() {
    this.getRelatedGoodsData();
  }
};
</script>

<style lang="scss" scoped>
.show-related_goods {
  width: 100%;
  height: 402px;
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
    grid-template: repeat(2, 163px) / repeat(3, 108px);
    gap: 4.5px 11.5px;
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
        bottom: 0;
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
    }
  }
}
</style>
