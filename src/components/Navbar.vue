<template>
  <!-- :style="{ backgroundColor: navBarFixed ? bgColor : 'transparent' }" -->
  <van-nav-bar
    z-index="1650"
    safe-area-inset-top
    class="navbar"
    fixed
    :style="{ backgroundColor: navBarFixed ? bgColor : 'transparent' }"
  >
    <template #left v-if="isLeftFn">
      <van-icon
        name="arrow-left"
        size="22"
        :color="leftIconColor"
        @click="handleToBack"
      />
    </template>
    <template #left v-else>
      <van-icon
        name="arrow-left"
        size="22"
        :color="leftIconColor"
        @click="$router.go('-1')"
      />
    </template>
    <template #title>
      <span class="navbar-title" :style="{ color: titleColor }">{{ title }}</span>
    </template>

    <template #right>
      <span class="navbar-right" :style="{ color: titleColor }" @click="onClickRight">{{ right }}</span>
    </template>
  </van-nav-bar>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    right: {
      type: String,
      default: "",
    },
    leftImgUrl: {
      type: String,
      default: "",
    },
    isLeftFn: {
      type: Boolean,
      default: false,
    },
    leftImg: {
      type: Boolean,
      default: false,
    },
    isLeft: {
      type: Boolean,
      default: true,
    },
    isRight: {
      type: Boolean,
      default: false,
    },
    titleColor: {
      type: String,
      default: "#000",
    },
    leftIconColor: {
      type: String,
      default: "#626571",
    },
    bgColor: {
      type: String,
      default: '#F2F6D4'// "#abb187",
    },
  },
  data() {
    return {
      navBarFixed: false,
    };
  },
  mounted() {
    // 事件监听滚动条
    window.addEventListener("scroll", this.watchScroll, true);
  },
  methods: {
    onClickRight() {
      this.$emit("handleRight");
    },
    handleToBack() {
      this.$emit("handleBack");
    },
    watchScroll(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        e.target.scrollTop;
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 49) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  &-title {
    color: #000;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 600;
  }
  &-right {
    font-size: 18px;
    letter-spacing: 0;
  }
}
::v-deep.van-nav-bar {
  // background-color: transparent !important;
  // box-shadow: 0px 3px 16px #9ea3c038;
  //box-shadow: 0px 4px 8px 0px #9521230A;
  &::after {
    border: none;
  }
}
</style>
