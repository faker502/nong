<template>
  <div class="news_wrap">
    <div class="news_sub">
      {{ data.subTtitle }} <span class="time ml_10">{{ data.time }}</span>
    </div>
    <div class="news_title">{{ data.title }}</div>
    <div class="news_text ellipsis">{{ data.text }}</div>
    <div class="more_t df_r mt_10">
      <p class="mr_10 txt">探索更多</p>
      <van-image :src="moreImg" class="t_img" fit="contain"></van-image>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      moreImg: require("@/assets/imgs/more_t.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
.news_wrap {
  padding: 20px 0px 10px;
  border-bottom: 2px solid #edefee;
  &:last-child {
    border-bottom: none;
  }
  .news_sub {
    font-size: 15px;
    color: $font_color_yellow;
    .time {
      display: inline-block;
      font-size: 13px;
      color: $font_color3;
    }
  }
  .news_title {
    font-size: 15px;
    font-weight: bold;
    color: $font_color;
    // margin: 15px 0 10px;
    padding: 15px 0 10px;
  }
  .news_text {
    font-size: 13px;
    color: $font_color3;
    width: 100%;
    padding: 5px 0 0;
  }
  .more_t {
    font-size: 14px;
    .txt {
      color: $font_color4;
    }
    .t_img {
      height: halfSize(35px);
    }
  }
}
</style>
