<template>
  <section
    class="edit-show_wrapper"
    :style="{
      bottom: wrapperBottom,
      width: wrapperWidth,
      height: wrapperHeight
    }"
    @click="openDialog"
  >
    <img :src="editShow" alt="edit show icon" />
  </section>
</template>

<script>
import editShowIcon from "@/assets/img/edit-show.png";
export default {
  name: "EditShowButton",
  props: {
    wrapperBottom: {
      type: String,
      default: "100px"
    },
    wrapperWidth: {
      type: String,
      default: "35px"
    },
    wrapperHeight: {
      type: String,
      default: "35px"
    }
  },
  data() {
    return {
      editShow: editShowIcon
    };
  },
  methods: {
    openDialog() {
      this.$emit('open');
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-show_wrapper {
  position: fixed;
  right: 0px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  img {
    width: 100%;
  }
}
</style>
