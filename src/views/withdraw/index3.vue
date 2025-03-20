<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="提现" titleColor='#fff' leftIconColor="#fff" class="nav-top" :isLeftFn="true" @handleBack="$router.push('/my')" />
	  
	  
      <div class="info_box">
        
		
		<div class="tabs data_tabs2 df_r">
				
			<div class="data_tab2 " @click="$router.push('/withdraw')">
			    现金余额
			</div>
			<div class="data_tab2 tab_active2" >
			    专项基金
			</div>
		 
		</div>
		
		
		<div class="detail-1" @click="$router.push('/withdraw2')" v-show="isYuShen">
		  <div class="detail-2">
			  <div class="flex-item">
				  <img src="@/assets/photo/qb.png" style="width:44px;">
			  </div>
			  <div class="flex-item" >
				  <p class="text">预审余额:</p>
				  <p class="gold">{{ fund2 }}</p>
			  </div>
			  <div class="flex-item">
<!-- 				  <div class="v-btn">		  		  		    
				  <van-button style="margin-left: 15px;" @click="$router.push({ path: '/record_wthdraw' });" type="default">记录</van-button>
				  </div> -->
			  </div>
		    </div>
		</div>
		
		
		<div class="detail-1" style="border: 1px #999 dashed;">
				  <div class="detail-2">
					  <div class="flex-item">
						  <img src="@/assets/photo/qb.png" style="width:44px;">
					  </div>
					  <div class="flex-item" >
						  <p class="text">余额:</p>
						  <p class="gold">{{ fund }}</p>
					  </div>
					  <div class="flex-item">
		<!-- 				  <div class="v-btn">		  		  		    
						  <van-button style="margin-left: 15px;" @click="$router.push({ path: '/record_wthdraw' });" type="default">记录</van-button>
						  </div> -->
					  </div>
				    </div>
				</div>
		
		
      </div>
	  
	  

	  
	  
    </div>
    <div class="part_2">
      <van-form ref="form" class="pt10 tx-form">
        <div class="tx-form-param">
          <div class="title">提现金额</div>
          <div class="input" style="border-bottom:1px solid #F8EBE6; margin-bottom:10px;">
            <van-field v-model="money" type="number" autocomplete="off"
              placeholder="¥ 请输入提现金额" :border="false" >
            </van-field>  
            <div class="all-button"><span @click="all">全部</span></div>
          </div>
		  
		  <div class="title" style="margin-bottom: 0;padding-top:10px">到账金额</div>
          <div class="tx-form-box" style="border-bottom:1px solid #F8EBE6;">
            <span>{{ realMoney }}</span>
          </div>
		  
          <div v-if="selectBank.number != undefined">
            <van-cell-group class="withdraw-account">
              <van-cell title="提现到账户" size="large" title-class="cell-title" style="font-weight: 500;"/>
            </van-cell-group>
            <van-cell-group inset class="peration-item" style="width: 100%;" @click="handleShowBindCard">
              <van-cell>
                <template #title>
                  <div class="custom-title">{{ selectBank.type == 1 ? '支付宝' : selectBank.bankName}}</div>
                  <div class="custom-account">{{ selectBank.number}}</div>
                </template>
                <template #icon>
                  <!-- <van-icon class="custom-icon" name="alipay" size="2em" color="#0F6FD6"  /> -->
                  <svg-icon :iconClass="selectBank.type == 1 ? 'alipay' : 'unionPay'" :size="48"/>
                </template>
<!--                <template #right-icon>
                  <van-icon class="custom-right" name="arrow-down" size="18px" color="#BFBFBF" style="line-height: 40px;"/>
                </template> -->
              </van-cell>
            </van-cell-group>
          </div>
		  
		  
          <div class="pay-password">
            <div class="title">支付密码</div>
            <div>
              <van-cell-group style="height: 50px;margin-top: 14px;">
                <van-password-input height="90%" :value="form.payPwd" :focused="showKeyboard" :length="6" :gutter="10"
                  @focus="showKeyboard = true" @blur="handleWithdraw" />
              </van-cell-group>
              <van-number-keyboard v-model="form.payPwd" :show="showKeyboard" @blur="showKeyboard = false" />
            </div>
          </div>
        </div>
      </van-form>
      <div class="tx-button">
        <div class="button" @click="handleWithdraw" v-if="isSubmit">立即提现</div>
        <div class="button" v-else>提现中...</div>
      </div>
      <div class="role">
        <div class="role-title">注意事项：</div>
        <div class="rules_content">
			<p>1. 提现时间：{{ txStartTime }}{{ txEndTime }}；</p>
			<p>2. 提现金额：满{{ miniTx }}元；</p>
			<p>3. 到账时间：24小时之内到账；</p>
			<p>4. 提现渠道：{{txAlipayMax}}及以下到账支付宝，以上到银行卡；</p>
			<p>5. 提现手续费：{{ txFee }}%</p>
			
