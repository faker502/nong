<template>
  <div class="page">
    <nav-bar title="修改支付密码" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    <div class="part_1"></div>
    <div class="part_2">
      <van-form ref="form" class="pt30 tx-form">
        <div class="tx-form-param">
			
			<template v-if="regSmsSwitch == 1">
			<div class="label">手机号</div>
			<van-field
			  v-model="form.phone"
			  :label-width="120"
			  label=""
			  placeholder="请输入手机号"
			  autosize
			  autocomplete="off"
			  :border="false"
			  type="number"
			>
			</van-field>
			</template>
			
			
			<template v-if="regSmsSwitch == 1">
				<div class="label">短信验证码</div>
			    <div class="send_email df_r" >
			      <van-field
			        v-model="form.phoneCode"
			        placeholder="请输入短信验证码"                   
			        autocomplete="off"
			        :border="false"
			      >
			      </van-field>
			      <div class="phone_code df_r ">
			        <div v-show="show" class="send" @click="setPhoneCode">获取验证码</div>                 
			        <div v-show="!show" class="sended">{{count}}s后重新获取</div>                 
			      </div>
			    </div>
			  </template>
			
			<template v-if="regSmsSwitch == 2"> 
			<div>
			  <div style="margin: 30px 0px 15px;font-size:15px;color:#3F3D38;">输入原支付密码</div>
			  <div>
			    <van-cell-group style="height: 50px;margin-top: 14px;">
			      <van-password-input height="90%" :value="form.oldPayPwd" :focused="showKeyboard0" :length="6" :gutter="10"
			        @focus="showKeyboard0 = true" @blur="handlePassword0" />
			    </van-cell-group>
			    <van-number-keyboard v-model="form.oldPayPwd" :show="showKeyboard0" @blur="handlePassword0" />
			  </div>
			</div>
			 </template>
			
          <div>
            <div style="margin: 15px 0px 15px;font-size:15px;color:#3F3D38;">输入新支付密码</div>
            <div>
              <van-cell-group style="height: 50px;margin-top: 14px;">
                <van-password-input height="90%" :value="form.payPwd" :focused="showKeyboard" :length="6" :gutter="10"
                  @focus="showKeyboard = true" @blur="handlePassword" />
              </van-cell-group>
              <van-number-keyboard v-model="form.payPwd" :show="showKeyboard" @blur="handlePassword" />
            </div>
          </div>
		  
          <div>
            <div style="margin: 15px 0px;font-size:15px;color:#3F3D38;">再次输入新支付密码</div>
            <div>
              <van-cell-group style="height: 50px;margin-top: 14px;">
                <van-password-input height="90%" :value="form.payPwd2" :focused="showKeyboard2" :length="6" :gutter="10"
                  @focus="showKeyboard2 = true" @blur="handlePassword2" />
              </van-cell-group>
              <van-number-keyboard v-model="form.payPwd2" :show="showKeyboard2" @blur="handlePassword2" />
            </div>
          </div>
        </div>
		

		<div>
		    <div style="margin: 15px 0px;font-size:15px;color:#3F3D38;">输入本人身份证号码</div>
		    <div>
		      <van-cell-group >
		        <van-field
		          v-model="form.idCard"
		          placeholder="输入本人身份证号码"
		          autosize
		          autocomplete="off"
		          :border="false"
		          type="text"
		        ></van-field>
		      </van-cell-group>
		    </div>
		</div>
		
		
      </van-form>
      <div class="tx-button">
        <div class="button" @click="commitPassword">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { updatePayPwdApi,setPhoneCodeApi } from "@/api/member";
import loading from "@/components/Loading.vue";
import { getConfigKey } from "@/api/index";

