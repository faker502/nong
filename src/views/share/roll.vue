<template>
  <div class="page">
    <nav-bar
      title=""
      titleColor="#313231"
      leftIconColor="#313231"
      class="nav-top"
    />

    <div class="top">
      <div class="user-logo"></div>
    </div>

    <div class="part1">
      <div class="top-head">
        <!-- <div class="top-1">
          <div class="top-2">
            <img
              :src="portraitUrl"
              style="width: 50px; height: 50px; border-radius: 50px"
            />
          </div>
          <div class="top-2" @click="$router.push('/lv-rule')">
            <div class="username">
              {{ user.name ? user.name : "---" }}
              <span class="level-txt">{{ user.levelText }}</span>
            </div>
            <div class="user-phone">{{ user.phone }}</div>
          </div>
          <div class="top-3">
            <div @click="$router.push('/record_roll')" class="button">
              抽奖记录
            </div>
          </div>
        </div> -->
        <div class="top-1"></div>
      </div>

      <div class="container df_c">
        <!--marquee start -->
        <div class="marquee" v-show="notice">
          <div class="">
            <van-notice-bar
              scrollable
              background="transparent"
              color="#fff"
              :text="notice"
            >
              <!-- <template #left-icon>
                <img
                  :src="require('@/assets/photo/notice.webp')"
                  width="27px"
                  height="27px"
                />
              </template> -->
            </van-notice-bar>
          </div>
        </div>
        <!--marquee start -->

        <div class="m-grid3">
          <div class="m-flex3">
            <!-- <LuckyWheel
              ref="myLucky"
              width="320px"
              height="320px"
              :prizes="prizes"
              :blocks="blocks"
              :buttons="buttons"
              @start="startCallback"
              @end="endCallback"
            /> -->
            <LuckyGrid
              ref="myLucky"
              width="280px"
              height="280px"
              :prizes="prizes"
              :blocks="blocks"
              :buttons="buttons"
              @start="startCallback"
              @end="endCallback"
            />
          </div>
        </div>

        <div class="m-grid">
          <!-- 	 	<div @click="showTip" class="m-flex" style="font-size:14px;color:#999;justify-content:flex-end;">抽奖规则&nbsp;<img  src="@/assets/img/icon/tips.webp" style="width:14px;height:14px;line-height:20px;"></div>
	 	<div class="m-flex"></div> -->
			<h1></h1>
        </div>

        
      </div>
	  <div class="m-grid">
          <div v-html="showTips"  class="tips"></div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VueQr from "vue-qr";
