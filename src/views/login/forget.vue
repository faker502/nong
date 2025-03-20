<template>
  <div class="page">
	  
	   <nav-bar title="" leftIconColor="#666" class="nav-top"/>
	  
    <div class="container">

       <div class="lg_top">
        <div class="bg-top"></div>
        <div class="logo">
          <img src="@/assets/photo/logo-alt.webp" style="width:259px;height: 220px;"/>
        </div>
      </div>



      <div class="form_wrap df_c">
		  
		  <div class="data_tabs df_r">

			<div class="data_tab tab_active" >找回密码</div>
		  
		  

		</div>
		  
        <!-- 注册表单 -->
        <!-- animate__animated -->
        <div class="reg_form animate__fadeInRight">
          <van-form ref="rform" class="rform">
            <div v-if="next">
				<div class="label">手机号</div>	
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

		<div class="d_line"></div>
            
			<div class="label">新密码</div>	
            <van-field
              v-model="rform.password"
              placeholder="设置新登录密码"
              
              autocomplete="off"
              :border="false"
              type="password"
              :rules="rules.password"
            >
            </van-field>
            <div class="d_line"></div>
			
			<div class="label">确认密码</div>
            <van-field
              v-model="rform.password2"
              placeholder="请再次输入登录密码"
              
              autocomplete="off"
              :border="false"
              type="password"
              :rules="rules.password2"
            >
            </van-field>


			<div class="d_line"></div>
			
            <template>
				<div class="label">图形验证</div>
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
			
			<div class="d_line"></div>
			
			
          <div class="label">短信验证</div>
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

            </van-field>
            </div>
            <div v-else>
              
            </div>

          </van-form>
        </div>
        <!-- animate__animated -->
        <div class="btns df_r animate__fadeInRight">
          <div class="btn2">
            <div>
              <van-button 
                  class="btn2"
                  color="rgba(157, 164, 112, 0.12)"
                  @click="forgetPwdSubmit()"
                  >确认
              </van-button>
            </div>


          </div>
        </div>
	
		
		
      </div>
	  
	  
	  
	  <div class="online df_r">
	      <div class="" style="font-size:18px;color:red;" @click="$router.push('/online')">在线客服</div>
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
import { getImageCodeApi, registerApi } from "@/api/login";
import { forgetPwdApi,forgetPhoneCode } from "@/api/member";

