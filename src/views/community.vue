<template>
  <div class="community">
    <SwiperBanner />
    <SwiperTagsList />
    <ShowDetailsNav />
  </div>
</template>

<script>
import SwiperBanner from "@components/home/SwiperBanner";
import SwiperTagsList from "@components/home/SwiperTagsList";
import ShowDetailsNav from "@components/home/ShowDetailsNav";
export default {
  name: "home",
  components: {
    SwiperBanner,
    SwiperTagsList,
    ShowDetailsNav
  },
  data() {
    return {
      
    };
  }
};
</script>

<style lang="scss" scoped></style>
