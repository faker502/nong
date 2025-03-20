<template>
  <div class="page">
    <div class="top">
      <div class="top-head">
        <div class="top-head-1">
          <span><img src="@/assets/img/logo.png" style="width:60px;height:60px"/></span>
          <span class="top-head-title" style="letter-spacing:2px;padding-left: 10px;"></span>
        </div>
        <div class="top-head-2">
          <span></span>
          <span class="button" v-if="isLogin == false" @click="jump('login')">登录</span>
          <span class="button" @click="$router.push('/set/cert')" v-else-if="isLogin && isReal != '1'">实名认证</span>
          <span class="button-2" v-else >
            <div @click="loginOut">退出</div>
            <div v-if="this.account.rechargeMoney > 0">已激活</div>
            <div v-else @click="$router.push('/active')">激活</div>
          </span>
        </div>
      </div>
      <div class="top-body">
        <div class="nologin" v-if="isLogin == false">
          <div class="top-body-box">
            <div class="body-1">距离上线还有</div>
            <div class="body-2">
              <van-count-down :time="endTime" millisecond @finish="endCycle">
                <template #default="timeData">
                  <span class="body-num">{{ timeData.days }}</span>
                  <span class="time-item-uint">天</span>
                  <span class="body-num">{{ timeData.hours }}</span>
                  <span class="time-item-uint">时</span>
                  <span class="body-num">{{ timeData.minutes }}</span>
                  <span class="time-item-uint">分</span>
                  <span class="body-num">{{ timeData.seconds }}</span>
                  <span class="time-item-uint">秒</span>
                </template>
              </van-count-down>
           </div>
           <div class="body-3">
              <div class="">{{ advertise }}</div>
           </div>
          </div>
        </div>
        <div class="havelogin" v-else>
          <div class="top-body-box">
            <!-- <div class="body-0"><span>已激活</span></div> -->
          <div class="body-1">
            距离上线还有
          </div>
          <div class="body-2">
            <van-count-down :time="endTime" millisecond @finish="endCycle">
              <template #default="timeData">
                <span class="body-num">{{ timeData.days }}</span>
                <span class="time-item-uint">天</span>
                <span class="body-num">{{ timeData.hours }}</span>
                <span class="time-item-uint">时</span>
                <span class="body-num">{{ timeData.minutes }}</span>
                <span class="time-item-uint">分</span>
                <span class="body-num">{{ timeData.seconds }}</span>
                <span class="time-item-uint">秒</span>
              </template>
            </van-count-down>
          </div>
          </div>
          <div class="body-3">
            <div class="account" @click="$router.push('/fund');">
              <div>{{ account.total }}</div>
              <div>我的资产</div>
            </div>
            <div class="account" @click="$router.push({ path: '/fund', query: { type: 3 } });">
              <div>{{ account.balanceTotal }}</div>
              <div>账户余额</div>
            </div>
            <div class="account" @click="$router.push('/position');">
              <div>{{ account.stockMoney }}</div>
              <div>持仓市值</div>
            </div>
            <div class="account" @click="$router.push({ path: '/fund', query: { type: 2 } });">
              <div>{{ account.subsidyMoney }}</div>
              <div>中医补贴</div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-notice" :class="isLogin == false ? 'mt-300':''">
        <van-notice-bar scrollable background="#F0F6FC" color="#000" :text="notice.noticeContent2" @click="$router.push({ path: '/news/info', query: { noticeId: notice.noticeId } })">
          <template #left-icon>
            <svg-icon iconClass="notice_bar" :size="20" />
          </template>
        </van-notice-bar>
      </div>
    </div>
    <div class="middle-video">
      <div class="t_title_b df_c">
        <video ref="myVideo" class="my-video" style=""
              controls controlslist="nodownload noremoteplayback noplaybackrate" :webkit-playsinline="true" :playsinline="true"
              oncontextmenu="return false" @timeupdate="timeupdate"
              >
            </video>
      </div>
    </div>
    <!-- 选择块 -->
    <div class="grid middle-items" :style="isLogin?'margin:30px 0':''">
          <div class="home-item" @click="share">
            <van-image class="home-item-img" :src="require('@/assets/img/yaoqing.png')" />
            <span>邀请好友</span>
          </div>
          <div class="home-item" @click="$router.push('/kefu')">
            <van-image class="home-item-img" :src="require('@/assets/img/kefu.png')" />
            <span>客服中心</span>
          </div>
          <div class="home-item" @click="$router.push('/team')">
            <van-image class="home-item-img" :src="require('@/assets/img/tuandui.png')" />
            <span>我的团队</span>
          </div>
          <div class="home-item"  @click="$router.push('/sign')">
            <van-image class="home-item-img" :src="require('@/assets/img/qiandao.png')" />
            <span>中医签到</span>
          </div>
          <div class="home-item" @click="$router.push('/leaderboard')">
            <van-image class="home-item-img" :src="require('@/assets/img/paihang.png')" />
            <span>贡献排行</span>
          </div>
          <div class="home-item" @click="$router.push('withdraw')">
            <van-image class="home-item-img" :src="require('@/assets/img/tixian.png')" />
            <span>立即提现</span>
          </div>
    </div>
    <div class="bottom" v-if="isLogin == false">
      <div class="bottom-inside">
        <div class="bottom-1">已助力 {{ config.todayRegHaveNum }} 人</div>
        <div class="bottom-2">
          <div class="bottom-middle-left">
            <div class="bottom-2-1">今日助力名额</div>
            <div class="bottom-2-2">{{ config.todayRegNum }} 人</div>
          </div>
          <div class="bottom-middle-right">
            <div class="bottom-2-1">剩余助力名额</div>
            <div class="bottom-2-2">{{ config.todayRegOverNum }} 人</div>
          </div>
        </div>
        <div class="bottom-3">
          <div class="button" @click="jump('/signup')">
            注册助力
          </div>
        </div>
      </div>
    </div>
    <!-- 公告弹窗 -->
    <van-dialog v-model="show" @confirm="submit" :title="notice.noticeTitle">
      <div class="notice-content" style='white-space: pre-wrap;text-align: justify;'>
        <div v-html="notice.noticeContent"></div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import VideoPlayer from "@/components/VideoPlayer.vue";
