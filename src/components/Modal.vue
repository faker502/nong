<template>
  <van-popup v-model="show" class="modal" :close-on-click-overlay="false">
    <div class="modal_box df_c">
      <div class="title df_r">{{ title }}</div>
      <slot></slot>
      <div class="footer df_r">
        <div class="btn1" v-if="isCancel" @click="$emit('onCancel')">取消</div>
        <div class="btn2" @click="$emit('onSubmit')">确定</div>
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
    title: String,
    isCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: calc(650px / 2);
  &_box {
    background: $bg_color;
    border-radius: 5px;
    align-items: center;
    .title {
      font-size: 15px;
      margin-bottom: 10px;
      background: $base_color;
      width: 100%;
      height: 35px;
      padding: 5px 0;
      justify-content: center;
      color: $font_color_white;
      border-radius: 5px 5px 0 0;
      letter-spacing: 2px;
    }
    .footer {
      margin: 30px 0 20px;
      width: 100%;
      justify-content: center;
      .btn1,
      .btn2 {
        border-radius: 5px;
        padding: 10px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 15px;
        font-size: 12px;
      }
      .btn1 {
        // background: $btn_bg_color;
        color: $font_color_dark;
        border: 1px solid $base_border_color;
      }
      .btn2 {
        background: $base_btn_color2;
        color: $font_color_white;
        border: 1px solid $base_btn_color2;
      }
    }
  }
}
</style>
