<template>
  <div class="page">
    <div class="part_1">
      <nav-bar :title="'会议中心'" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
    </div>
    <div class="container">

      <div class="wrap">
		  
        <div class="list">
          
		  
		  <van-list class="list-content" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
		    <div class="list_td" v-for="it in billList" :key="it.noticeId" @click="$router.push('/news/info?noticeId=' + it.noticeId)">
		      <div class="left">
            <!-- <img src="@/assets/photo/file.png" /> -->
            <img src="@/assets/photo/demo-news.png" />
		        <div class="item-1" style="line-height: 24px;width: 100%;">{{ it.noticeTitle }}</div>

            <div class="info">
              <div class="info-top">
                <img src="@/assets/photo/demo-news.png" />
                <div class="info-top-right">
                  <h6>王成文</h6>
                  <p>人民资产宣传部第一科室科长</p>
                </div>
              </div>
              <p>{{it.createTime}}</p>
            </div>
            <!-- <van-icon name="arrow" /> -->
		        <!-- <div class="item3" v-show="it.intro">{{ it.intro }}</div> -->
		        <!-- <div class="item4">
					
					<div class="file">
						{{ it.remark }}
					</div>
					
					<div class="file">
						{{ it.createTime }}
					</div>
					
					
					
				</div> -->
		      </div>
		      <div class="right">		        
		        <span></span>
		      </div>
		    </div>
		  </van-list>
			
			
			</div>
      
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getNewsListApi } from "@/api/article";
export default {
  data() {
    return {
      title: '相关文件',
      accountTitle: '',
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
    getList() {
      let that = this
      getNewsListApi({ type: 8, pageNum: that.pageNum }).then((res) => {
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
 ::v-deep .nav-top .van-icon:before {
      background: #fff !important;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
    width: 100%;
    height: 168px;
    // background-image: url('@/assets/photo/top2.webp');
    background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);

	//background-color: #a9ae8a;
    background-size: 100% 100%;
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
		    margin-top: 44px;
        //background: $bg_color;
        font-size: 16px;
        color: $font_color1;
		text-align: center;
		.van-list {
		    width: 95%;
		    // background: #fff;
        // background: #FFFFFF6B;

		    margin: 0 auto;
		    border-radius: 4px;
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
									font-size: 12px;
									width: 70px;
											border-radius: 4px;
											
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
			margin-top: 0px;
      padding: 8px 0;
          .list_td{
            // margin: 15px 5px;
            // border-bottom: 1px solid #EDEDF1;
            // padding: 8px 12px!important;
            padding: 0 0px;
            // border: 1px solid blue;
            margin-bottom: 20px;
            background: #FFFFFF6B;
            border-radius: 8px;
         

          }
          .left,.right{
            display: inline-block;
          }
          .left{
            display: flex;
            flex-direction: column;
            width: 100%;
            text-align: left;
            line-height: 24px;
            vertical-align: middle;
			      min-height: 48px;
            >img {
              width: 100%;
              height: 160px;
              margin-right: 5px;
            }
            .item-1{
              padding: 8px 12px;
              font-size: 20px;
              // font-weight: 600;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              width: 100%;
            }
            .info {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              padding: 12px;
              box-sizing: border-box;
              .info-top {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #6C6E6C;
                >img {
                  width: 37px;
                  height: 37px;
                  border-radius: 50%;
                }
                .info-top-right {
                  margin-left: 10px;
                  h6 {
                    // font-size: 16px;
                    color: #313231;
                  }
                  p {
                    font-size: 10px;
                    // color: #6C6Es6C;
                  }
                }
              }
            }
            // .item-1:nth-child(2){
            //   font-size: 16px;
            //   color: #313231;
            //   font-weight: 500;
            //   overflow: hidden;
            //   text-overflow: ellipsis;
            //   white-space: nowrap;
            //   width: 100%;
            // }
			.item3 {			
						  width: 95%;
						  height: 40px;
						  line-height:20px;
						  font-size: 12px;
						  color: #999;
						  font-weight: normal;
						  margin: 7px auto 0 auto;
			
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
				  
			}
			.item4 {
				  width: 95%;
				  height: 27px;
				  line-height:27px;
				  font-size: 14px;
				  color: #1a0dab;
				  font-weight: 400;
				  margin: 7px auto 0 auto;
				  .file {
						  width: auto;
						   display: inline-block;
						   border:1px solid #ccc;
						   padding: 0 5px;
						   margin-right: 10px;
						  border-radius:3px;
				  }
				  .ttt {
					  width: auto;
					  display: inline-block;
					  padding-left: 20px;
				  }
						  
				  
			}
          }
          .right{
            width: 1px;
			display: none;
            text-align: right;
            vertical-align: middle;
            font-size: 12px;
			color:#999;
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
