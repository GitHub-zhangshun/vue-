<template>
  <section class="show-edit--area_wrapper">
    <section class="text-area_wrapper">
      <van-field
        v-model="message"
        rows="8"
        autosize
        type="textarea"
        maxlength="1000"
        placeholder="写点什么和大家分享下？（1000字以内）"
        show-word-limit
      />
    </section>
    <section class="upload-mirror--image_wrapper">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="9"
        :after-read="afterUploading"
      >
        <div class="upload-button_wrapper">
          <img :src="uploadMirrorIcon" alt="写真アイコンをアップロード" />
        </div>
      </van-uploader>
    </section>
    <section class="upload-image--count_area">
      <p>{{ fileList.length }}/9</p>
    </section>
    <section class="tags-switch_wrapper">
      <p>标签选择<span>有机会赢好礼</span></p>
      <div class="tags-area">
        <div
          class="tags-checkbox_item"
          v-for="(item, idx) in tagsData"
          :key="idx"
        >
          <input class="input" type="checkbox" name="colors" :value="item.id" v-model="checkedTagId" />
          <div class="colors">#{{ item.name }}</div>
        </div>
      </div>
    </section>
    <section class="select-product--image_wrapper">
      <div class="reward-info">
        HOWを投稿すると10ポイントプレゼント、またはSHOWに関連
        する商品を追加したら50ポイントプレゼント！（毎日100ポイ ント上限）
      </div>
      <div class="product-image_area">
        <div
          class="select-product--image_show__wrapper"
          v-for="(item, idx) in checkedSrc"
          :key="idx"
        >
          <img :src="item" alt="製品写真" />
        </div>
        <div class="select-product--image_button">
          <img
            :src="selectProductIcon"
            alt="製品図アイコンを選択"
            @click="handleClickShowProductSelectPopup"
          />
          <span>関連商品を追加</span>
        </div>
      </div>
      <div class="select-product--num_wrapper">
        <p>{{ this.checkedId.length }}/6</p>
      </div>
      <div class="contriute-button" @click="handleClickSubmit">
        <span class="text">投稿</span>
        <span class="reward-text_wrapper" v-show="isProductImg">
          <span>+</span>
          <span>50</span>
          <span>PT</span>
        </span>
      </div>
    </section>
    <van-popup
      v-model="isShownFlag"
      position="bottom"
      duration="0.5"
      :overlay="false"
      :style="{ height: '100%' }"
    >
      <section class="select-product--popup_wrapper">
        <section class="product-image_head">
          <i
            class="iconfont icon-fanhui"
            @click="handleClickHideProductSelectPopup"
          ></i>
          <h1>SISILILY</h1>
          <div @click="handleClickGetIdAndSrc">{{ checkedLength }}</div>
        </section>
        <nav class="product-nav_body">
          <van-tabs
            v-model="activeNavItem"
            title-inactive-color="#7C7C7C"
            title-active-color="#D22F2F"
            line-width="28"
            line-height="3"
            animated
            :swipeable="true"
            @click="handleClickTheTab"
          >
            <van-tab
              v-for="(item, idx) in tabList"
              :key="idx"
              :title="item.title"
            >
              <van-list
                v-model="prLoading"
                :finished="prFinished"
                :immediate-check="false"
                :offset="300"
                finished-text="END"
                @load="handleScrollGetMoreProduct"
              >
                <div
                  class="product-item_wrapper"
                  v-for="(item, idx) in productData"
                  :key="idx"
                >
                  <div>
                    <img :src="item.thumb" alt="製品写真" />
                  </div>
                  <div>
                    <span class="product-des">{{ item.name }}</span>
                    <span class="product-price_unit">¥</span>
                    <span class="product-price">{{ item.price }}</span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      :id="item.id"
                      :value="item.id"
                      v-model="checkedId"
                    />
                    <label
                      :class="{
                        forbidden:
                          checkedId.length > 5 &&
                          checkedId.indexOf(item.id) === -1
                      }"
                      :for="item.id"
                    ></label>
                  </div>
                </div>
              </van-list>
            </van-tab>
          </van-tabs>
        </nav>
      </section>
    </van-popup>
  </section>
</template>

