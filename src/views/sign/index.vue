<template>
  <div class="test-page">
    <div class="top">
      <!--top-head start-->
      <div class="top-head">
        <nav-bar
          title=""
          titleColor="#313231;"
          leftIconColor="#313231"
          class="nav-top"
        />
      </div>
      <!--top-head end-->
    </div>

    <!-- <div class="top-bg">
      <div class="top-content"></div>
    </div> -->

    <img src="@/assets/photo/rl.png" alt="" class="rl" />

    <div class="page1">
      <div class="content">
        <div class="top-h1">
          <span class="tttt"
            >已累计签到<span class="daysss">{{ signDays }}</span
            >天</span
          >
        </div>

        <!-- 年份 月份 -->
        <div class="days-content">
          <!--          <ul class="month bottom-line">
            <li class="arrow" @click="pickPre(currentYear, currentMonth)"><van-icon name="arrow-left" /> 上个月</li>
            <li class="year-month">
              <span>{{ currentYear }} 年 {{ currentMonth }} 月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear, currentMonth)">下个月 <van-icon name="arrow" /></li>
          </ul> -->

          <!-- 星期 -->
          <!-- <ul class="weekdays">
            <li :class="dateWeek == 0 ? 'week' : ''">日</li>
            <li :class="dateWeek == 1 ? 'week' : ''">一</li>
            <li :class="dateWeek == 2 ? 'week' : ''">二</li>
            <li :class="dateWeek == 3 ? 'week' : ''">三</li>
            <li :class="dateWeek == 4 ? 'week' : ''">四</li>
            <li :class="dateWeek == 5 ? 'week' : ''">五</li>
            <li :class="dateWeek == 6 ? 'week' : ''">六</li>
          </ul> -->
          <!-- 日期 -->
          <ul class="days bottom-line">
            <li v-for="(day, index) in days" :key="index" :class="{'signed': day.isSign}">
              <!--本月已签到日期-->
              <span
                v-if="day.isSign && day.day.getMonth() + 1 === currentMonth"
                class="cli sign-day"
                :class="
                  day.day.getDate() == dateToday && dateMonth === currentMonth
                    ? 'sign-today'
                    : ''
                "
              >
                <img
                  src="@/assets/photo/ball.png"
                  style="
                    width: 17px;
                    height: 17px;
                  "
                />
                <span class="text">{{ day.day.getDate() }}</span>
              </span>
              <!--本月未签到日期-->
              <span
                v-if="
                  !day.isSign &&
                  day.day.getMonth() + 1 === currentMonth &&
                  day.day.getDate() == dateToday &&
                  dateMonth === currentMonth
                "
                class="cli sign-today"
              >
                <img
                  src="@/assets/photo/ball.png"
                  style="
                    width: 17px;
                    height: 17px;
                    
                  "
                />
                <span class="text">{{ day.day.getDate() }}</span>
              </span>
              <span
                class="cli"
                v-else-if="
                  !day.isSign && day.day.getMonth() + 1 === currentMonth
                "
              >
                <img
                  src="@/assets/photo/ball.png"
                  style="
                    width: 17px;
                    height: 17px;
                   
                  "
                />
                <span class="text">{{ day.day.getDate() }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="bottom" v-if="todaySign == 'no'">
        <div class="bottom-inside">
          <div class="bottom-3" v-if="sign">
            <div class="button" @click="setSign(1)">立即签到</div>
          </div>
          <div class="bottom-3" v-else>
            <div class="button">签到中</div>
          </div>
        </div>
      </div>

      <div class="bottom" v-else>
        <div class="bottom-inside">
          <div class="bottom-4">
            <div class="button">今天已签到</div>
          </div>
        </div>
      </div>

      <div class="role">
        <div class="role-title">签到规则</div>
        <div class="rules_content" v-html="signRule"></div>
      </div>
    </div>

    <div
      class="van-overlay"
      style="z-index: 2001; opacity: 0.9; border: #f00 1px solid"
      v-if="isSuccess"
    ></div>
    <div
      role="dialog"
      tabindex="0"
      class="van-dialog-customize"
      v-if="isSuccess"
      style="z-index: 2002; background-color: none"
    >
      <div class="dialog-content">
        <div class="content-1">
          <div>
            <img src="@/assets/photo/sign-ok.webp" style="width: 125px" />
          </div>
          <div style="font-size: 20px; font-weight: 600; margin-bottom: 20px">
            <!--签到成功-->
          </div>
          <div>
            <p>
              <strong>{{ signOk }}</strong>
            </p>
            <p>明日再来签到吧!</p>
          </div>
        </div>
        <div class="content-2" @click="isSuccess = false">x</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup, Field, Popup, Button, Icon } from "vant";
