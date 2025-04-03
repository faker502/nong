<template>
  <div class="page">
    <nav-bar title="修改支付密码" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
    <div class="part_2"></div>
    <div class="wrap">
      <van-form ref="form" class="rform" :show-error-message="true">
        <template v-if="regSmsSwitch == 2">
          <van-field
            v-model="form.oldPayPwd"
            placeholder="请输入原支付密码"
            :border="false"
            :type="showPassword.oldPayPwd ? 'text' : 'password'"
            readonly
            :error-message="errors.oldPayPwd"
            @click="showKeyboard0 = true"
            @focus="clearError('oldPayPwd')"
          >
            <template #right-icon>
              <van-icon :name="showPassword.oldPayPwd ? 'eye-o' : 'closed-eye'" @click.stop="togglePassword('oldPayPwd')" />
            </template>
          </van-field>
        </template>

        <van-field
          v-model="form.payPwd"
          placeholder="请输入新支付密码"
          :border="false"
          :type="showPassword.payPwd ? 'text' : 'password'"
          readonly
          :error-message="errors.payPwd"
          @click="showKeyboard = true"
          @focus="clearError('payPwd')"
        >
          <template #right-icon>
            <van-icon :name="showPassword.payPwd ? 'eye-o' : 'closed-eye'" @click.stop="togglePassword('payPwd')" />
          </template>
        </van-field>

        <van-field
          v-model="form.payPwd2"
          placeholder="请再次输入新支付密码"
          :border="false"
          :type="showPassword.payPwd2 ? 'text' : 'password'"
          readonly
          :error-message="errors.payPwd2"
          @click="showKeyboard2 = true"
          @focus="clearError('payPwd2')"
        >
          <template #right-icon>
            <van-icon :name="showPassword.payPwd2 ? 'eye-o' : 'closed-eye'" @click.stop="togglePassword('payPwd2')" />
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
          <van-button @click="commitPassword">修改</van-button>
        </div>
      </van-form>

      <van-number-keyboard
        v-model="form.oldPayPwd"
        :show="showKeyboard0"
        @blur="handlePassword0"
        maxlength="6"
      />
      <van-number-keyboard
        v-model="form.payPwd"
        :show="showKeyboard"
        @blur="handlePassword"
        maxlength="6"
      />
      <van-number-keyboard
        v-model="form.payPwd2"
        :show="showKeyboard2"
        @blur="handlePassword2"
        maxlength="6"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updatePayPwdApi } from "@/api/member";
import { getConfigKey } from "@/api/index";

export default {
  name: "setPayPassword",
  data() {
    return {
      form: {
        oldPayPwd: "",
        payPwd: "",
        payPwd2: "",
        idCard: ""
      },
      errors: {
        oldPayPwd: "",
        payPwd: "",
        payPwd2: "",
        idCard: ""
      },
      showKeyboard0: false,
      showKeyboard: false,
      showKeyboard2: false,
      regSmsSwitch: 2,
      showPassword: {
        oldPayPwd: false,
        payPwd: false,
        payPwd2: false
      }
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

    clearError(field) {
      this.errors[field] = "";
    },

    handlePassword0() {
      this.showKeyboard0 = false;
      this.clearError('oldPayPwd');
    },

    handlePassword() {
      this.showKeyboard = false;
      this.clearError('payPwd');
    },

    handlePassword2() {
      this.showKeyboard2 = false;
      this.clearError('payPwd2');
    },

    togglePassword(field) {
      this.showPassword[field] = !this.showPassword[field];
    },

    validateForm() {
      let isValid = true;
      this.errors = {
        oldPayPwd: "",
        payPwd: "",
        payPwd2: "",
        idCard: ""
      };

      if (this.regSmsSwitch == 2 && (!this.form.oldPayPwd || this.form.oldPayPwd.length !== 6)) {
        this.errors.oldPayPwd = "请输入6位原支付密码";
        isValid = false;
      }

      if (!this.form.payPwd || this.form.payPwd.length !== 6) {
        this.errors.payPwd = "请输入6位新支付密码";
        isValid = false;
      }

      if (!this.form.payPwd2 || this.form.payPwd2.length !== 6) {
        this.errors.payPwd2 = "请输入6位确认支付密码";
        isValid = false;
      } else if (this.form.payPwd2 !== this.form.payPwd) {
        this.errors.payPwd2 = "两次输入的密码不一致";
        isValid = false;
      }

      if (!this.form.idCard) {
        this.errors.idCard = "请输入本人身份证号码";
        isValid = false;
      }

      return isValid;
    },

    commitPassword() {
      if (!this.validateForm()) {
        return;
      }

      updatePayPwdApi(this.form).then((res) => {
        this.$dialog.alert({ message: res.msg });
        if (res.code == 200) {
          this.form.oldPayPwd = '';
          this.form.payPwd = '';
          this.form.payPwd2 = '';
          this.form.idCard = '';
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F8F8F8;

  .part_2 {
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
          border-radius: 22px;
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