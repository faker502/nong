<template>
  <div class="test-page">
    <div class="top">
      <nav-bar title="账号安全" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
    </div>
    <div class="page1">
      <van-cell-group class="security-group">
        <van-cell>
          <div class="security-grid">
            <div class="security-item" @click="tolink('passwd')">
              <div class="icon-wrapper">
                <img :src="require('@/assets/img/account/p1.png')" alt="登录密码" />
              </div>
              <span class="item-text">登录密码</span>
            </div>
            
            <div class="security-item" @click="tolink('paypwd')">
              <div class="icon-wrapper">
                <img :src="require('@/assets/img/account/p2.png')" alt="支付密码" />
              </div>
              <span class="item-text">支付密码</span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="customer-service" @click="$router.push('/online')">
      <p class="service-text">
        账号遇到问题？
        <span class="highlight">人工客服</span>
        解决
      </p>
    </div>
    
    <van-popup v-model="showLogout" closeable position="bottom" class="logout-popup">
      <div class="popup-content">
        <h3 class="popup-title">退出登录</h3>
        <p class="popup-message">是否在该设备退出登录？</p>
        <div class="popup-buttons">
          <van-button plain round block @click="showLogout = false">取消</van-button>
          <van-button type="danger" round block @click="loginOut">确认退出</van-button>
        </div>
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
.test-page {
  min-height: 100vh;
  background: #f8f8f8;
  position: relative;
  // padding-bottom: 80px; // 为底部客服留出空间
  //  background: linear-gradient(180deg, #f5f7e6 0%, #ffffff 100%);
  .top {
    position: relative;
    width: 100%;
    height: 155px;
    background: linear-gradient(180deg, #f5f7e6 0%, #ffffff 100%);
    ::v-deep .van-icon:before {
      background: #fff!important;
      border-radius: 50%;
      // padding: 2px;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .page1 {
    width: 100%;
    // padding: 0 12px;
    margin: -91px auto 0;
    position: relative;

    .security-group {
      border-radius: 12px;
      overflow: hidden;
      // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
      margin: 0 12px;
      background: transparent!important;;
      
      .van-cell {
        // padding: 20px;
        // background: #fff;
        background: transparent!important;
        padding: 0;
      }
    }

    .security-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      // padding: 10px 0;
    }

    .security-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      // padding: 24px 16px;
      background: #fff;
      height: 105px;
      // background: #f9f9f9;
      border-radius: 8px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        transform: scale(0.98);
        background: #f5f5f5;
      }

      .icon-wrapper {
        width: 48px;
        height: 48px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 48px;
          height: 48px;
          height: auto;
        }
      }

      .item-text {
        font-size: 16px;
        color: #313231;
        font-weight: 500;
      }
    }
  }

  .customer-service {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 16px;
    text-align: center;
    
    .service-text {
      font-size: 16px;
      color: #313231;
      line-height: 1.5;
      margin: 0;
      font-weight: 500;
      
      .highlight {
        color: #7E963C;
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }
  }
}

.logout-popup {
  border-radius: 16px 16px 0 0;

  .popup-content {
    padding: 24px;
  }

  .popup-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    text-align: center;
  }

  .popup-message {
    font-size: 15px;
    color: #666;
    text-align: center;
    margin-bottom: 24px;
  }

  .popup-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    .van-button {
      height: 40px;
      font-size: 15px;
    }
  }
}
</style>