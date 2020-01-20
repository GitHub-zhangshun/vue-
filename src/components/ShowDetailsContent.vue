<template>
  <section class="show-details_wrapper">
    {{ tabId }}
  </section>
</template>

<script>
import { sessionSetItem } from "@/common/util";
export default {
  name: 'ShowDetailsContent',
  data() {
    return {
      tabId: ''
    }
  },
  watch: {
    '$route'(to, from) {
      this.tabId = this.$route.params.tabId;
    }
  },
  beforeCreate() {
    sessionSetItem('tabBar', 'community');
  }
}
</script>

<style>

</style>