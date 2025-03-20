<template>
  <div class="page">
    <div class="part_1">
      <nav-bar :title="title" />
    </div>
    <div class="container">
      <div class="wrap">
        <div class="list">
          <div>
            <div class="fund-total">
             
            
            </div>

            <!-- <div v-if="list.length > 0"> -->
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
              <div class="list_td" v-for="it in billList" :key="it.id">
                <div class="top df_r">
                  <div class="item" style="line-height: 24px;">
                    <p class="name">{{ it.projectName }} <span class='projectStatus'>{{ it.state }}</span></p>
                    <p class="createtime">{{ it.createTime }}</p>
                  </div>
                  <div class="item projectmoney" style="line-height: 24px;">
                    <div>-{{ it.money }}</div>
                  </div>
                  <!-- <div class="item state" style="line-height: 24px;">
                    <div>{{ it.state }}</div>
                  </div>-->
                </div>
                <!--<div class="middle df_r">
                  <div class="item" style="line-height: 24px;">今日分红：</div>
                  <div class="item"><span class="money">{{ it.dayIncome }}</span> 元</div>
                </div>-->
                <!--<div class="middle middle-2 df_r">
                  <div class="item" style="line-height: 24px;">总收益：</div>
                  <div class="item"><span class="money">{{ it.incomeTotal }}</span> 元</div>
                </div>-->
                <!--<div class="bottom df_r">
                  <div class="item" style="line-height: 24px;">已收益：</div>
                  <div class="item"><span class="money">{{ it.incomedTotal }}</span> 元</div>
                </div>-->
              </div>
            </van-list>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</template>
<script>
import { getBillApi, getAccountApi } from "@/api/member";
import { myProjectApi } from "@/api/order";
export default {
  data() {
    return {
      title: "圆梦记录",
      accountTitle: '',
      active: 0,
      billList: [],
      account: [],
      loading: false,
      finished: false,
      pageNum: 1,
      totalPage: 0,
      total: 0
    };
  },
  mounted() {
  
    //console.log(typeof this.$route.query.moneyType);
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getAccountApi().then((res) => {
        this.account = res.data.account;
      });
    },
    projectList() {
    
      let that = this
      myProjectApi({ pageNum: that.pageNum }).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$dialog({ message: '请求失败', className: 'dialog-error' })
          return false;
        }
        if (that.pageNum == 1) {
          that.billList = res.data.data;
        } else {
          that.billList = that.billList.concat(res.data.data);
        }

        that.loading = false;
        that.pageNum++
        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        //根据业务需求更改
        //if (res.data.billList.length == 0 || res.data.billList == null || res.data.billList.length < 10) {
        if (that.pageNum > res.data.last_page) {
          that.finished = true
          return
        }
      })
    },
    getList() {
      let that = this
      getBillApi({ type: 11, pageNum: that.pageNum }).then((res) => {
        if (res.code != 200) {
          this.$dialog({ message: '请求失败', className: 'dialog-error' })
          return false;
        }
        if (that.pageNum == 1) {
          that.billList = res.data.data;
          that.ymList = res.data.data;
          that.numberList = res.data.data;
        } else {
          that.billList = that.billList.concat(res.data.data);
          that.ymList = that.ymList.concat(res.data.data)
          that.numberList = that.numberList.concat(res.data.data)
        }

        that.loading = false;
        that.pageNum++
        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        //根据业务需求更改
        //if (res.data.billList.length == 0 || res.data.billList == null || res.data.billList.length < 10) {
        if (that.pageNum > res.data.last_page) {
          that.finished = true
          return
        }
      })
    },
    onLoad() {
      this.projectList()
    }
  },
};
</script>

