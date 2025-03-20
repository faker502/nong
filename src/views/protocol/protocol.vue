<template>
  <div class="page">
    <nav-bar title="用户协议" />
    <div class="container">
      <div class="wrap">
        <!-- <div class="title df_r">{{ data.title }}</div> -->
        <div class="content" v-html="data.content"></div>
        <div class="phl"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Protocol",
  data() {
    return {
      data: {},
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
  .container {
    position: relative;
    top: 60px;
    .wrap {
      padding: 0px 15px;
      color: $font_color_dark;
      .title {
        font-size: 16px;
        justify-content: center;
      }
      .content {
        margin: 0.2rem 0 1rem;
        font-size: 14px;
        line-height: 1.5;
      }
      .phl {
        height: 30px;
      }
    }
  }
}
</style>
