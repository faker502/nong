<template>
  <div class="test-page">
    <div class="top">
      <div class="top-head">
        <div class="van-nav-bar__content">
          <div class="van-nav-bar__left" @click="$router.go('-1')">
            <i class="van-icon van-icon-arrow-left" style="color: #151E29; font-size: 22px;"></i>
          </div>
          <div class="van-nav-bar__title van-ellipsis">
            <span class="nav-page-title">我的资产</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page1">
      <div class="wrap">
        <div class="wrap-1">
          <div class="amount_box base_shadow">
            <div class="amount df_c" @click="showAssets = true">
              <p class="text">总资产</p>
              <p class="money"><span style="font-size: 16px;">￥</span>{{ account.total }}</p>
            </div>
            <div class="amount df_c" @click="$router.push({ path: '/my/fund', query: { type: 3 } })">
              <p class="text">账户余额</p>
              <p class="money"><span style="font-size: 16px;">￥</span>{{ account.balanceTotal }}</p>
            </div>
            <div class="a_btns df_r">
              <van-button color="linear-gradient(180deg, #5DB1FF 0%, #0070D9  100%)" @click="$router.push('/recharge');">
                充值
              </van-button>
              <van-button color="#FF6767" @click="$router.push('/transfer/search')">
                转账
              </van-button>
              <van-button color="#F7931D" @click="$router.push('/withdraw')">
                提现
              </van-button>
            </div>
          </div>

          <div class="transfer">
            <div class="t_item df_r" @click="$router.push({ path: '/my/fund', query: { type: 2 } })">
              <span class="text">中医补贴</span>
              <span class="num">{{ account.subsidyMoney }} <i class="custom-right van-icon van-icon-arrow"></i></span>
            </div>
            <div class="t_item df_r" @click="$router.push('/position');">
              <span class="text">股票市值</span>
              <span class="num">{{ account.stockMoney }} <i class="custom-right van-icon van-icon-arrow"></i></span>
            </div>
            <div class="t_item df_r" @click="$router.push({ path: '/income' })">
              <span class="text">助力收益</span>
              <span class="num">{{ account.projectMoney }} <i class="custom-right van-icon van-icon-arrow"></i></span>
            </div>
            <div class="t_item df_r" @click="isShowLingQu = true" v-if="account.epidemicSubsidy > 0">
              <span class="text">疫情补贴</span>
              <span class="num">{{ account.epidemicSubsidy }} <i class="custom-right van-icon van-icon-arrow"></i></span>
            </div>
            <div class="t_item df_r" @click="toCollect" v-else>
              <span class="text">领取疫情补贴</span>
              <span class="num">{{ account.epidemicSubsidy }} <i class="custom-right van-icon van-icon-arrow"></i></span>
            </div>
          </div>

          <div class="video_w">
            <div class="t_title_b df_c">
              <video ref="myVideo" class="my-video" style=""
                  controls controlslist="nodownload noremoteplayback noplaybackrate" :webkit-playsinline="true" :playsinline="true"
                  oncontextmenu="return false" @timeupdate="timeupdate"
                
                  :src="videoSrc">
                </video>
            </div>
          </div>
        </div>
      </div>
      <van-popup
        v-model="showAssets"
        class="modal_a"
        :close-on-click-overlay="false"
      >
        <div class="close df_r" @click="showAssets = false">
          <svg-icon iconClass="close" :size="28" />
        </div>
        <div class="assets_modal df_c">
          <div class="title df_r">总资产</div>
          <div class="money df_r">{{ account.total }}<span style="font-size: 16px;padding-left: 10px;">元</span></div>
        </div>
        <div class="txt">总资产=账户余额+中医补贴+股票市值+助力收益+疫情补贴</div>
      </van-popup>
    </div>

    <van-popup  v-model="isShowLingQu" class="modal_a" :close-on-click-overlay="false">
      <div class="close df_r" @click="isShowLingQu = false">
          <svg-icon iconClass="close" :size="28" />
      </div>
      <div class="assets_modal df_c">
          <div class="title df_r">疫情补贴</div>
          <div class="money df_r">{{ account.epidemicSubsidy }}<span style="font-size: 16px;padding-left: 10px;">元</span></div>
      </div>
      <div class="txt">
        <van-image class="home-item-img" :src="require('@/assets/img/butie.jpg')" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapActions } from "vuex";
