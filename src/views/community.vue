<template>
  <div class="community">
    <SwiperBanner />
    <SwiperTagsList />
    <div class="switch-list--top_area"></div>
    <nav class="switch-list_wrapper">
      <van-tabs v-model="active" :sticky="true" title-inactive-color="#7C7C7C" title-active-color="#D22F2F" line-width="28" line-height="3" @click="handleClick2Details">
        <van-tab
          v-for="(item, idx) in tabList"
          :key="idx"
          :title="item.title"
        >
        </van-tab>
      </van-tabs>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { sessionGetItem } from '@/common/util';
import SwiperBanner from "@components/home/SwiperBanner";
import SwiperTagsList from "@components/home/SwiperTagsList";
export default {
  name: "home",
  components: {
    SwiperBanner,
    SwiperTagsList
  },
  data() {
    return {
      active: sessionGetItem('activeTabItem'),
      tabList: [
        {
          title: 'フォロー'
        },
        {
          title: 'おすすめ'
        },
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
      this.$router.push({
        name: `show-details-content`,
        params: {
          tabId: index
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.switch-list--top_area {
  width: 100%;
  height: 10PX;
  background-color:rgba(245,245,245,1);
}
.switch-list_wrapper {
  // 解决谷歌优化移动端新特性 passive event listener 报错。
  touch-action: pan-y;
}
// 修改 vant nav 自带样式。
/deep/ .van-tab__text {
  font-size: 14px;
  font-weight: bold;
}
/deep/ .van-tabs__line {
  bottom: 20px;
  background: linear-gradient(90deg,rgba(219,67,64,1),rgba(255,163,172,1));
}
</style>