import { getConfigKey } from "@/api/index";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  name: "forgetVue",
  components: {},
  data() {
    return {
      form: {
        phone: '',
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
      }
    };
  },
  computed: {
    ...mapGetters(["baseData"]),
  },
  mounted() {
    if (this.$route.query.code) {
      this.rform.code = this.$route.query.code;
    }
    this.getImageCode();

    //console.log(this.$route.path)

  },
  methods: {
    
    

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
	  forgetPhoneCode({phone:this.rform.phone,imgCode:this.rform.imgCode}).then((res) => {
		  this.$dialog({ message: res.msg, className: 'dialog-error' })
		  if (res.code != 200) {
			  this.getImageCode();
		  } else {
			  this.ccc();
		  }		
	  });
	},

    /**注册  */
    forgetPwdSubmit() {
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
		forgetPwdApi(this.rform).then((res) => {
		         
		  if (res.code == 200) {
		    //this.$toast.success("注册成功！前往登录");
		    Dialog({ message: res.msg, className: 'dialog-error' })
		    this.isReg = false;
		    this.$router.push({path: "/login",query:{name: res.data}});
		  } else {
		    this.getImageCode();
		    this.next = true;
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
  .container {

.tips {
	  	position: relative;
	    bottom: 10px !important;
	    justify-content: center;
	    font-size: 14px;
	    line-height: 40px;
	  height: 40px;
	    width: 97%;
	    .img-icon {
	      height: halfSize(34px);
	    }
	  }
	  .online {
	  	position: relative;
	  	bottom: 40px !important;
	  	justify-content: center;
	  	font-size: 14px;
	  	line-height: 40px;
	  height: 40px;
	  	width: 97%;
	  }

	//background: linear-gradient(180deg, rgba(163,74,78,1) 0%, rgba(163,74,78,1) 30%, rgba(255,255,255,1) 61%);
    //overflow-y: auto;
    height: 100%;
    .lg_top {
      // position: relative;
      // width: 50%;
      // height: halfSize(205px);
      // margin: 0px auto 0;


      .bg-top{
          /*height: halfSize(380px);
          background: no-repeat center top / 100% 100%;
          background-image: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url("@/assets/img/bg.jpg");
          background-size: 100% 100%;
          position: relative;*/
          // opacity: 0.4;
        }


    .logo {
      position: relative;
      top: 50px;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 320px;
	  text-align: center;
      img {
        width: 100%;
        height: 100%;
        //object-fit: contain;
      }
    }

      .reg-title{
        font-size: 24px;
        font-weight: 600;
        color: #121212;
        div:nth-child(2){
          background-color: rgb(239,185,183);
          padding: 2px 30px;
          height: 16px;
          opacity: 0.6;
          width: 0px;
          margin-top: -9px;
          letter-spacing: 8px;
        }
      }
      .reg-title-2{
        padding: 12px 0;
        font-size: 14px;
        color: #999999;
        span{
          color: #AC2023;
          font-weight: 600;
          font-size: 17px;
          letter-spacing: 3;
        }
      }
    }
    .form_wrap {
		background-color: #fff;
      justify-content: center;
      padding: 0 0 2rem 0;
	  //box-shadow: 0px -2px 12px 0px #E7001214;
	  //border:1px solid #f00;
	  margin: 0 auto;
	  margin-top: -10px;
	  position: relative;
	  z-index:20;
	  width: 95%;
	  box-sizing: border-box;
	text-align: left;
	  
	  .data_tabs {
	      width: 100%;
	      margin: 0 auto;
	      margin-top: -10px;
	      display: flex;
	      flex-direction: row;
	      align-items: flex-start;
	      height: 45px;
	      justify-content: space-between;
	      flex: none;
	      order: 0;
	      flex-grow: 1;
	    }
	    .data_tab {
	      display: flex;
	      flex-direction: row;
	      justify-content: center;
	      align-items: center;
	      text-align: center;
	      font-size: 16px;
	      
	        background: #e1dfd9;
	  		
	      color: #fff;
	    border-top-left-radius:5px;
	    border-top-right-radius:5px;
	      padding: 10px 0;
	      height:26px;
	    width: 100%;
	    }
	  		
	    .tab_active {
	      color:#fff;
	      font-weight: 600;
	      font-size: 16px;
	      display: flex;
	      flex-direction: row;
	      justify-content: center;
	      align-items: center;
	      gap: 10px;
	      //background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
	      background: linear-gradient(135deg, #AAB086 0%, #D8DFB5 100%);
	  
	    }
	  
	  .grid {
	  		  
	    display: grid;
	    grid-template-columns: repeat(2, 1fr);
	    grid-gap: 50px;
	    padding-top:10px;
	    margin: 30px auto 20px;
	  		font-size: 19px;
	  		
	  		line-height: 22px;
	  		text-align: center;
	  		.home-item {
	  			padding: 8px 13px;
	  			text-align: center;
	  			border:none;
	  			color: #3F3D38;
	  			font-weight: 600;
	  			span.active  {border-bottom: 3px solid #a8ad89;padding-bottom: 5px;}
	  			 span.no-active {border:none; padding-bottom: 5px; color:#999; font-weight:normal;}
	  		}
	  }
      .title {
        color: $font_color;
        text-align: center;
        font-size: 12px;
      }
      .rform {
        margin: 25px 15px 10px 15px;
        		//background-color: #3F3D38;
        		text-align: left;
        		
        		.van-cell {
        			border-bottom: 1px solid #f8ebe6;
        		}
        		
        .label {
        		width: 130px;
        		font-size: 15px;
        		color: #A7AF78;
        		margin:20px 0 5px 0;
        		text-align: left;
        }
		
		
		      
		
        .d_line {
          height: 15px;
        }
        .sign-up-tips{
          margin: 0 16px;
          color: red;
          font-size: 15px;
          padding-bottom: 50px;
          line-height: 24px;
        }
        .forget {
          color: $font_color;
          font: normal normal normal 15px Yuanti SC;
          padding:10px 0 0 0;
          height: 40px;
          align-items: center;
          .activeIcon,
          .inactiveIcon {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: $bg_color;
            border: 2px solid #419DF4;
          }
          .activeIcon {
            span {
              display: block;
              position: relative;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 12px;
              height: 12px;
              background: $bg_color_b;
              border-radius: 50%;
            }
          }
          .to_login {
            width: 100%;
            text-align: right;
            color: #585858;
          }
        }
        .p_box {
          align-items: center;
        }
      }
    }

    .btns {
      width: auto;
      margin: 10px;
	  margin-top: 0;
      justify-content: space-around;
	  height: 50px;
	  margin-top: 15px;
      .btn,.btn2 {

		width: 100%;
		background: rgba(157, 164, 112, 0.12);
		border-radius: 4px;
		
		color: #94ac01 !important;
		background: rgba(157, 164, 112, 0.12);
							  border: 1.5px solid #94ac01;
							  font-weight: 600;
      }
    }
    .lb_box {
      padding: 15px 20px;
      justify-content: space-between;
      /*color: $font_color_b;*/
       color:#999999;
      font-size: 16px;
      font-weight: 600;
    }

    .send_email {
      align-items: center;
	  height: 65px;
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
        position: absolute;
        right: 7px;
		width: 120px;
		height: 40px;
		display: inline-block;
		margin-left: 2px;
		img {height: 40px;width:110px;}
      }
      .phone_code {
		position: absolute;
        width: 140px;
        right: 0;
		display: inline-block;
			.van-button {
			    width: 130px;
			    height: 60px;
			    padding: 0;
			    margin: 20px 0 20px 2px;
			    font-size: 17px;
			    display: inline-block;
				color:#A7AF78;
				letter-spacing: 2px;
				
				background: none;
				border: none;
				font-weight: 500;
				//border-bottom: 1px solid #A7AF78;
			}
			.van-button__content {
				font-size: 14px;
			}
			.van-button--default {
				//background:linear-gradient(180deg,#e9e9e9,#ddd);
				color:#999;
			}
      }
    }
  }
}
::v-deep .van-field__error-message{
  font-size: 15px;
}

::v-deep .reg_form{
  input.van-field__control {
      color: $font_color;
      height: 100%;
      font-size: 16px;
    }
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
  border-radius: 8px;
  font-size: 15px;
  display:block;
}
::v-deep .btn2 .van-button {
  width: 100%;
  height: 48px;
  padding: 0;
  margin: 0;
  border-radius: 8px;
  font-size: 15px;
  display:block;
}
::v-deep .van-button__content{
  font-size:18px;
}
.w_white {
  color: #fff;
}
</style>
