<template>
	
	
	
  <div class="page">
    <div class="part_1">
    <nav-bar title="转账" titleColor='#fff' leftIconColor="#fff" class="nav-top"  @handleRight="$router.push('/record_transfer')" right='转账记录'/>
    </div>
	
	
    <div class="page1">
      

      <div class="grid">
		  
		  <div class="transfer-button" v-show="online == 'yes'" :class="transferType == 'recharge' ? 'active' : ''" @click="selectType('recharge')">
		    <div>
		      <span style="vertical-align: middle;">充值余额</span>
		    </div>
		  </div>
		  
        <div class="transfer-button" v-show="showCash" :class="transferType == 'cash' ? 'active' : ''" @click="selectType('cash')">
          <div>
            <span style="vertical-align: middle;">现金余额</span>
          </div>
          <div></div>
        </div>
        
      </div>
	  
	  <div class="transfer-money-can" v-if="transferType == 'cash'">
	    <div class="can-1">
	      <span>现金余额：</span>
	      <span>{{ info.user.balance }}</span>
	    </div>
	  </div>
	  <div class="transfer-money-can" v-else>
	    <div class="can-1">
	      <span>充值余额：</span>
	      <span>{{ info.user.rechargeOver }}</span>
	    </div>
	  </div>
	  
	  <div class="transfer-head">
	  		<div  style="margin-top: 15px;">转入账号</div>
			<div class="transfer-input">
				<van-field v-model="form.phone" maxlength="11" left-icon="phone-o" placeholder="请输入对方手机号" autosize autocomplete="off"  @input="getInputValue"></van-field>
			</div>
			<div style="margin-top: 15px;">姓名</div>	    
			<div class="transfer-input" >
				<van-field v-model="transferName" left-icon="user-o" placeholder="对方姓名" autosize autocomplete="off" readonly></van-field>
			</div>	  
			  
			<div style="margin-top: 15px;">转账金额</div>  
			<div class="transfer-input" >
			  <van-field v-model="form.money" left-icon="info-o" placeholder="请输入转账金额" autosize autocomplete="off" :border="false" @blur="changeMoney">
			  </van-field>
			
			</div>
			
			<div style="margin-top: 15px;">转账备注</div> 
			<div class="transfer-input" >		
			  <van-field v-model="form.remark" left-icon="more-o" placeholder="选填: 转账备注" autosize autocomplete="off" :border="false"></van-field>
			</div>
			  
	  </div>
	  
      <div class="transfer-to">
        
        
      </div>
	  
	  <van-form ref="pwdForm" class="mt15 passwdForm" @submit="submitPwd" v-show="showPayPwd">
	      <van-cell-group inset>
	        <van-password-input
	           height="90%"
	          :value="form.payPwd"
	          :focused="showKeyboard"
	          :length="6"
	          :gutter="10"
	          @focus="showKeyboard = true"
	          @blur="submitPwd"
	        />
	      </van-cell-group>
	      <van-number-keyboard
	        v-model="form.payPwd"
	        :show="showKeyboard"
	        @blur="showKeyboard = false"
	      />
	  </van-form>
	  
      <div class="bottom-button">
        <!-- <div class="button" @click="onSubmit" v-if="isSubmit">转账</div> -->
        <div class="button" @click="submitPwd" v-if="isSubmit">转账</div>
        <div class="button" v-else>转账中...</div>
      </div>
    </div>


  </div>
