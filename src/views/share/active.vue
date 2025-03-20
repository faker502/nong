<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="激活"  />
    </div>
    <div class="container">
      <div><img src="@/assets/img/project-banner.webp" width="100%" height="220px"></div>
      <div class="wrap">  
        <van-form ref="rform" class="rform" :show-error-message="false">
          <div class="tips">
            <p>
              提交100元可激活账户，账户激活后可获得专属邀请码，邀请好友加入；激活账户可于6月15日退回现金余额（可提现）！
            </p>
          </div>
        </van-form>

        <div class="bottom">
          <!-- <div class="pro df_r">
            <svg-icon iconClass="radio_w" :size="16" />
            <p class="pro_text" @click="$router.push('/news/info?noticeId=13')">
              我已阅读并同意 <span class="pro_txt">《实名认证服务协议》</span>
            </p>
          </div> -->
          <div class="btns df_r">
            <van-button  @click="$router.push('/recharge');" color="linear-gradient(91.27deg, #E7514C 0%, #CB2D27 100%)"
              class="btn" :disabled="form.status === 1">立即激活</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { uploadIdImgApi } from "@/api/member";
import { mapActions } from "vuex";
import { Dialog } from "vant";
export default {
  name: "Cert",
  data() {
    return {
      submit: true
    };
  },
  mounted() { },
  methods: {
    handleCert() {
      if (this.form.realName == undefined || this.form.realName.length < 1) {
        Dialog({ message: '请填写真实姓名', className: 'dialog-error' })
        return false;
      }
      if (this.form.idCard == undefined || this.form.idCard.length < 18) {
        Dialog({ message: '请填写身份证号码', className: 'dialog-error' })
        return false;
      } else {
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(this.form.idCard)) {
          Dialog({ message: '请填写正确的身份证号码', className: 'dialog-error' })
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

        return false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-dialog .van-button__text {
  background: radial-gradient(#F4F9FE, #D7E8FA);
  border-radius: 6px;
}
.page {
  height: 100%;
  position: relative;
  .part_1 {
    //background: $bg_liner_color_other;
    height: halfSize(50px);
    padding: 70px 10px 0;
  }

  .container {
    height: calc(100% - 48px);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: -26px;
    background-color: #ffffff;
    .wrap {
      padding: 10px 10px;

      .title {
        font-size: 16px;
        color: $font_color_dark;
        // font-weight: bold;
      }

      .rform {
        background: $bg_color;
        padding: 5px 10px 10px;
        border-radius: 5px;
        text-align: center;
        .tips {
          margin-top: 20px;
          color: #D20B0B;
          line-height: 2;
          font-size: 18px;
        }
      }

      .bottom {
        margin-top: 1.4rem;

        .pro {
          justify-content: center;

          &_text {
            margin-left: 5px;
          }

          &_txt {
            color: #3198ff;
          }
        }
      }

      .btns {
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
}

.van-button__text {
  font-size: 18px;
  font-weight: 600;
}

::v-deep .van-form {
  .van-cell {
    font-size: 13px;
    padding: 10px 0;
    border-radius: 5px;
    background-color: $base_bg_color;
    border: 1px solid #c6c6c6;
  }

  .van-field__body {
    height: 30px;
  }

  .van-field__label {
    color: $font_color_dark;
    display: flex;
    align-items: center;
  }

  input.van-field__control {
    color: $font_color_dark;
    height: 100%;
    padding-left: 10px;
  }

  input.van-field__control::-webkit-input-placeholder {
    color: #bebebe !important;
  }
}

::v-deep .btns {
  .van-button {
    padding: 0;
    border: none;
    border-radius: halfSize(18px);
    font-size: 16px;
    width: halfSize(519px);
    height: halfSize(86px);
    letter-spacing: 1px;
    color: $font_color_white !important;
  }
}
</style>