import { signApi, getMySignApi } from "@/api/member";
import { Toast } from "vant";

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      date: new Date(),
      dateMonth: "",
      dateWeek: "",
      dateToday: "",
      currentDay: 1, // 当前天
      currentMonth: 1, // 当前月
      currentYear: 2023,
      currentWeek: 1, // 一号所在的星期
      days: [], // 当月所有天数
      content: {},
      arrDate: [], // 当月签到日期
      arrDateSelect: [],
      num: 0,
      count: { first: 0, second: 0 },
      sign: true,
      todaySign: "no",
      isSuccess: false,
      signOk: "",
      signRule: "",
      signDays: "-",
    };
  },
  created() {
    this.currentMonth = this.date.getMonth() + 1;
    this.currentYear = this.date.getFullYear();
    this.getSign();
  },
  methods: {
    /**
     * 获取签到日期
     */
    getSign() {
      // 接口未完成，模拟数据
      getMySignApi().then((res) => {
        this.count = res.data.count;
        this.arrDate = [];
        this.arrDateSelect = res.data.data;
        this.todaySign = res.data.todaySign;
        this.signRule = res.data.signRule;
        this.signDays = res.data.cDays;
        this.initData();
      });
    },
    initData(cur) {
      this.dateMonth = this.date.getMonth() + 1;
      this.dateWeek = this.date.getDay();
      console.log(this.dateWeek);
      this.dateToday = this.date.getDate();
      let date;
      if (cur) {
        // 切换日期
        date = new Date(cur);
      } else {
        var now = new Date();
        var d = new Date(
          this.formatDate(now.getFullYear(), now.getMonth() + 1, 1)
        );
        //d.setDate(35);// 设置天数为35天
        date = new Date(d);
      }
      //console.log(now.getDate());
      this.currentDay = date.getDate(); // 今日日期 几号
      this.currentYear = date.getFullYear(); // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      this.currentWeek = date.getDay(); // 0,1...6 星期
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      ); // 2020-01-01
      this.days.length = 0; // 初始化日期
      // 如果今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      for (var i = this.currentWeek; i > 0; i--) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject = {}; // 用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d;
        this.days.push(dayobject); // 将日期放入data 中的days数组 供页面渲染使用
      }
      // 其他周 // 设置天数为35天,周日设置在第一位，循环从36开始
      this.num = 0;
      let signKeyList = Object.keys(this.arrDateSelect);
      if (signKeyList.includes(this.currentMonth.toString())) {
        this.arrDate = this.arrDateSelect[this.currentMonth];
      } else {
        this.arrDate = [];
      }

      for (var j = 0; j <= 36 - this.currentWeek; j++) {
        const d = new Date(str);
        d.setDate(d.getDate() + j);
        const dddd = d.getDate();
        if (dddd === 1) {
          this.num++;
        }
        if (this.num === 2) {
          return;
        }
        const dayobject = { day: d, isSign: this.isVerDate(dddd) };
        this.days.push(dayobject);
      }
    },
    /**
     * 判断该日期是否有签到
     * @param v
     * @returns {boolean}
     */
    isVerDate(v) {
      return this.arrDate.includes(v);
    },
    /**
     * 上一月
     * @param year
     * @param month
     */
    pickPre(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.currentMonth = d.getMonth() + 1;
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    /**
     * 下一月
     * @param year
     * @param month
     */
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.currentMonth = d.getMonth() + 1;
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // 返回 类似 2020-01-01 格式的字符串
    formatDate(year, month, day) {
      month < 10 && (month = "0" + month);
      day < 10 && (day = "0" + day);
      const data = year + "-" + month + "-" + day;
      return data;
    },
    mysign() {},
    /**
     * 点击签到
     * @param index
     */
    setSign(v) {
      if (v == 2) {
        //this.$myMsg.notify({content: '今天已经签到，请明日再来',type:'warning', time: 1500});
        Toast("今天已经签到\n请明日再来");
        //this.$dialog({ message: '今日已签到！', className: 'dialog-error' })
        return false;
      }
      const now = new Date();
      this.arrDate.push(now.getDate());
      this.initData();
      this.sign = false;
      // 接口待完成，虚拟提示
      signApi().then((res) => {
        this.sign = true;
        if (res.code == 200) {
          this.isSuccess = true;
          this.signOk = res.msg || "签到成功";
          this.getSign();
          return false;
        } else {
          //this.$toast.fail("注册通道繁忙，请联系客服");
          Toast(res.msg || "今天已经签到\n请明日再来");
          //this.$myMsg.notify({content: res.msg,type:'error', time: 3000});
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.rl {
  width: 112px;
  height: 112px;
  position: absolute;
  top: 36px;
  right: 36px;
}
/* fix title light blue color background */
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
.van-nav-bar {
  background: $bg_liner_color_red;
  ::v-deep .navbar-right {
    font-weight: normal;
  }
}
.van-nav-bar__text {
  color: #ffffff;
}

.test-page {
  position: relative;
  width: 100%;
  background: url("@/assets/photo/top-bg.png") no-repeat top left;
  //background-color: #a9ae8a;
  background-size: 100% auto;

  .top-bg {
    margin: 0 auto;
    border-radius: 5px;
    margin-top: 20px;
    position: relative;
    width: 92%;
    overflow: hidden;

    /*z-index:99;
      background-image: url("@/assets/img/sign/header.png") ;
      background-size: 100% 100%;
      background-position: 0% 0% ;
      background-repeat: no-repeat;*/

    div.headerpic {
      position: relative;
      z-index: 999;
    }

    div.headerpic img {
      width: 100%;
    }

    .navbar {
      position: absolute;
      width: 100%;
      top: 0;
      background: $bg_liner_color_touming;
    }
    .top-content {
      width: 100%;
      margin-top: 0px;
      .left,
      .img {
        display: inline-block;
        width: 50%;
        vertical-align: middle;
      }
      .left {
        color: #ffffff;
        text-align: left;
        padding-left: 12%;
        box-sizing: border-box;
        p:nth-child(1) {
          font-size: 18px;
          padding-bottom: 14px;
        }
        div {
          em {
            background-color: #eab7b6;
            color: #ac2023;
            font-weight: 600;
            font-size: 26px;
            margin: 0px 2px;
            padding: 2px 4px;
            border-radius: 4px;
          }
          span {
            font-size: 18px;
          }
        }
      }
      .img {
        img {
          width: 100%;
        }
      }
    }
  }
  .top {
    width: 100%;

    background-size: 100% 100%;
    margin: 0 auto;
    overflow: hidden;
    color: #ffffff;
    height: 63px;
    text-align: center;
    padding-top: 0px;
    .button {
      display: flex;
      justify-content: center;
      border: 1px solid #ffffff;
      border-radius: 20px;
      color: #ffffff;
      font-size: 18px;
      width: 120px;
      margin: 0 auto 10px;
      height: 40px;
      line-height: 40px;

      .calendar-icon {
        display: block;
        width: 40px;
        height: 40px;
        background-size: 114px 45px;
      }
    }

    .button:active {
      background-color: #5283c4;
      opacity: 0.8;
    }
  }
  .page1 {
    width: 100%;

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 30px auto 0 auto;

    position: relative;
    //box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;
  }
  .content {
    box-sizing: border-box;
    width: 92%;
    background: url("@/assets/photo/Subtract1.png") no-repeat;
    background-size: 100% auto;
    padding: 15px;
    margin: 0 auto 10px auto;
    border-radius: 10px;
    /*border-radius: 8px;*/
    overflow: hidden;
    //box-shadow: rgba(225, 225, 225, 0.8) 0 5px 10px 0;

    .top-h1 {
      width: 50%;
      //border:1px solid #f00;
      height: 45px;
      line-height: 35px;
      letter-spacing: 3px;
      .tttt {
        width: 90px;
        height: 35px;

        display: inline;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 35px;
        /* identical to box height, or 133% */
        text-align: center;

        color: #313231;

        // text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);

        /* Inside auto layout */
        flex: none;
        order: 0;
        flex-grow: 0;
        .daysss {
          /* 4 */
          display: inline-block;
          width: auto;
          height: 35px;

          font-style: normal;
          font-weight: bold;
          font-size: 34px;
          line-height: 35px;
          /* or 70% */
          text-align: center;

          color: #CE9F03;

          // text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);

          /* Inside auto layout */
          flex: none;
          order: 1;
          flex-grow: 0;
        }
      }
    }

    .sign-days {
      text-align: right;
      margin: 20px 14px;
      font-size: 18px;
      span {
        background: #eef5fe;
        padding: 6px 10px;
        //border-radius: 10px;
      }
    }
    .days-content {
      //background: linear-gradient(to bottom left, #ffffff, #F6F9FC);
    }
  }
  .month {
    margin: 0;
    padding: 30px 15px 20px 15px;
    background-color: #a8ad89;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    position: relative;
    li {
      text-transform: uppercase;
      letter-spacing: 0;
    }

    .arrow {
      color: #ffffff;
      font-size: 15px;
      i {
        font-size: 13px;
        top: 2px;
      }
    }

    .year-month {
      font-size: 18px;
    }
  }

  .weekdays {
    /*头部星期*/
    margin: 0;
    padding: 25px 0 10px 0;
    // background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    font-size: 16px;
    .week {
      color: #a8ad89;
      font-weight: 600;
    }
    li {
      display: inline-block;
      text-align: center;
    }
  }

  .days {
    /*日期*/
    padding: 0;
    // background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1px;
    .sign-day {
      //background: rgba(114, 175, 248, 0.12);
      //background-image: url(@/assets/img/sign-checked.png);
      background-size: 100% 100%;
      color: #555;
      //border-radius: 50%;
    }
    .sign-today {
      //background:linear-gradient(135deg, #dbe1ba 0%, #a8ad89 100%);
      background: #fee362;
      color: #555;

      //color: rgb(255, 255, 255);
      border-radius: 6px;
    }
    li {
      list-style-type: none;
      width: 13.5%;
      padding: 0;
      box-sizing: border-box;
      // height: 66px;
      height: 44px;
      margin-bottom: 4px;
      text-align: center;
      color: #555;
      font-size: 17px;

      background: #9B9B9B;
      
      border-radius: 7px;
      // margin: 1px;
      &.signed {
        background:  #DE4A4A;
      }

      .cli {
        position: relative;
        width: 100%;
        // height: 66px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .text {
          // position: absolute;
          // bottom: 10px;
          font-size: 10px;
          color: #fff;
          margin-top: 5px;
        }

        img {
          /*签到的日期*/
          height: 40px;
          // position: absolute;
        }
      }
    }
  }

  .role {
    box-sizing: border-box;
    width: 92%;
    background-color: #fff;
    padding: 15px;
    margin: 20px auto 40px auto;
    background: #fff;
    padding-bottom: 30px;
    position: relative;

    .role-title {
      // margin: 20px 0;
      line-height: 24px;
      // font-weight: bold;
      font-size: 14px;
      color: #6C6E6C;
    }

    .rules_content {
      font-size: 14px;
      line-height: 24px;
      color: #6C6E6C;
    }
  }
  .role-bottom-70 {
    margin-bottom: 70px;
  }
  .bottom-inside {
    position: relative;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    bottom: 0;
    z-index: 100;
    padding: 12px 0 0 0;
    .bottom-3 {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      font-size: 16px;
      //background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
      // background: linear-gradient(90deg, #ed5b4f 0%, #f9b170 100%);
      background: linear-gradient(180deg, #7E963C 0%, #455117 100%);

      border-radius: 7px;
      padding: 16px 0;
      color: #ffffff;
      font-weight: 600;
    }
    .bottom-4 {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      font-size: 16px;
      background: linear-gradient(180deg, #e9e9e9 0%, #dddddd 100%);
      border-radius: 4px;
      padding: 16px 0;
      color: #ffffff;
      font-weight: 600;
    }
  }
  .van-dialog-customize {
    position: fixed;
    width: 260px;
    margin: 0 auto;
    top: 30%;
    left: 0;
    right: 0;
    .dialog-content {
      background: #fff;
      height: 300px;
      text-align: center;
      border-radius: 5px;
      .content-1 {
        position: absolute;
        top: 40px;
        margin: 0 10%;
        left: 0;
        right: 0;
        font-size: 18px;
        color: #666666;

        p {
          line-height: 30px;
        }
      }
      .content-2 {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 28px;
        /*color: #ffffff;*/
        color: #666666;
        width: 20px;
        height: 30px;
        padding: 10px 15px;
        //border:#f00 1px solid;
      }
    }
  }
}

/*.van-icon-clear {
    border:1px solid red;
}*/
</style>
