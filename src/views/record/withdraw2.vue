<template>
  <div class="page">
    <nav-bar title="提现记录" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    <div class="part_2">
      <div class="wrap">
        <div class="record">
          <van-list v-model="loading"
            :finished="finished"
            finished-text="~没有更多记录了~"
            @load="onLoad"
			v-if="!noData"
            class="list-content">
              <div class="list_td" v-for="it in list" :key="it.id">
                <div class="left">
                  <div class="item-1">
                    <!-- <van-icon name="passed" class="success" v-if="it.status == 1"/>
                    <van-icon name="close" class="faild" v-else-if="it.status == 2"/>
                    <van-icon name="underway-o" class="wait" v-else/> -->
                    <!-- <svg-icon iconClass="alipay" :size="28" v-if="it.paymentWay == 'Alipay'"/>
                    <svg-icon iconClass="unionPay" :size="28" v-else/> -->
                    <span>{{it.paymentWay == 'Alipay' ? '支付宝账户' : '银行卡账户'}} 
                    <span class="state_default" :class="{'state_waiting': it.status == 0,'state_success':it.status == 1,'state_fail':it.status == 2,'state_paying':it.status == 3}" >{{it.state_name}}</span></span>
                  </div>
				  <div class="item-1 big"><span>提现金额：{{it.money}} 元</span></div>
				  <div class="item-1"><span>到账金额：<span style="color:crimson">{{it.receiptMoney}}</span> 元</span></div>
                  <div class="remark" v-if="it.cancelReason">提示：{{ it.cancelReason }}</div>
                </div>
                
				<div class="time">{{it.createTime}}</div>
              </div>
          </van-list>          
          <van-empty description="暂无数据" v-else />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { withdrawalLogsApi } from "@/api/member";
import { isNull } from "lodash-es";
export default {
  name: "Withdraw_r",
  data() {
    return {
      list: [],
      status: {
        1: "提现中",
        2: "已提现",
        3: "已取消",
        4: "已拒绝",
      },
      loading: false,
      finished: false,
      pageNum:  1,
      totalPage: 0,
       total: 0,
	   noData: 0
    };
  },
  mounted() {
    //this.withdrawLogList();
  },
  methods: {
    onLoad() {
      this.withdrawLogList();
    },
    withdrawLogList() {
      let that = this
      withdrawalLogsApi({"pageNum":that.pageNum}).then((res) => {
        if (that.pageNum == 1) {
          that.list = res.data.data;
		  if (res.empty == 1) {
		  	that.noData = 1;
		  }
        } else {
          that.list = that.list.concat(res.data.data);
		  that.noData = 0;
        }

        that.loading = false;
        that.pageNum++;
        if (that.pageNum > res.data.last_page) {
          that.finished = true
          return
        } else {
          this.pageNum = that.pageNum
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.van-icon-passed::before{
  color: #038310;
  font-weight: 600;
}
.van-icon-close::before{
  color: #FE6161;
  font-weight: 600;
}
.van-icon-underway-o::before{
  color: #2F6DB3;
  font-weight: 600;
}


.state_default{
            color:#fff;
              border-radius:2px;
              margin-left:15px;
              padding: 2px;
              font-size:12px;
              vertical-align: middle;
			  width: 60px;
			  line-height: 14px;
			  height: 14px;
			  text-align: center;
			  display: inline-block;
}

.state_paying{
  background-color:#3c9be2;
}

.state_fail{
  background-color:#EE6863 ;
}

.state_success{
  background-color:#0aae0a;
}

.state_waiting{
  background-color:orange;
}



.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  background: url('@/assets/photo/top2.webp') no-repeat top left;
//background-color: #a9ae8a;
  background-size: 100% 168px;
  
  

  
  .part_2 {
    //min-height: calc(100% - halfSize(250px) + 60px);
    //background: #ffffff;
    // margin-top: -130px;


    .wrap {
      padding:20px 0;
      color: $font_color_dark;
      font-size: 13px;
	  background: #fff;
	   width: 96%;
	    margin: 20px auto;
		margin-top: 80px;
	  position: relative;
	    border-radius: 5px;
      .record {
		  
			

        .list-content{
          .list_td{
            margin: 15px 20px 1px 20px;
			padding-bottom: 7px;
            border-bottom: 1px solid #EDEDF1;
          }
          .left,.right{
            display: inline-block;
          }
          .left{
            width: 68%;
            text-align: left;
            line-height: 24px;
            .item-1{
              font-size: 15px;
			  
            }
            

          }
          .right{
            width: 32%;
            text-align: right;
            vertical-align: middle;
            height: 50px;
			font-size: 15px;
			color:#3F3D38;
            font-weight: 600;
          }
		  .time{
		  	font-size: 12px;
		  	color: #ccc;
			line-height: 20px;
		  }
          .remark{
            font-size: 14px;
            color: #EE6863;
            line-height: 25px;
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
          .success{
            background: #E6F0E7;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            line-height: 32px;
            text-align: center;
          }
          .faild{
            background: #FAEBEB;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            line-height: 32px;
            text-align: center;
            border: none;
          }
          .wait{
            background: #EAEFF4;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            line-height: 32px;
            text-align: center;
            border: none;
          }
        }
        .list_box {
          &_item {
            background: $bg_color;
            border-radius: 10px;
            padding: 3px 10px;
            margin-bottom: 10px;
            color: $font_color1;
            border-bottom: 1px solid #eeeeee;
            font-size: 16px;
            .text {
              justify-content: space-between;
              padding: 7px 0;
              &_border {
                border-bottom: 1px solid #eaeaea;
              }
              .text_left:nth-child(1){
                color: #B0B4B7;
              }
              &_bold {
                font-size: 15px;
                font-weight: bold;
              }
              &_money {
                color: $font_color_b;
              }
              .wait{
                background: rgba(47, 109, 179, 0.08);
                border-radius: 13px;
                padding: 8px 20px;
                color: #2F6DB3;
              }
              .success {
                background: rgba(3, 131, 16, 0.08);
                border-radius: 13px;
                padding: 8px 20px;
                color: #038310;
              }
              .fail {
                color: $font_color_red;
                background: rgba(214, 71, 81, 0.08);
                border-radius: 13px;
                padding: 8px 20px;
              }
              .flex_2 {
                text-align: right;
                width: 70%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
