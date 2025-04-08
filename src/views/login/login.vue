<template>
  <div class="page">
    <nav-bar title="" leftIconColor="##313231" class="nav-top" />

    <div class="container">
      <div class="lg_top">
        <div class="bg-top">欢迎登陆！</div>
        <div class="logo">
          <!-- <img src="@/assets/photo/logo-alt.png" /> -->
          登录账号即可参与更多助农活动
        </div>
      </div>

      <div class="form_wrap df_c">
        <div class="data_tabs df_r">
          <div class="data_tab tab_active">手机登录</div>
          <div class="data_tab" @click="$router.push('/signup')">立即注册</div>
        </div>

        <!-- 登录表单  animate__animated-->
        <div class="login_form animate__fadeInLeft">
          <van-form ref="form" class="rform">
            <!--<van-cell-group inset>
              <van-field
                @keyup="getInputValue"
                v-model="form.phone"
                autosize
                label=""
                type="text"
                placeholder="请输入手机号"
              />
            </van-cell-group>-->

            <van-cell-group inset class="mt15">
              <van-field
                @input="getInputValue"
                :label-width="60"
                label="+86"
                class="input-type"
                type="number"
                placeholder="请输入手机号"
                v-model="form.phone"
                error-message
              />
            </van-cell-group>

            <van-cell-group inset class="mt15" style="margin-top: 24px">
              <van-field
                @input="getInputValue"
                :label-width="60"
                class="input-type"
                type="password"
                v-show="downIcon"
                placeholder="请输入密码"
                @click-right-icon="eye"
                right-icon="eye"
                v-model="form.password"
                error-message
              />

              <van-field
                @input="getInputValue"
                :label-width="60"
                class="input-type"
                type="text"
                v-show="!downIcon"
                placeholder="请输入密码"
                @click-right-icon="eye"
                right-icon="eye-o"
                v-model="form.password"
                error-message
              />
            </van-cell-group>

            <div class="grid2 middle-items">
              <div class="home-item1">
                <van-checkbox v-model="form.rememberMe" shape="round" icon-size="16px">
                  记住密码
                </van-checkbox>
              </div>
              <div class="home-item2">
                <div @click="$router.push('/forget')">
                  忘记密码?
                </div>
              </div>
            </div>
          </van-form>
        </div>
        <!-- 注册表单 -->

        <!--login button start -->
        <div
          class="btns df_r"
          :class="isReg ? 'animate__fadeInRight' : 'animate__fadeInLeft'"
        >
          <div class="btn">
            <van-button
              class="btn"
              :class="isOk ? 'btn-login2' : 'btn-login1'"
              @click="handleSubmit"
            >
              立即登录
            </van-button>
          </div>
        </div>

        <!--login button end -->
      </div>

      <!-- <div class="df_r online">
        <div class="" style="font-size: 18px" @click="$router.push('/online')">
          在线客服
        </div>
      </div> -->
      <div class="customer-service" @click="$router.push('/online')">
      <p class="service-text">
        账号遇到问题？
        <span class="highlight">人工客服</span>
        解决
      </p>
    </div>

      <!-- 	     <div class="tips df_r">
	       <a href="javascript:void(0);" style="color:#919191">登录即表示您同意<span style="color:#575551;font-weight: 600;" @click="$router.push({path:'/news/info', query:{noticeId:15}});">用户协议</span>与<span style="color:#575551;font-weight: 600;" @click="$router.push({path:'/news/info', query:{noticeId:16}});">隐私协议</span>
	       </a>       
	     </div> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Cookies from "js-cookie";
import { encrypt, decrypt, LoginRegistencrypt } from "@/utils/jsencrypt";
import { getConfigKey } from "@/api/index";
import cache from "@/utils/cache.js";
import { getImageCodeApi, registerApi } from "@/api/login";
import { Toast } from "vant";

