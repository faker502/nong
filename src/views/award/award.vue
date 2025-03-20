<template>
  <div class="page">
    <div class="part_1">
      <van-nav-bar z-index="1000" safe-area-inset-top class="navbar">
        <template #left>
          <van-icon name="arrow-left" size="22" @click="$router.go('-1')" />
        </template>
        <template #title>
          <span class="navbar-title">{{ title }}</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="part_2">
      <div class="data_box">
        <div class="data_tabs">
          <div class="data_tab">
            <div class="data_tab_title">领取奖励</div>
            <div class="left">
              <div>累计奖励</div>
              <div>{{ totalCount.moneyTotal }}元</div>
            </div>
            <div class="center"></div>
            <div class="right">
              <div>今日奖励</div>
              <div>{{ totalCount.moneyToday }}元</div>
            </div>
          </div>
        </div>
        <div class="data_list">
          <div class="list_top">
            <div class="text_d" v-if="isSubmit" @click="toAward">立即领取</div>
            <div class="text_d" v-else>领取中</div>
          </div>

          <div class="d_table">
            <div style="margin:25px 20px 20px;font-size: 16px;font-weight: 600;">
              明细与金额
            </div>
            <div class="d_thead df_r">
              <div class="th_item">类型</div>
              <div class="th_item">金额</div>
              <div class="th_item">时间</div>
            </div>
            <div class="d_body">
              <!-- ellipsis -->
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
                <div class="d_td df_r" v-for="it in list" :key="it.id">
                  <div class="td_item">{{ it.remark }}</div>
                  <div class="td_item">{{ it.number }} 元</div>
                  <div class="td_item mr_5 color_g">
                    {{ it.createTime }}
                  </div>
                </div>
              </van-list>
              <!-- </div> -->
            </div>
          </div>
          <!-- <div class="more df_r">点击更多</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAwardApi, toAwardApi } from "@/api/member";
export default {
  name: "Team",
  data() {
    return {
      'title': '领取奖励',
      list: [],
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      level: 0,
      isSubmit: true,
      loading: false,
      finished: false,
      pageSize: 1,
      totalPage: 0,
      total: 0,
      totalCount:[]
    };
  },
  computed: {
    ...mapGetters(["host", "baseData"]),
  },
  mounted() { 
    
  },
  methods: {
    handleTab(it) {
      if (it.id != this.activeIndex) {
        this.activeIndex = it.id;
        this.pageSize = 1;
        this.finished = false;
        this.list = [];
        this.onLoad();
      }
      this.activeIndex = it.id;
    },
    onLoad() {
      this.getAward();
    },
    getAward() {
      let that = this;
      getAwardApi({ index: that.activeIndex, pageSize: that.pageSize }).then((res) => {
        if (that.pageSize == 1) { 
          this.totalCount = res.total;
          this.level = res.level;
        }
        this.total = res.data.total;
        this.pageSize = res.data.current_page;
        this.totalPage = res.data.last_page;
        if (that.pageSize == 1) {
          this.list = res.data.data;
        } else {
          that.list = that.list.concat(res.data.data);
        }

        that.loading = false;
        that.pageSize++;
        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        //根据业务需求更改
        //if (res.data.billList.length == 0 || res.data.billList == null || res.data.billList.length < 10) {
        //console.log(this.pageSize+'that'+that.pageSize);
        if (that.pageSize > that.totalPage) {
          that.finished = true
          return false;
        }
      });
    },
    toAward() { 
      if (this.level < 1) { 
        this.$dialog({ message: '普通会员不能领取级别奖励', className: 'dialog-error' });
        return false;
      }
      this.isSubmit = false;
      toAwardApi().then((res) => { 
        this.isSubmit = true;
        if (res.code == 200) {
          this.$dialog({ message: res.msg, className: 'dialog-error' });
          this.getAward();
          return false;
        } else { 
          this.$dialog({ message: res.msg, className: 'dialog-error' })
          return false;
        }
      });
    },
    see(index, title) {
      if (index != this.activeIndex) {
        this.activeIndex = index;
        this.pageSize = 1;
        this.finished = false;
        this.onLoad();
      }
      //console.log('index1：'+this.activeIndex);
    }
  },
};
</script>

<style lang="scss" scoped>
.van-hairline--bottom::after {
  border-bottom: none;
}

