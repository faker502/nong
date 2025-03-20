<template>
  <div class="cell-item" @click.stop="handleClick">
    <div class="cell-item-left">
      <img :src="`${icon}`" class="image" v-if="icon" />
      <div class="title">{{ title }}</div>
    </div>
    <div class="cell-item-right">
      <div class="sub-title" v-if="rightText">
        {{ rightText }}
      </div>
      <!-- <svg-icon v-if="show" icon-class="arrow-right"></svg-icon> -->
      <van-icon name="arrow" v-if="show" :size="22" color="#696969" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit("handleCell");
    },
  },
};
</script>

<style lang="scss" scoped>
.cell-item {
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 3px #00000024;
  border: 1px solid rgba(78, 113, 189, 0.6);
  border-radius: 5px;
  background: $bg_color;
  margin-bottom: 8px;
  height: halfSize(93px);
  .image {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
  &-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      color: $font_color1;
      // margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }

  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .sub-title {
      color: $font_color1;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