<script>
import uploadMirror from "@/assets/img/upload-mirror.png";
import selectProduct from "@/assets/img/select-product.png";
import PopupDialog from "@components/community/PopupDialog";
import {
  editShowTagsData,
  productImageData,
  commonUploadMultipleImgs,
  releaseShow
} from "@/api/common";
export default {
  name: "ShowEditArea",
  components: {
    PopupDialog
  },
  data() {
    return {
      // 保存 textarea 值的字符串。
      message: "",
      // 保存上传的写真图片的数组。
      fileList: [],
      // 上传写真按钮图片，选择产品按钮图片。
      uploadMirrorIcon: uploadMirror,
      selectProductIcon: selectProduct,
      // 存放可选标签数据的数组。
      tagsData: [],
      // 是否显示选择产品弹窗的标志布尔值。
      isShownFlag: false,
      // 当前选中的高亮导航。
      activeNavItem: 0,
      // 用于请求产品数据的 type 。
      requestType: "cart",
      // 存放 tab item 的数组。
      tabList: [
        {
          title: "注文"
        },
        {
          title: "カート"
        },
        {
          title: "お気に入り"
        },
        {
          title: "閲覧履歴"
        }
      ],
      // 存放产品数据的源数组。
      originalProductData: {},
      // 存放产品详细数据的数组。
      productData: [],
      // 存放选中的 tag 对应的 id 。
      checkedTagId: [],
      // 存放被选中的产品图对应的 id 。
      checkedId: [],
      // 点击确认按钮之后获取的 id 和 src 。
      checkedSrc: [],
      // 获取更多产品数据的加载控制。
      prLoading: false,
      prFinished: false,
      // 当前请求页数。
      currentPage: 1,
      // 对应 tab 下可请求的总页数。
      lastPage: 0,
      // 保存多张图片文件流的数组。
      imagesArr: []
    };
  },
  inject: ['reload'],
  computed: {
    // 根据是否选择产品图，改变提交按钮文字。
    isProductImg() {
      return this.checkedId.length > 0 ? true : false;
    },
    // 实时计算选择产品图数量来确定按钮的文字。
    checkedLength() {
      if (this.checkedId.length === 0) {
        return "選択";
      } else if (this.checkedId.length > 6) {
        return `確認 6/6`;
      } else {
        return `確認 ${this.checkedId.length}/6`;
      }
    },
    // 实时计算选择产品图数量，超出范围禁止选择。
    isMoreThanLimit() {
      return this.checkedId.length >= 6 ? true : false;
    }
  },
  methods: {
    // 上传图片之后的回调函数。
    async afterUploading(file) {
      // 获取上传文件的文件对象，并存在数组中。
      if (Array.isArray(file) === true) {
        file.map(item => {
          this.imagesArr.push(item.file);
        });
      } else {
        this.imagesArr.push(file.file);
      }
    },
    // 获取可选标签数据的方法。
    async getEditShowTagsData() {
      let res = await editShowTagsData();
      this.tagsData = res.data;
    },
    // 点击显示、隐藏选择产品图弹窗。
    handleClickShowProductSelectPopup() {
      this.isShownFlag = !this.isShownFlag;
    },
    handleClickHideProductSelectPopup() {
      this.isShownFlag = !this.isShownFlag;
    },
    // 获取产品图详细数据。
    async getProductImageData(type) {
      let res = await productImageData({
        type: type,
        page: 1
      });
      this.lastPage = res.data.last_page;
      this.productData.splice(0, this.productData.length);
      res.data.data.map(item => {
        this.productData.push(item);
      });
      console.info(res);
    },
    // 滚动触底获取更多产品详细数据功能。
    async getMoreProductImageData(type) {
      let res = await productImageData({
        type: type,
        page: this.currentPage
      });
      console.info(res);
      res.data.data.map(item => {
        this.productData.push(item);
      });
    },
    // 点击 tab item 切换显示不同数据。
    async handleClickTheTab(id) {
      switch (id) {
        case 0:
          this.requestType = "cart";
          break;
        case 1:
          this.requestType = "order";
          break;
        case 2:
          this.requestType = "collect";
          break;
        case 3:
          this.requestType = "browse";
          break;
      }
      this.getProductImageData(this.requestType);
    },
    // 下滑加载更多产品数据。
    async handleScrollGetMoreProduct() {
      this.prLoading = true;
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
        this.getMoreProductImageData(this.requestType);
        this.prLoading = false;
        this.prFinished = true;
      } else {
        this.prLoading = false;
        this.prFinished = true;
      }
    },
    // 点击获取到产品 id 和图片 src 。
    handleClickGetIdAndSrc() {
      if (this.checkedId.length === 0) {
        this.$toast("製品を選択してください");
      } else {
        this.checkedSrc = [];
        for (let i = 0; i < this.checkedId.length; i++) {
          for (let j = 0; j < this.productData.length; j++) {
            if (this.productData[j].id === this.checkedId[i]) {
              this.checkedSrc.push(this.productData[j].thumb);
            }
          }
        }
        this.isShownFlag = !this.isShownFlag;
      }
    },
    // 点击提交按钮的操作。
    async handleClickSubmit() {
      // 上传图片到服务器并获取对应 id 。
      let formData = new FormData();
      this.imagesArr.map(item => {
        formData.append("images[]", item);
      });
      let imgIdRes = await commonUploadMultipleImgs(1, formData);
      if (imgIdRes.code === 200) {
        this.imagesArr = [];
      }
      // 组装提交所需的数据。
      let submitObj = {
        images: imgIdRes.data,
        tags: this.checkedTagId,
        products: this.checkedId,
        content: this.message
      }
      let submitRes = await releaseShow(submitObj);
      if(submitRes.code === 200) {
        this.$toast('正常に公開されました！');
        this.reload();
      }
      else {
        this.$toast('公開に失敗しました。もう一度入力してください！');
        this.checkedTagId = [];
        this.checkedId = [];
        this.message = '';
      }
    }
  },
  mounted() {
    this.getEditShowTagsData();
    this.getProductImageData(this.requestType);
  }
};
</script>

