<template>
    <div class="test-page">
		
		<div class="part_1">
		  <nav-bar title="积分"  titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
		</div>
		
    	<!-- <div class="i-mask2" v-if="showMask" @click="alertMsg()"></div>	 -->
        <div class="top">
			
						
			<div class="user-logo" style="height:20px;">
				
			</div>
			
			
			
			
			<div class="top-head">
				
				<div class="right-m" ></div>
	
				
				<!-- <div class="h1">
					{{ config.fundTitle && config.fundTitle.config_value }}
				</div> -->
<!-- 				
				<div class="tabs data_tabs2 df_r">
						
					<div class="data_tab2" @click="$router.push('/fund-pro')">
					    专项基金
					</div>
					<div class="data_tab2 tab_active2">
					    相关福利
					</div>
				 
				</div> -->
				
				
				
			<div class="top-head-ch" style="background:#fff;padding-top:0;text-align:center;">	
				<div class="lq">
					<!-- 新注册成员完成实名认证即可领取：专属现金红包20元、
					专项基金200万元 -->
					<img src="@/assets/photo/jf/ban18.webp" style="width:95%;margin:10px auto 0 auto;"  />
				</div>

				
	
<!-- 				<div class="lq3">
					<div style="display:block;line-height:25px;height:25px;padding-top: 5px;">
						<div class="proc" style="padding-top: 8px; width: 100%;">
							<van-progress
							  stroke-width="8" 
							  :percentage="progress"				  
							  pivot-color="linear-gradient(135deg, rgb(171, 178, 135) 0%, rgb(170, 177, 134) 100%)"
							  color="linear-gradient(rgb(199, 206, 161) 0%, rgb(167, 174, 130) 100%)"
							/>
						</div>
					</div>
				</div> -->
				
				
				<div style="margin: 5px; padding-bottom: 10px;" >
				  <!-- <van-button round block type="primary"  native-type="submit" style="font-size: 16px;">
				    领取
				  </van-button> -->
				  <div style="line-height: 200%;text-align: left;width:95%;margin: 0 auto;position: relative;">
					  <div style="font-size:12px;color: rgba(14, 37, 41, 1);">我的积分</div>
					  <div style="font-size:16px;font-weight:600;">{{ myJf }}</div>
					  
					  <div style="position: absolute;right: 0;top:5px;" @click="$router.push('/fund/record4')">
					  						  <van-button round block type="primary"  native-type="submit" style="font-size: 16px;">
					  						    兑换记录
					  						  </van-button>
					  </div>
					  
					  <div style="position: absolute;right: 120px;top:5px;" @click="$router.push('/my/score')">
						  <van-button round block type="primary"  native-type="submit" style="font-size: 16px;">
						    积分记录
						  </van-button>
					  </div>
				  </div>
				  
				</div>
				
			</div>
			</div>
			
			
        </div>
		
        <div class="page1">
			
	
			
            <div class="content">
                <div class="content-box">
	
					
					
					<div class="lq" @click="getAwardJF(100)">
<!-- 						<div class="abs">
							已兑换 <span>{{ datas.left100 }}</span> 份
						</div> -->
						<img src="@/assets/photo/jf/1.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					<div class="lq" @click="getAwardJF(200)">