<!--          <p>1. 提现时间：{{ txStartTime }}-{{ txEndTime }}；</p>
          <p>2. 提现金额：满{{ miniTx }}元可提现；</p>
          <p>3. 提现费用：每笔{{ txFee }}%的手续费；</p>
          <p>4. 提现渠道：{{txAlipayMax}}以下提现到支付宝，以上到银行卡。</p> -->
		  
        </div>
      </div>
    </div>
    <van-popup v-model="showBindAccount" class="banklist" closeable position="bottom" :style="{ height: '30%' }">
      <div class="title">收款方式</div>
      <div class="list">
        <div class="list_item df_r" v-for="(it, key) in list" :key="it.id" :class="current === it.type ? 'active-type' : ''">
          <div class="left df_r">
            <svg-icon iconClass="alipay" size="40" v-if="it.type == 1"/>
            <svg-icon iconClass="unionPay" size="45" v-else/>
            <span class="ml_10">
              <p> {{ it.type == 1 ? '支付宝账户' : it.bankName}}</p>
              <p>{{ it.number }}{{ it.type }}</p>
            </span>
          </div>
          <div class="right" v-if="current === it.type">
            <svg-icon iconClass="radio_w" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { bankListApi, withdrawalApi, getAccountApi } from "@/api/member";
import { getConfigPay } from "@/api/index";
import { Toast } from "vant";

