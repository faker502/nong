<template>
  <div class="test-page">
    <div class="top">
        <div class="top-head">
          <div class="van-nav-bar__content">
            <div class="van-nav-bar__left" @click="$router.go('-1')">
              <i class="van-icon van-icon-arrow-left" style="color: #151E29; font-size: 22px;"></i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">
              <span><img src="@/assets/img/logo.png" style="width:50px;height:50px;vertical-align: middle;" /></span>
              <span style="letter-spacing:4px;font-size: 20px;font-weight: 600;padding-left: 10px;"></span>
            </div>
          </div>
        </div>
        <div class="top-body">
          <div class="havelogin">
            <div class="top-body-box">
            <div class="body-1">
              <p>持仓市值</p>
              <p>{{ stockAccount.stockMoney }}</p>
            </div>
            <div class="body-2">
              <p>持仓数量</p>
              <p>{{ stockAccount.stockOver }}</p>
            </div>
            </div>
          </div>
        </div>
    </div>
    <div class="page1">
      <div class="content">
        <div class="tabs df_r">
          <div class="tab df_c" v-for="it in tabs" :key="it.id" @click="handleTab(it)" :class="it.id == active ? 'active' : ''">
            <div class="tab_item df_c">
              <p>{{ it.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active == 1">
        <div v-if="stockLength > 0">
          <!-- <span style="color:#828282"></span> -->
          <div class="list"  v-for="(it, key) in stockList" :key="key">
            <div class="left">
              <div>{{it.stockName}}({{ it.stockCode }})</div>
              <div>股数</div>
              <div>每股现价</div>
              <div>持仓市值</div>
            </div>
            <div class="right">
              <div>{{it.createTime }}</div>
              <div>{{it.stockNum}} 股</div>
              <div>¥ {{it.marketPrice}}</div>
              <div>¥ {{it.position}}</div>
            </div>
            <div class="sell-div" style="text-align: center;">
              <div class="sell-button" @click="tipsShow(1, it)">
                卖出
              </div>
            </div>
          </div>
        </div>
        <van-empty description="暂无数据" v-else />
      </div>
      <div v-else>
        <div class="list">
          <div class="list_th df_r">
            <div class="item">时间</div>
            <div class="item">详情</div>
          </div>

          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
            <div class="list_td df_r" v-for="it in billList" :key='it.id'>
              <div class="item" style="font-size:14px">{{it.createTime}}</div>
              <div class="item">{{it.remark}}</div>
            </div>
          </van-list>
          <!-- <van-list v-else v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
            <div class="list_td df_r" v-for="it in yesterdayList" :key="it.id">
              <div class="item">第{{ it.rank }}名</div>
              <div class="item" v-if="it.member.isReal == 1">{{ it.member.name }}</div>
              <div class="item" v-else>未实名</div>
              <div class="item">{{ it.member.phone }}</div>
              <div class="item">{{ it.number }}</div>
              <div class="item color_b">{{ it.money }}</div>
            </div>
          </van-list> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBillApi, getAccountApi } from "@/api/member";
export default {
  components: {},
  data() {
    return {
      active: 1,
      tabs: [
        { id: 1, title: "股票持仓" },
        { id: 2, title: "股票明细" },
      ],
      billList: [],
      stockAccount:[],
      stockList: [],
      stockLength: 0,
      loading: false,
      finished: false,
      pageSize: 1,
      totalPage: 0,
      total: 0,
      endDate: 60,
      tips: false
    };
  },
  created() {
    this.getStockAccount();
  },
  methods: {
    handleTab(i){
      this.active = i.id;
    },
    onLoad() {
      if(this.active == 2) {
        this.getList();
      }
    },
    getStockAccount(){
      getAccountApi().then((res) => {
        this.stockAccount = res.data.account;
      });
    },
    getList() {
      let that = this
      getBillApi({ type: 1, pageSize: that.pageSize }).then((res) => {
        if (res.code != 200) {
          that.$toast('请求失败')
          return false;
        }
        if (that.pageSize == 1) {
          that.billList = res.data.data;
        } else {
          that.billList = that.billList.concat(res.data.data);
        }

        that.loading = false;
        that.pageSize++
        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        //根据业务需求更改
        //if (res.data.billList.length == 0 || res.data.billList == null || res.data.billList.length < 10) {
        if (that.pageSize > res.data.last_page) {
          that.finished = true
          return
        }
      })
    },
    tipsShow(v, item) {
      v == 1 ? this.tips = true : this.tips = false;
      if (item) {
       this.endDate = item.endDate; 
      }
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
.test-page {
  .top{
    position: relative;
      width: 100%;
      height: 190px;
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
        text-align: center;
        .top-head-1{
           width: 60%;
           display: inline-block;
           vertical-align: middle;
            padding-left: 20px;
            box-sizing: border-box;
           span{
            vertical-align: middle;
            font-size: 22px;
            font-weight: 600;
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
        .body-1{
          display: inline-block;
          width: 50%;
          font-size: 0.48rem;
          border-right: 1px solid #fff;
          box-sizing: border-box;
        }
        .body-2{
          display: inline-block;
          width: 50%;
          font-size: 18px;
          margin: 16px 0px 16px;
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
        .body-1,.body-2{
          p{
            padding: 10px 0;
          }
          p:nth-child(1){
            font-size: 15px;
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
        .havelogin{
          z-index: 100;
          position: relative;
        }
        .havelogin .body-3{
          width: 94%;
          display: inline-block;
          background-color: #fff;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          color: #333;
          font-size: 16px;
          padding: 10px 0px;
          .account{
            width: 25%;
            display: inline-block;
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
  }
  .page1 {
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    overflow: hidden;
    margin-top: -45px;
    padding-bottom: 60px;
    // -webkit-box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;
    // box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;
  }

  .content {
    margin: 0 15px;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 80px;
    box-shadow: rgba(225, 225, 225, 0.5) 0 5px 10px 0;
    .tabs {
      background: rgba(250, 252, 255, 0.7);
      box-shadow: 0px 2px 4px rgb(0 0 0 / 18%), inset 0px 0px 10px rgb(89 119 222 / 8%);
      border-radius: 8px;
      text-align: center;
      .tab{
        color: #747474;
        flex: 1;
        font-size: 16px;
      }
      .active{
        background: linear-gradient(135deg, rgba(114, 175, 248, 0.05) 0%, rgba(114, 175, 248, 0.35) 100%);
        border-radius: 8px;
        padding: 12px;
        flex: 1;
        color: #2F6DB3;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .list{
    width: 90%;
    margin: 20px auto;
    font-size: 16px;
    .left,.right{
      display: inline-block;
      width: 50%;
      div{
        padding: 10px 0;
      }
    }
    .left{
      display: inline-block;
      width: 50%;
      div:nth-child(1){
        color: #2F6DB3;
        font-weight: 600;
        padding: 6px 0 15px;
      }
    }
    .right{
      text-align: right;
      div:nth-child(1){
        color: #8E9093;
        font-size: 15px;
        padding: 6px 0 15px;
      }
    }
    .sell-div{
      width: 100%;
      margin: 0 auto;
      text-align: center;
      .sell-button{
        width: 50%;
        text-align: center;
        background: #B5D5FC;
        border-radius: 4px;
        margin: 14px auto;
        padding: 12px;
        font-weight: 600;
        color: #2F6DB3;
      }
    }
    .list_th .item,.list_td .item {
      text-align: center;
      flex: 1;
      padding:8px 0;
      &:nth-child(2) {
        flex: 2;
      }
    }
    .list_td{
      border-bottom: 1px solid #F0F0F0;
      padding-bottom: 6px;
    }
    .list_td .item{
      line-height:22px;
      &:nth-child(2) {
        text-align: right;
      }
    }
    .list_td:last-child{
      border: none;
    }
  }
}
</style>