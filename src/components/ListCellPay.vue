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
      <svg-icon :iconClass="icon" :size="32" />
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 74px;
    .title {
      // color: $font_color1;
      color: #6C6E6C;
      margin-left: 6px;
      font-size: 14px;
      margin-top: 10px;
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
  // border:2px solid #b0be6b;
  border: 1px solid #7E963C;
  // border-image-source: linear-gradient(180deg, #7E963C 0%, #455117 100%);
  background: linear-gradient(180deg, #FCFFF3 0%, #EAF4DC 100%);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 18px;
    background: url('@/assets/photo/pay-selected.png');
    background-size: 100% 100%;
  }
}
</style>
