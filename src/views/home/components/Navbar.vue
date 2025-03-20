<template>
  <div class="fixed_head df_r">
    <van-image
      :src="logo"
      fit="contain"
      class="logo ml_10"
      @click="$router.push('/')"
    ></van-image>
    <div class="h-right">
      <!-- <van-image :src="more" fit="contain" class="more mr_5"></van-image> -->
      <div></div>
      <div class="hamburger">
        <div class="hamburger-box">
          <div class="hamburger-inner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/imgs/logo_h.png"),
      more: require("@/assets/imgs/more.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
.fixed_head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: halfSize(120px);
  justify-content: space-between;
  z-index: 999;
  background: $bg_color;
  box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, 0.1);
  // padding: 0 4%;
  .logo {
    // height: halfSize(7px);
    width: 75px;
  }
  .h-right {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    z-index: 12;
    // width: 100px;
    padding-right: 10px;
  }
  .hamburger {
    height: 20px;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
    .hamburger-box {
      width: 25px;
      height: 20px;
      display: inline-block;
      position: relative;
    }
    .hamburger-inner {
      transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
        background-color 0.5s 0s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      width: 25px;
      height: 2px;
      background: #222;
      border-radius: 4px;
      position: absolute;
      display: block;
      top: 50%;
      margin-top: -2px;
      &::before,
      &::after {
        transition: transform 0.6s 0s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
        content: "";
        border-radius: 4px;
        position: absolute;
        display: block;
        width: 25px;
        height: 2px;
        background: #222;
      }
      &::before {
        top: -8px;
      }
      &::after {
        bottom: -8px;
      }
    }
  }
  .more {
    height: 20px;
  }
}
</style>
