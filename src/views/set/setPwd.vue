<template>
  <div class="page">
    <nav-bar title="支付密码设置"  />
    <div class="part_1"></div>
    <div class="part_2">
      <van-form ref="form" class="pt30 tx-form">
        <div class="tx-form-param">
          <div>
            <div style="margin: 30px 0px 15px;font-size:15px;color:#3F3D38;">支付密码</div>
            <div>
              <van-cell-group style="height: 50px;margin-top: 14px;">
                <van-password-input height="90%" :value="form.payPwd" :focused="showKeyboard" :length="6" :gutter="10"
                  @focus="showKeyboard = true" @blur="handlePassword" />
              </van-cell-group>
              <van-number-keyboard v-model="form.payPwd" :show="showKeyboard" @blur="handlePassword" />
            </div>
          </div>
          <div>
            <div style="margin: 15px 0px;font-size:15px;color:#3F3D38;">确认支付密码</div>
            <div>
              <van-cell-group style="height: 50px;margin-top: 14px;">
                <van-password-input height="90%" :value="form.payPwd2" :focused="showKeyboard2" :length="6" :gutter="10"
                  @focus="showKeyboard2 = true" @blur="handlePassword2" />
              </van-cell-group>
              <van-number-keyboard v-model="form.payPwd2" :show="showKeyboard2" @blur="handlePassword2" />
            </div>
          </div>
        </div>
      </van-form>
      <div class="tx-button">
        <div class="button" @click="commitPassword">创建支付密码</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { setPayPwdApi } from "@/api/member";
import loading from "@/components/Loading.vue";
import { Toast } from "vant";

export default {
  name: "setPayPassword",
  inject: ["reload"],
  data() {
    return {
      form: {
        payPwd: "",
        payPwd2: ""
      },
      isShow: false,
      showKeyboard: false,
      showKeyboard2: false,
      payPwd: undefined,
      loading: false,
      payPassword: ''
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {},
  mounted() {},
  methods: {
    account() {
      getAccountApi().then((res) => {
        this.balance = res.data.account.balance;
      });
    },
    handlePassword(){
      this.showKeyboard = false;
      if (this.form.payPwd.length != 6) {
        this.$dialog({ message: '请输入6位支付密码！', className: 'dialog-error' })
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
    commitPassword() { 
      if (this.form.payPwd.length == 6 && this.form.payPwd2.length == 6) {
        if (this.form.payPwd != this.form.payPwd2) {
          this.$dialog({ message: '支付密码和确认支付密码不一致，请重新输入！', className: 'dialog-error' })
          return false;
        }
        this.$refs.form.validate().then(() => {
          console.log(this.form);
          setPayPwdApi(this.form).then((res) => {
            if (res.code != 200) {
              this.$dialog({ message: res.msg, className: 'dialog-error' })			  
              return false;
            } else { 
              //this.$dialog({ message: res.msg, className: 'dialog-error' })
			  Toast(res.msg);
              this.form.payPwd = this.form.payPwd2 = '';
			  this.$router.go(-1);
              return false;
            }
          }); 
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.$dialog({ message: '请输入6位支付密码或确认支付密码！', className: 'dialog-error' })
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
  font-size: 18px;
  padding: 20px 0 10px;
  font-weight: 600;
  color: #2F6DB3;
  border-bottom: 1px solid #EEEEEE;
}

::v-deep .van-field__label {
  color: #2F6DB3;
}

::v-deep .van-field__control {
  color: #2F6DB3;
}

::v-deep input::placeholder {
  color: #2F6DB3;
  font-weight: 500;
}

.page {
  height: 100%;
  position: relative;
  overflow-y: auto;

  .navbar {
    background: $bg_liner_color_red;
  }

  .navbar-title {
    color: $font_color;
    font-weight: 600;
  }

  .part_1 {
    background: $bg_liner_color_red;
    height: halfSize(50px);
  }

  .part_2 {
    width: 100%;
    background-color: #ffffff;
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
      }
    }

    .tx-button {
      width: 100%;
      text-align: center;
      margin: 25px auto 0;

      .button {
        width: 76%;
        margin: 0 auto;
        background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
        border-radius: 5px;
        padding: 15px;
        font-size: 16px;
        color: #fff;
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