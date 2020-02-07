<template>
  <section
    class="sale-icon_wrapper"
    :style="{ top: wrapperTop, left: wrapperLeft }"
  >
    -{{ getSalePercentage }}%
  </section>
</template>

<script>
export default {
  name: "SaleIcon",
  props: {
    wrapperTop: {
      type: String,
      default: "117px"
    },
    wrapperLeft: {
      type: String,
      default: "0px"
    },
    saleArray: {
      type: Array,
      required: true
    }
  },
  computed: {
    // 用于计算商品的打折信息的方法。
    getSalePercentage() {
      return Math.ceil((this.saleArray[1] - this.saleArray[0]) / 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.sale-icon_wrapper {
  position: absolute;
  width: 40px;
  height: 17px;
  font-size: 11px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  text-align: center;
  line-height: 17px;
  border-radius: 1px;
  color: rgba(21, 21, 21, 1);
  background: rgba(255, 215, 95, 1);
}
</style>
