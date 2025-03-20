<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="邀请好友"/>
    </div>
    <div class="container">
      <div style="text-align:center;margin-top:60px;">
      <img :src="require('@/assets/img/share/share_explain.webp')" width="199px" >

      </div>
      <div class="wrap">  
        <van-form ref="rform" class="rform" :show-error-message="false">
          <div class="tips">
            <p>
              激活账户才能邀请！
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
          <div class="btns">
            <van-button @click="$router.push('/recharge');" color="#D11A2D"
              class="btn">立即激活</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page {
  height: 100%;
  position: relative;


  .part_1 {
     background: #D11A2D;
    
     top: 54px;
     width: 100%;
     height: 80px;
  }

  .container {
    height: calc(100% - 48px);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: -26px;
    /*background-color: #ffffff;*/
    .wrap {
      padding: 0px 10px;

      .title {
        font-size: 16px;
        color: $font_color_dark;
        // font-weight: bold;
      }

      .rform {
       
        padding: 5px 10px 10px;
        border-radius: 5px;
        text-align: center;
        .tips {
          margin-top: 20px;
          color: #999999;
          line-height: 2;
          font-size: 18px;
        }
      }
      .bottom{
        width: 100%;
        margin-top: 60px;
        margin: 60px auto;
        text-align: center;
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
    }
  }
}
</style>
