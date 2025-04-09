<template>
  <div class="page">
    <div class="part_1">
      <nav-bar
        :title="''"
        titleColor="#313231"
        leftIconColor="#313231"
        class="nav-top"
      />
      <div class="down_title">
        <img src="@/assets/photo/down_title.png" alt="" >
      </div>
    </div>
    <div class="down_content">
        <img src="@/assets/photo/down_content.png" alt="" >
    </div>
    <div class="down_btn">
        <img src="@/assets/photo/down_andriod.png" alt="" @click="downLoad('android')">
        <img src="@/assets/photo/down_ios.png" alt="" @click="downLoad('ios')">
    </div>
  </div>
</template>
<script>
export default {
    methods: {
        downLoad(type) {
            console.log(type);
        }
    }
}

</script>

<style lang="scss" scoped>
::v-deep .nav-top .van-icon:before {
      background: #fff !important;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  background: url('@/assets/photo/down_bg.png') no-repeat left top;
  background-size: 100%;

  .part_1 {
    height: 155px;
    background: linear-gradient(
      180deg,
      #f2f6d4 0%,
      rgba(255, 254, 252, 0) 100%
    );
    .down_title {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
      img {
         width: 288px;
        height: 100px;
        margin: 0 auto;
      };
    }
  }
  .down_content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
        }
    }
    .down_btn {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
            width: 335px;
            height: 44px;
            &:first-child {
                margin-bottom: 16px;
            }
        }
    }
}
</style>
