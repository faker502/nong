<template>
  <div class="page">
	  
	 <nav-bar title="" leftIconColor="#313231" class="nav-top"/>
	  
    <div class="container">


      <!--<div class="lg_top">
        <div class="reg-title">
          <div style="letter-spacing: 2px;">注册新账号</div>
          <div style="background-color: #F1BCBA;"></div>
        </div>
        <div class="reg-title-2">已有账号？在这里 <span @click="$router.push('/login')">立即登录</span></div>
      </div>-->

       <div class="lg_top">
        <div class="bg-top">欢迎注册！</div>
        <div class="logo">
          注册账号即可参与更多助农活动
        </div>
      </div>



      <div class="form_wrap df_c">
		  
		  <div class="data_tabs df_r">
			<div class="data_tab " @click="$router.push('/login')">用户登录</div>
			<div class="data_tab tab_active" ><span>立即注册</span></div>
		  
		  

		</div>
		  
        <!-- 注册表单 -->
        <!-- animate__animated -->
        <div class="reg_form animate__fadeInRight">
          <van-form ref="rform" class="rform">
            <div v-if="next">
				<!-- <div class="label">手机号</div> -->	
                <van-field
					:label-width="60" label="+86"
                  v-model="rform.phone"
                  placeholder="请输入手机号"
                  autocomplete="off"
                  :border="false"
                  maxlength="11"
                  type="tel"
                  :rules="rules.phone"
                >
                </van-field>


            </van-cell-group>

            


            <!-- <div class="d_line"></div> -->
			
			<!-- <div class="label">密码</div> -->	
            <van-field
              v-model="rform.password"
              placeholder="设置登录密码"
              autocomplete="off"
              :border="false"
              :type="showPassword ? 'text' : 'password'"
              :rules="rules.password"
              right-icon="eye-o"
              @click-right-icon="showPassword = !showPassword"
            >
            </van-field>
            <!-- <div class="d_line"></div> -->
			
			<!-- <div class="label">确认密码</div> -->
            <van-field
              v-model="rform.password2"
              placeholder="请再次输入登录密码"
              autocomplete="off"
              :border="false"
              :type="showPassword2 ? 'text' : 'password'"
              :rules="rules.password2"
              right-icon="eye-o"
              @click-right-icon="showPassword2 = !showPassword2"
            >
            </van-field>
            <!-- <div class="d_line"></div> -->
			
			<!-- <div class="label">QQ</div> -->
			<van-field
			  v-model="rform.qq"
			  placeholder="选填：请输入QQ号码"			  
			  autocomplete="off"
			  :border="false"
			  type="number"			  
			>
			</van-field>
			<!-- <div class="d_line"></div> -->
			
            <template>
				<!-- <div class="label">图形验证</div> -->
              <div class="send_email df_r">
				  
                <van-field
                  v-model="rform.imgCode"
                  placeholder="输入图形验证码"
                 
                  autocomplete="off"
                  :border="false"
				  type="number"	
                  :rules="rules.imgCode"
                >
                </van-field>
                <div class="capcat_code df_r">
                  <img :src="capcatImg" alt="" @click="getImageCode" />
                </div>
              </div>
            </template>
			
			<!-- <div class="d_line"></div> -->
			
			
          <template v-if="regSmsSwitch == 1">
			  <!-- <div class="label">短信验证</div> -->
              <div class="send_email df_r" >
				  
                <van-field
                  v-model="rform.phoneCode"

                  placeholder="输入短信验证码"                   
                  autocomplete="off"
                  :border="false"
				  type="number"	
                  :rules="rules.phoneCode"
                >
                </van-field>
                <div class="phone_code df_r ">
                  <van-button v-show="show" type="info" @click="getPhoneCode">获取验证码</van-button>                 
                  <van-button v-show="!show" type="default">{{count}}s后重新获取</van-button>                 
                </div>
              </div>
            </template>

            <!-- <div class="d_line"></div> -->
			<!-- <div class="label">邀请码</div> -->
            <van-field
              v-model="rform.code"

              placeholder="请输入邀请码"
              autosize
              autocomplete="off"
              :border="false"
              :rules="rules.code"
            >
            </van-field>
            </div>
            <div v-else>
              <div class="d_line sign-up-tips">
                <p>温馨提示：</p>
                <p>真实姓名、身份证号码必须一致</p>
              </div>
              <van-field
                v-model="rform.realName"

                placeholder="请输入您的真实姓名"
                autosize
                autocomplete="off"
                :border="false"
                type="text"
                :rules="rules.realName"
              >
              </van-field>
              <!-- <div class="d_line"></div> -->
              <van-field
                v-model="rform.idCard"

                placeholder="请输入您的身份证号"
                autosize
                autocomplete="off"
                :border="false"
                type="text"
                :rules="rules.idCard"
              >
              </van-field>
            </div>

          </van-form>
        </div>
        <!-- animate__animated -->
        <div class="btns df_r animate__fadeInRight">
          <div class="btn2">
            <div>
              <van-button 
                  class="btn2"
                  :disabled="!isFormValid"
                  @click="handleToReg()"
                  >注册
              </van-button>
            </div>
          </div>
        </div>
	
		
		
      </div>
	  
	  
	  
	  <!-- <div class="online df_r">
	      <div class="" style="font-size:18px;" @click="$router.push('/online')">在线客服</div>
	  </div> -->
    <div class="customer-service" @click="$router.push('/kefu')">
      <p class="service-text">
        账号遇到问题？
        <span class="highlight">人工客服</span>
        解决
      </p>
    </div>
	  
