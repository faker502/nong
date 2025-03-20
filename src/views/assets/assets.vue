<template>
  <div class="page">
    <nav-bar title="我的资产" />
    <div class="part_1">
      <div class="amount_box df_c">
        <div class="asset df_r">
          <div class="asset_info df_c">
            <div class="assets_text mb_20 df_r">{{ titleData[routeId] }}</div>
            <div class="assets_money">88888</div>
          </div>
          <div class="asset_btns df_c">
            <van-button
              v-if="routeId === 1"
              @click="$router.push('/recharge')"
              class="mb_10"
              color="linear-gradient(180deg, #5DB1FF 0%, #0070D9  100%)"
              >充值</van-button
            >
            <van-button v-if="routeId === 1" color="#FF6767" class="mb_10"
              >转账</van-button
            >
            <van-button color="#F7931D" @click="$router.push('/withdraw')"
              >提现</van-button
            >
          </div>
        </div>
        <!-- <div class="asset asset_data df_r">
          <div class="asset_info df_c left">
            <div class="assets_text">中医补贴</div>
            <div class="assets_money">9999</div>
          </div>
          <div class="line"></div>
          <div class="asset_info df_c center">
            <div class="assets_text">现金奖励</div>
            <div class="assets_money">9999</div>
          </div>
          <div class="line"></div>
          <div class="asset_info df_c right">
            <div class="assets_text">持仓市值</div>
            <div class="assets_money">9999</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="part_2">
      <div class="method_box">
        <div class="m_title">{{ subTitleData[routeId] }}</div>
        <div class="m_item">
          <div class="record base_border box_shadow">
            <div class="thead df_r">
              <div class="thead_item">时间</div>
              <div class="thead_item">类型</div>
              <div class="thead_item" v-if="routeId === 1">变动金额</div>
              <template>
                <div class="thead_item" v-if="routeId === 1">状态</div>
                <div class="thead_item" v-else-if="routeId === 2">补贴金额</div>
                <div class="thead_item" v-else>收益金额</div>
              </template>
            </div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="~我是有底线的~"
              @load="onLoad"
              class="list_wrap"
              v-if="list.length > 0"
            >
              <div class="list_box">
                <div class="list_box_item df_r" v-for="it in list" :key="it.id">
                  <div class="text">{{ it.buyTime }}</div>
                  <div class="text">{{ typeData[it.type] }}</div>
                  <div class="text" v-if="routeId === 1">
                    {{ it.money > 0 ? "+" + it.money : it.money }}
                  </div>
                  <template>
                    <div
                      v-if="routeId === 1"
                      class="text mr_5"
                      :class="it.status === 1 ? 'success_c' : 'faild_c'"
                    >
                      {{ statusData[it.status] }}
                    </div>
                    <div class="text mr_5" v-else-if="routeId === 2">0.00</div>
                    <div class="text mr_5" v-else>0.00</div>
                  </template>
                </div>
              </div>
            </van-list>
            <van-empty description="暂无数据" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as RegExp from "@/utils/RegExp.js";
export default {
  name: "recharge",
  components: {},
  data() {
    return {
      list: [
        { id: 1, buyTime: "2022/03/17 16:34:01", type: 1, money: 5, status: 1 },
        {
          id: 2,
          buyTime: "2022/03/17 16:34:01",
          type: 2,
          money: 1000,
          status: 0,
        },
        {
          id: 3,
          buyTime: "2022/03/17 16:34:01",
          type: 4,
          money: -500,
          status: 1,
        },
        {
          id: 4,
          buyTime: "2022/03/17 16:34:01",
          type: 3,
          money: 5000,
          status: 0,
        },

        {
          id: 5,
          buyTime: "2022/03/17 16:34:01",
          type: 1,
          money: 100,
          status: 1,
        },
      ],
      statusData: {
        1: "成功",
        0: "失败",
      },
      typeData: {
        1: "签到",
        2: "充值",
        3: "提现",
        4: "收益",
      },
      loading: false,
      finished: false,
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      teamData: {},
      total: 0,
      tabs: [],
      tabCurrent: 1,
      moreText: "点击更多",
      current: 1,
      routeId: 1, // 1余额 2 中医补贴 3  助力收益
      titleData: {
        1: "账户余额",
        2: "中医补贴",
        3: "助力收益",
      },
      subTitleData: {
        1: "资金明细",
        2: "补贴明细",
        3: "收益明细",
      },
    };
  },
  computed: {
    ...mapGetters(["host", "baseData"]),
  },
  mounted() {
    this.routeId = this.$route.params.id * 1;
  },
  methods: {
    onLoad() {
      this.loading = false;
      this.finished = true;
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
    .amount_box {
      background: $bg_color;
      border-radius: 7px;
      height: halfSize(300px);
      box-shadow: 0px 1px 3px #00000029;
      padding: 0 20px;
      align-items: center;
      .asset {
        width: 100%;
        justify-content: space-between;
        // height: halfSize(360px) / 2;
        border-bottom: 1px solid #ebebeb;
        padding: 5px 10px 0;
        &:last-child {
          border-bottom: none;
        }
      }
      .asset_info {
        flex: 1;
        align-items: flex-start;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
        .assets_text {
          color: $font_color_b;
          height: 32px;
          line-height: 32px;
          justify-content: baseline;
        }
        .assets_money {
          color: $font_color;
          height: 32px;
          line-height: 32px;
        }
      }

      .asset_data {
        padding: 0px !important;
        .left {
          padding-left: 10px;
        }
        .right {
          padding-right: 10px;
        }
        // .center {
        //   width: calc(40% - 2px);
        // }
        .asset_info {
          flex: none;
          align-items: center;
        }
        .line {
          width: 1px;
          height: 20px;
          background: $bg_color5;
        }
      }
    }
  }
  .part_2 {
    min-height: calc(100% - halfSize(280px) - 120px);
    background: $bg_liner_color2;
    padding: 40px 15px 10px;
    .method_box {
      .m_title {
        font-size: 18px;
        color: $font_color_b;
      }
      .m_item {
        margin-top: 15px;
        .record {
          background: $bg_color;
          border-radius: 5px;
          .thead {
            justify-content: space-around;
            border-radius: 5px 5px 0 0;
            background: $base_btn_color2;
            &_item {
              height: 20px;
              line-height: 20px;
              color: $font_color_white;
              font-size: 14px;
              flex: 1;
              text-align: center;
              margin: 10px 0;
              border-right: 1px solid #1f4e7b;
              &:last-child {
                border-right: none;
              }
            }
          }
          .list_box {
            &_item {
              padding: 10px 0px;
              // margin-bottom: 10px;
              justify-content: space-around;
              border-bottom: 1px solid #ebebeb;
              .text {
                color: $font_color1;
                font-size: 13px;
                flex: 1;
                text-align: center;
                &:last-child {
                  font-size: 12px;
                  line-height: 1.5;
                  // opacity: 0.8;
                  // flex: none;
                }
              }
            }
          }
        }
      }
    }
    .btns {
      margin-top: 30px;
      align-items: center;
    }
  }
}
.success_c {
  color: $font_success !important;
}
.faild_c {
  color: $font_faild !important;
}
::v-deep .asset_btns {
  .van-button {
    width: halfSize(153px);
    height: 32px;
    padding: 0;
    border: none;
    border-radius: halfSize(10px);
    font-size: 14px;
  }
}
</style>
