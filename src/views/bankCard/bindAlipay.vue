<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="支付宝"  titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>
    <div class="container">
      <div class="wrap">
        <van-form ref="rform" class="rform" :show-error-message="false">
          <div class="itme df_r">
            <div class="label">真实姓名</div>
            <van-field v-model="form.bankUserName" placeholder="请输入真实姓名" autosize autocomplete="off" :border="false"
              :readonly="true">
            </van-field>
          </div>
          <div class="itme df_r">
            <div class="label">支付宝账户</div>
            <van-field v-model="form.bankNumber"  placeholder="请输入支付宝账户" autosize autocomplete="off" :border="false" :readonly="bindOk" />
          </div>
          <div class="tips">
            <p>
              注：请必须绑定实名认证人的支付宝账户
            </p>
          </div>
        </van-form>
        <div class="bottom" v-if="isSubmit">
          <div class="btns df_r">
            <van-button v-if="submit" @click="bindBank"
              class="btn" :disabled="form.status == 1">
              添加
            </van-button>
            <van-button v-else  class="btn"
              :disabled="form.status == 1">
              添加...
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bindBankApi, getUserAndOneBankApi } from "@/api/member";
export default {
  name: "Cert",
  data() {
    return {
      form: {
        bankNumber: "",
        bankUserName: "",
        type: 1,
      },
      forntImage: "",
      reverseImage: "",
      submit: true,
      isSubmit: true,
	  bindOk: false,
    };
  },
  mounted() { 
    this.getRealName();
  },
  methods: {
    getRealName() {

      getUserAndOneBankApi({bank:1}).then((res) => {
      
        if (res.data.user.isReal == 2) {
          this.$dialog({ message: '请您完成实名认证', className: 'dialog-error' }).then(() => {
            this.$router.push('/set/cert');
          });
          return false;
        }
        if (res.data.user.name != "" && res.data.bank.number != "") {
          this.isSubmit = false;
        }
          
        this.form.bankUserName = res.data.user.name;
        var banklist = res.data.bank

        var b = banklist.length

          if (b == 1) {
              this.form.bankNumber = banklist[0].number;
			  this.bindOk = true;
          } else if (b ==0 ){
          this.isSubmit = true;

          }
        
          
      });
    },
    bindBank() {
      if (this.form.bankNumber == undefined || this.form.bankNumber.length <= 0) { 
        this.$dialog({ message: '请填写支付宝账户', className: 'dialog-error' });
        return false;
      }
      bindBankApi(this.form).then((res) => {
        if (res.code == 200) {
          this.$dialog({ message: '支付宝账户绑定成功', className: 'dialog-error' });
          this.$router.push("/withdraw");
        } else {
          this.$dialog({ message: res.msg, className: 'dialog-error' });
        }
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
  background: url('@/assets/photo/top2.webp') top left no-repeat;
  //background-color: #a9ae8a;
  background-size: 100% 168px;
  
  .part_1 {
    //height: halfSize(50px);
    padding: 70px 10px 0;
  }

  .container {
    height: calc(100% - 48px);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 0 auto;
	width: 95%;

    .wrap {
      padding: 10px 10px;

      .title {
        font-size: 16px;
        color: $font_color_dark;
        // font-weight: bold;
      }

      .rform {
        background: $bg_color;
        padding: 5px 10px 40px;
        border-radius: 5px;

        .itme {
          justify-content: flex-start;
          margin-bottom: 20px;
          margin-top: 10px;
          display: block;
        }

        .label {
          width: 130px;
          font-size: 16px;
          color: #A7AF78;
          margin: 15px 10px;
        }

        .tips {
          color: #D20B0B;
          line-height: 1.5;
          font-size: 14px;
        }
      }

      .bottom {
        
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

::v-deep .van-form {
  .van-cell {
    font-size: 13px;
    padding: 10px 5px;
    background-color: $base_bg_color;
    border-bottom: 1px solid #c6c6c6;
  }

  .van-field__body {
    height: 30px;
  }

  .van-field__label {
    color: #A7AF78;
    display: flex;
    align-items: center;
  }

  input.van-field__control {
    color: $font_color_dark;
    height: 100%;
    padding-left: 10px;
    font-size: 16px;
  }

  input.van-field__control::-webkit-input-placeholder {
    color: #bebebe !important;
  }
}

::v-deep .btns {
  .van-button {

 width: 90%;
	  margin: 0 auto;
	  //background: linear-gradient(91.27deg, #E7514C 0%, #CB2D27 100%);
	  border-radius: 5px;
	  text-align: center;
	  font-size: 18px;
	  padding: 16px;
	  
	      color: #A7AF78 !important;
	  	border: 1.5px solid #AAB086;
	  	background: rgba(157, 164, 112, 0.12);
  }
}
</style>