import { getCodeApi1, getPrizeApi } from "@/api/member.js";
import { getConfigKey } from "@/api/index";
import { Toast } from "vant";
export default {
  name: "Share",
  components: {
    VueQr,
  },
  data() {
    return {
      shareCode: "",
      ifShow: 0,
      shareLink: "1",
      num: 0,
      img: require("@/assets/img/share/def.png"),
      showMask: false,
      code: 0,
      msg: "",
      portraitUrl: require("@/assets/photo/blank.jpg"),
      user: {
        curr: {},
        next: {},
        old: {},
      },
      data: [],
      buy: "",
      showTips: "",
      notice: "",

      //prize config start

      blocks: [{ padding: "5px", background: "transparent" }],
      prizes: [
        {
          x: 0,
          y: 0,
          fonts: [
            { text: "未中奖", top: "10%", fontSize: "12px", fontColor: "#666" },
          ],
        //   background: "#dee2c8",
        },
        {
          x: 1,
          y: 0,
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "1", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#eee",
        },
        {
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "30", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#dee2c8",
        },
        {
          x: 2,
          y: 0,
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "50", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#eee",
        },
        {
          x: 0,
          y: 1,
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "100", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#dee2c8",
        },
        {
          x: 2,
          y: 1,
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "500", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#eee",
        },
        {
          x: 0,
          y: 2,
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "1000", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#dee2c8",
        },
        {
          x: 1,
          y: 2,
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "1500", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#eee",
        },
        {
          x: 2,
          y: 2,
          fonts: [
            { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
            { text: "3000", top: "40%", fontSize: "12px", fontColor: "#333" },
          ],
        //   background: "#dee2c8",
        },
        // {
        //   fonts: [
        //     { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
        //     { text: "5000", top: "40%", fontSize: "12px", fontColor: "#333" },
        //   ],
        //   background: "#eee",
        // },
        // {
        //   fonts: [
        //     { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
        //     { text: "7000", top: "40%", fontSize: "12px", fontColor: "#333" },
        //   ],
        //   background: "#dee2c8",
        // },
        // {
        //   fonts: [
        //     { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
        //     { text: "1万", top: "40%", fontSize: "12px", fontColor: "#333" },
        //   ],
        //   background: "#eee",
        // },
        // {
        //   fonts: [
        //     { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
        //     { text: "2万", top: "40%", fontSize: "12px", fontColor: "#333" },
        //   ],
        //   background: "#dee2c8",
        // },
        // {
        //   fonts: [
        //     { text: "现金", top: "10%", fontSize: "12px", fontColor: "#666" },
        //     { text: "5万", top: "40%", fontSize: "12px", fontColor: "#333" },
        //   ],
        //   background: "#eee",
        // },
      ],
      buttons: [
        //{ radius: '40%', background: '#adb392' },
        { radius: "35%", background: "transparent" },
        {
          x: 1,
          y: 1,
          radius: "30%",
          background: "transparent",
          pointer: true,
          fonts: [{ text: "抽奖", top: "40%" }],
        },
      ],

      key: 0,
      tips: "",
      award: "",
      remain: "",
      //prize end
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.getConfig();
    this.getCode();
    this.getPrize(1);
  },
  methods: {
    //prize start

    // 点击抽奖按钮会触发star回调
    startCallback() {
      if (this.tips != "") {
        Toast(this.tips);
        return;
      }

      this.getPrize(0);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      console.log(prize);
      if (this.award != "") {
        this.$dialog({ message: this.award });
      }
      this.buttons[1].fonts[0].text = "抽奖(" + this.remain + ")";
    },

    //prize end

    alertMsg() {
      this.$vantToast(this.user.alert);
    },
    ttt() {
      this.$dialog({ message: "特权邀请已关闭" });
    },
    getCode() {
      getCodeApi1().then((res) => {
        this.shareLink = res.data.extensionUrl;
        this.shareCode = res.data.code;
        this.ifShow = res.data.show;
        this.code = res.code;
        this.msg = res.msg;
        this.user = res.data.member;
        this.data = res.data;
        this.buy = res.data.buy;
        if (
          res.data.member.portraitUrl &&
          res.data.member.portraitUrl.length > 10
        ) {
          this.portraitUrl = res.data.member.portraitUrl;
        } else {
          this.portraitUrl = require("@/assets/img/my/def.png");
        }
      });
    },
    getConfig() {
      getConfigKey({ key: "endPreheatcle" }).then((res) => {
        if (res.data.uStatus && res.data.uStatus == 2) {
          this.showMask = true;
        }
      });
    },

    showTip() {
      this.$dialog({ message: this.showTips });
    },

    getPrize(check) {
      getPrizeApi({ check: check }).then((res) => {
        if (check) {
          if (res.code == 0) {
            this.tips = res.msg;
            this.showTips = res.data.showTips;
            this.remain = res.data.remain;
            this.notice = res.data.notice;
            console.log(this.buttons[1], "ppp");
            this.buttons[1].fonts[0].text = "抽奖(" + this.remain + ")";
          }
        } else {
          if (res.code == 200) {
            this.$refs.myLucky.play();
            this.remain = res.data.remain;
            this.key = res.data.key;
            this.award = res.data.award;
            this.$refs.myLucky.stop(this.key);
          } else {
            Toast(res.msg || "请重试");
          }
        }
      });
    },

    refresh() {
      refreshCodeApi().then((res) => {
        this.$vantToast(res.msg);
        if (res.code == 200) {
          this.shareCode = res.data.shareCode;
          this.shareLink = res.data.extensionUrl;
        }
      });
    },
    handleCopyCode() {
      this.$copyText(this.shareCode)
        .then(() => {
          this.$vantToast("复制成功");
        })
        .catch((err) => {
          this.$vantToast("复制失败");
        });
    },
    handleCopyLink() {
      this.$copyText(this.shareLink)
        .then(() => {
          this.$vantToast("复制成功");
        })
        .catch((err) => {
          this.$vantToast("复制失败");
        });
    },
    handleCopyQr() {
      //let link = this.shareUrl + "/reg/" + this.shareCode;
      let link = this.shareLink;
      this.$copyText(link)
        .then(() => {
          this.$vantToast("复制成功");
        })
        .catch((err) => {
          this.$vantToast("复制失败");
        });
    },
  },
};
</script>
<style>
.i-mask {
  position: absolute;
  z-index: 1500;
  /* background-color: rgba(255, 255, 255, 0); */
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 930px;
  height: 100%;
  width: 100%;
}
</style>
<style lang="scss" scoped>
::v-deep .nav-top .van-icon:before {
  background: #fff !important;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -4px;
}
.page {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background: url("@/assets/photo/roll-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .top {
    position: relative;
    /*border:3px solid blue;*/
    width: 100%;
    height: 200px;
    left: 0;
    top: 0px;
    // background-image: url("@/assets/photo/top-bg.webp");
    //background-color: #a9ae8a;
    background-size: 100% 100%;

    .user-logo {
      width: 200px;
      height: 60px;
      text-align: center;
      padding-top: 30px;
      background: url("@/assets/photo/roll-title.png") no-repeat center center;
      background-size: 100%;
      margin: 0 auto;
    }
  }

  .part1 {
    position: relative;
    height: auto;
    left: 0;
    // background: #ffffff;
    text-align: center;
    margin: 0 auto;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin-top: -130px;
    width: 95%;

    .top-head {
      position: relative;
      display: grid;
      grid-template-columns: 65% 35%;
      text-align: center;
      margin: 0 auto;

      height: 100px;
      .top-1 {
        display: flex;
        align-items: center;
        justify-content: center;

        .top-2 {
          .level-txt {
            margin: 0 auto;
            display: inline-block;
            width: 52px;
            height: 19px;
            background: #ff8a00;
            backdrop-filter: blur(1px);
            border-radius: 2px;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 19px;
            text-align: center;
            color: #fff;
            margin-bottom: 5px;
          }
          .user-phone {
            font-size: 14px;
            padding-top: 6px;
          }
          .username {
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            width: 140px;
          }
        }
        .top-3 {
          position: absolute;
          right: 20px;
          top: 20px;
          line-height: 48px;
          height: 48px;
          width: 120px;
          .button {
            display: flex;
            justify-content: center;
            //border: 1px solid #ebedf0;
            border-radius: 4px;
            color: #a7af78;
            font-size: 15px;
            width: 80%;
            margin: 10px auto 0 auto;
            height: 38px;
            line-height: 38px;
            //background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
            letter-spacing: 1px;
            background: rgba(157, 164, 112, 0.12);
            border: 1.5px solid #aab086;
          }
        }
      }
    }

    .container {
      position: relative;
      top: calc(33%);
      display: block;
      margin: 0 auto;
      color: #3f3d38;
      min-height: 400px;
	  background: url('@/assets/photo/roll-content_bg.png') no-repeat left top;
	  background-size: 100%;
	  width: 305px;
	  height: 398px;
      .marquee {
        margin: 0;
        overflow: hidden;
        font-size: 12px;
        width: 100%;
		padding-top: 3px;
      }

      .m-grid {
        display: grid;
        position: relative;
        grid-template-columns: 100%;
        grid-gap: 10px;
        width: 80%;
        margin: 0 auto 0 auto;
		h1 {
			width: 160px;
			height: 21px;
			background: url('@/assets/photo/roll-text.png') no-repeat center center;
			background-size: 100%;
			margin: 0 auto;
			margin-top: 30px;
		}
		.tips {
			color: #fff;
			font-size: 14px;
			margin-top: 34px;
		}	
        .m-flex {
          display: flex;
          //border: 1px solid #f00;
          font-size: 16px;
          font-weight: 400;
          padding-top: 16px;
          .right {
            position: absolute;
            right: 50px;
          }
        }
      }

      .m-grid3 {
        display: grid;
        position: relative;
        grid-template-columns: 100%;
        grid-gap: 10px;
        margin: 20px auto 10px auto;
        //border:1px solid #f00;
        height: 320px;
        width: 320px;
        .m-flex3 {
          display: flex;
          font-size: 16px;
          font-weight: 600;
          padding: 0;
		//   border: 1px solid red;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  padding-top: 27px;
        }
      }

      .m-grid2 {
        margin: 30px auto 15px auto;
        position: relative;
        width: 80%;
      }

      .part1-2 {
        margin: 0 auto;
        width: 80%;
        display: block;
        position: relative;
        display: grid;
        grid-template-columns: 50% 50%;

        margin: 30px auto;
      }
      .copy_box {
        margin: 10px 0;
        .copy_item {
          .left {
            border-radius: 7px;
            width: auto;
            height: halfSize(64px);
            line-height: halfSize(64px);
            padding: 0px 5px;
            color: $font_color_dark;

            p {
              color: #626571;
              font-size: 15px;
              margin: 0;
              text-align: left;
            }

            span {
              font-size: 18px;
              color: #0e2529;
              font-weight: 600;
              margin-top: 0;
              display: block;
              text-align: left;
            }
          }
        }
      }
      .code {
        margin-top: 10px;
        .button {
          display: flex;
          justify-content: center;
          border: 1px solid #ebedf0;
          border-radius: 4px;
          color: #333;
          font-size: 15px;
          margin: 10px auto 0 auto;
          height: 38px;
          line-height: 38px;
          //background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
          width: 150px;

          letter-spacing: 2px;
        }
        .tip {
          color: $font_color;
          font-size: 14px;
          justify-content: center;
        }
      }
    }
    .part2 {
      width: 100%;
      text-align: center;
      padding: 20px 0 100px 0;
      margin: 30px auto;
      img {
        width: 25px;
        vertical-align: middle;
        margin-right: 6px;
      }
      .button {
        display: flex;
        justify-content: center;
        //border: 1px solid #ebedf0;
        border-radius: 4px;
        color: #a7af78;
        font-size: 15px;
        width: 80%;
        margin: 10px auto 0 auto;
        height: 38px;
        line-height: 38px;
        //background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
        //background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
        letter-spacing: 2px;

        background: rgba(157, 164, 112, 0.12);
        border: 1.5px solid #aab086;
      }
    }
  }

  .part3 {
    width: 100%;
    text-align: center;
    img {
      width: 25px;
      vertical-align: middle;
      margin-right: 6px;
    }
    .button {
      display: flex;
      justify-content: center;
      //border: 1px solid #ebedf0;
      border-radius: 4px;
      color: #a7af78;
      font-size: 15px;
      width: 80%;
      margin: 10px auto 0 auto;
      height: 38px;
      line-height: 38px;
      //background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
      letter-spacing: 1px;
      background: rgba(157, 164, 112, 0.12);
      border: 1.5px solid #aab086;
    }
  }
}
::v-deep .copy_box {
  .van-button {
    width: halfSize(201px);
    height: halfSize(80px);
    padding: 0;
    border: none;
    border-radius: halfSize(30px);
    font-size: 14px;
    color: $font_color_white !important;
  }
}
::v-deep .btns {
  .van-button {
    width: halfSize(369px);
    height: halfSize(80px);
    padding: 0;
    border: none;
    border-radius: halfSize(30px);
    font-size: 14px;
    color: $font_color_white !important;
  }
}
</style>
