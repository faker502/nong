<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="实名认证" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>
    <div class="container">
      <div class="wrap">
        <van-form ref="rform" class="rform" :show-error-message="false">
          <div class="itme df_r">
			  <div class="label">姓名</div>
            <van-field
              v-model="form.realName"
              placeholder="请输入真实姓名"
              autosize
              autocomplete="off"
              :border="false"
              :readonly="form.status == 1"
            >
            </van-field>
          </div>
          <div class="itme df_r">
			  <div class="label">身份证号码</div>
            <van-field
              v-model="form.idCard"
              placeholder="请输入身份证号码"
              autosize
              autocomplete="off"
              :border="false"
              :readonly="form.status == 1"
            >
            </van-field>
          </div>
		  
		  <div class="bottom">
		    <!-- <div class="pro df_r">
		      <svg-icon iconClass="radio_w" :size="16" />
		      <p class="pro_text" @click="$router.push('/news/info?noticeId=13')">
		        我已阅读并同意 <span class="pro_txt">《实名认证服务协议》</span>
		      </p>
		    </div> -->
		    <div class="btns df_r" v-if="this.isReal != 1">
		      <van-button v-if="submit"
		        @click="handleCert"
		        class="btn"
		        :disabled="form.status == 1"
		        >认证</van-button
		      >
		      <van-button v-else class="btn"
		        :disabled="form.status == 1">认证中...</van-button>
		    </div>
			
			<div class="btns df_r" v-else>
			  <van-button
			    class="btn"
			    :disabled="form.status == 1"
			    >已认证</van-button>			
			</div>
			
		  </div>
		  
          <!-- <div class="tips">
            <p>注意事项：</p>
            <p>
              <span>1、</span>
              <span>请确认本人身份信息，实名认证成功后，身份信息与此账号唯一绑定，不可更换其他人</span>
            </p>
            <p>
              <span>2、</span>
              <span>您绑定的身份证名字必须和银行卡名字一致</span>
            </p>
          </div> -->
        </van-form>


		
		
		
      </div>
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
      cardType: "居民身份证",
      forntImg: require("@/assets/img/idcard_front.png"),
      reverseImg: require("@/assets/img/idcard-back.png"),
      form: {
        idCard: "",
        realName: "",
		status: "",
      },
      isReal: 2,
      forntImage: "",
      reverseImage: "",
      submit: true
    };
  },
  created() { 
    this.getUserInfo();
  },
  mounted() {},
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
    handleCert() { 
      if (this.form.realName == undefined || this.form.realName.length < 1) { 
        this.$myMsg.notify({ content: '请填写真实姓名', type: 'error', noNotifyBtn: false, time: 1000 });
        return false;
      }
      if (this.form.idCard == undefined) {
        this.$myMsg.notify({ content: '请填写身份证号码', type: 'error', noNotifyBtn: false, time: 1000 });
        return false;
      } else {
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(this.form.idCard)) {
          this.$myMsg.notify({ content: '请填写正确的身份证号码', type: 'error', noNotifyBtn: false, time: 2000 });
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




::v-deep .van-field__label{
  font-size: 16px;
  width: 1.6rem;
  vertical-align: middle;

  /*border-right: 1px solid #E9E9E9;*/
  color: #333333;
  font-weight: 600;
}


::v-deep .rform{
	
	.van-cell {
	    font-size: 16px;
	    padding: 0;
	    background-color: transparent;
	    /*border-bottom: 1px solid $border_color_g;*/
		border-bottom: 1px solid #F8EBE6;
		height:60px;
		border-radius: 8px
	
	  }
	  
	  .van-field__body {
	      height: 60px;
	    }
		
	    input.van-field__control {
	      color: $font_color;
	      height: 60px;
	      font-size: 16px;
	    }
		
	    input.van-field__control::-webkit-input-placeholder {
	      color: $font_color2 !important;
	    }
		
	    .van-checkbox__label {
	      color: $font_color;
	      font-size: 15px;
	    }
		
	  .van-field__control {
	      color: $font_color;
	      height: 100%;
	      font-size: 16px;
	    }
		

	  
	  
	  .van-button__content{
	    font-size:18px;
	  }
	  .van-field__left-icon{
	    font-size: 20px;
	    width: 1.6rem;
	    vertical-align: middle;
	    //margin-top: 13px;
	    /*margin-right: 0.32rem;*/
	    /*border-right: 1px solid #E9E9E9;*/
	    text-align: center;
	    height:30px;
	    line-height:30px;
	  }
	
}  




.page {
  height: 100%;
  position: relative;
  
  .part_1 {
    position: absolute;
    width: 100%;
    height: halfSize(120px);
    line-height: halfSize(120px);
    // padding: 70px 10px 0;
  }
  .container {
    width: 100%;
    height: 168px;
    left: 0;
    top: 0px;
    background-image: url('@/assets/photo/top2.webp');
	//background-color: #a9ae8a;
    background-size: 100% 100%;
    .wrap {
      padding: 10px 10px;
      .title {
        font-size: 16px;
        color: $font_color_dark;
        // font-weight: bold;
      }
      .rform {
        background: $bg_color;
        padding: 5px 10% 10px;
        border-radius: 5px;
        margin-top: 70px;
			  padding-bottom: 70px;
        .itme {
          justify-content: flex-start;
          margin-bottom: 20px;
          margin-top: 10px;
          display: block;
          //border-bottom: 1px solid #c6c6c6;
        }
        .label {
          width: 80px;
          font-size: 16px;
          color: $font_color;
          margin: 16px 0;
        }
        .tips {
          color: #626571;
          line-height: 1.8;
          font-size: 16px;
          white-space: pre-wrap;
          text-align: justify;
          width: 100%;
		  margin-top: 30px;
		  margin-bottom: 30px;
          span{
            display: inline-block;
			font-size: 12px ;
          }
          span:nth-child(1){
            width: 20px;
            vertical-align: top;
          }
          span:nth-child(2){
            width: 92%;
          }
        }
      }
      .bottom {
		  
		  margin-top: 40px;
   
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

        justify-content: center;
      }
    }
  }
}
.van-button__text{
  font-size:18px;
  font-weight: 600;
}
::v-deep .van-form {
  .van-cell {
    font-size: 13px;
    padding: 15px 0;
    border-radius: 5px;
    background-color: $base_bg_color;

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
    font-size: 16px;
	font-weight: 400;
  }
  input.van-field__control::-webkit-input-placeholder {
    color: #bebebe !important;
  }
}

::v-deep .btns {
  .van-button {
    padding: 0;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    height: 46px;
    letter-spacing: 1px;
    color: #A7AF78 !important;
	border: 1.5px solid #AAB086;
	background: rgba(157, 164, 112, 0.12);
  }
  .van-button--disabled {
	  color:#999 !important;
	  font-weight: normal !important;
	  border: 1.5px solid #999;
  }
}
</style>