<style lang="scss" scoped>
.show-edit--area_wrapper {
  width: 100%;
  .text-area_wrapper {
    min-height: 185px;
    width: 100%;
  }
  .upload-mirror--image_wrapper {
    width: 100%;
    height: 135px;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: rgba(246, 246, 246, 1);
    .upload-button_wrapper {
      width: 101px;
      height: 101px;
      margin: 17px 15px;
    }
  }
  .upload-image--count_area {
    width: 100%;
    height: 20px;
    text-align: end;
    line-height: 20px;
    background-color: rgba(246, 246, 246, 1);
    p {
      margin-right: 12px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      color: rgba(201, 201, 201, 1);
    }
  }
  .tags-switch_wrapper {
    width: 100%;
    @include border-bottom(
      $left: 15px,
      $right: 15px,
      $width: calc(100% - 30px),
      $border-color: #f3f3f3
    );
    p {
      margin: 22px 0px 16px 14.5px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(21, 21, 21, 1);
      span {
        margin-left: 9.5px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(90, 90, 90, 1);
      }
    }
    .tags-area {
      display: grid;
      grid-template: repeat(2, 38px) / repeat(3, 1fr);
      gap: 12px;
      width: 100%;
      height: 100%;
      padding: 0px 14.5px 18px;
      .tags-checkbox_item {
        position: relative;
        height: 100%;
        border-radius: 18px;
        border: 1px solid rgba(228, 192, 91, 1);
        background-color: #ffffff;
        .input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .colors {
          width: 100%;
          height: 100%;
          font-size: 14px;
          text-align: center;
          line-height: 36px;
          border-radius: 16.5px;
          color: rgba(228, 192, 91, 1);
          @include ellipsis($line: 1, $line-height: 36px);
        }
        .input:checked + .colors {
          background-color: rgba(228, 192, 91, 1);
          color: #ffffff;
        }
      }
    }
  }
  .select-product--image_wrapper {
    width: 100%;
    height: 313.5px;
    .reward-info {
      padding: 18.5px 17px 18px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(54, 54, 54, 1);
    }
    .product-image_area {
      display: grid;
      grid-template: 136px / repeat(6, 101px);
      column-gap: 15px;
      height: 136px;
      padding: 0px 15.5px;
      overflow-x: scroll;
      overflow-y: hidden;
      .select-product--image_show__wrapper {
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .select-product--image_button {
        position: relative;
        width: 100%;
        height: 100%;
        span {
          position: absolute;
          bottom: 18.5px;
          left: 14px;
          font-size: 11px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(75, 75, 75, 1);
        }
      }
    }
    .select-product--num_wrapper {
      height: 20px;
      width: 100%;
      margin-top: 10px;
      text-align: end;
      line-height: 20px;
      p {
        margin-right: 12px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        color: rgba(201, 201, 201, 1);
      }
    }
    .contriute-button {
      width: 345px;
      height: 45px;
      margin: 11.5px 15px 9px;
      background: rgba(226, 106, 154, 1);
      border-radius: 23px;
      text-align: center;
      line-height: 45px;
      .text {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .reward-text_wrapper {
        margin-left: 13px;
        font-family: Source Han Sans CN;
        color: rgba(255, 255, 255, 1);
        span:nth-child(1) {
          font-size: 13px;
        }
        span:nth-child(2) {
          font-size: 17px;
          font-weight: 500;
        }
        span:nth-child(3) {
          font-size: 12px;
        }
      }
    }
  }
  .select-product--popup_wrapper {
    width: 100%;
    .product-image_head {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      height: 47px;
      i {
        margin-right: auto;
        margin-left: 15px;
        font-size: 20px;
      }
      h1 {
        font-size: 22px;
        font-family: Amy;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      div {
        width: 69px;
        height: 29px;
        margin-left: auto;
        margin-right: 15px;
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        text-align: center;
        line-height: 29px;
        border-radius: 5px;
        color: rgba(255, 255, 255, 1);
        background: rgba(226, 106, 154, 1);
      }
    }
    .product-nav_body {
      width: 100%;
      height: 43px;
      .product-item_wrapper {
        display: flex;
        width: 100%;
        height: 137px;
        div:nth-child(1) {
          width: 80px;
          height: 107px;
          margin: 15px 0px 15px 15px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        div:nth-child(2) {
          span {
            display: inline-block;
          }
          .product-des {
            display: block;
            width: 169px;
            height: 31px;
            margin: 27.5px 0px 40.5px 15px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 200;
            @include ellipsis($line: 2, $line-height: 1.2);
            color: rgba(28, 31, 41, 1);
          }
          .product-price_unit {
            margin-left: 15px;
          }
          .product-price {
            margin-left: 4.5px;
            font-size: 18px;
            font-family: SimHei;
            font-weight: bold;
            color: rgba(28, 31, 41, 1);
          }
        }
        div:nth-child(3) {
          margin: 55px 18px 54.5px 51.5px;
          input {
            display: none;
          }
          label {
            width: 27px;
            height: 27px;
            position: relative;
            display: inline-block;
            border: 1px solid rgba(37, 49, 64, 1);
            border-radius: 50%;
          }
          .forbidden {
            pointer-events: none;
            opacity: 0.4;
          }
          label::before {
            position: absolute;
            transition: opacity 0.5s ease;
            opacity: 0;
            content: "";
          }
          input:checked + label::before {
            width: 27px;
            height: 27px;
            top: -1px;
            right: -1px;
            bottom: -1px;
            left: -1px;
            border-radius: 50%;
            opacity: 1;
            background-color: black;
          }
          label::after {
            position: absolute;
            transition: opacity 0.5s ease;
            opacity: 0;
            content: "";
          }
          input:checked + label::after {
            width: 17px;
            height: 8px;
            top: 65%;
            left: 60%;
            margin: -10px 0px 0px -11px;
            transform: rotate(-45deg);
            border: 2px solid #ffffff;
            border-top: none;
            border-right: none;
            opacity: 1;
          }
        }
      }
    }
  }
}
// 隐藏移动端横向滚动条。
.upload-mirror--image_wrapper::-webkit-scrollbar {
  display: none;
}
.upload-mirror--image_wrapper {
  -ms-overflow-style: none;
}
.upload-mirror--image_wrapper {
  scrollbar-width: none;
}
// 修改 vant field 输入框样式。
/deep/ .van-field {
  padding: 18px 12px;
  ::-webkit-input-placeholder {
    font-size: 14px;
    font-family: Source Han Sans CN;
    color: rgba(201, 201, 201, 1);
  }
  .van-field__word-limit {
    font-size: 14px;
    color: rgba(201, 201, 201, 1);
  }
}
// 修改 vant uploader 上传图片样式。
/deep/ .van-uploader__wrapper {
  flex-wrap: nowrap;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  .van-uploader__preview {
    margin: 0;
    .van-image {
      width: 101px;
      height: 101px;
      margin: 17px 0px 17px 15px;
    }
    .van-uploader__preview-delete {
      top: 16px;
      right: 0px;
    }
  }
}
</style>
