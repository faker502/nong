<template>
<div>
  <div class="cell-item" v-if="code == 'bankpay'" @click="handleJump">
    <div class="cell-item-left">
      <svg-icon :iconClass="icon" :size="30" />
      <div class="title">{{ title }}</div>
    </div>
    <div class="cell-item-right">
      <div class="sub-title" :style="{ color }" v-if="rightText">
        {{ rightText }}
      </div>
    </div>
  </div>
  <div class="cell-item" v-else @click.stop="handleClick" :class="checked">
    <div class="cell-item-left">
      <svg-icon :iconClass="icon" :size="26" />
      <div class="title">{{ title }}</div>
    </div>
    <div class="cell-item-right">
      <div class="sub-title" :style="{ color }" v-if="rightText">
        {{ rightText }}
      </div>
      <!-- <svg-icon :iconClass="radioIcon" :size="20" /> -->
    </div>
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
    radioIcon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    code: {
      type: String,
      default: ""
    },
    checked: {
      type: String,
      default: ""
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
    handleJump() {
      this.$router.push('/kefu/recharge');
    }
  },
};
</script>
<style lang="scss" scoped>
.cell-item {
  padding: 8px 6px;
  display: flex;
  justify-content: center;  
  align-items: center;
  border: 1px solid #E0E1E5;
  border-radius: 5px;
  margin-bottom: 10px;
  background: $bg_color;
  .image {
    width: 26px;
  }
  &-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      color: $font_color1;
      margin-left: 6px;
      font-size: 15px;
    }
  }

  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // margin-right: 10px;
    .sub-title {
      margin-right: 10px;
    }
  }
}
.actived{
  //background: url('@/assets/img/selected2.png');
  //background-size: 100% 100%;
  border:2px solid #b0be6b;
}
</style>
