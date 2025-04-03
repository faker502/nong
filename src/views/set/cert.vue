<template>
  <div class="page">
    <nav-bar title="实名信息" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
    <div class="part_2"></div>
    <div class="wrap">
      <van-form ref="rform" class="rform" :show-error-message="true">
        <van-field
          v-model="form.realName"
          placeholder="请输入真实姓名"
          :border="false"
          :readonly="form.status == 1"
          :error-message="errors.realName"
          @focus="clearError('realName')"
        />
        <van-field
          v-model="form.idCard"
          placeholder="请输入身份证号码"
          :border="false"
          :readonly="form.status == 1"
          :error-message="errors.idCard"
          @focus="clearError('idCard')"
        />
        
        <div class="btns">
          <van-button 
            v-if="isReal != 1"
            @click="handleCert"
            :disabled="form.status == 1"
          >
            {{ submit ? '认证' : '认证中...' }}
          </van-button>
          <van-button v-else :disabled="form.status == 1">已认证</van-button>
        </div>
      </van-form>
    </div>

    <div class="tips">
      <p class="title">注意事项：</p>
      <p class="item">
        <span class="num">1、</span>
        <span class="text">请确认本人身份信息，实名认证成功后，身份信息与此账号唯一绑定，不可更换其他人</span>
      </p>
      <p class="item">
        <span class="num">2、</span>
        <span class="text">您绑定的身份证名字必须和银行卡名字一致</span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { uploadIdImgApi, getUserApi } from "@/api/member";
import { mapActions } from "vuex";
import { Dialog } from "vant";

export default {
  name: "Cert",
  data() {
    return {
      form: {
        idCard: "",
        realName: "",
        status: "",
      },
      errors: {
        realName: "",
        idCard: ""
      },
      isReal: 2,
      submit: true
    };
  },
  created() { 
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserApi().then((res) => {
        this.isReal = res.data.isReal;
        if (this.isReal == 1) { 
          this.form.realName = res.data.name;
          this.form.idCard = res.data.idNumber;
          this.form.status = res.data.status;
        }
      });
    },

    clearError(field) {
      this.errors[field] = "";
    },

    handleCert() { 
      this.errors = {
        realName: "",
        idCard: ""
      };

      if (!this.form.realName) { 
        this.errors.realName = "请填写真实姓名";
        return false;
      }

      if (!this.form.idCard) {
        this.errors.idCard = "请填写身份证号码";
        return false;
      } else {
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(this.form.idCard)) {
          this.errors.idCard = "请填写正确的身份证号码";
          return false;
        }
      }
      
      this.submit = false;
      uploadIdImgApi(this.form).then((res) => {
        this.submit = true;
        if (res.code == 200) {
          Dialog({ message: res.msg, className: 'dialog-success' })
          this.$router.push("/");
        } else {
          Dialog({ message: res.msg, className: 'dialog-error' })
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F8F8F8;

  ::v-deep .van-icon:before {
    background: #fff!important;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .part_2 {
    width: 100%;
    height: 165px;
    background: #FFFFFF;
    background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
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
            color: #FFFFFF;
          }
        }
      }
    }
  }

  .tips {
    margin: 16px 12px;
    padding: 16px;
    border-radius: 4px;

    .title {
      font-size: 14px;
      color: #6C6E6C;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .item {
      display: flex;
      margin-bottom: 8px;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }

      .num {
        color: #6C6E6C;
        font-size: 14px;
        margin-right: 4px;
      }

      .text {
        color: #6C6E6C;
        font-size: 14px;
        flex: 1;
      }
    }
  }
}
</style>
