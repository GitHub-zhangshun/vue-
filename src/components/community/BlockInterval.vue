<template>
  <section :style="{ width: intervalWidth, height: intervalHeight, backgroundColor: intervalBG }"></section>
</template>

<script>
export default {
  name: "BlockInterval",
  props: {
    intervalWidth: {
      type: String,
      default: '100%'
    },
    intervalHeight: {
      type: String,
      default: '10px'
    },
    intervalBG: {
      type: String,
      default: 'rgba(245, 245, 245, 1)'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>