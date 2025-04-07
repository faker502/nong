<template>
  <div class="page">
    <nav-bar
      title="在线充值"
      titleColor="#313231"
      leftIconColor="#313231"
      class="nav-top"
      @handleRight="$router.push('/record_recharge')"
    />
    <div class="part_1">
      <div class="content-box">
        <p>账户余额(元)</p>
        <p>1000.00</p>
      </div>
    </div>
    <div class="part_2">
      <!-- <div
        class="info_box"
        style="
          display: none;
          border-radius: 5px;
          width: auto;
          margin: 0 auto 10px auto;
          padding: 10px 20px;
        "
      >
        <div class="my-inviter">
          <p
            style="
              font-size: 12px;
              color: #626571;
              font-weight: 400;
              padding: 10px 0;
            "
          >
            账户余额
          </p>
          <p
            style="
              margin: 0 10px 0 0;
              font-size: 18px;
              color: #d11a2d;
              font-weight: 600;
            "
          >
            1000
            <span style="color: #3f3d38; font-size: 12px; font-weight: 400"
              >CNY</span
            >
          </p>
        </div>
      </div> -->

      <!-- <div v-if="online == 'no'">
        <div class="amount_box">
          <div class="a_title">充值金额</div>
          <van-field
            v-model="money"
            placeholder="请输入充值金额"
            autosize
            autocomplete="off"
            :border="false"
            label="￥"
            readonly
          >
          </van-field>
          <div class="a_text mt_20">
            <span>充值金额：</span>
            <span>￥{{ accountData.rechargeOver }}</span>
          </div>
        </div>
        <div class="method_box">
          <div class="m_title">请选择充值方式</div>
          <div class="m_item">
            <ListCellPay
              v-for="(it, index) in payList"
              :key="index"
              :title="it.name"
              :code="it.code"
              :icon="it.code"
              :checked="payType === it.code ? 'actived' : ''"
              @handleListCell="handleCellClick(index, it.code)"
            />
          </div>
        </div>
      </div> -->

      <div class="method_box"> <!-- v-else -->
        <div class="m_title" style="padding-bottom: 10px">请选择充值方式</div>
        <div class="m_item">
          <ListCellPay
            v-for="(it, index) in payList"
            :key="index"
            :title="it.name"
            :code="it.code"
            :icon="it.code"
            :checked="payType === it.code ? 'actived' : ''"
            @handleListCell="handleCellClick(index, it.code)"
          />
        </div>

        <!-- <div class="m_title" style="margin: 25px 0 25px">
          请选择<span style="color: rgb(137 153 60)"> {{ payName }} </span
          >充值金额
        </div> -->

        <!--<div class="money-select" v-for="(it, k) in payChannelList" :key="k" :class="k" v-show="payType == k">-->
        <!-- <div
          class="money-select"
          v-for="(it, k) in payChannelList"
          :key="k"
          :class="k"
          v-show="payType == k"
        >
          <div
            class="no-have"
            v-if="payChannelList[k].length == 0"
            style="
              background: #f3eded;
              text-align: center;
              border: 1px solid #e44e49;
              border-radius: 3px;
              padding: 12px 0;
            "
          >
            {{ payName }}暂时不可用
          </div>
          <div class="money-grid" v-else>
            <div
              v-for="(item, key) in payChannelList[k]"
              :key="key"
              :class="[money == item ? 'money-on' : '']"
              @click="moneyOn(item)"
              :id="nameId(item)"
              v-if="item.indexOf('-') == -1"
            >
              {{ item }} 元
            </div>
            <div
              class="between"
              v-for="(item, key) in payChannelList[k]"
              :key="key"
              :class="[money == item ? 'money-on' : '']"
              @click="moneyOn(item)"
              :id="nameId(item)"
              v-if="item.indexOf('-') != -1"
            >
              {{ item }}
            </div>
          </div>
        </div> -->
        <!-- <div class="select_money">
          <div
            v-if="moneyType == 0"
            class="money-text"
            style="margin-top: 30px; margin-left: 10px"
          >
            <span style="padding-right: 4px">当前充值金额：</span>
            <span style="color: red">¥ {{ money }}</span>
          </div>
          <div
            v-else
            class="money-input"
            style="margin-top: 30px; margin-left: 10px"
          >
            <span style="padding-right: 4px">当前充值金额：</span>
            <van-field
              v-model="moneySelect"
              label="¥"
              placeholder="请输入充值金额"
            />
          </div>
        </div> -->

        <van-field
            v-model="money"
            placeholder="请输入充值金额"
            autosize
            autocomplete="off"
            :border="false"
            label=""
          >
        </van-field>
      </div>
      <div class="btns df_c">
        <van-button
          @click="requestApi"
          :loading="isSubmit"
          loading-text="请求支付中"
          :class="{ 'disabled': !money || money === '0' }"
          >确认充值</van-button
        >
      </div>
    </div>
    <div class="role">
      <div class="role-title">充值规则：</div>
      <div class="rules_content">
        <p>1、充值金额：充值金额不低于100</p> 
        <p>2、充值渠道：支付宝、微信支付</p> 
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ListCellPay from "@/components/ListCellPay.vue";
import { getConfigKey } from "@/api/index";
import { payRequestApi, payRequestNoApi, getPayMoneyApi } from "@/api/recharge";
export default {
  name: "recharge",
  components: {
    ListCellPay,
  },
  data() {
    return {
      money: '',
      payList: {},
      payChannelList: [],
      level: 0,
      isRadio: false,
      loading: false,
      finished: false,
      accountData: {},
      total: 0,
      tabs: [],
      tabCurrent: 1,
      moreText: "点击更多",
      payType: "wechat",
      moneyList: [],
      //selectShow: false,
      //noSelectShow: false,
      moneyType: 0,
      online: "yes",
      moneySelect: "",
      channelSelect: "",
      payName: "",
      isSubmit: false,
      tips: "选择或填写充值的金额",
    };
  },
  computed: {},
  mounted() {
    this.confingData();
    this.getPayList();
  },
  methods: {
    handleTab(it) {
      this.tabCurrent = it.id;
    },
    handleCellClick(it, code) {
      if (this.online == "yes") {
        if (this.payType != code) {
          this.payName = this.payList[it].name;
          this.money = 0;
          this.moneySelect = "";
        }
      }
      this.moneyType = 0;
      //this.payType = payId;
      this.payType = code;
    },
    confingData() {
      getConfigKey({ key: "endPreheatcle" }).then((res) => {
        this.online = res.data.online;
        if (res.data.online == "yes") {
          this.isYuYe = false;
        }
      });
    },
    requestApi() {
      //if (this.payType == 4) {
      // if (this.payType == "bankpay") {
      //   this.$router.push("/kefu/recharge");
      //   return false;
      // }

      // if (
      //   this.moneySelect == undefined ||
      //   this.moneySelect == "" ||
      //   this.moneySelect <= 0
      // ) {
      //   this.$toast(this.tips);
      //   return false;
      // }

      if (this.online == "yes") {
        // let moneyLen = this.money.lastIndexOf("-");
        // if (moneyLen > 0) {
        //   let startMoney = this.money.substring(0, moneyLen);
        //   let endMoney = this.money.substring(moneyLen + 1);
        //   if (
        //     parseFloat(this.moneySelect) > parseFloat(endMoney) ||
        //     parseFloat(this.moneySelect) < parseFloat(startMoney)
        //   ) {
        //     this.$toast({
        //       message: "请填写 " + this.money + " 以内的金额的金额",
        //       className: "noticeError3",
        //     });
        //     return false;
        //   }
        // }

        console.log(this.channelSelect);
        this.isSubmit = true;
        payRequestApi({
          payID: this.payType,
          money: this.money,/// this.moneySelect,
          channelSelect: this.money // this.channelSelect,
        })
          .then((res) => {
            this.isSubmit = false;
            //console.log(res);
            if (res.pay_url && res.pay_url != undefined && res.pay_url != "") {
              window.location.href = res.pay_url;
            } else {
              this.$toast({
                message: res.msg,
                className: "noticeError6",
              });

              return false;
            }
          })
          .catch((e) => {
            this.isSubmit = false;
          });
      }
    },
    getPayList() {
      getPayMoneyApi().then((res) => {
        this.loading = false;

        if (res.code == 200) {
          this.payList = res.data.paylist;

          this.payChannelList = res.data.pay;
          console.log(this.payChannelList);

          if (res.data.paylist) {
            this.payName = res.data.paylist[0].name;
            //this.payType = res.data.paylist[0].id;
            this.payType = res.data.paylist[0].code;
          }

          if (typeof res.data.pay == "undefined") {
            this.tips = "暂无可用的充值通道";
          }

          // console.log(this.moneyList.length);
          // if (this.moneyList.length == 0) {
          //  this.selectShow = false;
          //  this.noSelectShow = true;
          // } else {
          //   this.selectShow = true;
          //  this.noSelectShow = false;
          // }
        } else {
          this.$toast.fail(res.msg);
        }
      });

      return false;
    },
    nameId(index) {
      return "money-" + index;
    },
    moneyOn(money) {
      //this.channelSelect = val;
      if (money.indexOf("-") != -1) {
        this.moneySelect = "";
        this.moneyType = 1;
        this.money = money;
      } else {
        this.moneySelect = money;
        this.moneyType = 0;
        this.money = money;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  // background: url('@/assets/photo/top2.webp') no-repeat top left;
  //background-color: #a9ae8a;
  // background-size: 100% 168px;
  background: #f2f3f3;

  .navbar {
    background: $bg_liner_color_touming;
    color: #000;
    ::v-deep .navbar-right {
      font-weight: normal;
      font-size: 14px;
    }
    ::v-deep .van-icon:before {
      background: #fff !important;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .part_1 {
    // height: halfSize(130px);
    height: 155px;
    // background: url("@/assets/photo/recharge_bg.png") no-repeat 85% 0%;
    background: linear-gradient(
      180deg,
      #f2f6d4 0%,
      rgba(255, 254, 252, 0) 100%
    );

    // border: 1px solid blue;
    .content-box {
      height: 111px;
      // margin-top: 44px;
      position: relative;
      top: 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding: 0 15px;
      background: url("@/assets/photo/recharge_bg.png") no-repeat 85% 0%;
      p {
        font-size: 16px;
        color: #6C6E6C;
      }
      p:nth-child(2) {
        font-size: 22px;
        color: #313231;
        font-weight: 600;
        margin-top: 10px;
      }
    }


    .amount_box {
      background: $bg_color;
      border-radius: 3px;
      height: halfSize(266px);
      padding: 15px 10px;
      .a_title {
        color: $font_color;
        font-size: 16px;
      }
      .a_text {
        color: $font_color7;
        line-height: 2;
      }
    }
  }
  .part_2 {
    // background: #fff;
    background: #FFFFFF6B;
    margin-top: -40px;

    padding: 16px;
    border-radius: 5px;
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;
    box-sizing: border-box;
    // padding-bottom: 50px;
    .mt_40 {
      margin-top: 40px;
    }
    .amount_box {
      font-size: 16px;
      .a_text {
        font-size: 15px;
        span {
          display: inline-block;
          width: 50%;
        }
        span:nth-child(2) {
          text-align: right;
        }
      }
    }
    .method_box {
      font-size: 18px;
      .m_title {
        font-size: 12px;
        // color: $font_color;
        color: #6C6E6C;
        // font-weight: 600;
        // padding-left: 10px;
      }
      .m_item {
        // margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 4px;
      }
      .m_item_box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 18px;
        width: 90%;
        margin: 0 auto;
      }
      .money-select {
        .money-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 18px;
          width: 100%;
          margin: 0 auto;
          > div {
            // background: #ebedf0;
            text-align: center;
            //line-height: 50px;
            padding: 12px 0;
            border-radius: 5px;
            font-size: 18px;
            font-weight: 500;
            border: 1px solid #ededf1;
          }
          .between {
            padding: 12px 0;
          }
          .money-on {
            //background: url('@/assets/img/selected2.png');
            //background-size: 100% 100%;
            color: #b0be6b;
            border: 2px solid #b0be6b;
          }
        }
      }
      ::v-deep .van-cell {
        margin-top: 24px;
        font-size: 14px;
        // border: 1px solid #e0e1e5;
        border-radius: 3px;
      }
      ::v-deep .van-field__label {
        width: 16px;
        font-weight: 600;
      }
    }
    .btns {
      margin-top: 40px;
      align-items: center;
      .van-button {
        border-radius: 20px;
        color: #FFFFFF;
        font-size: 15px;
        width: 95%;
        margin: 0 auto;
        // margin-top: ;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
        background: #4B594A;
        border: none;

        &.disabled {
          background: #CCCCCC;
          border: none;
          color: #FFFFFF;
          cursor: not-allowed;
          pointer-events: none;
        }
      }
      .mb_20 {
        background: linear-gradient(
          180deg,
          #e9e9e9 0%,
          #dddddd 100%
        ) !important;
      }
    }
  }
}
::v-deep .amount_box {
  .van-cell {
    font-size: 16px;
    padding: 0;
    background-color: transparent;
    border-bottom: 1px solid $border_color_g;
  }
  .van-field__body {
    height: halfSize(60px);
  }
  .van-field__label {
    width: 20px;
    color: #ac2023;
    font-size: 16px;
    font-weight: bold;
    margin: 8px 8px 8px 0;
  }

  input.van-field__control {
    color: #ac2023;
    height: 100%;
    font-size: 24px;
  }
}
::v-deep input::placeholder {
  color: #a5a6ab;
  font-weight: 400;
  font-size: 14px;
}
::v-deep input.van-field__control {
  font-weight: 600;
}
::v-deep .btns {
}
.role {
  padding: 28px 24px;
  margin-bottom: 20px;
  color: #6C6E6C;
  font-size: 14px;
  line-height: 24px;
  .role-title {
    margin: 5px 0;
    font-size: 14px;
  }
  .rules_content {
    font-size: 14px;
  }
}
</style>
