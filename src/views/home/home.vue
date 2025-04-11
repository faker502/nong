<template>
  <div class="test-page" style="background: #F3F3F3">
    <!--top start -->
    <div class="top">
      <div class="user-logo">
        <img src="@/assets/photo/user-logo.png"  />
      </div>

      <!--marquee start -->
      <div class="marquee" style="">
        <div class="">
          <van-notice-bar
            scrollable
            background="rgba(255, 255, 255, .42)"
            color="#313231"
            :text="notice.noticeContent2"
            @click="
              $router.push({
                path: '/news/info',
                query: { noticeId: notice.noticeId },
              })
            "
          >
            <template #left-icon>
              <img
                :src="require('@/assets/photo/notice.png')"
                width="27px"
                height="27px"
              />
            </template>
          </van-notice-bar>
        </div>
      </div>
      <!--marquee start -->

      <!--video start-->
      <div class="top-body">
        <div class="havelogin t_title_b df_c">
          <!-- <video ref="myVideo" class="my-video" style="" controls
            controlslist="nodownload noremoteplayback noplaybackrate" :webkit-playsinline="true" :playsinline="true"
            oncontextmenu="return false" @timeupdate="timeupdate" :poster="require('@/assets/img/video-bg.jpg')"
            src="https://help-medicine-20230305.oss-cn-qingdao.aliyuncs.com/vedio/zhongyi.mp4">
          </video> -->
          <!--          <vue-plyr ref="plyr" :options="option">
            <video class="my-video" :webkit-playsinline="true" :playsinline="true" :poster="poster">
            </video>
          </vue-plyr> -->

          <vue-plyr ref="plyr" :options="option">
            <video
              class="my-video"
              :webkit-playsinline="true"
              :playsinline="true"
              :poster="poster"
              :src="uri"
            ></video>
          </vue-plyr>
        </div>
      </div>
      <!--video end-->
    </div>
    <!--top end -->

    <div class="page1" id="page1">
      <div>
        <div class="middle-items">
          <!-- <div class="home-item" @click="$router.push('/news/info?noticeId=5')">
            <img src="@/assets/photo/index1.webp" style="width: 100%" />
          </div> -->
          <div class="home-item" @click="$router.push('sign')">
            <span>签到</span>
            <img src="@/assets/photo/index11.png" style="width: 100%" />
          </div>
          <!-- <div class="home-item" @click="$router.push('/withdraw')">
            <img src="@/assets/photo/index3.webp" style="width: 100%" />
          </div> -->
          <div class="home-item" @click="$router.push('download')">
            <span>下载</span>
            <img src="@/assets/photo/index21.png" style="width: 100%" />
          </div>
          <div class="home-item" @click="$router.push('chat')">
            <span>群聊</span>
            <img src="@/assets/photo/index31.png" style="width: 100%" />
          </div>
          <div
            class="home-item"
            style="z-index: 1550"
            @click="$router.push('/kefu')"
          >
            <span>客服</span>
            <img src="@/assets/photo/index41.png" style="width: 100%" />
          </div>

          <!-- <div class="home-item" @click="$router.push('/rank')">
            <img src="@/assets/photo/ranking.webp" style="width: 100%" />
          </div>

          <div class="home-item" @click="$router.push('/file-list')">
            <img src="@/assets/photo/file.webp" style="width: 100%" />
          </div> -->
        </div>

        <!-- <div class="study" @click="$router.push('/chat')">
          <img
            src="@/assets/photo/chat.webp"
            style="width: 100%; border-radius: 4px; height: 160px"
          />
        </div> -->
        <div class="study">
          <div class="study-item" @click="$router.push('/roll')">
            <img
              src="@/assets/photo/study-left.png"
              style="width: 100%; border-radius: 4px; height: 160px"
            />
            <!-- <p><span>中国强农</span><van-icon name="arrow" /></p>
            <h2>抽奖中心</h2> -->
          </div>
          <div class="study-item" @click="$router.push('/rank-rule')">
            <img
              src="@/assets/photo/study-right.png"
              style="width: 100%; border-radius: 4px; height: 160px"
            />
            <!-- <p><span>中国强农</span><van-icon name="arrow" /></p>
            <h2>排行榜</h2> -->
          </div>
          <!-- <img
            src="@/assets/photo/chat.webp"
            style="width: 100%; border-radius: 4px; height: 160px"
          /> -->
        </div>
      <!--@click="$router.push({ path: '/daily', query: { type: 2 } })" -->
        <div class="acticle">
          <div class="header">
            新闻中心
            <div
              style="float: right; font-weight: normal; color: #6e8285"
              
            >
              <van-icon name="arrow" />
            </div>
          </div>

          <div
            class="list-news"
            v-for="item in notice.news"
            :key="item.noticeId"
            @click="
              $router.push({
                path: '/news/info?r',
                query: { noticeId: item.noticeId },
              })
            "
          >
            <div class="left">
              <img :src="item.img" style="width: 96px; height: 118px;" />
            </div>
            <div class="right">
              
              <div class="item2">{{ item.noticeTitle }}</div>
              <div class="item3">{{ item.intro }}</div>
              <div class="item1">
                <div class="year">{{ item.md }} {{ item.year }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 公告弹窗 -->
    <van-dialog
      v-model="show"
      @confirm="submit"
      :title="notice.noticeTitle"
      :show-confirm-button="false"
      :show-cancel-button="false"
      style="height: 465px"
    >
      <!--      <div @click="submit" style="position:absolute;top:-10px;right:-10px">
			<img src="@/assets/photo/close.png" style="width:30px;height:30px;">
		</div> -->
      <div
        class="notice-content"
        style="white-space: pre-wrap; text-align: justify; height: 400px"
      >
        <div v-html="notice.noticeContent"></div>
      </div>

      <div class="buttonS" @click="submit">确认</div>
    </van-dialog>

    <div class="i-mask" v-if="showMask" @click="alertMsg()"></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import cache from "@/utils/cache.js";
import { getConfigKey, setReadApi, getIndexApi, getUriApi } from "@/api/index";
import { getNumeralRmbApi, getAccountApi } from "@/api/member";
import { Progress } from "vant";
import local from "@/components/SaveDoc.vue";
import Hls from "hls.js";

export default {
  inject: ["getCC"],
  components: {
    [Progress.name]: Progress,
  },
  data() {
    return {
      timer: null,
      isPlus: 0,
      poster: "", //require('@/assets/photo/poster.webp'),
      uri: "",
      showMask: false,
      isLogin: false,
      notice: [],
      register: {
        registerTotal: 0,
        registerToday: 0,
        registerPercent: 0,
      },
      fTips: "该账户已冻结，仅可进行实名、充值、购买操作",
      isYuYe: true,
      endDate: 60,
      studyTime: {
        currentTime: 0, // 当前时长
        duration: 0, // 总时长
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
      show: false,
      billList: [],
      account: [],
      numeralRmb: "",
      loading: false,
      finished: false,
      pageSize: 1,
      totalPage: 0,
      total: 0,
      option: {
        i18n: {
          speed: "速度",
          normal: "正常",
        },
      },
      options: {
        container: document.getElementById("dplayer"), //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        //logo:require('@/assets/img/logo.png'), // 在视频左上角上打一个logo
        video: {
          url: "", // 播放视频的路径
          defaultQuality: 0, // 默认是高清
          pic: "", // 视频封面图片
        },
      },
    };
  },
  mounted() {
    //this.openchat();
    console.log(this.$route.path);
    var pl = this.$refs.plyr.player;
    document
      .getElementById("page1")
      .addEventListener("touchstart", function (event) {
        pl.pause();
      });
  },
  created() {
    this.getNoticeContent();
    this.getConfig();
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", this.plusReady, false);
    }
    this.getCC();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    ...mapActions(["LoginSilence"]),
    hls() {
      var pll = this.$refs.plyr.player;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(this.uri);
        hls.attachMedia(pll.media);
        window.hls = hls;
      }
    },
    getNoticeContent() {
      getIndexApi().then((res) => {
        //debugger;
        this.notice = res.data;
        this.register = res.register;
        // if (res.data["read"] == "read") {
        //   this.show = false;
        // } else {
        //   this.show = true;
        // }
        this.poster = res.data.poster;
        this.uri = res.data.uri;

        //先设空
        this.notice.noticeTitle = "";
      });
    },
    getConfig() {
      getConfigKey({ key: "endPreheatcle" }).then((res) => {
        this.fTips = res.data.tips;
        if (res.data.online == "yes") {
          this.isYuYe = false;
        }
        if (res.data.uStatus && res.data.uStatus == 2) {
          this.showMask = true;
        }
        if (res.data.uid == 0 && this.isPlus) {
          local.readDoc("logout.json").then((res) => {
            console.log("logout.json:" + res);
            if (typeof res == "undefined" || res == "") {
              res = '{"logout":"no"}';
            }
            res = JSON.parse(res);
            if (res.logout != "yes") {
              console.log("auto login...");
              local.readDoc("login.json").then((res) => {
                console.log("login.json:" + res);
                if (typeof res == "undefined" || res == "") {
                  res = "{}";
                }
                res = JSON.parse(res);
                if (
                  typeof res.u != "undefined" &&
                  typeof res.p != "undefined"
                ) {
                  this.LoginSilence({ phone: res.u, password: res.p });
                }
              });
            }
          });
        }
      });
    },

    plusReady() {
      this.isPlus = 1;
      getUriApi().then((res) => {
        if (res.code == 200) {
          console.log("RemoteURI: " + JSON.stringify(res.data));
          if (typeof res.data != "undefined" && res.data.length > 0) {
            local.storageDoc("remote.json", res.data);
          }
        }
      });
    },
    // openchat() {
    //   openChat();
    // },
    onLoad() {
      this.getList();
    },
    alertMsg() {
      this.$dialog.alert({ title: "该账户已冻结", message: this.fTips });
    },
    getList() {
      let that = this;
      getNumeralRmbApi({ pageSize: that.pageSize }).then((res) => {
        if (res.code != 200) {
          this.$dialog({ message: "请求失败", className: "dialog-error" });
          return false;
        }
        //this.numeralRmb = res.data.sum_number;
        if (that.pageSize == 1) {
          that.numeralRmb = res.data.sum_number_f;
          that.billList = res.data.data.data;
        } else {
          that.billList = that.billList.concat(res.data.data.data);
        }

        that.loading = false;
        that.pageSize++;
        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        //根据业务需求更改
        //if (res.data.billList.length == 0 || res.data.billList == null || res.data.billList.length < 10) {
        if (that.pageSize > res.data.data.last_page) {
          that.finished = true;
          return;
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
      player.exitFullscreen(); //强制退出全屏，恢复正常大小
      this.videoDialogVisible = true;
    },
    onPlayerPlay(event) {
      this.autoTime = 0;
      console.log(event);
      //this.$emit('onPlayerPlay', player);
    },
    onPlayerPause(event) {
      console.log("pause");
      //this.$emit('onPlayerPauseFun', player);
    },
    loginOut() {
      this.FrontLogOut();
      this.$router.push("/login");
    },
    kefu() {
      this.$router.push("/kefu");
    },
    share() {
      if (
        this.online == "no" &&
        this.config.inviteGrantSwitch == "1" &&
        this.account.rechargeOver <= 0
      ) {
        this.$router.push("/share/explain");
      } else {
        this.$router.push("/share");
      }
    },
    submit() {
      this.show = false;
      cache.local.remove("loginType");
      setReadApi().then((res) => {});
    },
  },
};
</script>
<style>
.plyr__menu {
  display: none;
}
</style>
<style lang="scss" scoped>
.notice-content {
  color: #666;
  padding: 15px 15px 0 15px;
  img {
    width: 100%;
    height: 100%;
  }
  p img {
    width: 100%;
    height: 100%;
  }
}
.notice-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 35px;
  width: 60%;
  margin: 0 auto;
  text-align: center;
  padding: 8px;
  background-color: transparent;
  border-radius: 10px;
  .button {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #bb2d1a;
    border-radius: 15px;
    padding: 8px;
    background-color: #d11a2d;
    color: #f4ceaa;
    font-weight: bold;
  }
}

.van-dialog {
  //background: url('@/assets/img/index/notice/notice-bg.webp') no-repeat center;
  //background-size: 100% 100%;
  //top:50%;
  background: #fbfbfb;
  overflow: visible !important;
  //background: #f00;
  .buttonS {
    display: flex;
    justify-content: center;
    border-radius: 4px;
    color: #a7af78;
    font-size: 15px;
    width: 95%;
    margin: 0 auto;
    margin-top: -5px;
    height: 38px;
    line-height: 38px;
    letter-spacing: 2px;

    background: rgba(157, 164, 112, 0.12);
    border: 1px solid #aab086;
  }
}

.test-page {
  // margin-bottom: 30px;

  .top {
    position: relative;
    //border:1px solid red;
    width: 100%;
    height: 258px; // 355px;
    overflow: hidden;
    background: url("@/assets/photo/top-bg.png") top left no-repeat;
    //background-color: #a9ae8a;
    // background-size: 100% 240px;
    background-size: 100%;
    text-align: center;

    .user-logo {
      width: 121px;
      height: 44px;
      text-align: center;
      // padding-top: 30px;
      // border: 1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      img {
        width: 100%;
        // height: 100%;
      }
    }

    .top-head {
      background-image: url("@/assets/photo/logo.png");
      background-position: left top;
      background-repeat: no-repeat, no-repeat;
      background-size: 80px auto, 92% 100%;

      position: relative;
      width: 92%;
      height: 80px;
      /*top: 16px;*/
      /*background-size: 100% 100%;*/
      filter: drop-shadow(0px 4px 12px rgba(10, 74, 118, 0.16));
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      margin: 0 auto;

      .nav-page-title {
        letter-spacing: 4px;
        font-size: 18px;
        line-height: 80px;
        font-weight: 600;
        height: 80px;
        text-align: left;
        padding-left: 100px;
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

      .top-head-2 {
        width: 40%;
        display: inline-block;
        text-align: right;
        padding-right: 20px;
        box-sizing: border-box;

        .button {
          display: inline-block;
          width: 60%;
          text-align: center;
          border: 2px solid #2f6db3;
          color: #2f6db3;
          border-radius: 20px;
          padding: 10px;
          font-size: 16px;
          font-weight: 600;
          font-family: "PingFang SC";
        }
      }
    }
    .top-body {
      position: relative;
      width: 95%;
      margin: 0 auto;
      border-radius: 8px;
      margin-top: 0;
      height: 144px;
      text-align: center;
      overflow: hidden;
      .t_title_b {
        margin: 0 auto;
        position: relative;

        .my-video {
          width: 100%;
          border: 0;
          display: block;
          height: 100%;
          outline: none !important;
          margin: 0 auto;
          object-fit: fill;
        }
      }

      .top-body-box {
        background: #2f6db3;
        border: 0.5px solid #ffffff;
        box-shadow: 0px 2px 4px rgb(0 0 0 / 18%);
        border-radius: 10px;
      }

      .body-1 {
        display: inline-block;
        width: 50%;
        font-size: 0.48rem;
        border-right: 1px solid #fff;
        box-sizing: border-box;
      }

      .body-2 {
        display: inline-block;
        width: 50%;
        font-size: 18px;
        margin: 16px 0px 16px;

        .body-num {
          background: #5084bf;
          padding: 8px 12px;
          border-radius: 6px;
          margin: 0px 2px;
        }

        .time-item-uint {
          padding: 0 2px;
        }
      }

      .body-1,
      .body-2 {
        p {
          padding: 10px 0;
        }

        p:nth-child(1) {
          font-size: 15px;
        }
      }

      .nologin .body-3 {
        width: 100%;
        display: inline-block;

        div {
          font-size: 18px;
          font-weight: 600;
          font-family: "PingFang SC";
          margin: 0px 22%;
          text-align: center;
          line-height: 28px;
        }
      }

      .havelogin {
        z-index: 100;
        position: relative;
      }

      .havelogin .body-3 {
        width: 94%;
        display: inline-block;
        background-color: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        color: #333;
        font-size: 16px;
        padding: 10px 0px;

        .account {
          width: 25%;
          display: inline-block;

          div:nth-child(1) {
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
  }
  .marquee {
    margin: 12px auto 12px auto;
    border-radius: 8px;
    overflow: hidden;
    font-size: 12px;
    width: 95%;
    height: 34px;
    ::v-deep(.van-notice-bar) {
      height: 34px;
    }
  }
  .page1 {
    width: 100%;

    margin: 0 auto;
    //background-color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    overflow: hidden;
    margin-top: 0;
    padding-bottom: 10px;
    /*margin-top: -12px;*/
    /* -webkit-box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;*/
    /* box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;*/

    .grid-2 {
      width: 92%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 18px;
      margin: 10px auto 0;
      .home-item {
        border: 1px solid #f00;
        .span-1 {
          background: #ffffff;
          position: relative;
          top: -40px;
          left: 10px;
          padding: 8px 13px;
          border-radius: 16px;
          color: #f64a4a;
          font-size: 16px;
          font-weight: 600;
        }
        .span-2 {
          background: #ffffff;
          position: relative;
          top: -40px;
          left: 10px;
          padding: 8px 13px;
          border-radius: 16px;
          color: #234d9d;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }

    .study {
      position: relative;
      width: 95%;
      display: flex;
      height: auto;
      margin: 0 auto 12px auto;
      height: 68px;
      gap: 5px;
      .study-item {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .acticle {
      // background: #fff;
      border-radius: 4px;
      width: 95%;
      box-sizing: border-box;
      padding: 10px 0;
      margin: 0 auto 20px auto;

      .header {
        font-size: 18px;
        font-weight: 600;
        color: #313231;
        padding: 10px 10px 20px 10px;
        //border-bottom: 1px solid #D1D7E1;
        // border-bottom: 1px solid rgba(172, 32, 35, 0.08);
      }
      .list-news {
        // background-color: rgba(255, 255, 255, 0.42);
        background: #FFFFFF6B;

        margin: 0 auto;
        // display: grid;
        // grid-template-columns: repeat(1, 1fr);
        display: flex;
        grid-gap: 8px;
        margin-bottom: 12px;
        padding: 8px;
        border-radius: 8px;
        //border-bottom: 1px solid rgba(172, 32, 35, 0.08);
        .right {
          width: 100%;
        }
        .item1 {
          //border: 1px solid #f00;
          height: 20px;
          line-height: 150%;
          font-size: 14px;
          color: #6C6E6C;
          font-weight: 600;
          text-align: right;
          margin-top: 14px;
          .year {
            font-size: 10px;
            font-weight: normal;
          }
        }
        .item2 {
          // min-height: 46px;
          line-height: 23px;
          font-size: 18px;
          color: #313231;
          font-weight: 600;
          text-align: left;
          // flex-wrap: wrap;
           overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .item3 {
          width: 95%;
          height: 34px;
          line-height: 17px;
          font-size: 13px;
          color: #6C6E6C;
          font-weight: 400;
          margin: 0 auto;
          margin-top: 4px;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .list-news:first-child {
        padding-top: 20px;
      }
      .list-news:last-child {
        border-bottom: none;
        padding-bottom: 20px;
      }

      .class1 {
        border-radius: 5px;
        display: block;
        margin: 0 auto;
        margin-top: 10px;
        height: auto;
        .home-item {
          background-image: linear-gradient(
              to top,
              rgba(245, 245, 245, 0.8),
              rgba(245, 245, 245, 0.8)
            ),
            url("@/assets/img/article-bg.png");
          background-repeat: no-repeat;
          background-size: 98% 85%;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0528889);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-position-x: center;
          background-position-y: center;
          height: 80px;
          span {
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 20px;
            color: #ac2023;
          }
        }
      }
    }
    .middle-items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 3px;
      //box-shadow: rgba(225, 225, 225, 0.8) 5px 5px 20px 5px;
      // border: 1px solid rgba(225, 225, 225, 0.8);
      border-radius: 5px;
      // padding: 5px 0 10px 0;
      // margin: 5px auto 10px;
      margin: 12px auto;

      overflow: hidden;
      // margin-top: 80px;
      //border: 1px solid red;
      width: 95%;
      //grid-template-columns: 47.5% 47.5%;
      //background-color: #fff;
      .home-item {
        //border: 1px solid red;
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
        align-items: center;
        // background: url("../img/money-bg.png") no-repeat;
        // background-size: 200% 200%;
        border-radius: 5px;
        span {
          color: #4b594a;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
          position: relative;
          top: -8px;
        }

        .home-item-img {
          width: 45px;
          height: 45px;
          // border: 1px solid red;
        }

        span {
          margin: 3px 5px 10px 5px;
          font-size: 14px;
          color: #3f3d38;
        }
      }
    }
    .paihang {
      width: 90%;
      margin: 0 auto;
      //box-shadow: rgba(225, 225, 225, 0.5) 2px 5px 10px 5px;
      /*border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;*/

      .header {
        /*background: url("@/assets/img/paihang-title.png");*/
        /*background-size: 100% 100%;*/
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #d11a2d;

        height: 69px;
        color: #ffffff;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div:nth-child(1) {
          font-size: 12px;
          font-weight: 600;
        }
        div:nth-child(2) {
          font-size: 24px;
          margin-top: 6px;
          span {
            font-size: 16px;
          }
        }
      }
      .body {
        .title,
        .list-column {
          display: flex;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 10px;
          text-align: center;
          .home-item:nth-child(1),
          .list-column:nth-child(1) {
            flex: 1;
            text-overflow: ellipsis;
          }
          .home-item:nth-child(2),
          .list-column:nth-child(2) {
            flex: 2;
          }
          .home-item:nth-child(3),
          .list-column:nth-child(3) {
            flex: 1;
            text-overflow: ellipsis;
          }
          .home-item:nth-child(4),
          .list-column:nth-child(4) {
            flex: 1.5;
          }
        }
        .title {
          display: none;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          margin: 0 auto;
          color: #3f3d38;
          padding-top: 4px;
          font-weight: 500;
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;

          border: 1px solid rgba(172, 32, 35, 0.12);
          border-bottom: none;
          background: #faeeeb;

          text-align: center;
        }
        .list {
          width: 100%;
        }
        .list-column {
          padding: 10px 0;
        }
      }
    }
  }

  .list {
    width: 90%;
    margin: 0 auto 80px;
    font-size: 16px;
    min-height: 42vh;
    height: 42vh;
    overflow: hidden;
    overflow-y: auto;
    .left,
    .right {
      display: inline-block;
      width: 50%;

      div {
        padding: 10px 0;
      }
    }

    .left {
      display: inline-block;
      width: 50%;

      div:nth-child(1) {
        color: #2f6db3;
        font-weight: 600;
        padding: 6px 0 15px;
      }
    }

    .right {
      text-align: right;

      div:nth-child(1) {
        color: #8e9093;
        font-size: 15px;
        padding: 6px 0 15px;
      }
    }

    .sell-div {
      width: 100%;
      margin: 0 auto;
      text-align: center;

      .sell-button {
        width: 50%;
        text-align: center;
        background: radial-gradient(
          82.74% 862.49% at 28.76% 51.43%,
          rgba(114, 175, 248, 0.55) 0%,
          rgba(114, 175, 248, 0.12) 100%
        );
        border-radius: 4px;
        margin: 14px auto;
        padding: 12px;
        font-weight: 600;
        color: #2f6db3;
      }
    }

    .list_th .item,
    .list_td .item {
      text-align: center;
      flex: 1;
      padding: 8px 0;

      &:nth-child(2) {
        flex: 2;
      }
    }

    .list_td {
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 6px;
    }

    .list_td .item {
      line-height: 22px;

      &:nth-child(2) {
        text-align: right;
      }
    }

    .list_td:last-child {
      border: none;
    }
  }
}
</style>
<style>
.i-mask {
  position: absolute;
  z-index: 1500;
  background-color: rgba(255, 255, 255, 0);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 1500px;
  height: 100%;
  width: 100%;
}

.van-dialog .van-dialog__cancel {
  display: inline-block !important;
}
.van-dialog {
  border-radius: 4px;
}
.van-dialog .van-button .van-button__content .van-button__text {
  background-color: transparent !important;
}
.van-dialog .van-dialog__cancel .van-button__content .van-button__text {
  color: #626571;
  font-weight: 400;
}
.van-dialog__cancel {
  display: inline-block !important;
}
.van-dialog .van-dialog__cancel {
  display: inline-block !important;
}
.van-dialog .van-dialog__confirm .van-button__content .van-button__text {
}

.van-dialog .van-button__content {
  border-left: rgba(172, 32, 35, 0.06) 1px solid;
}
.test-page .top .top-body .t_title_b .my-video {
  max-height: 144px;
}
.plyr__poster {
  background-color: #f2f3ee !important;
}
.plyr--video {
  background: #f0f1ed;
  overflow: hidden;
}
.ql-size-huge {
  font-size: 26px;
  font-weight: 600;
}
.ql-size-large {
  font-size: 16px;
  font-weight: 600;
}
</style>