<!-- 						<div class="abs">
							已兑换 <span>{{ datas.left200 }}</span> 份
						</div> -->
						<img src="@/assets/photo/jf/2.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					
					
					<!--
					
					<div class="lq" @click="getAwardJF(300)">
						<div class="abs">
							已兑换 <span>{{ datas.left300 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf300.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					<div class="lq" @click="getAwardJF(500)">
						<div class="abs">
							已兑换 <span>{{ datas.left500 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf500.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					
					<div class="lq" @click="getAwardJF(1000)">
						<div class="abs">
							已兑换 <span>{{ datas.left1000 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf1000.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					
					<div class="lq" @click="getAwardJF(2000)">
						<div class="abs">
							已兑换 <span>{{ datas.left2000 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf2000.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					
					<div class="lq" @click="getAwardJF(3000)">
						<div class="abs">
							已兑换 <span>{{ datas.left3000 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf3000.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					
					<div class="lq" @click="getAwardJF(5000)">
						<div class="abs">
							已兑换 <span>{{ datas.left5000 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf5000.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					<div class="lq" @click="getAwardJF(10000)">
						<div class="abs">
							已兑换 <span>{{ datas.left10000 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf10000.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					<div class="lq" @click="getAwardJF(20000)">
						<div class="abs">
							已兑换 <span>{{ datas.left20000 }}</span> 份
						</div>
						<img src="@/assets/photo/jf/jf20000.webp" style="width:100%;border-top-right-radius: 6px;border-top-left-radius: 6px;"/>	
					</div>
					
					
					
					-->
					
					
					
                    
                </div>

            </div>

        </div>


       <!--输入密码 start-->
       <van-form ref="pwdForm" v-show="pwdShow" class="mt15 passwdForm" @submit="submitPwd">
		   <div style="margin:15px 10px 0 30px;" v-html="projectTip"></div>
            <van-cell-group inset>
                <van-password-input height="90%" :value="password" :focused="showKeyboard" :length="6" :gutter="10"
                  @focus="showKeyboard = true" @blur="submitPwd" />
            </van-cell-group>
            <van-number-keyboard v-model="password" :show="showKeyboard" @blur="hidden"  />
            <div style="margin: 16px">
              <van-button round block type="primary" color="linear-gradient(180deg, #c0c79e 0%, #c0c79e 100%)" native-type="submit" style="font-size: 16px;">
                确认
              </van-button>
            </div>
        </van-form>
        <!--输入密码 end-->

		
    </div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { getListApi, getDetailApi, buyProjectApi, getAwardApi333,getAward333,getJFAwardApi } from "@/api/project";
import { getConfigKey } from "@/api/index";
import { Toast,Progress } from "vant";
export default {
    name: 'projectList',
    components: {
		[Progress.name]: Progress,
	},
    data() {
        return {
            tabs: [
                { value: 1, title: "中国圆梦" },
                { value: 2, title: "我的助力" },
            ],
            list: [],
            all: [],
            classId: 0,
            showKeyboard: false,
            pwdShow:false,
            password: '',
            projectId:0,
            score:0,
            price:0,
			fund:1,
            isSubmit:true,
			timer: null,
			projectTip:'',
		    showMask: false,
			pk:0,
			config:[],
			textT:"",				
			getT:"",
			per:[],		
			ttt:'-',
			lll:'-',
			progress:0,
			num:0,
			jf5:0,
			jf10:0,
			jf100:0,
			jf200:0,
			jf300:0,
			jf500:0,
			myJf:'-',
			datas:{},
			num2name: {100:"现金80元",200:"现金165元",300:"价值1999元理疗养生足浴盆一个",500:"价值7599元智能洗碗机套装一套",1000:"价值11999元智能烘洗一体机一台",2000:"价值12999元全新OPPO Find N3 AI手机一台",3000:"价值27195元999足金吊坠一条",5000:"高原牦牛两头",10000:"价值10万元五菱宏光MINI电动汽车一台",20000:"价值53.98万元顶配版新红旗H9汽车一台"},
        };
    },
    created() {
        if (this.$route.query.id != undefined) {
            this.classId = parseInt(this.$route.query.id);
        }
		this.getConfig();
		this.getAwardApi();
    },
	destroyed() {
		clearTimeout(this.timer);
	},
    methods: {
		
		getAwardJF(num) {
						
				this.$dialog.confirm({message: '使用'+num+'积分兑换'+this.num2name[num]}).then(() => {
					
					getJFAwardApi({'num':num}).then((res) => {
						
						if (res.code == 200) {
							this.$dialog.alert({ message: res.msg});
							this.myJf = res.jf;
							if (!res.addr) {
								this.$router.push('/set/address');
							}
						} else {
							Toast(res.msg);
						}	 		
					});
					
				
				}).catch(() => {
				  console.log('on cancel');
				});
			
			
			
		},
		
        handleTab(id,k) {
			this.fund = id;
			this.pk = k;
			this.getDetail();			
        },
		
        getAwardApi() {
            getAwardApi333().then((res) => {
                	if (res.code == 200) {
						this.ttt = res.data.ttt;
						this.lll = res.data.lll;
						this.progress = res.data.progress;				
						this.jf5 = res.data.jf5;				
						this.jf10 = res.data.jf10;				
						this.jf100 = res.data.jf100;				
						this.jf200 = res.data.jf200;				
						this.jf300 = res.data.jf300;				
						this.jf500 = res.data.jf500;
							
						this.datas = res.data;
									
						this.myJf = res.data.jf;
					}
            });
        },
		
		getAward() {
		    getAward333().then((res) => {
				Toast(res.msg);
		    });
		},
		
		getConfig() {
		  getConfigKey({ 'key': 'endPreheatcle' }).then((res) => {
			if (res.data.uStatus && res.data.uStatus == 2) {
				this.showMask = true;
			}
			//this.getProjectList();
		  });
		},
		alertMsg() {
			this.$dialog.alert({ title: '该账户已冻结', message: '请联系在线客服申请解冻'});
		},		
        submit() {
            this.show = false;
            cache.local.remove("loginType");
            setReadApi().then((res) => { });
        },
        applyOrder(id){
            alert(2);
            console.log(id);
        },
		hidden() {
			this.showKeyboard = false;	
			clearTimeout(this.timer);		
			this.timer = setTimeout(() => {			
			    this.pwdShow = false;			
			}, 800);			
		},
        submitPwd() {
            if (this.password == undefined) {
                this.showKeyboard = true;
                Toast('请输入6位支付密码');
                return false;
            }
            if (this.password.length == 6) {
                if (this.isSubmit) {
                    this.pwdShow = false;
                    this.loading = true;
                    this.loadingText = "正在领取，请稍后！";
                    this.isSubmit = false;
                    buyProjectApi({ fund:this.fund, pay_password: this.password }).then((res) => {
                        this.isSubmit = true;
                        this.loading = false;
                        if (res.code == 200) {
                            //传入对象参数
                           // this.$dialog({ title: '提示', message: this.data.name + ' 领取成功！', className: 'buy_tips' });
                           this.$dialog({ message: res.msg, className: 'buy_tips' });
                            return false;
                        } else if (res.code == 304) {
							
							this.$dialog({ message: '请先设置支付密码', className: 'dialog-error', confirmButtonText: '去设置', showCancelButton: true }).then(() => {
							  this.$router.push('/set/set_pwd');
							}).catch(() => {});

						} else {
                            Toast(res.msg);
                            return false;
                        }
                    }).catch((err) => {
                        this.isSubmit = true;
                        this.loading = false;
                    });
                } else { 
                    Toast('提交中请稍后...');
                    return false;
                }
            } else {
                this.showKeyboard = true;
                Toast('请输入6位支付密码');
                return false;
            }
        },
        buyProject() {
            this.password = undefined;
            this.pwdShow = true;
            this.showKeyboard = true;
			clearTimeout(this.timer);
        },
    }
};
</script>
<style>
#app {
	overflow: visible;
	
}	
.van-dialog .van-dialog__cancel{
  display: inline-block !important;
}	
.van-dialog {
	 border-radius: 8px;
 }
.van-dialog .van-button .van-button__content .van-button__text {
	 background-color: transparent !important;
	 padding: 0;
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


.i-mask2 {
    position: absolute;
    z-index: 1500;
    background-color: rgba(255, 255, 255, 0);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 2190px;
    height: 100%;
    width: 100%;
}

</style>
<style lang="scss" scoped>
.test-page {
	background: #fffcef !important;
    .top {

		position: relative;
		//border:1px solid red;
		width: 100%;
		height: auto;
		overflow: visible;
		background: url('@/assets/photo/top-bg.webp') top left no-repeat;
		//background-color: #a9ae8a;
		background-size: 100% 240px;
		text-align: center;
		
		.user-logo {
			width: 100%;
			height: 50px;
			text-align: center;
			padding-top: 30px;
		}
		
		
			
		
		
        .top-head {
			.right-m {
				position: absolute;
				top:-40px;
				right:0;
				width: auto;
				color:#fff;
				display: inline-block;
				height: 20px;
				padding: 5px;
				font-size: 15px;
				z-index: 999;
			
			}
			
			
			.van-button {
					
				  border-radius: 4px;
				  color: #A7AF78;
				  font-size: 15px;
				  width: 100%;
				  margin: 0 auto;
				  height: 35px;
				  line-height: 35px;
				  letter-spacing: 0;
				  background: rgb(242 243 230);
				  border: 1px solid #b0be6b;
					
			}	
			
			position: relative;
			width: 95%;
			text-align: center;
			padding-bottom: 0;
			//height: 290px;
			//background: #FFFFFF;
			text-align: left;
			margin:0 auto;
			margin-top: 30px;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
			
			.h1 {
				font-size: 20px;
				font-weight: 600;
				padding: 20px 10px 10px 10px;
			
			}
			
			.top-head-ch {
				box-shadow: 5px 5px 10px 0 hsla(0, 0%, 88%, .5);
				background-color: #fff;
				border-radius: 5px;
				.lq {
					position: relative;
					font-size: 15px;
					font-weight: normal;
					padding: 0 0;
					line-height:200%;
					
					margin:0 auto;
					//margin-top: 10px;
					
					
					
					span {
						color:#D11A2D;
						font-size: 18px;
						font-weight: 600;
					}
				}
				.lq3 {
					font-size: 15px;
					font-weight: 600;
					width: 90%;
					padding:10px;
					margin: 0 auto;
					display: grid;
					grid-template-columns: 100%;
					
					.lq30 {
						display: flex;
						justify-content: flex-start;
						span {
							color:#D11A2D;
							font-size: 16px;
							font-weight: 600;
							padding-left: 2px;
						}
					}
				}
			}
			
			
			.data_tabs2 {
			  width: 100%;
			  overflow-y: visible;
			  box-sizing: border-box;
			  //background: #faeeec;
			  height: auto;
			  margin-top:0;			  
			
			  position: relative;
					//border-bottom: #f00 1px solid;
					
					display: grid;
					grid-template-columns: 50% 50%;
					//flex-direction: row;
					//flex-wrap: nowrap;
					
					align-content: stretch;
					justify-content: space-evenly;
					//box-shadow: 4px 4px 8px 4px rgba(149, 33, 35, 0.02);
					
					.data_tab2 {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 16px;
						background: #f0f0f0;
						color: #999;
						border-top-right-radius:5px;
						border-top-left-radius:5px;
						padding: 10px 0;
						height:26px;
						width: 100%;						
						margin: 0;
				  }
				  .tab_active2 {
					  margin: 0;
					color:#fff;
					font-weight: 600;
					font-size: 16px;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: 10px;
					background: linear-gradient(180deg, #d8debe, #b4ba97);
	
					//border-top-right-radius:5px;
					//border-top-left-radius:5px;
			
				  }
					
			
			
			}
			
			.data_tabs {
			  width: 100%;
			  overflow-y: visible;
			  box-sizing: border-box;
			  //background: #faeeec;
			  height: auto;
			  margin-top:6px;			  
			
			  position: relative;
					//border-bottom: #f00 1px solid;
					
					display: grid;
					grid-template-columns: 33% 33% 33%;
					//flex-direction: row;
					//flex-wrap: nowrap;
					
					align-content: stretch;
					justify-content: space-evenly;
					//box-shadow: 4px 4px 8px 4px rgba(149, 33, 35, 0.02);
					
					.data_tab {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 16px;
						background: #f0f0f0;
						color: #999;
						border-top-right-radius:5px;
						border-top-left-radius:5px;
						padding: 10px 0;
						height:26px;
						width: 100%;
						margin-right: 1px;
						margin-top: 2px;
				  }
				  .tab_active {
					color:#fff;
					margin-right: 1px;
					font-weight: 600;
					font-size: 16px;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: 10px;
					background: linear-gradient(180deg, #d8debe, #b4ba97);
					margin-top: 2px;
					//border-top-right-radius:5px;
					//border-top-left-radius:5px;
			
				  }
					
			
			
			}

            .nav-page-title {
                font-family: GB5WB1B, serif;
                letter-spacing: 4px;
                font-size: 22px;
                font-weight: 600;
                padding-left: 10px;
            }

            .top-head-1 {
                width: 60%;
                display: inline-block;
                vertical-align: middle;
                padding-left: 20px;
                box-sizing: border-box;

                span {
                    vertical-align: middle;
                    font-size: 22px;
                    font-weight: 600;
                }
            }

            .top-head-2 {
                width: 40%;
                display: inline-block;
                text-align: right;
                padding-right: 20px;
                box-sizing: border-box;

                .button {
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
    }


    ::v-deep .passwdForm{
        position: fixed;
        width: 100%;
        bottom: 242px;
        z-index: 2000;   
        background-color: #ffffff;
    }
    .van-button--round{
        border-radius: 3px;
    }
    .van-password-input__security li {
        height: 95%;
        background-color: #F2F3F5;
        border-radius: 5px;
    }
    ::v-deep .van-cell-group--inset{
        margin: 20px 16px;
    }

    .page1 {
        width: 100%;
        margin: 0 auto;
        //background-color: #ffffff;
        position: relative;
        overflow-y: scroll;
        //margin-top: 10px;
		padding-bottom: 80px;
		
		.buy-div{
			width: 95%;
			margin: 0 auto;
			bottom: 80px;
			text-align: center;
			position: relative;
			height: 1px;	
			.buy-btn {
				position:fixed;bottom:80px;display: block;width: 95%;margin:0 auto;
				height: 50px;
				.van-button {
					  border-radius: 4px;
					  color: #A7AF78;
					  font-size: 15px;
					  width: 100%;
					  margin: 0 auto;
					  height: 45px;
					  line-height: 45px;
					  letter-spacing: 2px;
					  background: rgb(242 243 230);
					  border: 1px solid #b0be6b;
						
				}				
			}
		}

        // -webkit-box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;
        // box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;
        .content {
            margin: 0 auto;
			width: 95%;
            //background:#fff;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
				
            //box-shadow: rgba(225, 225, 225, 0.5) 0 5px 10px 0;

            .content-box {
				
				.lq {
					//background: #fff;
					margin:15px auto 15px auto;
					//box-shadow: 5px 5px 10px 0 hsla(0, 0%, 88%, .5);
					//box-shadow: rgba(225, 225, 225, 0.4) 8px 8px 10px 0;
					border-radius: 5px;
					position: relative;
					
					.abs {
						position: absolute;right: 20px;top:15px;color:rgba(95, 115, 118, 1);font-size: 16px;
						span {
							color: rgba(14, 37, 41, 1);font-weight: 600;
						}
					}
					
					.van-button {
							
						  border-radius: 4px;
						  color: #A7AF78;
						  font-size: 15px;
						  width: 100%;
						  margin: 0 auto;
						  height: 35px;
						  line-height: 35px;
						  letter-spacing: 0;
						  background: rgb(242 243 230);
						  border: 1px solid #b0be6b;
							
					}	
					
					.lq3 {
						font-size: 15px;
						font-weight: 600;
						width: 90%;
						padding:10px;
						margin: 0 auto;
						display: grid;
						grid-template-columns: 100%;
						
						.lq30 {
							display: flex;
							justify-content: flex-start;
							span {
								color:#D11A2D;
								font-size: 16px;
								font-weight: 600;
								padding-left: 2px;
							}
						}
					}
				}
						
                .list {
                    width: 95%;
                    margin: 0 auto 0px;
                   
                    font-size: 16px;
                    .header{
                       /* background: linear-gradient(135deg, #E7514C 0%, #CB2D27 100%);*/
                       //background:url('@/assets/img/project/tips3.png') no-repeat top left;
					   //background-size: 100% 100%;
                        display: inline-block;
                        width: 100%;
                        height: 64px;
                        line-height: 30px;
                        .t1{
                            color:#D11A2D;
							font-weight: 600;
							width: 40%;
							padding-left: 5px;
							display: block;
                        }
						.t2 {
							color:#626571;
							font-size:12px;

							display: inline-block;
							padding-left: 20px;
							}
						.t3 {
							float: right;
							display: inline-block;
							color:#626571;
							font-size:12px;
				
							text-align: right;
					
							padding-right: 20px;
								em{
									font-size: 16px;
									font-weight:600;
									color:#D11A2D;
								}
							}	
          
                       
                    }
                    .body{
						display: grid;
                        //height:125px;
                        padding-top:15px;
						padding-bottom: 15px;
						grid-template-columns: 50% 50%;
						border-bottom: 1px solid #f0f0f0;
						
						.f-1 {
							text-align: left;
							color:#626571;
							font-size:14px;
							min-width: 110px;
							width: 100%;
							.a-l {padding:10px;}
							.a-b {font-weight: 600;}
							.money{
							    color:#D11A2D;
							    font-size:14px;	
								font-weight: 600;							
							}
							.unit{
							     color:#626571;
							     font-size:12px;
							 }
						}
		
						
                        

                    }
  
                    .submit_button {
                        width: 100%;
                        box-sizing: border-box;
                        text-align:center;
                        margin-top:50px;
                        div {
                            display: inline-block;
                            text-align: center;

                            width: 73px;
                            color: #fff;
                            background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
                            border-radius: 3px;
                            font-weight: 500;
                            font-size: 16px;
                            padding: 8px 9px;
                        }
                    }
					
					.proc {
						//position: absolute;
						display: block;
						height: 14px;
						//top:103px;
						padding:0 10px 20px 10px;
						width: 97%;
						
					}
					
					
                }
            }
        }
    }
}</style>