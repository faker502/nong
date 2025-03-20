<template>
  <div class="test-page">
    <div class="top">
      <div class="top-head">
        
      <nav-bar title="收款账户" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>		
		
      </div>
    </div>
    <div class="page1">
      <van-cell-group class="peration-item" v-if="list.length == 0" style="padding-top: 20px;">
        <template>
          <img :src="require('@/assets/img/no-record.png')" width="50%">
        </template>
        <div style="margin-top:30px;font-size:16px;color: #BDC3CD;">暂无任何收款方式</div>
		<div style="margin-top:40px;font-size:16px;">
			<van-button @click="$router.push('/card/bind')" type="info">添加收款方式</van-button>
		</div>
      </van-cell-group>
	  
	  

      <van-cell-group inset class="peration-item" style="padding-top: 20px" v-else>

        <van-cell class="van-content-cell" is-link v-for="(item, key) in list" :key="key" @click="tolink(item.type)">
          <template #title>
            <div class="custom-title">{{ item.type == 1 ? '支付宝账户' : item.bankName }}
			<span>{{ item.name }}</span>
			</div>
            <div class="custom-account">{{ item.number }}</div>
          </template>
          <template #icon>
            <!-- <van-icon class="custom-icon" name="alipay" size="2em" color="#0F6FD6"  /> -->
            <svg-icon iconClass="alipay" v-if="item.type == 1" :size="40" style="padding-top: 6px;"/>
            <svg-icon iconClass="unionPay" v-else-if="item.type == 2" :size="40" style="padding-top: 6px;"/>
            <svg-icon iconClass="address" v-else :size="40" style="padding-top: 6px;"/>
          </template>
          <template #right-icon>
            <van-icon class="custom-right" name="arrow" size="18px" color="#BFBFBF" />
          </template>
		  
        </van-cell>
		
		<div style="margin-top:40px;font-size:16px;" v-if="isAdd">
			<van-button @click="$router.push('/card/bind')" type="info">添加收款方式</van-button>
		</div>

      </van-cell-group>
	  
	  <div class="btns df_r">
	      <div class="" style="font-size:18px;color:red;" @click="$router.push('/online')">在线客服</div>
	  </div>

      <!-- #icon-unionPay -->
<!--      <div class="button-row" v-if="isAdd">
        <div class="button" @click="$router.push('/card/bind')">
          <van-icon name="add-o" />
          <span>添加收款方式</span>
        </div>
      </div> -->
	  
	  
	  
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
      isAdd: false
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
        this.$router.push('/card/bindAlipay');
      } else if (item == 2) { 
        this.$router.push('/card/bindBankcard');
      } else {
		 this.$router.push('/set/address'); 
	  }
    },
    loginOut() {
      this.FrontLogOut();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .van-cell{
  //background: #F4F4F4;
  border-radius: 6px;
  margin-top: 10px;
}
::v-deep .van-icon{
  font-size: 24px;
  vertical-align: middle;
  padding-right: 8px;
}
.test-page {
	.btns {
	  width: 80%;
	  margin: 40px auto 40px auto;
	  justify-content: space-around;
	  .btn {
	    color: $font_color_white !important;
	  }
	}
  .top {
    position: relative;
    width: 100%;
    height: 168px;
    left: 0;
    top: 0px;
    background-image: url('@/assets/photo/top2.webp');
	//background-color: #a9ae8a;
    background-size: 100% 100%;
    .top-head {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      background-size: 100% 100%;
      filter: drop-shadow(0px 4px 12px rgba(10, 74, 118, 0.16));
      display: inline-block;
      vertical-align: middle;
      text-align: center;

      .nav-page-title {
        font-family: GB5WB1B, serif;
        letter-spacing: 2px;
        font-size: 20px;
        font-weight: 600;
        padding-left: 10px;
      }

      .top-head-1 {
        width: 60%;
        display: inline-block;
        vertical-align: middle;
        padding-left: 20px;
        box-sizing: border-box;

        span {
          vertical-align: middle;
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
  }

  .page1 {
    width: 95%;
    margin: 20px auto 20px auto;
	margin-top: -85px;
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
	border-radius: 4px;
	.van-button--info {
		width: 96%; 
		//background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
		height: 46px; font-size: 16px; color:#fff; border-radius: 5px;
		font-weight: 500;
		//border:none !important;
		
		    color: #A7AF78 !important;
			border: 1.5px solid #AAB086;
			background: rgba(157, 164, 112, 0.12);
	}
    // padding-bottom: 60px;
    .van-content-cell {
      .img-icon {
        width: 50px;
        line-height: 55px;
      }

      img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
      }

      .van-cell__title {
        line-height: 55px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 6px;
        padding-left: 20px;
        font-size: 18px;
        text-align: left;
      }

      .custom-title {
        font-size: 17px;
        line-height: 25px;
		span {color:#626571;font-size: 12px;padding-left: 10px;}
      }
      .custom-account {
        font-size: 16px;
        line-height: 25px;
        color: #9AA1B1;
      }
      .custom-icon,
      .custom-right {
        line-height: 55px;
      }
    }
    .peration-item{
      text-align:center;
    }
    .button-row{
      position: fixed;
      width: 100%;
      bottom: 30px;
      .button{
        width: 80%;
        margin: 0 auto;
        //background: rgba(172, 32, 35, 0.06);
        //border: 1px solid #AC2023;
        border-radius: 24px;
        //color: #AC2023;
        font-size: 18px;
        padding: 15px 0;
        font-weight: 600;
        text-align: center;
		
		    color: #A7AF78 !important;
			border: 1.5px solid #AAB086;
			background: rgba(157, 164, 112, 0.12);
      }
    }
  }
}</style>