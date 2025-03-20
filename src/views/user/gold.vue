<template>
  <div class="page">
	  <nav-bar title="圆梦黄金" right="关于" @handleRight="$router.push({ path: '/gold-rule' })" />
	  
    <div class="part_1">
    </div>
    <div class="container">

      <div class="wrap">
		  
        <div class="list">
          <div class="fund-total" v-if="active == 0">
            
      
          </div>
          <div class="fund-recharge" v-else-if="active == 4 || active == 5">
            
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
			
			
			<div class="gold-1">  
			  <div class="flex-gold">
				  <div class="flex-item">
					  <div class="im">
					  <img src="@/assets/img/account/gold.png" style="width:60px;height:50px;">
					  </div>
				  </div>
				  <div class="flex-item">
					  <p class="text">圆梦黄金待领取</p>
					  <p class="gold">{{ account.wait_gold }} <span>克</span></p>
				  </div>
				  <div class="flex-item">
					  <div class="v-btn">
					  <van-button @click="toLingqu(1)" type="default">领取</van-button>
					  </div>
				  </div>
			</div>
			</div>
			
			
			 <div class="gold-2">  
			  <div class="lingqu-bot">
			    <p class="p1">圆梦黄金：<span class="gp">{{ account.gold }}</span>&ensp;<span class="per">克</span></p>
			    <p class="p1">当前金价：<span class="gp">{{ account.goldP }}</span>&ensp;<span class="per">元/克</span></p>
				<p class="p2"> 总价值：&ensp;<span class="gr">{{ account.gold_rmb }}</span>&ensp;<span class="per">元</span></p> 
			  </div>
			  <div class="gold-3">
				  <div class="v-btn">
				  <van-button @click="sell()" type="default">卖出</van-button>
				  </div>
			  </div>
			  </div>


			  
            </div>
            <van-list class="list-content" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
              <div class="list_td" v-for="it in billList" :key="it.id">
                <div class="left">
                  <div class="item-1" style="line-height: 24px;width: 125%;">{{ it.remark }}</div>
                  <div class="item-1" style="line-height: 24px;">{{ it.create_time }}</div>
                </div>
                <div class="right">
                  <span v-if="it.number > 0">+{{ it.number | formatGold }}</span>
                  <span v-else>{{ it.number | formatGold }}</span>
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
import { getBillApi, getAccountApi, getAccountReceiveApi,sold } from "@/api/member";
export default {
  data() {
    return {
      title: '圆梦黄金',
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
  filters: {
  	formatGold(val) {
  		return parseInt(val) + 'g';
  	}
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
	toLingqu (type) {
	
	  if (type == 2) {
	    var title = '领取数字人民币';
	    var msg = '可领取的数字人民币 '+this.account.numeralRmb+' 元';
	  } else {
	    var title = '领取圆梦黄金';
	    var msg = '可领取圆梦黄金 '+this.account.wait_gold+' 克';
		if (parseInt(this.account.wait_gold) < 1) {
			this.$dialog.alert({ title: '领取圆梦黄金', message: '暂无可领取圆梦黄金'});
			return false;
		}
	  }
	
	
	  if (parseInt(this.account.score) < 100) {
	    this.$dialog.alert({ title: title, message: '圆梦贡献值未达到100点，您暂时不能领取'});
	    return false;
	  }
	
	  this.$dialog.confirm({title: title,message: msg}).then(() => {
	    getAccountReceiveApi({type:type}).then((res) => {
	      if (res.code == 200) {
	        this.getUserInfo();
	        this.$dialog.alert({ title: title, message: res.msg});
	        return false;
	      } else {
	        this.$dialog.alert({ title: title, message: res.msg});
	        return false;
	      }
	    });
	  }).catch(() => {
	    console.log('on cancel');
	  });
	},
	sell (type) {
		var title = '卖出圆梦黄金';
	  if (this.account.online != 'yes') {
	    this.$dialog.alert({ title: title, message: '正式挂牌后可卖出提现'});
	    return false;
	  } else {
		  if (parseInt(this.account.gold) < 1) {
			  this.$dialog.alert({ title: title, message: '圆梦黄金不足, 无法卖出'});
			  return false;
		  }
		  var amount = parseInt(this.account.gold) * parseFloat(this.account.goldP);
		  var mess = '当前圆梦黄金'+this.account.gold+'克, 总价值'+amount+'CNY';
		  this.$dialog.confirm({title: title,message: mess}).then(() => {
		    sold().then((res) => {
		      if (res.code == 200) {
		        this.$dialog.alert({ title: title, message: res.msg});
		      } else {
		        this.$dialog.alert({ title: title, message: res.msg});
		      }
		    });
		  }).catch(() => {
		  });
		 
	  }
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
<style>
	
.van-dialog .van-dialog__cancel{
  display: inline-block !important;
}	
.van-dialog {
	 border-radius: 8px;
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
	 color: #D11A2D; 
	 font-weight: 600;
 }
.van-dialog .van-hairline--top {
	 border-top: rgba(172, 32, 35, 0.06) 1px solid;
 }
.van-dialog .van-button__content {
	 border-left: rgba(172, 32, 35, 0.06) 1px solid;
 }

</style>
<style lang="scss" scoped>	
.svg-icon{
  padding-right: 10px;
  vertical-align: middle;
}
::v-deep .van-nav-bar__content {
	background: #fff;
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
  .navbar{
    background: $bg_liner_color_touming;
    color: #000;
  }

  
  .part_1 {
    position: absolute;
    top: 0;
    width: 100%;
	height: halfSize(130px);
    background: $bg_liner_color_red;
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
      width: 100%;
      background-color:#fff;
      overflow-x: auto;
      box-sizing: border-box;
      padding: 15px 20px;
      .data_tab{
        flex-shrink: 0;
        padding: 4px 10px;
        font-size: 20px;
		color:#333;
		line-height: 40px;
		.ib {
			font-weight: bold;
		}
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

	  .lingqu-left,.lingqu-right{
		display: inline-block;
		vertical-align: middle;
	  }
	  text-align: center;

.gold-1 {
	box-sizing: border-box;
	width: 95%;
	margin: 0 auto;
	display: inline-block;
	padding: 10px;
	//padding-left: 30px;
	//border:#000 1px solid;
	background: #fff;
	border-radius: 4px;
}

.gold-2 {
	box-sizing: border-box;
	width: 95%;
	margin: 0 auto;
	margin-top: 15px;
	display: inline-block;
	padding: 10px;
	//padding-left: 30px;
	//border:#000 1px solid;
	background: #fff;
	border-radius: 4px;
	position: relative;
	.gold-3 {
		float: right;
		margin-top:-90px;
		height: 45px;
		padding: 25px 0;
		.v-btn {
			display: inline-block;
			width: 100%;
			text-align: right;
			.van-button {
				background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
				color:#fff;
				line-height: 20px;
				font-weight: 600;
				font-size: 14px;
				width: 80px;
				border-radius: 4px;
			}
		}
	}
}

.flex-gold {
	    display: grid;
	    grid-template-columns: repeat(3, 1fr);
	    grid-gap: 10px;
	    margin: 0 auto;
	    height: 80px;
		//border:1px solid #fc0;
		.flex-item {
			    display: flex;
			    flex-direction: column;
			    justify-content: center;
			    align-items: center;
				text-align: left;
				//border:1px solid #f00;
				.im {
					display: inline-block;
					width: 100%;
					text-align: left;
				}
				.text {
					font-size: 12px;
					color:#626571;
					//padding-left:20px;
					font-weight: 400;
					    display: inline-block;
					    width: 100%;
						line-height: 20px;
				}
				.gold {
		
					font-weight: 600;
					font-size: 18px;
					color:#D11A2D;
					display: inline-block;
					width: 100%;
					line-height: 30px;
					span {
						color:#3F3D38;
						font-weight: 400;
						font-size: 12px;
					}
				}
				.v-btn {
					display: inline-block;
					width: 100%;
					text-align: right;
					.van-button {
						background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
						color:#fff;
						line-height: 20px;
						font-weight: 600;
						font-size: 14px;
						width: 80px;
						border-radius: 4px;
					}
				}
		}
}

.lingqu-left1{
	position: absolute;
	top:23px;
	left:30px;
	width:30%;
          }

          .lingqu-left{
                 padding: 10px 10px 10px 33%;
                 width:30%;
                 margin:0;

                 p {
                    font-family: 'DIN Alternate';
                    color:#D11A2D;
                    font-size:23px;
                    font-style: normal;
                    padding: 0px 0;
                    line-height: 30px;
                    span {
                       font-size:16px;
                   }
                }
          }

          .lingqu-right {
            width:30%;
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


          .lingqu-bot{
                
                 width:100%;
                 margin:0;
				 text-align: left;
					padding-left: 8px;
                 .p1 {
                    color:#626571;
                    font-size:12px;
                    font-style: 400;
                    line-height: 30px;
					.gp {
						font-size:16px;
						line-height: 30px;
						font-weight: 600;
						font-size: 18px;
						color:#D11A2D;
					}
					.per {
						color:#626571;
						font-size:12px;
						font-style: 400;
					}
					
				}
				.p2 {
                    color:#626571;
                    font-size:12px;
                    font-style: 400;
					.gr {
						font-size:16px;
						line-height: 30px;
						font-weight: 600;
						font-size: 18px;
						color:#D11A2D;			
					}
					.per {
						color:#626571;
						font-size:12px;
						font-style: 400;
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
			margin-top: 20px;
          .list_td{
		
			margin: 15px auto 10px auto;
			width: 95%;
			padding: 5px;
			border-bottom: 1px solid #EDEDF1;
			box-sizing: border-box;
			background: #fff;
			
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
            font-size: 15px;
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