<!-- 	  <div class="tips df_r">
	      <a href="javascript:void(0);" style="color:#919191"> 
	        注册即表明同意<span style="color:#575551;font-weight: 600;" @click="$router.push({path:'/news/info', query:{noticeId:15}});">用户协议</span>与<span style="color:#575551;font-weight: 600;" @click="$router.push({path:'/news/info', query:{noticeId:16}});">隐私协议</span>
	      </a>
	    </div> -->
	  

	  
	  
    </div>
    <!-- <van-overlay :show="loadingShow">
      <van-loading style="margin-top: 30vh" color="#0094ff" vertical>
        登录中,请稍等
      </van-loading>
    </van-overlay> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Cookies from "js-cookie";
import { encrypt, decrypt, LoginRegistencrypt } from "@/utils/jsencrypt";
import { getImageCodeApi, registerApi, getPhoneCodeApi } from "@/api/login";

import { getConfigKey } from "@/api/index";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  name: "LoginVue",
  components: {},
  data() {
    return {
      form: {
        phone: '',
        password: '',
        rememberMe: false
      },

        show: true,
        count: '',
        timer: null,

      rform: {},
      capcatImg: '',
      rememberMe: true,
      remember_pro: true,
      isReg: false,
      activeIcon: require("@/assets/images/radio_btn.png"),
      isShow: false,
      loadingShow: false,
      next: true,
      phonePattern: /^1[3456789]\d{9}$/,
      passwdPattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\._\+(){}])[0-9a-zA-Z!@#$%^&*,\\._\+(){}]{8,20}$/,
	  regSmsSwitch: 2, //close
      rules: {
        phone: [
          { required: true, message: "", trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: "手机号不正确", trigger: 'blur' },
        ],
        password: [
          { required: true, message: "", trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6 到 20 个字符', trigger: ['blur','change'] }
        ],
        password2: [
          { required: true, message: "", trigger: 'blur' }
        ],
        imgCode: [
          { required: true, message: "", trigger: 'blur' },
        ],
        phoneCode: [
          { required: true, message: "", trigger: 'blur' },
        ],
        code: [
          { required: true, message: "", trigger: 'blur' },
        ],
        realName: [
          { required: true, message: "", trigger: 'blur' },
        ],
        idCard: [
          { required: true, message: "", trigger: 'blur' },
          { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: "请填写正确的身份证号码", trigger: 'blur' },
        ],
      },
      showPassword: false,
      showPassword2: false,
    };
  },
  computed: {
    ...mapGetters(["baseData"]),
    isFormValid() {
      return this.rform.phone && 
             this.rform.password && 
             this.rform.password2 && 
             this.rform.imgCode && 
             this.rform.code;
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.rform.code = this.$route.query.code;
    }
    this.getConfig();
    this.getImageCode();
    this.getCookie();

    //console.log(this.$route.path)

  },
  methods: {
    ...mapActions(["Login"]),
    getConfig() {
      getConfigKey({ key: "registerSwitch" }).then(res => {
        // this.registerSwith = res.data;
        console.log(res.data.registerSwitch);
		this.regSmsSwitch = res.data.regSmsSwitch;
        //今日共富名额已满，请明日开户！
        if (res.data.registerSwitch == 2) {
          Dialog({ message: '今日名额已满！', className: 'dialog-error' });
          this.$router.push('/login');
          return false;
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

    getImageCode() {
      getImageCodeApi().then((res) => {
        this.capcatImg = "data:image/gif;base64," + res.img;
      });
    },
	getPhoneCode() {
	  getPhoneCodeApi({phone:this.rform.phone,imgCode:this.rform.imgCode}).then((res) => {
		  this.$dialog({ message: res.msg, className: 'dialog-error' })
		  if (res.code != 200) {
			  this.getImageCode();
		  } else {
			  this.ccc();
		  }		
	  });
	},
    getCookie() {
      const username = Cookies.get("phone");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.form = {
        phone: username === undefined ? this.form.phone : username,
        password: password === undefined ? this.form.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
      //console.log(this.form);
    },
    /**注册  */
    handleToReg() {
      this.$refs.rform.validate().then(() => {
        if (this.rform.password.length < 6) { 
          Dialog({ message: '登录密码不能小于6位', className: 'dialog-error' })
          return false;
        } else if (this.rform.password != this.rform.password2) { 
          Dialog({ message: '登录密码与确认密码不一致', className: 'dialog-error' })
          return false;
        }
        
		this.visible = false; // 表单验证通过后手动关闭弹框
		//console.log(this.rform);
		var registKey = LoginRegistencrypt(JSON.stringify(this.rform))
		registerApi({key : registKey}).then((res) => {
		         
		  if (res.code == 200) {
		    //this.$toast.success("注册成功！前往登录");
		    Dialog({ message: '注册成功，去登录！', className: 'dialog-error' })
		    this.isReg = false;
		    this.$router.push({path: "/login",query:{name: res.data}});
		  } else {
		    this.getImageCode();
		    this.next = true;
		    //this.$toast.fail("注册通道繁忙，请联系客服");
		    Dialog({ message: res.msg, className: 'dialog-error' })
		    return false;
		  }
		}).catch(err => {
		  this.getImageCode();
		});
		
		
      })
	  
	  .catch((err) => {
        console.log(err);
		Toast(err[0].message || '错误');
		return false;
      });
   
    },
    /**跳转客服 */
    handleToKefu() { },
    nextTrue() {
      this.next = true;
    }
  },
};
</script>
<style lang="scss" scoped>

.page {
  height: 100%;
  position: relative;
  background: url("@/assets/photo/logo-alt.png") no-repeat left top;
  display: flex;
  flex-direction: column;
  
  .container {
    text-align: center;
    // flex: 1;
    // display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;

    .lg_top {
      height: 165px;
      background: url("@/assets/photo/logo-top.png") no-repeat right bottom;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 20px;
      color: #1E2831;
      .bg-top {
        font-size: 32px;
        font-weight: 600;
        margin-top: 54px;
      }
    }
    .logo {
      font-size: 16px;
      margin-top: 10px;
    }

    .form_wrap {
      background: #FFFFFF6B;
      justify-content: center;
      padding: 0 0 16px 0;
      margin: 0 auto;
      margin-top: -10px;
      position: relative;
      z-index: 20;
      width: 95%;
      box-sizing: border-box;
      text-align: left;
      border-radius: 8px;

      .data_tabs {
        background: #fff;
        width: 100%;
        margin: 0 auto;
        margin-top: -10px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        height: 48px;
        justify-content: space-between;
        flex: none;
        order: 0;
        flex-grow: 1;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        overflow: hidden;
      }
      .data_tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 16px;
        background: #fff;
        color: #BEC0BD;
        padding: 10px 0;
        height: 26px;
        width: 50%;
      }

      .tab_active {
        color: #fff;
        background-color: #fff;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background: url("@/assets/photo/tab_active.png") no-repeat center center;
        background-size: 100% 100%;
        transform: scaleX(-1);
        
        span {
          transform: scaleX(-1);
        }
      }

      .rform {
        // margin: 25px 0 10px 0;
        padding: 24px 16px;
        text-align: left;

        .van-cell {
          height: 44px;
          line-height: 44px;
          padding: 0 10px;
          border: none;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          border-radius: 4px;
        }

        .input-type {
          ::v-deep .van-field__control {
            height: 44px;
            line-height: 44px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            border-radius: 4px;
          }
          
          ::v-deep .van-field__label {
            display: none;
          }
        }

        .d_line {
          height: 15px;
        }
      }
    }

    .btns {
      width: 100%;
      // margin: 0 16px;
      margin-top: 0;
      padding: 0 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;

      .btn2 {
        width: 100%;
        color: #fff;
        
        .van-button {
          width: 100%;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #4B594A;
          color: #fff;
          border: none;
          
          &:disabled {
            background: #CCCCCC;
            color: #999;
            pointer-events: none;
          }
        }
      }
    }

    .send_email {
      align-items: center;
      height: 65px;
      // margin-bottom: 24px;
      position: relative;
      .e_code {
        margin-left: 10px;
        width: 105px;
        .van-button {
          height: 40px;
          background: linear-gradient(180deg, #5db1ff 0%, #0070d9 100%);
        }
      }
      .van-count-down {
        color: $font_color_white;
        font-size: 13px;
      }
      .capcat_code {
        top: 0;
        position: absolute;
        right: 0px;
        width: 120px;
        height: 40px;
        display: inline-block;
        // margin-left: 2px;
        img {
          height: 100%;
          width: 120px;
        }
      }
      .phone_code {
        position: absolute;
        width: 140px;
        right: 0;
        display: inline-block;
        .van-button {
          width: 130px;
          height: 44px;
          padding: 0;
          margin: 0;
          font-size: 16px;
          display: inline-block;
          color: #A7AF78;
          letter-spacing: 2px;
          background: none;
          border: none;
          font-weight: 500;
        }
        .van-button__content {
          font-size: 14px;
        }
        .van-button--default {
          color: #999;
        }
      }
    }
  }
}

.customer-service {
  position: relative;
  padding: 20px 0;
  justify-content: center;
  font-size: 14px;
  line-height: 40px;
  width: 97%;
  margin-top: auto;
  text-align: center;
  
  .service-text {
    font-size: 14px;
    color: #313231;
    line-height: 20px;
    
    .highlight {
      color: #7E963C;
      font-weight: 500;
      text-decoration: underline;
    }
  }
}

::v-deep .van-field__error-message {
  font-size: 15px;
}

::v-deep .reg_form {
  input.van-field__control {
    color: $font_color;
    height: 100%;
    font-size: 16px;
  }
}

::v-deep .van-button {
  width: 100%;
  height: 44px;
  padding: 0;
  margin: 20px 0;
  border-radius: 22px;
  font-size: 16px;
  display: block;
}

::v-deep .btn2 .van-button {
  width: 100%;
  height: 44px;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  font-size: 16px;
  display: block;
  background: #4B594A;
  color: #fff;
  font-weight: 600;
  border: none;
}

::v-deep .van-button__content {
  font-size: 16px;
}

.w_white {
  color: #fff;
}
</style>