.page {
  height: 100%;
  position: relative;

  .navbar {
    position: absolute;
    width: 100%;
    background: $bg_liner_color_touming;
    top: 8px;
  }

  .navbar-title {
    font-family: "GB5WB1B", serif;
    color: #000000;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 600;
  }

  .van-nav-bar .van-icon {
    color: #4D4D4D;
  }

  .part_1 {
    height: halfSize(330px);
    padding: 70px 0;
    background-image: url("@/assets/img/project-1.png");
    background-size: 100% 100%;
    background-color: #FFF2F2;
    .info_box {
      position: relative;
      width: 94%;
      margin: 0 auto;
      // height: halfSize(182px);
      top: 0px;
      padding: 20px 0;
      box-sizing: border-box;
      background: rgba(245, 249, 255, 0.95);
      border: 0.5px solid #FFFFFF;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
      border-radius: 8px;

      .my-inviter {
        text-align: center;
        padding: 10px 0;
        font-size: 16px;

        p:nth-child(1) {
          padding: 10px 0;
        }

        p:nth-child(2) {
          padding: 15px 0;
        }
      }
    }

    .w_70 {
      // width: 70%;
      justify-content: space-between;
      height: 100%;
    }

    .line {
      height: 25px;
      width: 2px;
      background: #707070;
    }

    .info_item {
      align-items: center;
      flex: 1;
      height: 100%;

      .num {
        font-size: 20px;
        margin-top: 20px;
      }

      .text {
        font-size: 16px;
      }
    }
  }

  .part_2 {
    // height: calc(100% - halfSize(280px));
    margin-top: -20px;
    height: auto;
    // background: $bg_liner_color2;
    background: #FFFFFF;
    box-shadow: 0px -2px 12px rgb(21 30 41 / 8%);
    border-radius: 16px 16px 0px 0px;
    overflow: hidden;
    //padding: 0 15px;
    .data_box {
      min-height: 362px;
      background: $bg_color;
      // border-radius: halfSize(21px);
      // box-shadow: 0px 1px 3px #00000029;
      padding: 10px 0;

      .data_tabs {
        width: 90%;
        margin: 0 auto;
        position: absolute;
        left: 0;
        right: 0;
        background: #F5F9FF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18), inset 0px 0px 10px rgba(89, 119, 222, 0.08);
        border-radius: 8px;
        margin-top: -65px;
      }

      .data_tab {
        // display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 15px;
        color: $font_color1;
        padding: 12px 24px;
        .left,.right{
          display: inline-block;
          width: 49%;
          text-align: center;
          div{
            padding: 10px 0;
          }
          div:nth-child(2){
            font-size: 18px;
            font-weight: 600;
          }
        }
        .center{
          display: inline-block;
          border-right: 1px solid #D5D8DD;
          width: 1%;
          height: 40px;
        }
        .left{ 
          box-sizing: border-box;
        }
        .data_tab_title{
          margin: 10px 0;
          font-size: 18px;
          font-weight: 600;
        }
      }
      .van-list{
        line-height: 25px;
      }
      .data_list {
        margin-top: 90px;

        .list_top {
          padding: 0px 20%;
          justify-content: space-between;
          text-align: center;
          margin: 15px;
          .text_d {
            background: linear-gradient(153.43deg, #A5CCFA 0%, #3476D4 83.33%);
            border-radius: 6px;
            text-align: center;
            color: $font_color;
            font-size: 15px;
            font-weight: bold;
            line-height: 30px;
            padding: 6px 0;
            color: #ffff;
          }
        }

        .d_table {
          margin-top: 10px;

          .d_thead {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 600;
            padding: 0 25px;
            height: halfSize(61px);
            line-height: halfSize(61px);
            justify-content: space-between;
            color: #4D4D4D;
            font-size: 17px;
            .th_item {
              flex: 1;

              &:nth-child(2) {
                text-align: center;
              }

              &:last-child {
                text-align: right;
              }
            }
          }

          .d_body {
            padding: 0px 20px;

            .d_td:nth-child(1) {
              margin-top: 10px;
            }

            .d_td {
              justify-content: space-between;
              font-size: 16px;
              padding: 14px 0;

              .td_item {
                flex: 1;

                &:nth-child(2) {
                  text-align: center;
                }

                &:last-child {
                  text-align: right;
                  line-height: 25px;
                }
              }

              .td_item:nth-child(3) {
                font-weight: 600;
              }

              .color_g {
                color: $font_success;
              }

              .color_r {
                color: $font_faild;
              }
            }
          }
        }

        .more {
          margin-top: 20px;
          justify-content: center;
          color: $font_color6;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
