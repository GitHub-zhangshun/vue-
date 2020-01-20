<template>
  <section class="swiper-tags--list_wrapper">
    <div
      class="swiper-tags--list_item"
      v-for="(item, idx) in tagsListData"
      :key="idx"
      :style="[item.bgImg]"
      @click="handleClick2TagDetailsPage"
    >
      {{ item.name }}
    </div>
    <span class="more-button" v-show="isShownMoreButtonFlag" @click="handleClickShowMoreTags">more>></span>
  </section>
</template>

<script>
export default {
  name: 'SwiperTagsList',
  data() {
    return {
      tagsListData: [
        {
          name: '#圣诞装扮',
          bgImg: {
            backgroundColor: 'skyblue',
            backgroundImg: ''
          }
        },
        {
          name: '#新年装扮',
          bgImg: {
            backgroundColor: 'orange',
            backgroundImg: ''
          }
        },
        {
          name: '#初春装扮',
          bgImg: {
            backgroundColor: 'red',
            backgroundImg: ''
          }
        },
        {
          name: '#夏日装扮',
          bgImg: {
            backgroundColor: 'yellowgreen',
            backgroundImg: ''
          }
        },
        {
          name: '#秋季装扮',
          bgImg: {
            backgroundColor: 'yellow',
            backgroundImg: ''
          }
        },
        {
          name: '#秋季装扮',
          bgImg: {
            backgroundColor: 'yellow',
            backgroundImg: ''
          }
        }
      ],
      isShownMoreButtonFlag: false
    }
  },
  mounted() {
    this.isShownMoreButton();
  },
  methods: {
    // 是否显示更多按钮。
    isShownMoreButton() {
      if(this.tagsListData.length >= 6) {
        this.isShownMoreButtonFlag = !this.isShownMoreButtonFlag;
      }
    },
    // 点击标签跳转对应详情页。
    handleClick2TagDetailsPage(el) {
      // this.$router.push({
      //   name: '',
      //   params: {}
      // });
      // 对应取数据
      // this.$route.params.xxx
    },
    // 点击 more 按钮显示更多 Tags 页面。
    handleClickShowMoreTags() {
      // this.$router.push();
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-tags--list_wrapper {
  display: flex;
  height: 115px;
  padding: 17.5px 12PX;
  overflow-x: scroll;
  .swiper-tags--list_item {
    flex-shrink: 0;
    width: 130px;
    height: 100%;
    border-radius: 8px;
    text-align: center;
    line-height: 80px;
  }
  .swiper-tags--list_item:not(:first-of-type) {
    margin-left: 10PX;
  }
  .more-button {
    display: inline-block;
    height: 100%;
    padding: 0 12PX;
    line-height: 80px;
  }
}
// 隐藏移动端的滚动条。
.swiper-tags--list_wrapper::-webkit-scrollbar {
  display: none;
}
.swiper-tags--list_wrapper {
  -ms-overflow-style: none;
}
.swiper-tags--list_wrapper {
  scrollbar-width: none;
}
</style>