<template>
  <van-popup v-model="show" class="modal" :close-on-click-overlay="false">
    <div class="modal_box df_c">
      <div class="title df_r">{{ title }}</div>
      <div class="close" @click="onClose">
        <svg-icon iconClass="close_x" :size="20"></svg-icon>
      </div>
      <div class="context">
        <template v-if="data.valueType === 1">
          <van-image
            :src="data.sourceUrl"
            fit="cover"
            class="notice_img"
          ></van-image>
        </template>
        <template v-if="data.valueType === 2">
          <p class="text" v-html="data.content"></p>
        </template>
        <template v-if="data.valueType === 3">
          <van-image
            :src="data.sourceUrl"
            fit="cover"
            class="notice_img"
          ></van-image>
          <p class="text" v-html="data.content"></p>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {},
    },
    title: String,
  },
  methods: {
    onClose() {
      this.$emit("onNoticeClose");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: calc(650px / 2);
  min-height: 400px;
  &_box {
    .title {
      font-size: 22px;
      color: $font_color_white;
      width: 100%;
      justify-content: center;
      letter-spacing: 2px;
      padding: 15px 0 20px;
      background: $base_color;
      border-radius: 5px 5px 0 0;
    }
    .close {
      position: absolute;
      right: 5px;
      top: 10px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .context {
      background: $bg_color;
      color: $font_color_dark;
      font-size: 14px;
      line-height: 1.5;
      min-height: 150px;
      max-height: 400px;
      overflow: auto;
      border-radius: 0 0 5px 5px;
      padding: 10px;
      .notice_img {
        overflow: hidden;
      }
      .text {
        text-align: center;
        line-height: 1.5;
        padding: 15px 0;
      }
    }
  }
  ::v-deep {
    .van-image {
      display: block !important;
    }
  }
  .context::-webkit-scrollbar {
    width: 0;
  }
}
</style>
