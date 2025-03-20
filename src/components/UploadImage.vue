<template>
  <van-uploader
    capture="camera"
    v-model="fileList"
    :preview-image="previewImage"
    :after-read="afterRead"
    :accept="accept"
    :multiple="count > 1 ? true : false"
    :disabled="fileList.length > 0 ? true : false"
  >
    <slot />
  </van-uploader>
</template>

<script>
export default {
  props: {
    imgs: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
    // capture: {
    //   type: String,
    //   default: "",
    // },
    accept: {
      type: String,
      default: "image/*",
    },
    previewImage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fileList: [{ url: 'https://test202309.oss-cn-hongkong.aliyuncs.com/test/ZyLKMIFSD2x28Ml.png' }],
    };
  },
  watch: {
    imgs: {
      handler(val) {
        if (!val) return;
        this.fileList = [{ url: val }];
      },
      immediate: true,
    },
  },
  methods: {
    afterRead(file) {
      this.$emit("uploadFn", file);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-uploader__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-uploader__preview {
    width: halfSize(270px);
    height: halfSize(170px);

    .van-image {

      width: 100%;
      // height: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }
}
</style>
