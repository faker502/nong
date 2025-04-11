<template>
  <div class="test-page">
    <nav-bar title="收款账号" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
    <div class="part_2"></div>
    <div class="wrap">
      <div class="empty-state" v-if="list.length == 0">
        <div class="empty-icon">
          <img :src="require('@/assets/img/no-record_card.png')" alt="暂无记录">
        </div>
        <!-- <p class="empty-text">暂无任何收款方式</p> -->
        <van-button @click="$router.push('/card/bind')">添加收款账号</van-button>
      </div>

      <div class="card-list" v-else>
        <div class="card-item" v-for="(item, key) in list" :key="key" :class="{'bank-bg': item.type != 1}"> <!--@click="tolink(item.type)"-->
          <div class="card-info">
            <div class="card-icon">
              <svg-icon iconClass="alipay" v-if="item.type == 1" :size="28"/>
              <svg-icon iconClass="unionPay" v-else-if="item.type == 2" :size="28"/>
              <svg-icon iconClass="address" v-else :size="28"/>
            </div>
            <!-- <div class="card-title">
              {{ item.type == 1 ? '支付宝' : item.bankName }}
              <div v-if="item.type == 2" class="bank-branch">{{ getBankBranch(item) }}</div>
            </div> -->
            <div class="card-name">{{ item.name }}</div>
            <div class="card-number">{{ formatCardNumber(item.number, item.type) }}</div>
          </div>
          <div class="edit-btn">
            <h6>{{ item.type == 1 ? '支付宝' : item.bankName }}</h6>
            <p v-if="item.type == 2" class="bank-branch">{{ getBankBranch(item) }}</p>
            <!-- 编辑 <van-icon name="arrow" /> -->
          </div>
        </div>

        <van-button v-if="isAdd" @click="$router.push('/card/bind')">添加收款账号</van-button>
      </div>
    </div>

    <div class="customer-service" @click="$router.push('/kefu')">
      <p class="service-text">
        账号遇到问题？
        <span class="highlight">人工客服</span>
        解决
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getUserApi, bankListApi } from "@/api/member";
export default {
  name: 'projectList',
  components: {},
  data() {
    return {
      list: [],
      isAlipay: 'yes',
      isBank: 'yes',
      isAdd: false,
      tabs: [
        { title: "银行卡", id: 1, icon: 'bankpay' },
        { title: "支付宝", id: 0, icon: 'alipay' }
      ],
      form: {
        bankNumber: "",
        bankUserName: "",
        bankName: "",
        type: 1
      },
      tabCurrent: 1,
      submit: true,
      isSubmit: true,
      activeIndex: 1
    };
  },
  created() {
    this.getUserInfo();
    this.getBankList();
  },
  methods: {
    ...mapActions(["FrontLogOut"]),
    getUserInfo() {
      getUserApi().then((res) => {
        if (res.data.isReal != 1) { 
          this.$myMsg.notify({content:'请先完成实名认证！', type:'message',  noNotifyBtn: false, time: 1000 });
        }
      });
    },
    getBankList() { 
      bankListApi().then((res) => {
        this.list = res.data.bank;
        this.isAlipay = res.data.isAlipay;
        this.isBank = res.data.isBank;
        if (this.isAlipay == 'no' || this.isBank == 'no') { 
          this.isAdd = true;
        }
      });
    },
    tolink(item) {
      if (item == 1) {
        this.$router.push('/card/bindBankcard');
      } else if (item == 2) { 
        this.$router.push('/card/bindBankcard');
      } else {
		 this.$router.push('/set/address'); 
	  }
    },
    loginOut() {
      this.FrontLogOut();
      this.$router.push("/login");
    },
    formatCardNumber(number, type) {
      if (type === 1) { // 支付宝
        return number.replace(/(\d{3})\d*(\d{3})/, '$1****$2');
      } else { // 银行卡
        return number.replace(/\d/g, '*').slice(0, -4) + number.slice(-4);
      }
    },
    getBankBranch(item) {
      return item.bankBranch || '重庆渝北分行'; // 如果没有分行信息则显示默认值
    }
  }
};
</script>

<style lang="scss" scoped>
.test-page {
  min-height: 100vh;
  background: #F8F8F8;

  ::v-deep .van-icon:before {
    background: #fff!important;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .part_2 {
    width: 100%;
    height: 165px;
    background: #FFFFFF;
    background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
  }

  .wrap {
    padding: 16px;
    background: #FFFFFF6B;
    margin: 0 12px;
    margin-top: -90px;
    border-radius: 8px;

    .empty-state {
      text-align: center;
      padding: 16px;

      .empty-icon {
        margin-bottom: 16px;
        img {
          width: 200px;
        }
      }

      .empty-text {
        font-size: 16px;
        color: #BDC3CD;
        margin-bottom: 32px;
      }

      .van-button {
        width: 100%;
        height: 44px;
        background: #4B594A;
        border: none;
        border-radius: 22px;
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .card-list {
      .card-item {
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        background: url('@/assets/photo/ali_bg.png') no-repeat center center;
        background-size: 100% 100%;
        &.bank-bg {
          background: url('@/assets/photo/bank_bg.png') no-repeat center center;
          background-size: 100% 100%;
        }
        
        // &:nth-child(1) {
        //   background: #C23B22;
        //   background-image: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        // }
        
        // &:nth-child(2) {
        //   background: #4B7BF9;
        //   background-image: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        // }

        .card-info {
          position: relative;
          z-index: 1;

          .card-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 16px;
            background: #FFFFFF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .card-title {
            font-size: 18px;
            color: #FFFFFF;
            font-weight: 500;
            margin-bottom: 4px;
          }

          .bank-branch {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
            margin-top: 4px;
          }

          .card-name {
            font-size: 18px;
            color: #FFFFFF;
            margin-bottom: 12px;
            font-weight: 500;
          }

          .card-number {
            font-size: 24px;
            color: #FFFFFF;
            font-family: monospace;
            font-weight: 500;
            letter-spacing: 2px;
          }
        }

        .edit-btn {
          position: absolute;
          height: 48px;
          top: 16px;
          // right: 24px;
          left: 75px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          display: flex;
          flex-direction: column;
          // align-items: center;
          justify-content: center;
          // border: 1px solid blue;
          font-size: 13px;
          h6 {
            font-size: 18px;
            font-weight: 500;
          }
          p {
            margin-top: 4px;
          }
          
          .van-icon {
            margin-left: 4px;
            font-size: 12px;
          }
        }

        &::after {
          content: '';
          position: absolute;
          right: -40px;
          bottom: -40px;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }
      }

      .van-button {
        width: 100%;
        height: 44px;
        margin-top: 32px;
        background: #4B594A;
        border: none;
        border-radius: 22px;
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 500;

        &:active {
          opacity: 0.9;
        }
      }
    }
  }

  .customer-service {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 16px;
    text-align: center;
    
    .service-text {
      font-size: 16px;
      color: #313231;
      line-height: 1.5;
      margin: 0;
      font-weight: 500;
      
      .highlight {
        color: #7E963C;
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }
  }

  .data_tabs {
    height: 44px;
    background: #FFFFFF6B;
    border: 1px solid #FFFFFF;
    border-radius: 22px;
    margin: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .data_tab {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4B594A;
      font-size: 14px;
      cursor: pointer;

      svg {
        margin-right: 4px;
      }
    }

    .tab_active {
      height: 36px;
      background: radial-gradient(202.91% 100% at 50% 0%, #7E963C 0%, #455117 100%);
      color: #fff;
      border-radius: 22px;

      svg {
        color: #fff;
      }
    }
  }
}
</style>