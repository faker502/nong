<template>
  <div class="page">
    <nav-bar title="修改登录密码" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
    <div class="part_2"></div>
    <div class="wrap">
      <van-form ref="rform" class="rform" :show-error-message="true">

		 
		 <!-- <template v-if="regSmsSwitch == 1">
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
		   </template> -->
		 
		 
		<template v-if="regSmsSwitch == 2"> 
		<!-- <div class="label">原密码</div> -->
        <van-field
          v-model="form.oldPassword"
          placeholder="请输入原密码"
          :border="false"
          :type="showOldPassword ? 'text' : 'password'"
          :error-message="errors.oldPassword"
          @focus="clearError('oldPassword')"
        >
          <template #right-icon>
            <van-icon 
              :name="showOldPassword ? 'eye-o' : 'closed-eye'" 
              @click="showOldPassword = !showOldPassword"
            />
          </template>
        </van-field>
		</template>
        <!-- <div class="d_line"></div> -->
		
		<!-- <div class="label">新登录密码</div> -->
        <van-field
          v-model="form.newPassword"
          placeholder="请输入新登录密码"
          :border="false"
          :type="showNewPassword ? 'text' : 'password'"
          :error-message="errors.newPassword"
          @focus="clearError('newPassword')"
        >
          <template #right-icon>
            <van-icon 
              :name="showNewPassword ? 'eye-o' : 'closed-eye'" 
              @click="showNewPassword = !showNewPassword"
            />
          </template>
        </van-field>
        <!-- <div class="d_line"></div> -->
		<!-- <div class="label">确认新登录密码</div> -->
        <van-field
          v-model="form.confirmPassword"
          placeholder="请确认新登录密码"
          :border="false"
          :type="showConfirmPassword ? 'text' : 'password'"
          :error-message="errors.confirmPassword"
          @focus="clearError('confirmPassword')"
        >
          <template #right-icon>
            <van-icon 
              :name="showConfirmPassword ? 'eye-o' : 'closed-eye'" 
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </van-field>

        <van-field
          v-model="form.idCard"
          placeholder="请输入本人身份证号码"
          :border="false"
          :error-message="errors.idCard"
          @focus="clearError('idCard')"
        />

		<div class="btns">
		  <van-button @click="handleSubmit">修改</van-button>
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
      errors: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        idCard: "",
      },
	  show: true,
	  count: '',
	  timer: null,
	  regSmsSwitch: 2, // 1手机号
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    };
  },
  
  mounted() {
    this.getConfig();
  },
  
  methods: {
	  
	  getConfig() {
	    // getConfigKey({ key: "registerSwitch" }).then(res => {
		// 	this.regSmsSwitch = res.data.regSmsSwitch;
	    // });
	  },
	  
	  handleSubmit() {
		 		
		 
		 if (!this.validateForm()) {
		   return;
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
	  
	  clearError(field) {
	    this.errors[field] = "";
	  },
	  
	  validateForm() {
	    let isValid = true;
	    this.errors = {
	      oldPassword: "",
	      newPassword: "",
	      confirmPassword: "",
	      idCard: "",
	    };

	    if (this.regSmsSwitch == 2 && !this.form.oldPassword) {
	      this.errors.oldPassword = "请输入原密码";
	      isValid = false;
	    }

	    if (!this.form.newPassword) {
	      this.errors.newPassword = "请输入新登录密码";
	      isValid = false;
	    }

	    if (!this.form.confirmPassword) {
	      this.errors.confirmPassword = "请确认新登录密码";
	      isValid = false;
	    } else if (this.form.confirmPassword !== this.form.newPassword) {
	      this.errors.confirmPassword = "两次输入的密码不一致";
	      isValid = false;
	    }

	    if (!this.form.idCard) {
	      this.errors.idCard = "请输入本人身份证号码";
	      isValid = false;
	    }

	    return isValid;
	  },
  },
  
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F8F8F8;
//   background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
  .part_2 {
	width: 100%;
	height: 165px;
	background: #FFFFFF;
	background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
  }

	::v-deep .van-icon:before {
      background: #fff!important;
      border-radius: 50%;
      // padding: 2px;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  .wrap {
    padding: 16px;
	background: #FFFFFF6B;
	margin: 0 12px;
	margin-top: -90px;
	border-radius: 8px;

    .rform {
    //   background: #FFFFFF6B;
	//   border-radius: 8px;
    //   padding: 0;

      .van-field {
        height: 44px;
        background: #FFFFFF;
        border-radius: 4px;
        margin-bottom: 24px;
        padding: 0 16px;
        border: none;
        display: flex;
        align-items: center;

        &::deep(.van-field__control) {
          height: 44px;
          line-height: 44px;
          font-size: 15px;
          color: #333333;
        }

        &::deep(.van-field__right-icon) {
          height: 44px;
          line-height: 44px;
          display: flex;
          align-items: center;
          color: #999999;
          font-size: 16px;
          padding-left: 12px;
        }

        &::deep(.van-field__placeholder) {
          color: #999999;
        }

        &::deep(.van-field__body) {
          height: 44px;
          display: flex;
          align-items: center;
        }

        &::deep(.van-field__error-message) {
          color: #ee0a24;
          font-size: 12px;
          margin-top: 4px;
        }
      }

      .btns {
        margin-top: 32px;
        
        .van-button {
          width: 100%;
          height: 44px;
          background: #4B594A;
          border: none;
          border-radius: 22px;  // 全圆角
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 500;

          &:active {
            opacity: 0.9;
          }
        }
      }
    }
  }
}
</style>
