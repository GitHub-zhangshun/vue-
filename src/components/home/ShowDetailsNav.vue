<template>
  <section>
    <nav class="switch-list_wrapper">
      <van-tabs v-model="active" :line-width="28" @click="handleClick2Details">
        <van-tab title="关注"></van-tab>
        <van-tab title="推荐"></van-tab>
        <van-tab
          v-for="(item, idx) in tabList"
          :key="idx"
          :title="item.title"
        >
        </van-tab>
      </van-tabs>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
import { sessionGetItem } from '@/common/util';
export default {
  name: "ShowDetailsArea",
  data() {
    return {
      active: sessionGetItem('activeTabItem'),
      tabList: [
        {
          title: 'girl'
        },
        {
          title: 'lady'
        },
        {
          title: 'madam'
        },
        {
          title: 'home'
        }
      ]
    }
  },
  methods: {
    // 点击 tab 显示对应请求的 show 详情数据。
    handleClick2Details(index, title) {
      if(title === '关注') {
        this.$router.push({
          name: `attention-show-content`,
          params: {
            tabId: index
          }
        });
      }
      else if(title === '推荐') {
        this.$router.push({
          name: `community`,
          params: {
            tabId: index
          }
        });
      }
      else {
        this.$router.push({
          name: `show-details-content`,
          params: {
            tabId: index
          }
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ van-tab {
  touch-action: pan-y;
}
.switch-list_wrapper {
  // 解决谷歌优化移动端新特性 passive event listener 报错。
  touch-action: pan-y;
}
</style>
