<template>
  <section>
    关注
  </section>
</template>

<script>
import { sessionSetItem } from '@/common/util';
export default {
  name: 'AttentionShowContent',
  data() {
    return {}
  },
  watch: {
    // 实时监听路由改变。
    '$route'(to, from) {
      // 将当前应该高亮显示的 tabId 存到 session，防止刷新页面后，url、高亮的 tab、用于请求对应路由数据的 id 不一致。
      sessionSetItem('activeTabItem', 0);
    }
  }
}
</script>

<style>

</style>