export default {
  name: "LoginVue",
  components: {},
  data() {
    return {
      form: {
        phone: "",
        password: "",
        rememberMe: false,
      },
      forget: 0,
      rform: {},
      downIcon: true,
      capcatImg: "",
      rememberMe: false,
      isReg: false,
      isOk: false,
      activeIcon: require("@/assets/images/radio_btn.png"),
      isShow: false,
      loadingShow: false,
      phonePattern: /^1[3456789]\d{9}$/,
      passwdPattern:
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\._\+(){}])[0-9a-zA-Z!@#$%^&*,\\._\+(){}]{8,20}$/,
      rules: {
        phone: [
          // 必填
          { required: true, message: "请填写手机号码", trigger: "blur" },
          // 1  3-9  开头  在家 9 个0-9数字
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号不正确",
            trigger: "blur",
          },
        ],
        // 密码校验 长度不能小于8位且不能大于20位字符,必须包含大写字母、小写字母、数字和特殊符号
        password: [
          { required: true, message: "请填写登录密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度必须介于6到20位之间",
            trigger: "blur",
          },
        ],
      },
      rules2: {
        phone: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          // 1  3-9  开头  在家 9 个0-9数字
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请填写登录密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在6 到 20 个字符",
            trigger: ["blur", "change"],
          },
        ],
        password2: [
          { required: true, message: "请填写登录确认密码", trigger: "blur" },
        ],
        imgCode: [
          { required: true, message: "请填输入图形验证码", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入邀请码", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["baseData"]),
  },
  mounted() {
    if (this.$route.query.name) {
      this.form.phone = this.$route.query.name;
    }
    //this.getImageCode();
    this.getCookie();
    this.getInputValue();
    this.getConfig();

    try {
      let that = this;
      window.flutter_inappwebview
        .callHandler("LoginGet")
        .then(function (account) {
          console.log("flutter: " + account);
          let index = account.indexOf("__SP__");
          if (index !== -1) {
            that.form.phone = account.substr(0, 11);
            that.form.password = account.substr(17);
          }
        });
    } catch (e) {}
  },
  methods: {
    ...mapActions(["Login"]),
    /*getImageCode() {
      getImageCodeApi().then((res) => {
        this.capcatImg = "data:image/gif;base64," + res.img;
      });
    },*/
    getCookie() {
      const username = Cookies.get("phone");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.form = {
        phone: username === undefined ? this.form.phone : username,
        password:
          password === undefined ? this.form.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },

    getConfig() {
      getConfigKey({ key: "registerSwitch" }).then((res) => {
        this.forget = res.data.forget;
      });
    },

    eye() {
      this.downIcon = !this.downIcon;
    },
    getInputValue() {
      if (this.form.phone.length == 11 && this.form.password.length >= 6) {
        this.isOk = true;
      } else {
        this.isOk = false;
      }
    },
    /**登录 */
    handleSubmit() {
      this.getInputValue();
      if (!this.isOk) {
        return false;
      }
      this.$refs.form
        .validate()
        .then(() => {
          this.visible = false; //表单验证通过后手动关闭弹框
          if (this.form.rememberMe) {
            Cookies.set("phone", this.form.phone, { expires: 30 });
            Cookies.set("password", encrypt(this.form.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.form.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("phone");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }

          //this.Login({key: encrypt(JSON.stringify(this.form))});
          //console.log(LoginRegistencrypt(JSON.stringify(this.form)));
          //debugger;
          this.Login({
            key: LoginRegistencrypt(JSON.stringify(this.form)),
            u: this.form.phone,
            p: this.form.password,
            r: this.form.rememberMe,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**注册  */
    handleToReg() {
      //debugger;
      this.$refs.rform
        .validate()
        .then(() => {
          if (this.rform.password.length < 6) {
            this.$dialog({
              message: "登录密码不能小于6位",
              className: "dialog-error",
            });
            return false;
          } else if (this.rform.password != this.rform.password2) {
            this.$dialog({
              message: "登录密码与确认密码不一致",
              className: "dialog-error",
            });
            return false;
          }
          this.visible = false; // 表单验证通过后手动关闭弹框
          //debugger;
          registerApi(this.rform)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                //this.$toast.success("注册成功！前往登录");
                this.$dialog({
                  message: "注册成功，去登录",
                  className: "dialog-error",
                });
                this.isReg = false;
              } else {
                //this.$toast.fail("注册通道繁忙，请联系客服");
                this.$dialog({ message: res.msg, className: "dialog-error" });
                return false;
              }
            })
            .catch((err) => {
              this.getImageCode();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**跳转客服 */
    handleToKefu() {},
  },
};
</script>
<style lang="scss" scoped>
.van-bottom {
  display: none !important;
}
.page {
  height: 100%;
  position: relative;
  background: url("@/assets/photo/logo-alt.png") no-repeat left top;
  display: flex;
  flex-direction: column;
  
  .container {
    text-align: center;
    flex: 1;
    display: flex;
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
      padding: 0 0 2rem 0;
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
        // border-top-left-radius: 5px;
        // border-top-right-radius: 5px;
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
        //background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
        // background: linear-gradient(135deg, #aab086 0%, #d8dfb5 100%);
        // background: radial-gradient(151.51% 116.67% at 47.57% 0%, #7E963C 0%, #455117 100%);
        background: url("@/assets/photo/tab_active.png") no-repeat center center;
        background-size: 100% 100%;

      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 50px;
        padding-top: 10px;
        margin: 30px auto 20px;
        font-size: 19px;

        line-height: 22px;
        text-align: center;
        .home-item {
          padding: 8px 13px;
          text-align: center;
          border: none;
          color: #3f3d38;
          font-weight: 600;
          span.active {
            border-bottom: 3px solid #a8ad89;
            padding-bottom: 5px;
          }
          span.no-active {
            border: none;
            padding-bottom: 5px;
            color: #999;
            font-weight: normal;
          }
        }
      }

      .grid2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
        width: auto;
        margin: 20px 10px;
        padding: 0 10px;
        font-size: 16px;
        line-height: 22px;
        text-align: left;
        margin-top: 5px;
        
        .home-item1 {
          padding: 0;
          text-align: left;
          
          ::v-deep .van-checkbox__label {
            color: #4B594A;
            font-size: 12px;
          }
        }
        
        .home-item2 {
          padding: 0;
          text-align: right;
          color: #4B594A;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
        }
      }

      .title {
        color: $font_color;
        text-align: center;
        font-size: 12px;
      }
      .rform {
        margin: 25px 0 10px 0;
        text-align: left;

        .van-cell {
          height: 44px;
          line-height: 44px;
          padding: 0 10px;
          border: none;
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
            display: flex;
            align-items: center;
            padding-left: 10px;
          }
        }

        .label {
          width: 130px;
          font-size: 15px;
          color: #a7af78;
          margin: 20px 0 5px 0;
          text-align: left;
        }

        .d_line {
          height: 15px;
        }

        .forget {
          color: $base_color;
          font: normal normal normal 15px Yuanti SC;

          margin-top: 0;
          margin-bottom: 30px;
          align-items: center;
          .activeIcon,
          .inactiveIcon {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: $bg_color;
            border: 2px solid $base_color;
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
            color: $font_color_b;
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

      .btn {
        width: 100%;
        color: #fff;
        
        .van-button {
          width: 100%;
          height: 44px;
          line-height: 44px;
          border-radius: 22px;
          font-size: 16px;
          font-weight: 600;
          
          &.btn-login1 {
            color: #999;
            background: #CCCCCC;
            border: none;
            pointer-events: none;
          }
          
          &.btn-login2 {
            color: #fff;
            background: #4B594A;
            border: none;
          }
        }
      }
    }
    .lb_box {
      font-size: 16px;
      font-weight: 600;
      color: #3f3d38;
      float: right;
    }

    .online {
      position: relative;
      padding: 20px 0;
      justify-content: center;
      font-size: 14px;
      line-height: 40px;
      background: #fff;
      width: 97%;
      color: #94ac01;
      margin-top: auto;
    }
  }

  //background: url('@/assets/img/login/bottom.png') no-repeat 90% 100%;
  //background-size: 100% 40%;
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
</style>
