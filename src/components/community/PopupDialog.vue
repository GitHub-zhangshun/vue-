<template>
  <section class="popup-dialog_wrapper" :style="{ top: outterTop, height: outterHeight }">
    <div class="popup-dialog_head" v-show="isShownPopupHead">
      <i class="iconfont icon-close" @click="closeDialog"></i>
      <h1>SISILILY</h1>
    </div>
    <div class="only-close_wrapper" v-show="isShownOnlyCloseIcon">
      <i class="iconfont icon-close" @click="closeDialog"></i>
    </div>
    <ShowEditArea />
    <div class="popup-dialog_mask" :style="{ bottom: maskBottom, height: maskHeight }"></div>
  </section>
</template>

<script>
import ShowEditArea from "@components/community/ShowEditArea";
export default {
  name: 'PopupDialog',
  props: {
    outterTop: {
      type: String,
      default: '20%'
    },
    outterHeight: {
      type: String,
      default: '80%'
    },
    maskBottom: {
      type: String,
      default: '80%'
    },
    maskHeight: {
      type: String,
      default: '20%'
    },
    isPopupHead: {
      type: String,
      default: 'Yes'
    },
    isOnlyCloseIcon: {
      type: String,
      default: 'No'
    }
  },
  components: {
    ShowEditArea
  },
  data() {
    return {}
  },
  computed: {
    // 是否显示弹窗头部区域。
    isShownPopupHead() {
      return this.isPopupHead === 'Yes' ? true : false;
    },
    // 是否仅显示关闭按钮。
    isShownOnlyCloseIcon() {
      return this.isOnlyCloseIcon === 'No' ? false : true;
    }
  },
  methods: {
    // 接收父组件传来的关闭弹窗方法。
    closeDialog() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-dialog_wrapper {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 300;
  background-color: rgba(255,255,255,1);
  .popup-dialog_head {
    width: 100%;
    height: 47px;
    color: rgba(0,0,0,1);
    i {
      display: inline-block;
      margin: 10.5px 0px 10.5px 7.5px;
      font-size: 24px;
    }
    h1 {
      display: inline-block;
      margin-left: 108px;
      font-size: 22px;
      font-family: Amy;
      font-weight: 400;
    }
  }
  .only-close_wrapper {
    i {
      display: inline-block;
      margin: 10.5px 0px 10.5px 7.5px;
      font-size: 24px;
    }
  }
  .popup-dialog_mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    content: '';
    background: rgba(0,0,0, 0.7);
  }
}
</style>