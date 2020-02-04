<template>
  <section class="show-details--content_erapper">
    <section class="show-details_banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, idx) in bannerImg" :key="idx">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="show-details_number">NO.{{ goodsNumber }}</div>
    </section>
    <section class="show-details_info">
      <div class="info-top_wrapper">
        <div
          v-if="userData.avatar"
          class="user-avatar"
          :style="{ backgroundImage: `url(${userData.avatar})` }"
        ></div>
        <div class="user-info">
          <p>{{ userData.user }}</p>
          <p>{{ userData.intro }}</p>
        </div>
        <div class="delete-icon_wrapper">
          <i class="iconfont icon-delete"></i>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { userDetailsData } from "@/api/common";
export default {
  name: "ShowDetailsPage",
  data() {
    return {
      goodsNumber: 134,
      bannerImg: [
        "https://img14.360buyimg.com/n1/s800x800_jfs/t1/75261/30/11354/182839/5d8b39a2Ea3d93f8c/f9c1922f0c3f88ce.jpg",
        "https://pop.nosdn.127.net/d7fc70c5-1282-4814-8491-9e655ae967c2?imageView&thumbnail=750x0&quality=60&",
        "https://img.alicdn.com/imgextra/i3/874022290/TB2QFZjgnqWBKNjSZFxXXcpLpXa_!!874022290.jpg",
        "https://brup.shengri.cn/goods/2018/05/24021859_f1bc568669e2dd6f90e7fc371de87fa3.jpg"
      ],
      userData: []
    };
  },
  methods: {
    async getUserData() {
      let res = await userDetailsData();
      this.userData = res[0];
      console.info(this.userData);
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style lang="scss" scoped>
.show-details--content_erapper {
  height: 100%;
  .show-details_banner {
    position: relative;
    width: 100%;
    height: 375px;
    .van-swipe {
      width: 100%;
      height: 100%;
      img {
        height: 100%;
      }
    }
    .show-details_number {
      position: absolute;
      right: 14.5px;
      bottom: 9.5px;
      padding: 0;
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .show-details_info {
    height: 214px;
    .info-top_wrapper {
      display: flex;
      align-items: center;
      .user-avatar {
        width: 33px;
        height: 33px;
        margin: 20px 13px 0px 15px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .user-info {
        min-width: 200px;
        height: 32px;
        margin-top: 21.5px;
        font-family: Source Han Sans CN;
        p:nth-child(1) {
          height: 12px;
          font-size: 15px;
          color: rgba(21,21,21,1);
        }
        p:nth-child(2) {
          width: 183px;
          height: 12px;
          margin-top: 8.5px;
          font-size: 12px;
          font-weight: 300;
          color: rgba(177,177,177,1);
        }
      }
    }
  }
}
</style>
