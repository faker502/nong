<template>
  <div class="page">
    <nav-bar title="支付密码设置" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
    <div class="part_1"></div>
    <div class="wrap">
      <van-form ref="form" class="rform" :show-error-message="true">
        <div class="tx-form-param">
          <van-field
            v-model="form.payPwd"
            type="password"
            maxlength="6"
            placeholder="请输入6位支付密码"
            :border="false"
            readonly
            :error-message="errorMsg.payPwd"
            @click="showKeyboard = true"
            @focus="showKeyboard = true; errorMsg.payPwd = ''"
            @blur="handlePassword"
          />
          <van-field
            v-model="form.payPwd2"
            type="password"
            maxlength="6"
            placeholder="请再次输入6位支付密码"
            :border="false"
            readonly
            :error-message="errorMsg.payPwd2"
            @click="showKeyboard2 = true"
            @focus="showKeyboard2 = true; errorMsg.payPwd2 = ''"
            @blur="handlePassword2"
          />
        </div>
        <div class="btns">
          <van-button 
            :disabled="isButtonDisabled"
            @click="commitPassword"
          >创建支付密码</van-button>
        </div>
      </van-form>
      <van-number-keyboard v-model="form.payPwd" :show="showKeyboard" @blur="handlePassword" />
      <van-number-keyboard v-model="form.payPwd2" :show="showKeyboard2" @blur="handlePassword2" />
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
      payPassword: '',
      errorMsg: {
        payPwd: '',
        payPwd2: ''
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isButtonDisabled() {
      return this.form.payPwd.length !== 6 || this.form.payPwd2.length !== 6;
    }
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
        this.errorMsg.payPwd = '请输入6位支付密码！';
        return false;
      }
      this.errorMsg.payPwd = '';
    },
    handlePassword2(){
      this.showKeyboard2 = false;
      if (this.form.payPwd2.length != 6) {
        this.errorMsg.payPwd2 = '请输入6位确认支付密码！';
        return false;
      }
      this.errorMsg.payPwd2 = '';
    },
    commitPassword() { 
      if (this.form.payPwd.length == 6 && this.form.payPwd2.length == 6) {
        if (this.form.payPwd != this.form.payPwd2) {
          this.errorMsg.payPwd2 = '支付密码和确认支付密码不一致！';
          return false;
        }
        this.$refs.form.validate().then(() => {
          console.log(this.form);
          setPayPwdApi(this.form).then((res) => {
            if (res.code != 200) {
              this.$dialog({ message: res.msg, className: 'dialog-error' })			  
              return false;
            } else { 
              Toast(res.msg);
              this.form.payPwd = this.form.payPwd2 = '';
              this.errorMsg.payPwd = '';
              this.errorMsg.payPwd2 = '';
              this.$router.go(-1);
              return false;
            }
          }); 
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F8F8F8;

  .part_1 {
    width: 100%;
    height: 165px;
    background: #FFFFFF;
    background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
  }

  ::v-deep .van-icon:before {
    background: #fff!important;
    border-radius: 50%;
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
          border-radius: 22px;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 500;

          &:active {
            opacity: 0.9;
          }

          &--disabled {
            background: #CCCCCC;
            cursor: not-allowed;
          }
        }
      }
    }
  }
}

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
  color: #333;
  border-bottom: 1px solid #EEEEEE;
}

::v-deep .van-field__label {
  color: #333;
}

::v-deep .van-field__control {
  color: #333;
  font-size: 14px;
}

::v-deep input::placeholder {
  color: #333;
  font-weight: 500;
}

.error-text {
  color: #FF4D4F;
  font-size: 12px;
  margin-top: 4px;
  padding-left: 16px;
}
</style>