export default {
  name: "setPayPassword",
  inject: ["reload"],
  data() {
    return {
      form: {
        oldPayPwd: "",
        payPwd: "",
        payPwd2: "",
        idCard: ""
      },
      isShow: false,
      showKeyboard0: false,
      showKeyboard: false,
      showKeyboard2: false,
      payPwd: undefined,
      loading: false,
      payPassword: '',
	  regSmsSwitch: 1,
	  show: true,
	  count: '',
	  timer: null,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {},
  mounted() {
    this.getConfig();
  },
  methods: {
	  
	  getConfig() {
	    getConfigKey({ key: "registerSwitch" }).then(res => {
	  			this.regSmsSwitch = res.data.regSmsSwitch;
	    });
	  },
	handlePassword0(){
	  this.showKeyboard0 = false;
	},
    handlePassword(){
      this.showKeyboard = false;
      if (this.form.payPwd.length != 6) {
        this.$dialog({ message: '请输入6位新支付密码！', className: 'dialog-error' })
        return false;
      }
    },
    handlePassword2(){
      this.showKeyboard2 = false;
      if (this.form.payPwd2.length != 6) {
        this.$dialog({ message: '请输入6位确认支付密码！', className: 'dialog-error' })
        return false;
      }
    },
	
	setPhoneCode() {
	  setPhoneCodeApi({phone:this.form.phone}).then((res) => {
		  this.$dialog({ message: res.msg, className: 'dialog-error' })
		  if (res.code != 200) {
		  } else {
			  this.ccc();
		  }		
	  });
	},
	
	ccc(){
	        const TIME_COUNT = 60;
	        if (!this.timer) {
	            this.count = TIME_COUNT;
	            this.show = false;
	            this.timer = setInterval(() => {
	                if (this.count > 0 && this.count <= TIME_COUNT) {
	                    this.count--;
	                } else {
	                    this.show = true;
	                    clearInterval(this.timer);
	                    this.timer = null;
	                }
	            }, 1000)
	        }
	    },
	
    commitPassword() { 
      if (this.form.payPwd.length == 6 && this.form.payPwd2.length == 6) {
        if (this.form.payPwd != this.form.payPwd2) {
          this.$dialog({ message: '新支付密码和确认支付密码不一致，请重新输入！', className: 'dialog-error' })
          return false;
        }
		if (this.form.idCard.length < 5) {
		  this.$dialog({ message: '请输入本人身份证号码！', className: 'dialog-error' })
		  return false;
		}
        this.$refs.form.validate().then(() => {
          console.log(this.form);
          updatePayPwdApi(this.form).then((res) => {
            if (res.code != 200) {
              this.$dialog({ message: res.msg, className: 'dialog-error' })
              return false;
            } else { 
              this.$dialog({ message: res.msg, className: 'dialog-error' })
              this.form.idCard = this.form.oldPayPwd = this.form.payPwd = this.form.payPwd2 = this.form.idCard = '';
              return false;
            }
          }); 
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.$dialog({ message: '请输入6位支付密码', className: 'dialog-error' })
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0 0;
}

.van-password-input {
  margin: 0;
}

.van-password-input__security li {
  height: 95%;
  //background-color: #F1F3F4;
  border: 1px solid #EDEDF1;
  border-radius: 5px;
}


		
::v-deep .van-cell {
	font-size: 14px;
	padding: 0;
	border-bottom: 1px solid #F8EBE6;
	height: 50px;
	margin-bottom: 10px;
  }
  ::v-deep .van-field__body {
	height: 50px;
  }
  ::v-deep .van-field__control {
	height: 50px;
	padding: 0 15px;
	line-height: 50px;
  }


.page {
  overflow-y: auto;
  
    position: relative;
    text-align: center;
    width: 100%;
    background: url('@/assets/photo/top2.webp') no-repeat top left;
    //background-color: #a9ae8a;
    background-size: 100% 168px;



  .part_2 {
    width: 95%;
    background-color: #fff;
	margin: 0 auto;
	margin-top: 80px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	text-align: left;
    .pt30 {
      padding-top: 30px;
    }

    .tx-form {
      width: 85%;
      margin: 0px auto;
	  
	  

      .tx-form-box {
        font-size: 18px;
        font-weight: 600;
        padding: 20px 0;
        color: #4D4D4D;

        span {
          display: inline-block;
          width: 50%;
        }

        span:nth-child(2) {
          text-align: right;
        }
      }

      .tx-form-param {
        .title {
          font-size: 18px;
          font-weight: 600;
          margin: 20px 0;
          color: #4D4D4D;
        }
		
.label {
	    width: 130px;
	    font-size: 15px;
	    color: rgb(63, 61, 56);
	    margin:20px 0 5px 0;
	  }
	  
	  
	  
	  .send_email {
	    align-items: center;
	    .e_code {
	      margin-left: 10px;
	      width: 105px;
	      .van-button {
	        height: 40px;
	        background: linear-gradient(180deg, #5db1ff 0%, #0070d9 100%);
	        /* border: 1px solid $base_border_color;*/
	      }
	    }
	    .van-count-down {
	      color: $font_color_white;
	      font-size: 13px;
	    }
	   .capcat_code {
	      position: relative;
	      right: 0px;
	  	width: 140px;
	  	height: 60px;
	  	display: inline-block;
	  	margin-left: 2px;
	  	img {height: 60px;width:130px;}
	    }
	    .phone_code {
	  	position: relative;
	      width: 140px;
	      right: 0px;
	  	display: inline-block;
	  		.send {
				font-size: 16px;
				font-weight: 500;
				line-height: 22.4px;
				text-align: right;
				color:#A7AF78;
	  		}
	  		.sended {
	  			color:#999;
	  		}
	    }
	  }
	  
		
		
      }
    }

    .tx-button {
      width: 100%;
      text-align: center;
      margin: 25px auto 0;
	  padding-bottom: 200px;

      .button {
        width: 76%;
        margin: 0 auto;
        //background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
        border-radius: 5px;
        padding: 15px;
        font-size: 16px;
        //color: #fff;
		font-weight: 400;
		
		color: #A7AF78;
				background: rgba(157, 164, 112, 0.12);
				border: 1.5px solid #AAB086;
      }

      .record {
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
        font-size: 14px;
        line-height: 32px;
        color: #969BA0;
      }
    }
  }
}
</style>