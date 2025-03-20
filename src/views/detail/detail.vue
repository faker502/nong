<template>
  <div class="page">
    <nav-bar :title="title" />
    <div class="container">
      <div class="wrap">
        <div class="image df_r">
          <van-image
            :src="data.photoWall"
            fit="cover"
            class="d_img"
          ></van-image>
        </div>
        <!-- <div class="title">详细参数</div>
        <div class="params df_r">
          <div class="params_left">
            <div class="item">
              <div class="text"><span>重量(不含包装)</span></div>
              <div class="data">146g</div>
            </div>
            <div class="item">
              <div class="text"><span>电池容量</span></div>
              <div class="data">5000mAh</div>
            </div>
          </div>
          <div class="params_right">
            <div class="item">
              <div class="text"><span>机身尺寸(长x宽x高)</span></div>
              <div class="data">145.8x68.8x14.7mm</div>
            </div>
            <div class="item">
              <div class="text"><span>总输出功率</span></div>
              <div class="data">5.1V 2.1A</div>
            </div>
          </div>
        </div> -->
        <div class="detail_d df_r">
          <div class="data df_c">
            <p class="no">{{ data.dailyIncome }}</p>
            <p class="txt">日收益</p>
          </div>
          <div class="data df_c">
            <p class="no">{{ data.incomeDays }}</p>
            <p class="txt">收益天数</p>
          </div>
          <div class="data df_c">
            <p class="no">{{ data.totalRate }}</p>
            <p class="txt">总收益</p>
          </div>
          <div class="data df_c">
            <p class="no">{{ data.price }}</p>
            <p class="txt">租赁费</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_item df_r">
          <div class="footer_left">
            收益率：<span>{{ data.returnRate }}倍</span>
          </div>
          <div class="footer_right">
            <van-button
              @click="handleToPay"
              color="linear-gradient(180deg, #8496F0 0%, #14236F 100%)"
              >立即租赁</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import detailImg from "@/assets/imgs/d_power.png";
export default {
  name: "Detail",
  data() {
    return {
      title: "",
      id: undefined,
      data: {},
    };
  },
  computed: {},
  mounted() {
    this.title = this.$route.params.name;
    this.id = this.$route.params.id * 1;
    this.powerDetail.img = detailImg;
    document.title = this.title;
  },
  methods: {
    handleToPay() {
      this.setPowerDetail(this.data);
      this.$router.push("/order_info");
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
  .container {
    position: relative;
    top: 50px;
    .wrap {
      padding: 0 20px 3rem;
      color: $font_color;
      .image {
        justify-content: center;
        width: 100%;
        min-height: 5rem;
        .d_img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        font-size: 16px;
      }
      .params {
        margin-top: 20px;
        justify-content: space-between;
        &_left,
        &_right {
          .item {
            margin-bottom: 15px;
            .text {
              span {
                opacity: 0.6;
              }
              font-size: 13px;

              position: relative;
              &::before {
                content: "";
                position: absolute;
                top: 2px;
                left: -8px;
                width: 2px;
                height: 10px;
                background: $base_color;
                opacity: 1;
              }
            }
            .data {
              font-size: 15px;
              margin-top: 10px;
            }
          }
        }
      }
      .detail_d {
        margin: 30px 0;
        justify-content: space-between;
        .data {
          align-items: center;
          .no {
            color: $base_color;
            font-size: 15px;
            font-weight: bold;
          }
          .txt {
            margin-top: 10px;
            font-size: 15px;
          }
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 50;
      width: 100%;
      height: halfSize(182px);
      // padding: 15px 10px;
      background: $bg_color1;
      &_item {
        padding: 0 20px;
        height: inherit;
        justify-content: space-between;
      }
      &_left {
        font-size: 20px;
        color: $font_color;
        span {
          color: $base_color;
        }
      }
    }
  }
  ::v-deep .footer_right {
    .van-button {
      padding: 0;
      border: none;
      border-radius: halfSize(15px);
      font-size: 15px;
      font-weight: bold;
      width: halfSize(175px);
      height: halfSize(70px);
      letter-spacing: 2px;
      color: $font_color_dark !important;
    }
  }
}
</style>
