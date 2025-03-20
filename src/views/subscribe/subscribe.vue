<template>
  <div class="page">
    <nav-bar title="领取" />
    <div class="part_1"></div>
    <div class="part_2"></div>
    <div class="wrap">
      <div class="list">
        <div class="list_item df_r base_shadow" v-for="it in list" :key="it.id">
          <div class="left df_r">
            <van-image :src="it.img" fit="contain" width="87" />
            <div class="info">
              <p class="t1">日收益10-12元</p>
              <p class="t2">
                <span>{{ it.price }}</span>
              </p>
              <p class="t3">今日剩余1000份</p>
            </div>
          </div>
          <div class="right">
            <van-button
              @click="handleBuy(it)"
              color="linear-gradient(180deg, #5DB1FF 0%, #0070D9  100%)"
              >立即助力</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title: "九芝堂",
          price: 88,
          img: require("@/assets/images/mm.png"),
        },
        {
          id: 2,
          title: "九芝堂",
          price: 188,
          img: require("@/assets/images/mm.png"),
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setListData: "details/setListData",
      userInfoFn: "user/userInfoFn",
    }),
    handleBuy(it) {
      this.setListData(it);
      this.$router.push("/list/" + it.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  .part_1 {
    background: $bg_liner_color;
    height: halfSize(280px);
    padding: 70px 10px 0;
  }
  .part_2 {
    height: calc(100% - halfSize(280px) - 70px);
    background: $bg_liner_color2;
  }
  .wrap {
    position: absolute;
    top: 50px;
    left: 0;
    width: calc(100% - 20px);
    padding: 15px 10px;
    color: $font_color;
    .list {
      &_item {
        background: $bg_color;
        height: halfSize(220px);
        border-radius: 8px;
        margin-bottom: 10px;
        padding: 0 10px;
        justify-content: space-between;
      }
      .left {
        align-items: flex-start;
        .info {
          margin-left: 10px;
          .t1 {
            font-size: 15px;
            color: $font_color;
          }
          .t2 {
            font-size: 20px;
            font-weight: bold;
            color: $font_color_red;
            margin: 20px 0;
          }
          .t3 {
            color: $font_color1;
            font-size: 13px;
          }
          .text {
            margin: 15px 0;
            color: $font_color5;
          }
          .color_red {
            font-size: 15px;
          }
        }
      }
    }
  }
  ::v-deep .right {
    .van-button {
      padding: 0;
      border: none;
      border-radius: halfSize(38px);
      font-size: 14px;
      width: halfSize(177px);
      height: halfSize(72px);
      letter-spacing: 1px;
      color: $font_color_white !important;
    }
  }
}
</style>
