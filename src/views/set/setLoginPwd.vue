<template>
  <div class="page">
    <nav-bar title="修改登录密码" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    <div class="part_2"></div>
    <div class="wrap">
      <van-form ref="rform" class="rform" :show-error-message="false">

		 
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
		<div class="label">原密码</div>
        <van-field
          v-model="form.oldPassword"
          :label-width="120"
          label=""
          placeholder="请输入原密码"
          autosize
          autocomplete="off"
          :border="false"
          type="password"
        >
        </van-field>
		</template>
        <!-- <div class="d_line"></div> -->
		
		<div class="label">新登录密码</div>
        <van-field
          v-model="form.newPassword"
          :label-width="120"
          label=""
          placeholder="请输入新登录密码"
          autosize
          autocomplete="off"
          :border="false"
          type="password"
        >
        </van-field>
        <!-- <div class="d_line"></div> -->
		<div class="label">确认新登录密码</div>
        <van-field
          v-model="form.confirmPassword"
          :label-width="120"
          label=""
          placeholder="再次输入新登录密码"
          autosize
          autocomplete="off"
          :border="false"
          type="password"
        >
        </van-field>

		  
		<div class="btns df_r">
		  <van-button
		    @click="handleSubmit"
		    >修改</van-button>
		</div>
      </van-form>

    </div>
  </div>
</template>

<script>
import * as RegExp from "@/utils/RegExp.js";
import { cloneDeep } from "lodash-es";
import md5 from "js-md5";
import { mapActions } from "vuex";
import { updatePwdApi,setPhoneCodeApi } from "@/api/member";
import { getConfigKey } from "@/api/index";

export default {
  name: "SetLoginPwd",
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        idCard: "",
      },
	  show: true,
	  count: '',
	  timer: null,
	  regSmsSwitch: 1,
    };
  },
  
  mounted() {
    this.getConfig();
  },
  
  methods: {
	  
	  getConfig() {
	    getConfigKey({ key: "registerSwitch" }).then(res => {
			this.regSmsSwitch = res.data.regSmsSwitch;
	    });
	  },
	  
	  handleSubmit() {
		 		
		 
		 if (this.form.newPassword.length < 1) {
		   this.$dialog({ message: '请输入新登录密码', className: 'dialog-error' })
		   return false;
		 } 
		 
		 if (this.form.confirmPassword.length < 1) {
		   this.$dialog({ message: '请输入确认登录密码', className: 'dialog-error' })
		   return false;
		 } 		
		  
	    updatePwdApi(this.form).then((res) => {
	      if (res.code == 200) {
			  this.$dialog.alert({ message: res.msg});
			  this.form.oldPassword = '';
			  this.form.newPassword = '';
			  this.form.confirmPassword = '';
			  this.form.phoneCode = '';
			  this.form.phone = '';
		  } else {
			  this.$dialog.alert({ message: res.msg});
		  }
	    });
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
	  
  },
  
};
</script>

<style lang="scss" scoped>
.page {

  position: relative;
  text-align: center;
  width: 100%;
  height: 168px;
  background-image: url('@/assets/photo/top2.webp');
  //background-color: #a9ae8a;
  background-size: 100% 100%;


  .wrap {
    position: relative;
    top: 78px;
    left: 0;
    width: calc(100% - 40px);
	margin: 0 auto;	
	text-align: left;


    .rform {
		background: #fff;
		padding: 15px 20px 200px;
		border-radius: 5px;

      .d_line {
        height: 10px;

      }
	  
	  .label {
	    width: 130px;
	    font-size: 15px;
	    color: #A7AF78;
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
	  
		
		.title {
			width: 100%;
			height: 22px;

			align-items: center;
			margin: 10px 0 30px 0;
			margin-left: -20px;
			position: relative;

			
			.hh {
				padding: 0 0 20px 28px;
				height: 24px;
				
				font-weight: 600;
				font-size: 18px;
				line-height: 22px;
				display: inline-block;
				color: #3F3D38;
			}
			
			.tp {
				position: absolute;
				display: block;
				width: 5px;
				height: 22px;
				left: 0;
				top: 0;
				//background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
				//opacity: 0.75;
			}

		}
		
		.van-cell {
		    font-size: 16px;
		    padding: 0;
		    background-color: transparent;
		    /*border-bottom: 1px solid $border_color_g;*/
			border-bottom: 1px solid #F8EBE6;
			height:50px;
		
		  }
		  .van-field__body {
		    height: 60px;
		  }
		  input.van-field__control {
		    color: $font_color;
		    height: 60px;
		    font-size: 16px;
		  }
		  input.van-field__control::-webkit-input-placeholder {
		    //color: $font_color2 !important;
		  }
		  .van-checkbox__label {
		    color: $font_color;
		    font-size: 15px;
		  }
		
		::v-deep input.van-field__control {
		      color: $font_color;
		      height: 100%;
		      font-size: 16px;
		    }
		::v-deep .tips {
		  .van-radio__label {
		    color: $font_color2;
		    font-size:14px
		  }
		}
		::v-deep .van-button {
		  width: 100%;
		  height: 48px;
		  padding: 0;
		  margin: 20px 0;
		  border-radius: 5px;
		  font-size: 15px;
		  display:block;
		}
		::v-deep .btn2 .van-button {
		  width: calc(630px / 2);
		  height: 48px;
		  padding: 0;
		  border: none;
		  border-radius: 5px;
		  font-size: 15px;
		}
		::v-deep .van-button__content{
		  font-size:18px;
		}
	    
	  
	  
    }
    .btns {
      margin-top: 20px;
      justify-content: center;
    }
  }
}
::v-deep .van-form {
  .van-cell {
    font-size: 14px;
    padding: 0;
    border-bottom: 1px solid $base_border_color;
    height: halfSize(110px);
    margin-bottom: 10px;
  }
  .van-field__body {
    height: halfSize(110px);
  }
  .van-field__label {
    color: $font_color_dark;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-weight: bold;
  }
  input.van-field__control {
    color: $font_color_dark;
    height: 100%;
    padding: 0 15px;
  }
  input.van-field__control::-webkit-input-placeholder {
    //color: #606060 !important;
  }
  .van-checkbox__label {
    color: $font_color_dark;
  }
}
::v-deep .btns {
  .van-button {
    width: 95%;
    height: 40px;
    letter-spacing: 1px;
    padding: 0;
    //border: none;
    font-size: 14px;
    //color: #fff !important;
	
			background: rgba(157, 164, 112, 0.12);
			border: 1.5px solid #AAB086;
			color: #A7AF78;
  }
}
</style>
