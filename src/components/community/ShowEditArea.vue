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
          <img :src="uploadMirrorIcon" alt="" />
        </div>
      </van-uploader>
    </section>
    <section class="tags-switch_wrapper">
      <p>标签选择<span>有机会赢好礼</span></p>
      <div class="tags-area">
        <div class="tags-checkbox_item">
          <input class="input" type="radio" name="colors" value="1" />
          <div class="colors">test</div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import uploadMirror from "@/assets/img/upload-mirror.png";
export default {
  name: "ShowEditArea",
  data() {
    return {
      // 保存 textarea 值的字符串。
      message: "",
      // 保存上传的写真图片的数组。
      fileList: [],
      // 上传写真按钮图片。
      uploadMirrorIcon: uploadMirror
    };
  },
  methods: {
    // 上传图片之后的回调函数。
    afterUploading(file) {
      // 这里通过接口将图片上传至服务器。
      console.log(file);
    }
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
  .tags-switch_wrapper {
    width: 100%;
    height: 155.5px;
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
      width: 100%;
      height: 100%;
      padding: 0px 14.5px 18px;
      .tags-checkbox_item {
        position: relative;
        height: 36px;
        border-radius: 18px;
        border: 1px solid rgba(228,192,91,1);
        background-color: #FFFFFF;
        .input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .colors {
          height: 2em;
          padding: 0 1em;
          border-radius: 1em;
          font-size: 14px;
          line-height: 2em;
        }
        .input:checked + .colors {
          border: 1px solid #e63838;
          color: #e63838;
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