</template>
<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
import { getAccountApi, zhuanzhangApi,getByPhone } from "@/api/member";
export default {
  name: 'projectList',
  components: {},
  data() {
    return {
      transferType: 'recharge',
	  online: 'yes',
	  showCash:false,
      info: {
        user: [],
        account:[]
      },
      form: {
        moneyType: 'recharge',
        phone: undefined,
        payPwd: undefined,
        money: undefined,
        remark: undefined
      },
      showPayPwd: false,
      showKeyboard: true,
      payPwd: undefined,
      isSubmit: true,
	  transferName: ''
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["FrontLogOut"]),
    getUserInfo() {
      getAccountApi({phone:this.form.phone}).then((res) => {
        this.info = res.data;
		if (res.data.account.transBalance == 2) {
			this.showCash = true;
		}
      });
    },
	
	getInputValue() {
	  if (this.form.phone.length == 11) {
	    this.getBYPhone();
	  } else if (this.form.phone.length > 11) {
		Toast('请输入11位手机号');	    
	  }
	},
	
	getBYPhone() {
	  getByPhone({phone:this.form.phone}).then((res) => {
		  if (res.code != 200) {
			  this.transferName = '';
			Toast(res.msg);
		  }	else {
			  this.transferName = res.data.name;
		  }
		});  
	},
	
    selectType(type) { 
      this.transferType = this.form.moneyType = type;
    },
    onSubmit() { 
      let canSubmit = this.changeMoney();
      if (canSubmit == false) {
        return false;
      } else {
        this.showPayPwd = true;
        this.showKeyboard = true;
      }
    },
    changeMoney() { 
      if (this.form.money == undefined || this.form.money < 1) {
        Toast('转账金额不能小于1元');
        return false;
      }
      if (this.transferType == 'cash') {
		  if (parseFloat(this.info.user.balance) < 1) {
		  	Toast('现金金额余额不足!');
			return false;
         } else if (this.form.money > parseFloat(this.info.user.balance)) { 
          Toast("最高转账现金金额：\n"+this.info.user.balance);
          return false;
        }
      } else if (this.transferType == 'recharge') { 
		if (parseFloat(this.info.user.rechargeOver) < 1) {
			Toast('充值余额不足!');
			return false;
		} else if (this.form.money > parseFloat(this.info.user.rechargeOver)) {
          Toast("最高转账充值余额：\n"+ this.info.user.rechargeOver);
          return false;
        }
      }
      return true;
    },
    submitPwd() {
	  if (this.transferName == '') {
		  Toast('请输入正确的对方手机号');
		  return false;
	  }	
      let canSubmit = this.changeMoney();
       if (canSubmit == false) {
        return false;
      } else {
		this.showPayPwd = true;
		this.showKeyboard = true;  
        if (this.form.payPwd == undefined) {
          Toast('请输入6位支付密码');
          return false;
        }
        if (this.form.payPwd.length == 6) {
          zhuanzhangApi(this.form).then((res) => {
            console.log(res);
			if (res.code == 200) {
              // this.$toast({
              //   type: "success",
              //   message: res.msg,
              //   className: "toast-scuess",
              // });
			  this.$dialog({ message: res.msg, className: 'dialog-success' });
			  this.getUserInfo();
			  this.form = {
			    moneyType: 'recharge',
			    phone: '',
			    payPwd: '',
			    money: '',
			    remark: ''
			  };	  
            } else { 			
              Toast(res.msg);
            }
          });
        } else {	
          this.$toast.fail("请输入6位支付密码");
        }
      }
    },
    tolink(item) {

    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
    width: 100%;
    background: url('@/assets/photo/top2.webp') no-repeat top left;
    //background-color: #a9ae8a;
    background-size: 100% 168px;
	  

	  .part_1 {
	    
	    height: halfSize(130px);
	    .amount_box {
	      background: $bg_color;
	      border-radius: 7px;
	      height: halfSize(266px);
	      box-shadow: 0px 1px 3px #00000029;
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
	    background: #ffffff;
	    padding: 30px 15px;
	    border-radius: 20px;
	    .mt_40{
	      margin-top: 40px;
	    }
	    .amount_box{
	      font-size:18px;
	      .a_text {
	        font-size: 15px;
	        span{
	          display: inline-block;
	          width: 50%;
	        } 
	        span:nth-child(2){
	          text-align: right;
	        }
	      }
	    }
	    .method_box {
	      font-size: 18px;
	      .m_title {
	        font-size: 17px;
	        color: $font_color;
	        // font-weight: 600;
	        padding-left: 10px;
	      }
	      .m_item {
	        margin-top: 20px;
	        display: grid;
	        grid-template-columns: repeat(3, 1fr);
	        grid-gap: 4px;
	      }
	      .m_item_box{
	        display: grid;
	        grid-template-columns: repeat(3,1fr);
	        grid-gap: 18px;
	        width: 90%;
	        margin: 0 auto;
	      }
	      .money-select{
	        .money-grid{
	          display: grid;
	          grid-template-columns: repeat(3,1fr);
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
	            border: 1px solid #EDEDF1;
	          }
	          .between{
	            padding: 12px 0;
	          }
	          .money-on{
	            background: url('@/assets/img/selected.png');
	            background-size: 100% 100%;
	            color: #AC2023;
	            border:none;
	          }
	        }
	      }
	      ::v-deep .van-cell{
	        margin-top: 20px;
	        font-size: 18px;
	        border-bottom: 1px solid #E0E1E5;
	      }
	      ::v-deep .van-field__label{
	        width: 16px;
	        font-weight: 600;
	      }
	    }
	    .btns {
	      margin-top: 50px;
	      align-items: center;
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
	    color: #AC2023;
	    font-size: 16px;
	    font-weight: bold;
	    margin: 8px 8px 8px 0;
	  }
	
	  input.van-field__control {
	    color: #AC2023;
	    height: 100%;
	    font-size: 18px;
	  }
	}
	  ::v-deep input.van-field__control::-webkit-input-placeholder {
	    color: #7C7C7C !important;
	    font-size: 18px;
	    //font-weight: 600;
	  }
	::v-deep .btns {
	  .van-button {
	    width: halfSize(496px);
	    height: 45px;
	    padding: 0;
	    border: none;
	    border-radius: 20px;
	    font-size: 15px;
	  }
	}	
	
.page {
  .top {
    position: relative;
    width: 100%;
    height: 90px;
    left: 0;
    top: 0px;
    background: #FFFFFF;
    background: linear-gradient(to bottom, #ffffff, #C1D7F2);

    .top-head {
      position: absolute;
      width: 100%;
      height: 60px;
      left: 0;
      top: 16px;
      background-size: 100% 100%;
      filter: drop-shadow(0px 4px 12px rgba(10, 74, 118, 0.16));
      display: inline-block;
      vertical-align: middle;
      text-align: center;

      .nav-page-title {
        font-family: GB5WB1B, serif;
        letter-spacing: 4px;
        font-size: 22px;
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
    width: 96%;
    margin: 0 auto;
    background-color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    padding-bottom: 300px;
    .transfer-head{
      margin-top: 0;
	  font-size: 15px;
	  text-align: left;
	  padding: 10px 30px;
	  padding-top: 0;
	  .transfer-input{
	    width: 100%;
	    font-size: 16px;
		margin-top: 10px;
	    .remark-1{
	      margin-bottom: 20px;
	    }
	    .remark{
	      margin: 20px auto;
	    }
	    .van-cell{
	      border: 1px solid #F8EBE6;
	  	border-radius: 4px;
	    }
	  }
      div {
        text-align: center;
        color: #151E29;
        font-size: 15px;
		text-align: left;
		line-height: 200%;
      }

    }
    .grid{
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.48rem;
      padding: 0px 20px;
      .transfer-button {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          font-size: 16px;
          font-weight: 600;
          color:#fff;
		      background: linear-gradient(rgb(219 221 210) 0%, rgb(210 214 187) 100%);
          border-radius: 5px;
          div{
            display: inline-block;
          }
		  span {font-size: 15px;font-weight: 400;}
      }
      .active{
		    background: linear-gradient(rgb(192, 199, 158) 0%, rgb(192, 199, 158) 100%);
		span {font-size: 15px;font-weight: 600;}
		}
    }
	
	.transfer-money-can{
	  padding: 30px 0 10px 0;
	  width: 85%;
	  margin: 0 auto;
	  span{
	    display: inline-block;
	    width: 50%;			
	  }
	  span:nth-child(1){
	    font-size: 14px;
	  }
	  span:nth-child(2){
	    text-align: right;
		font-size: 16px;
		color:#D11A2D;
		font-weight: 600;
	  }
	  .can-2{
	    padding: 20px 0;
	  }
	}
	
    .transfer-to{
        width: 85%;
        padding: 0;
        font-size: 18px;
        margin: 0 auto;
        box-sizing: border-box;
        div {
			line-height: 200%;
		}
        .transfer-input{
          width: 100%;
          font-size: 16px;
          .remark-1{
            margin-bottom: 20px;
          }
          .remark{
            margin: 20px auto;
          }
          .van-cell{
            border: 1px solid #F8EBE6;
			border-radius: 4px;
          }
        }
    }
    ::v-deep .van-field__label{
      width: 15px;
      color: #585858;
    }
    ::v-deep .van-field__control {
      font-size: 14px;
      color: #585858;

    }
    ::v-deep .van-field__control::-webkit-input-placeholder {
      font-size: 14px;
    }
    .bottom-button{
      width: 100%;
      position: relative;
      .button{
          width: 85%;
          padding:12px;
          text-align: center;
          margin: 15px auto;
          letter-spacing: 2px;
          background: linear-gradient(180deg, #c0c79e 0%, #a2ab76 100%);
          border-radius: 5px;
          font-size: 16px;
          color: #fff;
      }
    }
  }
  ::v-deep .passwdForm{
    position: relative;
    width: 100%;
    z-index: 2000;   
    background-color: #ffffff;
    padding-top: 16px;
  }
  .van-password-input__security li {
    height: 95%;
    background-color: #F2F3F5;
    border-radius: 5px;
  }
  .van-button--round{
    padding: 20px 0;
    border-radius: 10px;
  }
}
</style>
<style>
	.navbar-right {
		font-size: 15px !important;
	}
</style>