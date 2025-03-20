<template>
  <div class="test-page">
    <div class="top">
      <nav-bar title="账户安全" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>
    <div class="page1">
      <van-cell-group  class="peration-item">
        <!-- <van-cell class="van-content-cell" @click="tolink('phone')" is-link >
            <template #title>
              <span class="custom-title">
                手机号码
              </span>
            </template>
            <template #icon>
              <div class="img-icon">
                <img src="" />
              </div>
            </template>
            <template #right-icon>
                <van-icon class="custom-right" name="arrow" size="18px" color="#BFBFBF" />
            </template>
          </van-cell> -->
		  
		  
		  <van-cell>
		       <div class="items"  is-link @click="tolink('passwd')">
		            <div class="item">
		             <p >
		                <img style="width:50px;" :src="require('@/assets/img/account/p1.png')"  />
		                
		              </p>
		              <p style="height:50px">登录密码</p>
		             
		          </div>
		  
		      </div>
			  
			  <div class="items"  is-link @click="tolink('paypwd')">
			        <div class="item">
			         <p >
			            <img style="width:50px;" :src="require('@/assets/img/account/p2.png')"  />
			            
			          </p>
			          <p style="height:50px">支付密码</p>
			         
			      </div>
			  		  
			  </div>
		  
		    </van-cell>
		  
          <!-- <van-cell class="van-content-cell" @click="tolink('passwd')" is-link >
            <template #title>
              <span class="custom-title">登录密码</span>
            </template>
            <template #icon>
              <div class="img-icon">
                <img src="@/assets/img/icon/icon-pwd.png" />
              </div>
            </template>
            <template #right-icon>
                  <van-icon class="custom-right" name="arrow" size="18px" color="#BFBFBF" />
            </template>
          </van-cell>
          <van-cell class="van-content-cell" @click="tolink('paypwd');" is-link >
              <template #title>
                <span class="custom-title">支付密码</span>
              </template>
              <template #icon>
                <div class="img-icon">
                  <img src="@/assets/img/icon/icon-pwd-pay.png" />
                </div>
              </template>
              <template #right-icon>
                  <van-icon class="custom-right" name="arrow" size="18px" color="#BFBFBF" />
              </template>
          </van-cell> -->
		  
		  
