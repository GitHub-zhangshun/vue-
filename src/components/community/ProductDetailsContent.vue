<template>
  <section>
    <div
      class="product-item_wrapper"
      v-for="(item, idx) in productData"
      :key="idx"
    >
      <div>
        <img :src="item.img" alt="产品图片" />
      </div>
      <div>
        <span class="product-des">{{ item.des }}</span>
        <span class="product-price_unit">¥</span>
        <span class="product-price">{{ item.price }}</span>
      </div>
      <div>
        <input
          type="checkbox"
          :id="item.id"
          :value="item.id"
          v-model="checkedId"
        />
        <label :for="item.id"></label>
      </div>
    </div>
  </section>
</template>

<script>
import { productImageData } from "@/api/common";
export default {
  name: "ProductDetailsContent",
  props: {
    tabId: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      // 存放产品详细数据的数组。
      productData: [],
      // 存放被选中的 checkbox id 数组。
      checkedId: []
    };
  },
  mounted() {
    this.getProductImageData();
    console.info(this.checkedId);
  },
  methods: {
    // 获取产品图详细数据。
    async getProductImageData() {
      this.productData = await productImageData(this.tabId);
    },
    handleClickGetId(el) {
      console.info(el);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  .product-item_wrapper {
    display: flex;
    height: 137px;
    div:nth-child(1) {
      width: 80px;
      height: 107px;
      margin: 15px 0px 15px 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    div:nth-child(2) {
      span {
        display: inline-block;
      }
      .product-des {
        display: block;
        width: 169px;
        height: 31px;
        margin: 27.5px 0px 40.5px 15px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 200;
        @include ellipsis($line: 2, $line-height: 1.2);
        color: rgba(28, 31, 41, 1);
      }
      .product-price_unit {
        margin-left: 15px;
      }
      .product-price {
        margin-left: 4.5px;
        font-size: 18px;
        font-family: SimHei;
        font-weight: bold;
        color: rgba(28, 31, 41, 1);
      }
    }
    div:nth-child(3) {
      margin: 55px 18px 54.5px 51.5px;
      input {
        display: none;
      }
      label {
        width: 27px;
        height: 27px;
        position: relative;
        display: inline-block;
        border: 1px solid rgba(37, 49, 64, 1);
        border-radius: 50%;
      }
      label::before {
        position: absolute;
        transition: opacity 0.5s ease;
        opacity: 0;
        content: "";
      }
      input:checked + label::before {
        width: 27px;
        height: 27px;
        top: -1px;
        right: -1px;
        bottom: -1px;
        left: -1px;
        border-radius: 50%;
        opacity: 1;
        background-color: black;
      }
      label::after {
        position: absolute;
        transition: opacity 0.5s ease;
        opacity: 0;
        content: "";
      }
      input:checked + label::after {
        width: 17px;
        height: 8px;
        top: 65%;
        left: 60%;
        margin: -10px 0px 0px -11px;
        transform: rotate(-45deg);
        border: 2px solid #ffffff;
        border-top: none;
        border-right: none;
        opacity: 1;
      }
    }
  }
}
</style>
