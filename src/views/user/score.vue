<template>
  <div class="page">
    <div class="part_1">
	  <nav-bar :title="title" right=""  @handleRight="$router.push({ path: '/score' })" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>
    <div class="container">
      <div class="data_tabs df_r">
        <div class="data_tab">
          <p style="color:#3F3D38;font-weight: 400;font-size: 12px;">积分: </p>		
          <p style="font-weight: 600;font-size: 20px;color:#929973;">{{ account.score }}</p>		
        </div>
		
      </div>
      <div class="wrap">
		  
        <div class="list">
          <div class="fund-total" v-if="active == 0">
            
      
          </div>
          <div class="fund-recharge" v-else-if="active == 4 || active == 5">
            <van-list class="list-content">
              <div class="list_td">
                <div class="left">
                  <div class="item-1">
                    <!-- <van-icon name="alipay" /> -->
                    <van-icon name="passed" class="success" v-if="active == 4"/>
                    <svg-icon iconClass="alipay" :size="28" v-else/>
                    <span>支付宝充值 成功</span>
                  </div>
                  <div class="item-1">2023-04-21 15:38:00</div>
                </div>
                <div class="right">
                  +19809800
                </div>
                <div class="remark">备注：这里是备注信息，这里是备注信息这里是备注信息这里是备注信息</div>
              </div>
              <div class="list_td">
                <div class="left">
                  <div class="item-1">
                    <van-icon name="close" class="faild" v-if="active == 4"/>
                    <svg-icon iconClass="unionPay" :size="28" v-else/>
                    <span>银行卡支付 失败</span>
                  </div>
                  <div class="item-1">2023-04-21 15:38:00</div>
                </div>
                <div class="right">
                  +19809800
                </div>
                <div class="remark">备注：这里是备注信息，这里是备注信息这里是备注信息这里是备注信息</div>
              </div>
              <div class="list_td">
                <div class="left">
                  <div class="item-1">
                    <van-icon name="underway-o" class="wait" v-if="active == 1"/>
                    <svg-icon iconClass="wechatpay" :size="28" v-else/>
                    <span>微信支付</span>
                  </div>
                  <div class="item-1">2023-04-21 15:38:00</div>
                </div>
                <div class="right">
                  +19809800
                </div>
                <div class="remark">备注：这里是备注信息，这里是备注信息这里是备注信息这里是备注信息</div>
              </div>
              <div class="list_td">
                <div class="left">
                  <div class="item-1">
                    <svg-icon iconClass="shanpay" :size="28" />
                    <span>云闪付</span>
                  </div>
                  <div class="item-1">2023-04-21 15:38:00</div>
                </div>
                <div class="right">
                  +19809800
                </div>
                <div class="remark">备注：这里是备注信息，这里是备注信息这里是备注信息这里是备注信息</div>
              </div>
            </van-list>
          </div>
          <div v-if="active == 2">
            <van-list class="list-content" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
              <div class="list_td"  v-for="it in billList" :key="it.id">
                <div class="left">
                  <div class="item-1" style="line-height: 24px;width: 125%;">{{ it.remark }}</div>
                  <div class="item-1" style="line-height: 24px;">{{ it.create_time }}</div>
                </div>
                <div class="right">
                  +{{it.number}}
                </div>
                <div class="remark" v-if="it.remark2">备注：{{ it.remark2 }}</div>
              </div>
            </van-list>
            <!-- <div v-if="list.length > 0"> -->
          </div>
          <div v-else>
            <div class="fund-total fund-total-lingqu" v-if="active == 1">
              <div class="lingqu-left">
                <p style="">圆梦黄金</p>
                <p style="">{{ account.wait_gold }} <span>克</span></p>
              </div>
              <div class="lingqu-right">
                <p class="lingqu-button" @click="toLingqu(1)">领取</p>
                <!-- <p>{{ account.gold }}</p> -->
              </div>
            </div>
            <van-list class="list-content" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
              <div class="list_td" v-for="it in billList" :key="it.id">
                <div class="left">
                  <div class="item-1" style="line-height: 24px;width: 125%;">{{ it.remark }}</div>
                  <div class="item-1" style="line-height: 24px;">{{ it.create_time }}</div>
                </div>
                <div class="right">
                  <span v-if="it.number > 0">+{{ it.number }}</span>
                  <span v-else>{{ it.number }}</span>
                </div>
                <div class="remark" v-if="it.remark2">备注：{{ it.remark2 }}</div>
              </div>
              <!-- 
              <div class="list_td">
                <div class="left">
                  <div class="item-1" style="line-height: 24px;">代理股权</div>
                  <div class="item-1" style="line-height: 24px;">2023-04-21 15:38:00</div>
                </div>
                <div class="right">
                  +19809800
                </div>
                <div class="remark">备注：这里是备注信息，这里是备注信息这里是备注信息这里是备注信息</div>
              </div>
              <div class="list_td">
                <div class="left">
                  <div class="item-1" style="line-height: 24px;">代理股权</div>
                  <div class="item-1" style="line-height: 24px;">2023-04-21 15:38:00</div>
                </div>
                <div class="right">
                  +19809800
                </div>
                <div class="remark">备注：这里是备注信息，这里是备注信息这里是备注信息这里是备注信息</div>
              </div> -->
            </van-list>
            <!-- <div v-if="list.length > 0"> -->
            <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
              <div v-for="it in billList" :key="it.id">
                <div class="list_td df_r" >
                  <div class="item" style="line-height: 24px;">{{ it.createTime }}</div>
                  <div class="item" style="line-height: 24px;">
                    <span v-if="it.title == '助力金推荐奖励'">{{ it.remark }}</span>
                    <span v-else>{{ it.title }}</span>
                  </div>
                  <div class="item blue">{{ it.number >= 1 ? "+" + it.number : it.number }}{{ it.moneyType == 1 ? '股' : ''
                  }}</div>
                  <div class="item" :class="it.number >= 1 ? 'green' : 'red'">{{ it.number >= 1 ? "增加" : '减少' }}</div>
                </div>
                <div v-if="it.remark2" style="padding: 0 0 8px 20px;">转账备注：{{ it.remark2 }}</div>
              </div>
            </van-list> -->
            <!-- </div> -->
            <!-- <van-empty description="暂无数据" v-else /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBillApi, getAccountApi } from "@/api/member";