<style lang="scss" scoped>
.van-dialog{
  // background: url('@/assets/img/alert-bg.png');
  // background-size: 100% 100%;
  top: 50%;
  .close{
    width: 100%;
    margin: 20px auto;
    text-align: center;
    .button{
      width: 50%;
      text-align: center;
      margin: 0 auto;
      padding: 5px 0;
      border: 2px solid #DBC7A5;
      border-radius: 4px;
    }
  }
}
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  margin-bottom: 30px;
  .part_1 {
    position: absolute;
    top: 54px;
    width: 100%;
    height: 80px;
    //background: $bg_liner_color_red;

    .navbar {
      background: $bg_liner_color_red;
    }

    .tabs {
      justify-content: space-evenly;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 0px;
      width: 90%;
      margin: 0 auto;
      height: 40px;
      line-height: 40px;
    }

    .my {
      width: 94%;
      font-size: 16px;
      text-align: center;
      margin: 20px auto;
      background-color: #FFFFFF;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 5px;
    }

    .leader {
      width: 100%;
      text-align: center;

      .leader_item {
        width: 33.33%;
        font-size: 16px;

        .name,
        .txt {
          padding: 5px 0;
        }

        .name {
          font-weight: 600;
        }
      }
      .leader_item:first-child,
      .leader_item:last-child {
        margin-top: 40px;
      }
    }
  }

  .container {
    position: relative;
    width: 100%;
    margin-top: 30px;
    .wrap {
      padding-top: 10px;
      .list {
        width: 96%;
        margin: 0 auto;
        font-size: 16px;
        color: $font_color1;
        padding-top: 15px;
      

        .fund-detail {
          margin: 40px 0 20px;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #747474;
        }

        &_th {
          color: #747474;

          .item {
            font-weight: 600;
          }
        }

        &_th,
        &_td {
          justify-content: space-between;
          padding: 5px 10px;
          .item {
            text-align: center;
            flex: 1;
          }
        }

        &_td {
          font-size: 15px;
          background: #ffffff;
          border-radius: 4px;
          margin-bottom: 0;
          .top .item:nth-child(1),.middle .item:nth-child(1),.bottom .item:nth-child(1){
            text-align: left;
          }
          .top .item:nth-child(2),.middle .item:nth-child(2),.bottom .item:nth-child(2){
            text-align: right;
          }
          .top{
            padding-bottom: 8px;
            border-bottom: 2px solid #F7F9FE;
            .name{
              font-size: 14px;
              color: #626571;
              font-weight: 400;
            }
			.createtime {
				font-size: 12px;
				color: #ccc;
				font-weight: normal;
			}

            .projectmoney{
              div{
                color: #666;
                font-weight: 600;
                font-size:16px;
              }
            }

             .projectStatus{
                display: unset;
                width: 60%;
                padding: 0px 5px;
                background: linear-gradient(135deg, rgba(453, 181, 176, 0.12) 0%, rgba(303, 145, 139, 0.12) 100%);
                background-color: #GH8011;
                border-radius: 5px;
                /*color: #AC1023;*/
                color: #e32b10;
                font-size:12px;
                /*font-weight: 600;*/ 
            }
          }   
          .middle{
            padding: 10px 0;
          }
          .middle-2{
            padding-top: 0;
          }
          .middle .money,.bottom .money{
            font-size: 18px;
            font-weight: 600;
          }
        }
        &_td:nth-child(1){
          margin-top: 20px;
        }
      }

      .blue {
        font-weight: 600;
        color: #2F6DB3;
      }

      .green {
        font-weight: 600;
        color: #038310;
      }

      .red {
        font-weight: 600;
        color: #D20B0B;
      }

      .rules {
        margin-top: 10px;

        &_title {
          font-size: 14px;
          color: $font_color_b;
        }

        &_list {
          margin-top: 10px;
          background: $bg_color;
          box-shadow: 0px 1px 3px #00000029;
          border-radius: 5px;
          font-size: 13px;
        }

        &_th,
        &_td {
          justify-content: space-around;
          padding: 10px 0;

          .item {
            text-align: center;
            flex: 1;
          }
        }

        &_th {
          color: $font_color_white;
          background: $base_btn_color2;
          border-radius: 5px 5px 0 0;
        }

        &_td {
          color: $font_color;
          &:nth-child(odd) {
            background: #eff6ff;
          }
        }
      }
    }
  }
}

.color_b {
  color: $font_color_b;
}
</style>
