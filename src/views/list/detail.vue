<template>
  <div class="page">
    <nav-bar title="助力详情" />
    <div class="part_1"></div>
    <div class="part_2"></div>
    <div class="wrap">
      <div class="t_title_b df_c">
        <div class="title">传承创新发展</div>
        <div class="title mt_10">促进大健康中国事业</div>
      </div>

      <div class="z_info df_r">
        <div class="item_it">
          <van-image :src="listData.img" fit="contain" width="88" />
        </div>
        <div class="item_r df_c">
          <p class="d1">助力金额</p>
          <p class="d2">¥88</p>
          <p class="d3">今日剩余1000份</p>
        </div>
      </div>

      <div class="income">
        <div class="income_title">收益明细</div>
        <div class="income_box">
          <div class="box_title df_r">88元助力详细介绍</div>
          <div class="box_data df_r">
            <div class="box_data_l df_c">
              <p class="text mt_20">日收益：8.8元</p>
              <p class="text mt_20">月收益：264元</p>
              <p class="text mt_20">收益周期：30天</p>
            </div>
            <div class="box_data_r df_c">
              <div class="l_img df_c mt_20">
                <div class="w1">级别奖励</div>
                <div class="w2">1元</div>
                <div class="w3">（每日领取）</div>
              </div>
            </div>
          </div>
          <div class="value df_r">
            赠送九芝堂股票：<span class="w4">1000股</span> （价值约10000元）
          </div>
          <div class="tip df_r">金额达标 领取级别自动升级</div>
        </div>
      </div>

      <div class="btns df_r">
        <van-button color="linear-gradient(180deg, #5DB1FF 0%, #0070D9  100%)"
          >立即助力</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { filter } from "lodash-es";
export default {
  data() {
    return {
      data: {
        listData: {
          id: 1,
          img: require("@/assets/images/mm.png"),
          dayIncome: 999,
          express: 1,
          total: 1460,
          reward: 1,
          price: 88,
          stock: 15000,
          value: 13,
        },
      },
      num: 0,
    };
  },
  computed: {
    ...mapGetters(["listData"]),
    orderTotal() {
      let total = this.listData.price * this.num;
      return total;
    },
  },
  mounted() {},
  methods: {
    /**提交订单 */
    handleSubmit() {
      this.$router.push("/position");
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
    height: 100%;
    background: $bg_liner_color2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .wrap {
    position: absolute;
    top: 50px;
    left: 0;
    width: calc(100% - 20px);
    padding: 20px 10px;
    color: $font_color;
    .t_title_b {
      align-items: center;
      color: $font_color;
      font-size: 18px;
      font-weight: bold;
    }
    .z_info {
      margin: 20px 0;
      height: halfSize(213px);
      background: $bg_color;
      box-shadow: 0px 1px 3px #00000029;
      // border: 1px solid #409df4;
      border-radius: halfSize(19px);
      justify-content: space-between;
      padding: 0 10px;
      .item_r {
        align-items: flex-end;
        font-size: 15px;
        .d1 {
          color: $font_color;
        }
        .d2 {
          font-size: 18px;
          color: $font_color_red;
          margin: 20px 0 15px;
        }
        .d3 {
          font-size: 14px;
          color: $font_color1;
        }
      }
    }
    .income {
      margin-top: 10px;
      &_title {
        font-size: 15px;
      }
      &_box {
        margin-top: 10px;
        height: halfSize(481px);
        // box-shadow: 0px 3px 6px #00000029;
        padding: 0 6px;
        border-radius: halfSize(19px);
        background-size: 100% 100%;
        .box_title {
          padding: 20px 0 0;
          font-size: 16px;
          color: $font_color;
          justify-content: center;
          // font-weight: bold;
        }
        .box_data {
          justify-content: space-between;
          height: halfSize(237px);
          &_l {
            flex: 1;
            height: 100%;
            align-items: flex-start;
            // background: #d5e2ed;
            .text {
              font-size: 16px;
              color: $font_color;
              padding-left: 10px;
              // font-weight: bold;
            }
          }
          &_r {
            align-items: center;
            flex: 1;
            height: 100%;
            // background: #d8d8d8;
            .l_img {
              width: halfSize(174px);
              height: halfSize(233px);
              background: url("@/assets/images/red_bag.png") no-repeat;
              background-size: 100% 100%;
              align-items: center;
              justify-content: flex-start;
              .w1 {
                font-size: 14px;
                color: $font_color;
                // font-weight: bold;
                margin-top: 12px;
              }
              .w2 {
                color: $font_color_red;
                font-size: 20px;
                font-weight: bold;
                margin: 12px 0 10px;
              }
              .w3 {
                margin-top: 5px;
                color: $font_color_white;
              }
            }
          }
        }
        .value {
          margin: 0 auto;
          justify-content: center;
          width: 90%;
          height: 40px;
          // padding: 15px 15px;
          font-size: 15px;
          border-bottom: 1px solid #c9c9c9;
          .w4 {
            color: $font_color_red;
          }
        }
        .tip {
          justify-content: center;
          color: #2179cc;
          font-size: 15px;
          padding-top: 10px;
        }
      }
    }
    .btns {
      margin-top: 40px;
      justify-content: center;
    }
  }
}

::v-deep .btns {
  .van-button {
    padding: 0;
    border: none;
    border-radius: halfSize(15px);
    font-size: 14px;
    width: halfSize(461px);
    height: halfSize(76px);
    letter-spacing: 1px;
    color: $font_color_white !important;
  }
}
</style>
