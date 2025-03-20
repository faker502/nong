<template>
  <van-overlay :show="loadingShow">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: white;
      "
    >
      <van-loading color="#0094ff" size="8rem" vertical
        >{{loadingText}}</van-loading
      >
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: "LodingVue",
  props: {
    loadingText: {
      type: String,
      default: "数据加载中请稍等...",
    },
    loadingShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>