import cache from "@/utils/cache.js";
import { mapActions } from "vuex";
import { getConfigKey, setReadApi, getIndexApi } from "@/api/index";
import { getAccountApi } from "@/api/member";
export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      logo: require("@/assets/img/logo.png"),
      countTime: null,
      isLogin: false,
      endTime: 0,
      isReal: 2,
      online: 'no',
      advertise:'传承创新发展促进大健康中国事业',
      notice: {},
      account: {},
      config: {},
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
      show: false
    };
  },
  created() {
    // 我们这里先直接输出Partten
    this.getConfig();
    this.isRead();
  },
  mounted() {
    this.countTime = Date.now();
    if ((getToken() != undefined && getToken() != 'undefined') && getToken()) {
      this.isLogin = true;
      this.getUserInfo();
    }
    this.$refs.myVideo.addEventListener("play", () => {
      this.autoTime = 0;
      console.log("video is playing");
      // this.openTimer();
    });
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    ...mapActions(["FrontLogOut"]),
    async getConfig() { 
      await getConfigKey({ key: 'endPreheatcle' }).then((res) => {
        console.log('methods-created');
        this.online = res.data.online;
        this.endTime = res.data.onlineTime;
        this.advertise = res.data.advertise;
        this.config = res.data;
      });
    },
    async getUserInfo() {
      await getAccountApi().then((res) => {
        console.log('methods-mounted');
        this.isReal = res.data.user.isReal;
        this.account = res.data.account;
      });
    },
    isRead() {
      getIndexApi().then((res) => {
        this.notice = res.notice;
        if (res.data == 'read') {
          this.show = false;
        } else {
          this.show = true;
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
    jump(path) { 
      if (path == '/signup') { 
        if (this.config.todayRegOverNum <= 0) { 
          this.$dialog({ message: '今日助力名额已满！', className: 'dialog-error' })
          return false;
        }
      }

      this.$router.push(path);
      return false;
    },
    loginOut() {
      this.FrontLogOut();
      this.$router.push("/login");
    },
    kefu() {
      this.$router.push('/kefu');
    },
    share() { 
      if (this.online == 'no' && this.config.inviteGrantSwitch == '1' && this.account.rechargeOver <= 0) {
        this.$router.push('/share/explain');
      } else {
        this.$router.push('/share');
      }
    },
    submit() {
      this.show = false;
      cache.local.remove("loginType");
      setReadApi().then((res) => { });
    },
    endCycle() {
      //this.getList();
    },
  }
};
</script>
<style lang="scss" scoped>

::v-deep .van-count-down{
  color:#ffffff;
  font-size: 18px;
}
::v-deep .ql-size-large {
  font-size: 18px !important;
} 
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  .top{
    position: relative;
      width: 100%;
      height: 373px;
      left: 0;
      top: 0px;
      background: #FFFFFF;
      background: linear-gradient(to bottom, #ffffff, #C1D7F2);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
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
        .top-head-1{
           width: 60%;
           display: inline-block;
           vertical-align: middle;
            padding-left: 20px;
            box-sizing: border-box;
           span{
            vertical-align: middle;
            font-size: 24px;
            font-weight: bold;
           }
           .top-head-title{
            font-family: "GB5WB1B", serif;
           }
        }
        .top-head-2{
          width:40%;
          display: inline-block;
          text-align: right;
          padding-right: 20px;
          box-sizing: border-box;
          .button{
            display: inline-block;
            width: 60%;
            text-align: center;
            border: 2px solid #2F6DB3;
            color: #2F6DB3;
            border-radius: 20px;
            padding: 10px;
            font-size: 16px;
            font-weight: 600;
            font-family: 'PingFang SC';
          }
          .button-2{
            display: inline-block;
            width: 80%;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            font-family: 'PingFang SC';
            vertical-align: middle;
            div{
              color: #2F6DB3;
              border: 2px solid #2F6DB3;
              border-radius: 10px;
              padding: 6px 10px;
            }
            div:nth-child(2){
              margin-top: 6px;
            }
          }
        }
      }
      .top-body{
        position: relative;
        margin: 0px 3%;
        border-radius: 10px;
        top: 96px;
        height: 192px;
        color: #ffffff;
        text-align: center;
        .top-body-box{
          background: #2F6DB3;
          border: 0.5px solid #FFFFFF;
          box-shadow: 0px 2px 4px rgb(0 0 0 / 18%);
          border-radius: 10px;
        }
        .nologin .top-body-box{
          padding-bottom: 20px;
        }
       .havelogin .top-body-box {
          padding-bottom: 10px;
        }
        .body-0{
          position: absolute;
          padding: 6px 10px;
          top: 14px;
          right: 10px;
          font-size: 16px;
          box-sizing: border-box;
          border: 1px solid #fff;
          width: 25%;
          border-radius: 10px;
        }
        .body-1{
          height: 60px;
          line-height: 60px;
          font-size: 18px;
        }
        .body-2{
          font-size: 18px;
          margin: 10px 0px 26px;
          .body-num{
            background: #5084BF;
            padding: 8px 12px;
            border-radius: 6px;
            margin: 0px 2px;
          }
          .time-item-uint{
            padding: 0 2px;
          }
        }
        .nologin .body-3{
          width: 100%;
          display: inline-block;
          div{
            font-size: 18px;
            font-weight: 600;
            font-family: 'PingFang SC';
            margin: 0px 22%;
            text-align: center;
            line-height: 28px;
          }
        }
        .havelogin .body-3{
          width: 94%;
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          box-sizing: border-box;
          overflow-x: auto;
          background-color: #fff;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          color: #333;
          font-size: 16px;
          padding: 10px 10px;
          .account{
            // width: 25%;
            min-width: 25%;
            display: inline-block;
            padding-right: 3px;
            flex-shrink: 0;
            box-sizing: border-box;
            div:nth-child(1){
              padding: 6px 0;
              font-size: 16px;
              font-weight: 600;
            }
            div:nth-child(2) {
              padding: 10px 0;  
              font-size: 16px;
            }
          }
        }
      }
      .top-notice {
        position: absolute;
        width: 100%;
        top: 320px;
        padding: 0px 5%;
        box-sizing: border-box;
        .van-notice-bar {
          border-radius: 48px;
          height: halfSize(56px);
          line-height: halfSize(56px);
          padding: 0 10px;
          border-radius: halfSize(11px);
          box-shadow: 0px 0px 5px rgba(153, 206, 255, 1);
        }
        ::v-deep .van-notice-bar__wrap {
          margin-left: 10px;
          font-size:16px
        }
      }
      .mt-300{
        top: 310px;
      }
  }
  ::-webkit-scrollbar{
    display: none;
  }
  .middle-video{
    width: 100%;
    text-align: center;
    margin-top: -12px;
    .t_title_b{
      width: 92%;
      margin: 0 auto;
      position: relative;
      .my-video{
        width: 100%; 
        border: 0;
        border-radius: 10px;
        display: block;
        height: 100%;
        outline: none !important;
        margin: 0 auto;
        object-fit: fill;
      }
    }
  }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 18px;
    }
  
    .middle-items {
      overflow: hidden;
      // margin-top: 80px;
      // border: 1px solid red;
      width: 100%;
      margin: 30px auto 250px;
      .home-item {
          // border: 1px solid red;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: 600;
          // color:#;
          // background: url("../img/money-bg.png") no-repeat;
          // background-size: 200% 200%;
          border-radius: 5px;
      
          .home-item-img {
            width: 65px;
            height: 65px;
            // border: 1px solid red;
          }
          span {
            margin: 10px;
            font-size: 16px;
          }
        }
    }
  .bottom{
    position: fixed;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #FFFFFF;
    bottom: 0;
    z-index: 999;
    .bottom-inside{
      width: 94%;
      margin: 10px auto;
      border: 1px solid #FFFFFF;
      border-radius: 8px;
      -webkit-box-shadow: 0 0 0.26667rem rgb(41 102 126 / 8%);
      box-shadow: 0 0 0.26667rem rgb(41 102 126 / 8%);
      padding: 20px 0;
    }
    .bottom-1{
      width: 90%;
      margin: 0 auto;
      color:#ffffff;
      background: linear-gradient(to right, #A5CCFA, #3476D4);
      border-radius: 20px;
      padding: 12px 0;
      text-align: center;
      font-size: 18px;
    }
    .bottom-2{
          width: 100%;
            display: inline-block;
            margin: 20px auto;
            text-align: center;
            .bottom-middle-left{
              width: 49%;
                display: inline-block;
                border-right: 1px solid #DADDE1;
            }
            .bottom-middle-right{
              width: 50%;
                display: inline-block;
            }
            .bottom-2-1{
              color: #646464;
                font-size: 18px;
            }
            .bottom-2-2{
                  font-weight: 600;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
            }
    }
    .bottom-3{
      .button{
        width: 60%;
          margin: 0 auto;
          border: 0.05333rem solid #72AFF8;
          color: #2F6DB3;
          border-radius: 0.53333rem;
          text-align: center;
          font-size: 16px;
          padding: 10px 0;
          font-weight: 600;
      }
    }
  }
  ::v-deep .van-dialog__header{
    font-size: 18px;
    padding: 20px;
  }
}
</style>