import { toLingQuApi, getAccountApi } from "@/api/member";
export default {
  name: 'my',
  components: {},
  data() {
    return {
      showAssets: false,
      account: [],
      studyTime: {
        currentTime: 0, // 当前时长
        duration: 0  // 总时长
      },
      videoState: false, // 视频播放状态
      pauseTimer: {}, // 暂停定时器
      videoSrc: "",
      durationTime: "", // 视频总时常
      currentTime: "", // 当前播放进度时长
      isPlay: false,
      autoplay: true,
      autoTime: 3000,
      videoDialogVisible: false, // 控制弹出层
      isShowLingQu: false
    };
  },
  created() {
    this.getAccountInfo();
  },
  mounted() {
    this.$refs.myVideo.addEventListener("play", () => {
      this.autoTime = 0;
      console.log("video is playing");
      // this.openTimer();
    });
  },
  methods: {
    ...mapActions(["FrontLogOut"]),
    getAccountInfo() {
      getAccountApi().then((res) => {
        this.account = res.data.account;
      });
    },
    toCollect() {
      toLingQuApi().then((res) => {
        if (res.code == '200') {
          this.account.epidemicSubsidy = res.data.num;
          Toast(res.msg);
          return false;
        } else {
          this.$dialog({ message: res.msg, className: 'dialog-error' });
          return false;
        }
      });
    },
    // 开启暂停定时器
    openPauseTimer() {
      this.pauseTimer = setInterval(() => {
        this.hintOperate();
      }, 600000);
    },
    // 关闭暂停定时器
    closePauseTimer() {
      clearInterval(this.pauseTimer);
    },
    // 获取当前播放位置
    timeupdate(e) {
      this.studyTime.currentTime = e.target.currentTime;
      this.studyTime.duration = e.target.duration ? e.target.duration : 0;
    },
    // 操作视频播放、暂停
    operateVideo() {
      if (!this.src) {
        this.$message({ message: "暂无视频资源，请查看其他视频！" });
        return false;
      }
      if (this.$refs.myVideo.paused) {
        this.$refs.myVideo.play();
        this.videoState = true;
      } else {
        this.$refs.myVideo.pause();
        this.videoState = false;
      }
    },
    onPlayerFullScreenchange(player) {
      player.exitFullscreen() //强制退出全屏，恢复正常大小
      this.videoDialogVisible = true
    },
    onPlayerPlay(event) {
      this.autoTime = 0;
      console.log(event);
      //this.$emit('onPlayerPlay', player);
    },
    onPlayerPause(event) {
      console.log('pause');
      //this.$emit('onPlayerPauseFun', player);
    },
    select(i, phone) {
      this.isSelect = i;
      this.phone = phone;
    },
    next() {
      if (this.phone == '') {
        this.$dialog({ message: '请选择转账账户！', className: 'dialog-error' });
        return false;
      } else {
        this.$router.push({ path: '/transfer', query: { phone: this.phone } });
        return false;
      }
    },
    tolink(item) {
      if (item == 'phone') {
        this.$dialog({ message: '您的手机号码是' + this.info.phone, className: 'dialog-error' });
        return false;
      } else if (item == 'passwd') {
        this.$dialog({ message: '为了您的资金安全修改密码请联系在线客服！', className: 'dialog-error' });
        return false;
      } else if (item == 'paypwd') {
        if (this.info.payPassword == '') {
          this.$router.push('/set/set_pwd');
        } else {
          this.$dialog({ message: '为了您的资金安全修改支付密码请联系在线客服！', className: 'dialog-error' });
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
  .top {
    position: relative;
    width: 100%;
    height: 90px;
    left: 0;
    top: 0px;
    background: #FFFFFF;
    background: linear-gradient(to bottom, #ffffff, #C1D7F2);

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
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    overflow: hidden;
    margin-top: -12px;
    padding-bottom: 10px;

    .wrap {
      width: 100%;
      color: #000;
      border-radius: 16px;
      background-color: #fff;
      padding-bottom: 20px;
      .users {
        justify-content: flex-start;
        &_name {
          margin-left: 10px;
          color: $font_color_white;
          font: normal normal normal 20px/30px Yuanti SC;
        }
      }
      .amount_box {
        width: 90%;
        margin: 24px auto;
        padding: 16px 20px;
        justify-content: space-between;
        background: $bg_color;
        border-radius: 8px;
        // height: halfSize(464px);
        background: #F5F9FF;
        border: 0.5px solid #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
        border-radius: 10px;
        box-sizing: border-box;
        .amount {
          display: inline-block;
          width: 50%;
          justify-content: flex-start;
          font: normal normal normal 17px/24px PingFang SC;
          padding: 15px 0;
          border-bottom: 1px solid #ededed;
          &:nth-child(2) {
            border-bottom: none;
          }
          .money {
            font-size: 18px;
            font-weight: bold;
            color: $font_color_dark;
            margin-top: 10px;
          }
          .text {
            //color: $font_color_b;
          }
        }
      }
      .a_btns {
        justify-content: space-between;
        // height: 100%;
        margin-top: 10px;
      }
      .transfer {
        margin: 15px 0;
        padding: 0px 20px;
        .t_item {
          justify-content: space-between;
          padding: 15px 20px;
          background: $bg_color;
          border: 1px solid #D5D8DD;
          border-radius: 11px;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: bold;
          .text {
            color: #151E29;
            font-size: 17px;
          }
          .num {
            font-size: 18px;
            color: $font_color_dark;
          }
        }
      }
      .video_w {
        width: 100%;
        height: auto;
        padding: 0px 20px;
        box-sizing: border-box;
      }
      .policy {
        margin-top: 20px;
        &_title {
          font: normal normal 600 15px/18px PingFang SC;
          color: $font_color_b;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 5px;
            width: 50px;
            height: 4px;
            background: $font_color_b;
          }
        }
        &_box {
          margin-top: 20px;
          justify-content: space-evenly;
          .static,
          .dynamic {
            width: halfSize(329px);
            height: halfSize(115px);
            justify-content: center;
            font-size: 14px;
            color: $font_color_white;
          }
          .static {
            // background: url("@/assets/images/static.png");
            // background-size: 100% 100%;
          }
          .dynamic {
            // background: url("@/assets/images/dynamic.png");
            background-size: 100% 100%;
          }
        }
      }
    }
    ::v-deep .a_btns {
      .van-button {
        width: halfSize(162px);
        height: halfSize(69px);
        padding: 0;
        border: none;
        border-radius: halfSize(14px);
        font-size: 14px;
      }
    }
    .van-content-cell {
      .img-icon {
        width: 50px;
        line-height: 40px;
      }

      img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
        border-radius: 6px;
      }

      .van-cell__title {
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .custom-title {
        font-size: 18px;
        line-height: 45px;
      }

      .custom-icon,
      .custom-right {
        line-height: 45px;
      }

      .custom-right {
        color: red;
        font-size: 18px;
      }
    }

    .bottom-button {
      width: 100%;
      position: fixed;
      bottom: 0;

      .button {
        width: 50%;
        padding: 12px;
        text-align: center;
        margin: 40px auto;
        letter-spacing: 2px;
        background: linear-gradient(153.43deg, #A5CCFA 0%, #3476D4 83.33%);
        border-radius: 8px;
        font-size: 18px;
        color: #fff;
      }
    }
  }
  
    ::v-deep .modal_a {
      width: 95%;
      height: halfSize(1180px);
      background: $bg_color;
      border-radius: 13px;
      .close {
        justify-content: flex-end;
        margin: 10px 10px 0 0;
      }
      .assets_modal {
        // border-bottom: 1px solid #dddddd;
        padding: 0px 50px;
        .title {
          font-size: 17px;
          // color: $font_color_b;
          // font-weight: bold;
        }
        .money {
          margin-top: 10px;
          font-size: 26px;
          font-weight: bold;
          color: $font_color;
        }
      }
      .txt {
        font-size: 18px;
        color: red;
        line-height: 24px;
      }
    }
}</style>