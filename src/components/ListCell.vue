<template>
  <div class="cell-item" @click.stop="handleClick">
    <div class="cell-item-left">
      <svg-icon :iconClass="icon" :size="30" v-if="icon" />
      <div class="title" :style="{ color }">{{ title }}</div>
    </div>
    <div class="cell-item-right">
      <div class="sub-title" :style="{ color }" v-if="rightText">
        {{ rightText }}
      </div>
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
    color: {
      type: String,
      default: "#000",
    },
    rightText: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("handleListCell");
    },
  },
};
</script>

<style lang="scss" scoped>
.cell-item {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: halfSize(93px);
  box-shadow: 0px 1px 3px #00000024;
  border: 1px solid $border_color_bu;
  border-radius: 5px;
  margin-bottom: 8px;
  background: $bg_color;
  .image {
    width: 26px;
    // border-radius: 50%;
  }
  &-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      color: $font_color;
      margin-left: 10px;
      font-size: 14px;
    }
  }

  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // margin-right: 10px;

    .sub-title {
      margin-right: 10px;
      font-size: 14px;
    }
  }
}
</style>
