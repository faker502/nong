<template>
  <div class="page">
    <div class="part_1">
      <nav-bar :title="title"  />
    </div>
    <div class="container">
      <div class="wrap">
        <div class="list">
          <div>
            <div class="fund-total">
              <div class="left">
                <p style="padding:25px 0 0;">助力总收益：</p>
                <p style="padding-bottom:20px;font-size: 18px;font-weight: 600;">{{ account.projectMoney }}</p>
              </div>
              <div class="right" style="text-align: center;padding-right: 0;">
                <div @click="tipsShow(1)">
                  <img src="@/assets/img/ad-withdraw.webp" width="20px" height="20px">
                  <span>提现</span>
                </div>
              </div>
            </div>
            <div class="fund-detail">收益明细</div>
            <div class="list_th df_r">
              <div class="item">时间</div>
              <div class="item">类型</div>
              <div class="item">补贴金额</div>
            </div>
            <!-- <div v-if="list.length > 0"> -->
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
              <div class="list_td df_r" v-for="it in billList" :key="it.id">
                <div class="item" style="line-height: 24px;">{{ it.createTime }}</div>
                <div class="item" style="line-height: 24px;">{{ it.remark }}</div>
                <div class="item blue">{{ it.number >= 1 ? "+" + it.number : it.number }}</div>
              </div>
            </van-list>
          </div>
        </div>
        <div v-show="tips">
          <div class="van-overlay" style="z-index: 2001;"></div>
          <div role="dialog" aria-labelledby="提现" tabindex="0" class="van-dialog" style="z-index: 2002;">
            <div class="van-dialog__header" style="font-size: 18px;">提现</div>
            <div class="van-dialog__content">
              <div class="notice-content" style="padding: 0;">
                <div>
                  <p>
                    <img src="#" width="100%" height="220px">
                  </p>
                  <p style="text-align: center;margin-top: 44px;font-size: 16px;color: rgb(230, 0, 0);font-weight: 600;">
                    激活后可于5月15日提现
                  </p>
                </div>
              </div>
            </div>
            <div class="van-hairline--top van-dialog__footer">
              <button type="button" class="van-button van-button--default van-button--large van-dialog__confirm"
                @click="tipsShow(2)">
                <div class="van-button__content"><span class="van-button__text">确认</span></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBillApi, getAccountApi } from "@/api/member";