export default {
  name: "Withdraw",
  data() {
    return {
		isYuShen:1,
      form: {
        money: 0,
        payPwd: "",
      },
      isSubmit: true,
      list: {},
      balance: 0,
      money: '',
      realMoney: 0,
      current: 0,
      showBindAccount: false,
      showKeyboard: false,
      payPwd: undefined,
      loading: false,
      payPassword: '',
      txFee: '',
      miniTx: '',
      txFeeBi: 0,
      txStartTime: '',
      txEndTime: '',
      txAlipayMax: '',
      selectBank: [],
	  fund:'',
	  fund2:'',
    };
  },
  watch: {
    money: {
      handler() {
        if (this.money) {		
          let money = parseFloat(this.money);
          if (money >= this.miniTx) {
            this.form.money = money;
            this.realMoney = parseFloat(money * (1 - this.txFeeBi)).toFixed(2);
            if (parseFloat(this.realMoney) > parseFloat(this.txAlipayMax).toFixed(2)) {     
              //2 银行
              this.selectBank = this.list[2];
              this.current = 2;
			  console.log('bank:'+this.realMoney + '>' + parseFloat(this.txAlipayMax).toFixed(2))
            } else {
              //1 支付宝
              this.selectBank = this.list[1];
              this.current = 1;
			  console.log('alipay:'+this.realMoney + '<' + parseFloat(this.txAlipayMax).toFixed(2))
             
            }
          } else { 
            this.realMoney = 0;
          }
          this.form.money = money;
        } else { 
          this.realMoney = 0;
          this.form.money = 0;
        }
      }
    },
  },
  created() {
    this.getBankList();
    this.account();
    this.getConfigPay();
  },
  methods: {
    account() {
      let ok = false;
      getAccountApi().then((res) => {
        this.balance = res.data.account.balance;
        this.fund = res.data.account.fund;
        this.fund2 = res.data.account.fund2;
        this.payConfig = res.data.payConfig;
        this.payPassword = res.data.user.payPassword;
		
		this.isYuShen = res.data.account.isYuShen;
		
        if (res.data.user.payPassword == '' || res.data.user.payPassword == null) {
          this.$dialog({ message: '您还未设置支付密码！', className: 'dialog-error' }).then(() => {
            this.$router.push('/set/set_pwd');
          }).catch(() => {
            console.log('点击了取消')
          });
          return false;
        }
        
        ok = true;
      });

      if (ok == true) { 
        this.getBankList();
      }
    },
    getConfigPay() { 
      getConfigPay().then((res) => { 
        this.payConfig = res.data;
        let txFee = res.data.txFee;
        this.txFee = parseFloat(txFee).toFixed(0);
        this.miniTx = res.data.miniTx;
        let feeLv = this.txFee / 100;
        this.txFeeBi = parseFloat(feeLv);
        this.txStartTime = res.data.txStartTime;
        this.txEndTime = res.data.txEndTime;
        this.txAlipayMax = res.data.txAlipayMax;
        console.log(this.txFeeBi);
      });
    },
    getBankList() { 
      bankListApi().then((res) => {    
            //this.list = res.data.data;
            this.list = res.data.bank;
			//console.log('this.list:'+JSON.stringify(this.list))
          if (res.data.isAlipay == 'no') {
            this.$dialog({ message: '您还未绑定支付宝账户！', className: 'dialog-error' }).then(() => {
              this.$router.push('/card/bindAlipay');
            }).catch(() => {
              console.log('点击了取消')
            });
            return false;
          }
          if (res.data.isBank == 'no') {
            this.$dialog({ message: '您还未绑定银行卡账户！', className: 'dialog-error' }).then(() => {
              this.$router.push('/card/bindBankcard');
            }).catch(() => {
              console.log('点击了取消')
            });
            return false;
          }
        });
    },
    handleShowBindCard() {
      if (this.list.length <= 0) return;
      this.showBindAccount = true;
    },
    all() { 
      this.money = this.fund;
    },
    /**提现 */
    async handleWithdraw() {
      this.loading = true;
      console.log(this.form.money);
	  this.money = parseFloat(this.money).toFixed(2);
	  this.miniTx = parseFloat(this.miniTx).toFixed(2);
      if (parseFloat(this.money) < parseFloat(this.miniTx)) {
		console.log(this.money+'<'+this.miniTx)
        //this.$dialog({ message: '最低提现金额为'+this.miniTx+'元', className: 'dialog-error' })
		Toast('最低提现金额为'+this.miniTx+'元');
        return false;
      }
      if (this.form.money == undefined || this.form.money <= 0) {
		Toast('请输入提现金额');  
        //this.$dialog({ message: '请输入提现金额', className: 'dialog-error' })
        return false;
      } else if (this.form.money < this.miniTx) { 
		Toast('最低提现金额为'+this.miniTx+'元');   
        //this.$dialog({ message: '最低提现金额为'+this.miniTx+'元', className: 'dialog-error' })
        return false;
      }
      if (this.form.payPwd.length != 6) { 
		  Toast('请输入6位支付密码');  
        //this.$dialog({ message: '请输入6位支付密码', className: 'dialog-error' })
        return false;
      } 

      
      this.isSubmit = false;
      withdrawalApi({ money: this.money, payPassword: this.form.payPwd, type:'fund' }).then((res) => {
        this.isSubmit = true;
        this.loading = false;
        if (res.code == 200) {
          this.account();
		  this.money = '';
		  this.realMoney = 0;
		  this.form.payPwd = '';
          this.$myMsg.notify({ content: res.msg, type: 'customize',time:2000 });
        } else {
          //this.$dialog({ message: res.msg, className: 'dialog-error' })
		  Toast(res.msg);
          return false;
        }
        
        return false;
      }).catch((err) => {
          console.log(err);
          this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0 0;
}
.van-password-input{
  margin: 0;
}
.van-password-input__security{
  height: 45px;
}
.van-password-input__security li {
  height: 95%;
  // background-color: #F1F3F4;
  border-radius: 5px;
  border: 2px solid #F1F3F4;
}
::v-deep .van-cell{
  font-size:16px;
  padding:13px;
  font-weight: 600;
  color:#A5A6AB;
}
.withdraw-account{
  .van-cell{
    border-bottom: none;
    color: #4D4D4D;
	padding-left: 0;
    font-size: 18px;
    .van-cell__title{
      font-size: 14px;
    }
  }
}
::v-deep .van-field__label{
  color:#999999;
  display: inline-block;
  margin-right: 0;
}
::v-deep .van-field__value{
  display: inline-block;
}
::v-deep .van-field__control{
  color: #3F3D38;
}
::v-deep input::placeholder{
  color: #A5A6AB;
  font-weight: 400;
}
::v-deep .van-overlay{
  //display: none;
  background: #9D9D9D;
  opacity: 0.5;
}
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  background: url('@/assets/photo/top2.webp') no-repeat top left;
//background-color: #a9ae8a;
  background-size: 100% 168px;
  
  
  .part_1 {
    //background: $bg_liner_color_red;
    height: auto;
    //background-image: url("@/assets/img/team-bg.png") ;
    background-size: 100% 100%;
    .info_box {
      position: relative;
      width: 95%;
      margin: 0 auto;
	  //background: #fff;
      // height: halfSize(182px);
      margin-top:80px;
      padding: 0px 0 20px;
      box-sizing: border-box;
      color: #666;
	      background-color: #fff;
      
	  
	  .data_tabs2 {
	    width: 100%;
	    overflow-y: visible;
	    box-sizing: border-box;
	    //background: #faeeec;
	    height: auto;
	    margin-top:0;			  
	  
	    position: relative;
	  		//border-bottom: #f00 1px solid;
	  		
	  		display: grid;
	  		grid-template-columns: 50% 50%;
	  		//flex-direction: row;
	  		//flex-wrap: nowrap;
	  		
	  		align-content: stretch;
	  		justify-content: space-evenly;
	  		//box-shadow: 4px 4px 8px 4px rgba(149, 33, 35, 0.02);
	  		
	  		.data_tab2 {
	  			display: flex;
	  			flex-direction: row;
	  			justify-content: center;
	  			align-items: center;
	  			text-align: center;
	  			font-size: 16px;
	  			background: #f0f0f0;
	  			color: #999;
	  			border-top-right-radius:5px;
	  			border-top-left-radius:5px;
	  			padding: 10px 0;
	  			height:26px;
	  			width: 100%;						
	  			margin: 0;
	  	  }
	  	  .tab_active2 {
	  		  margin: 0;
	  		color:#fff;
	  		font-weight: 600;
	  		font-size: 16px;
	  		display: flex;
	  		flex-direction: row;
	  		justify-content: center;
	  		align-items: center;
	  		gap: 10px;
	  		background: linear-gradient(180deg, #d8debe, #b4ba97);
	  	
	  		//border-top-right-radius:5px;
	  		//border-top-left-radius:5px;
	  
	  	  }
	  		
	  
	  
	  }
	  
	  
	  .detail-1 {
	  			box-sizing: border-box;
	  			width: 100%;
	  			margin: 0 auto 0 auto;
	  			display: inline-block;
	  			padding: 10px 20px 0 30px;
	  			//padding-left: 30px;
	  			//border:#000 1px solid;
	  			background: #fff;
	  			//border-radius: 4px;
	  			
	  			.detail-2 {
	  				    height: 70px;
	  					//border:1px solid #fc0;
	  					display: grid;
	  					grid-template-columns:60px 40% 40%;						
	  					
	  					.flex-item {
	  						    display: flex;
	  						    flex-direction: column;
	  						    justify-content: center;
	  						    align-items: center;
	  							//border:1px solid #f00;
	  							text-align: left;
	  							.text {
	  								font-size: 12px;
	  								color:#626571;
	  								
	  								font-weight: 400;
	  								    display: inline-block;
	  								    width: 100%;
	  									line-height: 20px;
	  							}
	  							.gold {
	  							
	  								font-weight: 600;
	  								font-size: 18px;
	  								color:#0E2529;
	  								display: inline-block;
	  								width: 100%;
	  								line-height: 35px;
	  								span {
	  									color:#0E2529;
	  									font-weight: 400;
	  									font-size: 12px;
	  								}
	  							}
	  							.v-btn {
	  								display: inline-block;
	  								width: 100%;
	  								text-align: right;
	  								.van-button {
	  									//background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
	  									color:#fff;
	  									line-height: 20px;
	  									font-weight: 600;
	  									font-size: 12px;
	  									width: 90px;
	  									border-radius: 4px;
	  									height: 35px;
	  									background: rgba(157, 164, 112, 0.12);
	  									border: 1px solid #AAB086;
	  									color:#A7AF78;
	  											
	  								}
	  							}
	  					}
	  			}
	  			
	  		}	
	  
    }
	
	
	
  }
  .part_2{
    width: 95%;
    background-color: #ffffff;
    margin: 10px auto 0 auto;
    .pt30 {
      padding-top: 30px;
    }
    .tx-form{
      width: 85%;
      margin: 0px auto;
      .tx-form-box{
        font-size: 18px;
		margin: 10px auto 1px auto;
        padding: 9px 0 10px 0;
		height: 33px;
        color: #4D4D4D;
        border-bottom: 0.02667rem solid #EEEEEE;
        span{
          display: inline-block;
          width: 50%;
		  font-size: 16px;
		  margin: 10px 0;
		  color: #3F3D38;
		  font-weight: 600;
		  padding: 0 10px;
        }
        span:nth-child(2){
          text-align: right;
        }
      }
      .pay-password{
        .pay-pwd{
          font-size: 18px;
          color: #4D4D4D;
        }
      }
      .tx-form-param{
        width: 94%;
		padding:10px;
        .title{
          font-size: 14px;
		  font-weight: 400;
          margin: 10px 0;
          color: #3F3D38;
        }
        .van-cell,.all-button,.van-field__label,.van-field__value{
          display: inline-block;
        }   
        .van-cell{
          width: 80%;
          vertical-align: middle;
        }
        .all-button{
          width: auto;
          vertical-align: middle;
          font-size: 16px;
          padding:10px;
          font-weight: 600;
          color: #b0b593;;

        }
		.pay-password {
			margin-top: 25px;
		}
      }
      
      .peration-item {
        //border: 1px solid rgb(198, 198, 198);
		border:none;
        padding: 6px 0;
        margin: 0 auto 30px auto;
        .van-cell{
          width: 100%;
          display: flex;
          padding: 4px 0 0 6px;
          border-bottom: 0px;
          .van-cell__title{
            font-size: 16px;
            color: #4D4D4D;
            font-weight: 500;
            padding-left: 10px;
           }
           .custom-right{
            margin-right: 6px;
           }
        }
      }
    }
    .tx-button{
      width: 100%;
      text-align: center;
      margin: 15px auto 40px auto;
      .button{
        width: 80%;
          margin: 0 auto;
          //background: linear-gradient(180deg, #d1d4bc 0%, #a8ad89 100%);
          border-radius: 5px;
          padding: 14px;
          font-size: 16px;
          //color: #fff;
		  font-weight: 500;
		  
		      background: rgba(157, 164, 112, 0.12);
		      border: 1px solid #AAB086;
		      color: #A7AF78;
      }
      .record{
        width: 60%;
        margin: 0 auto;
        font-size: 16px;
        color: #2F6DB3;
        font-weight: 600;
        padding: 18px;
      }
    }
    .role {
      padding: 0px 28px 20px;
      margin-bottom: 20px;
      .role-title {
        margin: 20px 0;
        font-weight: bold;
        font-size: 18px;
      }
      .rules_content {
        font-family: 'PingFang SC';
        font-size: 16px;
        line-height: 32px;
        color: #626571;
      }
    }
  }
  .banklist {
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px 8%;
    box-sizing: border-box;
    .title{
      font-size: 18px;
      font-weight: 600;
      padding: 16px 0;
    }
    .list{
      .list_item{
        width: 100%;
        padding: 6px 0;
        .left {
          width: 80%;
          padding-left: 10px;
          .ml_10{
            font-size: 16px;
            vertical-align: middle;
            line-height: 20px;
          }
        }
        .right{
          width: 20%;
          text-align: right;
          padding-right: 10px;
        }
      }
      .list_item:last-child{
        margin-top: 10px;
      }
      .active-type{
        background: rgba(172, 32, 35, 0.06);
        border-radius: 12px;
      }
    }
  }
}
</style>