<!--          <van-cell class="van-content-cell" @click="showLogout = true" is-link >
            <template #title>
              <span class="custom-title">安全退出</span>
            </template>
                <template #icon>
                  <div class="img-icon">
                
                    <van-icon name="exchange" size="20"/>
                  </div>
                </template>
                <template #right-icon>
                    <van-icon class="custom-right" name="arrow" size="18px" color="#BFBFBF" />
                </template>
          </van-cell> -->
		  
		  

		  
        </van-cell-group>
		
		<div class="online df_r">
		    <div class="" style="font-size:18px;color:#94ac01;" @click="$router.push('/online')">在线客服</div>
		</div>

		
    </div>
    <van-popup v-model="showLogout" closeable class="lingqu-jihuo" position="bottom" :style="{ height: '30%' }">
      <div class="lingqu-title">退出登录</div>
      <div class="lingqu-tips">是否在该设备退出登录？</div>
      <div class="lingqu-bottom">
        <div class="lingqu-button cancle" @click="showLogout = false">取消</div>
        <div class="lingqu-button" @click="loginOut">确认</div>
      </div>
    </van-popup> 
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { getUserApi } from "@/api/member";
export default {
  name: 'projectList',
  components: {},
  data() {
    return {
      info: [],
      showLogout: false
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["FrontLogOut"]),
    getUserInfo() {
      getUserApi().then((res) => {
        this.info = res.data;
      });
    },
    tolink(item) { 
      if (item == 'phone') { 
        this.$dialog({ message: '您的手机号码是'+this.info.phone, className: 'dialog-error' });
        return false;
      } else if (item == 'passwd') {
        //this.$dialog({ message: '为了您的资金安全修改密码<br>请联系在线客服！', className: 'dialog-error' });
        //return false;
		this.$router.push({ path: '/set/login_pwd' });
      } else if (item == 'paypwd') { 
        if (this.info.payPassword == '' || this.info.payPassword == null) {
          this.$router.push('/set/set_pwd');
        } else { 
			this.$router.push({ path: '/set/set_pay_pwd' });
            //this.$dialog({ message: '为了您的资金安全修改支付密码<br>请联系在线客服！', className: 'dialog-error' });
        }
        return false;
      }
    },
    loginOut() {
      this.FrontLogOut();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.van-content-cell{
  background: #F4F4F4;
  border-radius: 10px;
  padding: 4px 16px;
  margin: 10px 0;
}
.van-icon-exchange:before{
  color: red;
}
.test-page {
  .top {
    position: relative;
    /*border:3px solid blue;*/
    width: 100%;
    height: 230px;
    left: 0;
    top: 0px;
    background: url('@/assets/photo/top-bg.webp') no-repeat top left;
	//background-color: #a9ae8a;
    background-size: 100%  168px;

	
    .top-head {
      position: absolute;
      width: 100%;
      height: 60px;
      left: 0;
      top: 16px;
      background-size: 100% 100%;
      filter: drop-shadow(0px 4px 12px rgba(10, 74, 118, 0.16));
      display: inline-block;
      vertical-align: middle;
      text-align: center;

      .nav-page-title {
        font-family: GB5WB1B, serif;
        letter-spacing: 4px;
        font-size: 22px;
        font-weight: 600;
        padding-left: 10px;
      }

      .top-head-1 {
        width: 60%;
        display: inline-block;
        vertical-align: middle;
        padding-left: 20px;
        box-sizing: border-box;

        span {
          vertical-align: middle;
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
  }

  .page1 {
    width: 95%;
    margin: 0 auto;
	margin-top: -150px;
    
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: relative;
    overflow: hidden;
	.van-cell-group--inset {background: #fff;}
    .van-content-cell{
      .img-icon{
        width: 50px;
        line-height: 55px;
      }
      img{
        width: 35px;
        height: 35px;
        vertical-align: middle;
      }
      .van-cell__title{
        line-height: 55px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .custom-title {
          font-size: 17px;
          line-height: 25px;
      }
      .custom-icon,.custom-right{
          line-height: 55px;
      }
    }
	
	.van-cell{
	    // height: 55px;
	    // line-height: 55px;
	    padding: 14px 12px;
		background: #fff;
		margin: 0 auto;
		.van-cell__value {display:flex;flex-wrap: wrap;}
		.items {
			display:flex;
			width: 95%;
			background: #fff;
		
			.item{
			width:100%;display: inline-block;height: 100px;
			text-align:center;
			font-size:14px;
			background-color:#fff;
			font-weight: 500;
			padding:25px 10px;
			margin:8px 6px;
			border-radius:10px;
	
			p {display: block;}
			}
		}
	}
	
	.online {
		background: #fff;
		position: relative;		
		justify-content: center;
		font-size: 14px;
		line-height: 40px;
		height: 40px;
		width: 95%;
		margin-top: 10px;
		padding: 20px 20px;
	}
	
	
  }
}
.lingqu-jihuo{
    width: 100%;
    padding: 0 8%;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    .lingqu-title{
      height: 60px;
      line-height: 60px;
      text-align: left;
      font-size: 18px;
    }
    .lingqu-tips{
      text-align: left;
      font-size: 17px;
      margin-top: 20px;
    }
    .lingqu-bottom{
      width: 100%;
      position: absolute;
      bottom: 30px;
      text-align: center;
      font-size: 17px;
      left: 0;
      right: 0;
      .lingqu-button{
        display: inline-block;
        width: 45%;
        border: 1px solid #CB2D27;
        background: linear-gradient(91.27deg, #E7514C 0%, #CB2D27 100%);
        color: #ffffff;
        width: 38%;
        margin: 0 auto;
        border-radius: 8px;
        padding: 12px 8px;
      }
      .cancle{
        background: #ffffff;
        color: #000;
        border: 1px solid rgba(0,0,0,.2);
        margin-right: 10px;
      }
    }
}
</style>