<template>
  <div class="page">
    <div class="part_1">
      <nav-bar :title="title" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>
    <div class="container">

      <div class="wrap">
		  
        <div class="list">
          <div class="fund-total" v-if="active == 3">
            
			<div class="detail-1" style="display:none;">
			  <div class="detail-2">
				  <div class="flex-item">
					  <p class="text">专项基金:</p>
					  <p class="gold">{{ account.fund }}</p>
				  </div>
				  <div class="flex-item">
					  <div class="v-btn">
					  <van-button @click="$router.push({ path: '/withdraw' });" type="default">提现</van-button>
  
					  </div>
				  </div>
			</div>
			
			
			
			
			</div>
      
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
import { getRollApi } from "@/api/member";
export default {
  data() {
    return {
      title: '抽奖记录',
      accountTitle: '',
      active: 8,
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
   

    this.getList();

  },
  methods: {
    getUserInfo() {
      getAccountApi().then((res) => {
        this.account = res.data.account;
      });
    },
    getList() {
      let that = this
      getRollApi({ type: parseInt(this.active), pageNum: that.pageNum }).then((res) => {
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
        margin: 10px auto;
        background: #fff;
		width: 95%;	
        font-size: 16px;
        color: $font_color1;
		text-align: center;
		border-radius: 5px;
		padding-bottom: 60px;
		.van-list {
		    width: 100%;
		    background: #fff;
		    margin: 0 auto;
		    
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
		
		.detail-1 {
			box-sizing: border-box;
			width: 95%;
			margin: 0 auto;
			display: inline-block;
			padding: 10px 20px 10px 30px;
			//padding-left: 30px;
			//border:#000 1px solid;
			background: #fff;
			border-radius: 4px;
			
			.detail-2 {
				    height: 50px;
					//border:1px solid #fc0;
					display: grid;
					grid-template-columns: 30% 70%;						
					
					.flex-item {
						    display: flex;
						    flex-direction: column;
						    justify-content: center;
						    align-items: center;
							//border:1px solid #f00;
							text-align: left;
							.text {
								font-size: 12px;
								color:#626571;
								
								font-weight: 400;
								    display: inline-block;
								    width: 100%;
									line-height: 20px;
							}
							.gold {
							
								font-weight: 600;
								font-size: 18px;
								color:#0E2529;
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
									//background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
									//color:#fff;
									line-height: 20px;
									font-weight: 600;
									font-size: 12px;
									width: 80px;
											border-radius: 4px;
											
													background: rgba(157, 164, 112, 0.12);
													border: 1px solid #AAB086;
													color: #A7AF78;
													height: 35px;
											
								}
							}
					}
			}
			
		}	
		
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
                    color:#929973;
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
			margin-top: 20px;
			border-radius: 5px;
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
              font-weight: 400;
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