<template>
  <div class="page">
    <div class="part_1">
      <nav-bar :title="title"  />
    </div>
    <div class="container">
      <div class="data_tabs df_r">
        <div class="data_tab"  :class="it.id === active ? 'tab_active' : ''"
          v-for="it in tabs" :key="it.id" @click="handleTab(it)">
          <span>{{ it.title }}</span>
        </div>
      </div>
      <div class="wrap">
        <div class="list">
         
          <div>
            <van-list class="list-content" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
              <div class="list_td"  v-for="it in billList" :key="it.id">
                <div class="left">
                  <div class="item-1" style="line-height: 24px;width: 125%;">{{ it.remark }}</div>
                  <div class="item-1" style="line-height: 24px;">{{ it.create_time }}</div>
                </div>
                <div class="right">
                 ¥ {{it.award}}
                </div>
                <!--<div class="remark" v-if="it.remark2">备注：{{ it.remark2 }}</div>-->
              </div>
            </van-list>
            <!-- <div v-if="list.length > 0"> -->
          </div>
       
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAccountApi } from "@/api/member";

import { getlevelAwardApi } from "@/api/team";


export default {
  data() {
    return {
      tabs: [
        { title: "一级奖励", id: 1 },
        { title: "二级奖励", id: 2 },
        { title: "三级奖励", id: 3 },
      ],
      title: '团队奖励记录',
      accountTitle: '',
      active: 1,
      billList: [],
      account: [],
      loading: false,
      finished: false,
      pageNum: 1,
      totalPage: 0,
      total: 0,
      tips: false
    };
  },
  mounted() {
   
    if (this.$route.query.level) {
      this.active = parseInt(this.$route.query.level);
    } else {
      //帐户余额
      this.active = 1;
    }
    //this.active = 1
    //console.log(this.active);
    this.getList();
    this.getUserInfo();
  },
  methods: {
    handleTab(it) {
      if (it.id != this.activeIndex) {
        this.title = it.title;
        this.active = it.id;
        this.pageNum = 1;
        this.finished = false;
        this.list = [];
        this.getList();
      }
    },
    getUserInfo() {
      getAccountApi().then((res) => {
        this.account = res.data.account;
      });
    },
    getList() {
      let that = this
      getlevelAwardApi({ level: parseInt(this.active), pageNum: that.pageNum }).then((res) => {
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
        if (this.pageNum == 1){
            return 
        }
        this.getList();
    },
    tipsShow(v) {
      v == 1 ? this.tips = true : this.tips = false;
      return false;
    }
  },
};
</script>
<style lang="scss" scoped>
.svg-icon{
  padding-right: 10px;
  vertical-align: middle;
}
.van-icon-passed::before{
  color: #038310;
}
.van-icon-close::before{
  color: #FE6161;
}
.van-icon-underway-o::before{
  color: #2F6DB3;
}
::v-deep .van-dialog__cancel .van-button__content .van-button__text{
  background-color: #ffffff;
}
::v-deep .van-dialog__footer button:nth-child(1) .van-button__content .van-button__text{
  background-color: #ffffff;
} 
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  .part_1 {
    position: absolute;
    top: 0;
    width: 100%;
    background: $bg_liner_color_red;
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
  }
  .container {
    position: relative;
    width: 100%;
    margin-top: 65px;
    .data_tabs {
      width: 100%;
      background-color:#f8ebe6;
      overflow-x: auto;
      box-sizing: border-box;
      padding: 15px 20px;
      .data_tab{
        flex-shrink: 0;
        padding: 4px 10px;
        font-size: 17px;
      }
      .tab_active{
        color: #AC2023;
        span{
          padding-bottom: 8px;
          border-bottom: 3px solid #AC2023;
        }
      }
    }
    .wrap {
      padding-top: 10px;
      .list {
        margin: 10px 0;
        background: $bg_color;
        font-size: 16px;
        color: $font_color1;

        .list-content{
          .list_td{
            margin: 15px 20px;
            border-bottom: 1px solid #EDEDF1;
          }

          .left,.right{
            display: inline-block;
          }

          .left{
            width: 60%;
            text-align: left;
            line-height: 24px;
            vertical-align: middle;
            .item-1:nth-child(1){
              font-size: 18px;
              font-weight: 600;
            }
            .item-1:nth-child(2){
              font-size: 16px;
              color: #626571;
            }
          }

          .right{
            width: 40%;
            text-align: right;
            vertical-align: middle;
            font-size: 18px;
            font-weight: 600;
          }

          .remark{
            font-size: 16px;
            color: #626571;
            line-height: 24px;
          }
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
          padding: 10px 10px;
          .item {
            text-align: center;
            flex: 1;
          }
        }
        &_td {
          font-size: 15px;
        }
      }
    }
  }
}

.color_b {
  color: $font_color_b;
}
</style>