export default {
  data() {
    return {
      title: '积分记录',
      accountTitle: '',
      active: 7,
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
   
    //this.active = 3
    //console.log(this.active);
    this.getList();
    // if (this.active == 1) {
    //   this.title = this.accountTitle = '国债明细';
    // } else if (this.active == 2) {
    //   this.title = this.accountTitle = '友谊金明细';
    // } else if (this.active == 3) {
    //   this.title = this.accountTitle = '账户余额';
    // } else {
    //   this.active = 0;
    //   this.accountTitle = '账户总资产';
    // }
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getAccountApi().then((res) => {
        this.account = res.data.account;
      });
    },
    getList() {
      let that = this
      getBillApi({ type: parseInt(this.active), pageNum: that.pageNum }).then((res) => {
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
::v-deep .van-nav-bar__right {
	font-weight: normal;
}
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  background: url('@/assets/photo/top2.webp') no-repeat top left;
//background-color: #a9ae8a;
  background-size: 100% 168px;
  
  
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
    .my {
      width: 94%;
      font-size: 16px;
      text-align: center;
      margin: 20px auto;
      background-color: #FFFFFF;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 10px;
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
    margin-top: 65px;
    .data_tabs {
	width: 95%;
    margin: 0 auto;
    background-color: #fff;
    overflow-x: auto;
    box-sizing: border-box;
    padding: 15px 20px;
    margin-top: 86px;
	border-radius: 4px;
	
      .data_tab{
        padding: 4px 10px;
        font-size: 20px;
		color:#333;
		line-height: 30px;
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
      .list {
        margin: 0 0 70px 0;
        //background: $bg_color;
        font-size: 16px;
        color: $font_color1;
		.van-list {
		    width: 95%;
		    background: #fff;
		    margin: 0 auto;
		    border-radius: 5px;
		}
        /*.fund-total {
          width: 90%;
          margin: 0 auto;
          background-size: 100% 100%;
          color:#000;
          text-align: center;
          .left {
            display: inline-block;
            width: 50%;

            padding-left: 22px;
            box-sizing: border-box;
            vertical-align: middle;
            font-size: 16px;
            p:nth-child(1) {
              padding: 10px 0;
            }
            p:nth-child(2) {
              font-family: 'DIN Alternate';
              font-style: normal;
              padding: 10px 0;
              line-height: 30px;
              
            }
          }

          .right {
            display: inline-block;
            width: 50%;
            box-sizing: border-box;
            padding: 15px 22px 15px 0;
            text-align: right;
            vertical-align: middle;
            color: #2F6DB3;
            font-size: 20px;
            p {
              padding: 10px 0;
            }
            div {
              width: 90%;
              background: radial-gradient(82.74% 862.49% at 28.76% 51.43%, rgba(114, 175, 248, 0.55) 0%, rgba(114, 175, 248, 0.12) 100%);
              border-radius: 4px;
              padding: 10px 0;
              font-size: 18px;
              img,
              span {
                vertical-align: middle;
              }

              span {
                padding-left: 4px;
                font-weight: 600;
                font-size: 16px;
              }
            }
            .a,.b {
              margin-bottom: 10px;
            }
          }
        }*/
        .fund-total-lingqu {
          /*border:1px solid green;*/
          .lingqu-left,.lingqu-right{
            display: inline-block;
            vertical-align: middle;
          }

          .lingqu-left{
                 padding: 10px 10px 10px 8%;
                 width:45%;
                 margin:0;
                 /*border:1px solid red;*/
                 p:nth-child(1) {
                    font-size:16px;
                    padding: 0px 0px 7px 0px;

                 }
                 p:nth-child(2) {
                    font-family: 'DIN Alternate';
                    color:#D11A2D;
                    font-size:30px;
                    font-style: normal;
                    padding: 0px 0;
                    line-height: 30px;
                    span {
                       font-size:16px;
                   }
                }
          }

          .lingqu-right {
            width:43%;
            padding-left: 0px;
            font-weight: 600;
            text-align:right;
            letter-spacing: 2px;
            .lingqu-button{
              float:right;
              padding: 10px 14px 10px 14px;
              margin-right:15px;
              width:  80px;
              /*border: 2px solid red;*/
              text-align:center;
              border-radius: 20px;
              background-color:#D11A2D;
              color:#fff;
            }
          }
        }

        .fund-recharge{
          .list_td{
            .left{
              .item-1:nth-child(1){
                span{
                  vertical-align: middle;
                }
              }
            }
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

        .list-content{
			margin-top: 0;
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
              font-size: 14px;
    
            }
            .item-1:nth-child(2){
              font-size: 12px;
              color: #626571;
            }
          }
          .right{
            width: 40%;
            text-align: right;
            vertical-align: middle;
            font-size: 16px;
            font-weight: 600;
          }
          .remark{
            font-size: 16px;
            color: #626571;
            line-height: 24px;
          }
        }

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
          border-radius: 14px;
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
          border-radius: 14px 14px 0 0;
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