export default {
  data() {
    return {
      title: "助力收益",
      accountTitle: '',
      active: 0,
      billList: [],
      account: [],
      loading: false,
      finished: false,
      pageSize: 1,
      totalPage: 0,
      total: 0,
      tips: false
    };
  },
  mounted() {
    //console.log(typeof this.$route.query.moneyType);
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getAccountApi().then((res) => {
        this.account = res.data.account;
      });
    },
    getList() {
      let that = this
      getBillApi({ type: 11, pageSize: that.pageSize }).then((res) => {
        if (res.code != 200) {
          this.$dialog({ message: '请求失败', className: 'dialog-error' })
          return false;
        }
        if (that.pageSize == 1) {
          that.billList = res.data.data;
          that.ymList = res.data.data;
          that.numberList = res.data.data;
        } else {
          that.billList = that.billList.concat(res.data.data);
          that.ymList = that.ymList.concat(res.data.data)
          that.numberList = that.numberList.concat(res.data.data)
        }

        that.loading = false;
        that.pageSize++
        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        //根据业务需求更改
        //if (res.data.billList.length == 0 || res.data.billList == null || res.data.billList.length < 10) {
        if (that.pageSize > res.data.last_page) {
          that.finished = true
          return
        }
      })
    },
    onLoad() {
      this.getList()
    },
    tipsShow(v) {
      v == 1 ? this.tips = true : this.tips = false;
      return false;
    }
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;

  .part_1 {
    position: absolute;
    top: 54px;
    width: 100%;
    height: 80px;
    background: $bg_liner_color_red;

    .navbar {
      background: $bg_liner_color_red;
    }

    .tabs {
      justify-content: space-evenly;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 0px;
      width: 90%;
      margin: 0 auto;
      height: 40px;
      line-height: 40px;
    }

    .my {
      width: 94%;
      font-size: 16px;
      text-align: center;
      margin: 20px auto;
      background-color: #FFFFFF;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 10px;
    }

    .leader {
      width: 100%;
      text-align: center;

      .leader_item {
        width: 33.33%;
        font-size: 16px;

        .name,
        .txt {
          padding: 5px 0;
        }

        .name {
          font-weight: 600;
        }
      }

      .leader_item:first-child,
      .leader_item:last-child {
        margin-top: 40px;
      }
    }
  }

  .container {
    position: relative;
    width: 100%;
    margin-top: 50px;

    .wrap {
      padding-top: 10px;

      .list {
        margin: 10px 0;
        background: $bg_color;
        font-size: 16px;
        color: $font_color1;
        border-radius: 16px;
        padding-top: 15px;

        .fund-total {
          width: 90%;
          margin: 0 auto;
          background: #DAEAFA;
          border: 0.5px solid #FFFFFF;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
          border-radius: 10px;

          //font-weight: 600;
          .left {
            display: inline-block;
            width: 50%;
            padding-left: 22px;
            box-sizing: border-box;
            vertical-align: middle;
            font-size: 17px;

            p:nth-child(1) {
              padding: 10px 0;
              color: #4D4D4D;
            }

            p:nth-child(2) {
              font-family: 'DIN Alternate';
              font-style: normal;
              padding: 10px 0;
              line-height: 30px;
              color: #4D4D4D;
            }
          }

          .right {
            display: inline-block;
            width: 50%;
            box-sizing: border-box;
            padding: 15px 22px 15px 0;
            text-align: right;
            vertical-align: middle;
            color: #2F6DB3;
            font-size: 20px;

            p {
              padding: 10px 0;
            }

            div {
              width: 90%;
              background: radial-gradient(82.74% 862.49% at 28.76% 51.43%, rgba(114, 175, 248, 0.55) 0%, rgba(114, 175, 248, 0.12) 100%);
              border-radius: 4px;
              padding: 10px 0;
              font-size: 18px;

              img,
              span {
                vertical-align: middle;
              }

              span {
                padding-left: 4px;
                font-weight: 600;
                font-size: 16px;
              }
            }

            .a,
            .b {
              margin-bottom: 10px;
            }
          }
        }

        .fund-detail {
          margin: 40px 0 20px;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #747474;
        }

        &_th {
          color: #747474;

          .item {
            font-weight: 600;
          }
        }

        &_th,
        &_td {
          justify-content: space-between;
          padding: 10px 10px;

          .item {
            text-align: center;
            flex: 1;
          }
        }

        &_td {
          font-size: 15px;
        }

      }

      .blue {
        font-weight: 600;
        color: #2F6DB3;
      }

      .green {
        font-weight: 600;
        color: #038310;
      }

      .red {
        font-weight: 600;
        color: #D20B0B;
      }

      .rules {
        margin-top: 10px;

        &_title {
          font-size: 14px;
          color: $font_color_b;
        }

        &_list {
          margin-top: 10px;
          background: $bg_color;
          box-shadow: 0px 1px 3px #00000029;
          border-radius: 14px;
          font-size: 13px;
        }

        &_th,
        &_td {
          justify-content: space-around;
          padding: 10px 0;

          .item {
            text-align: center;
            flex: 1;
          }
        }

        &_th {
          color: $font_color_white;
          background: $base_btn_color2;
          border-radius: 14px 14px 0 0;
        }

        &_td {
          color: $font_color;

          &:nth-child(odd) {
            background: #eff6ff;
          }
        }
      }
    }
  }
}

.color_b {
  color: $font_color_b;
}
</style>
