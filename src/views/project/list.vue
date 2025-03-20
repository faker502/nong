<template>
    <div class="test-page">
    	<!-- <div class="i-mask2" v-if="showMask" @click="alertMsg()"></div>	 -->
        <div class="top">
			
						
			<div class="user-logo">
				<img src="@/assets/photo/user-logo-fund.webp" style="height:50px;" />
			</div>
			
			
			
			
			<div class="top-head">
				
				<div class="right-m" @click="$router.push({ path: '/fund/record'})">购买记录</div>
				
				<!-- <div class="h1">
					{{ config.fundTitle && config.fundTitle.config_value }}
				</div> -->
				
				<div class="tabs data_tabs2 df_r">
						
					<div class="data_tab2 tab_active2">
					    爱国基金
					</div>
					<div class="data_tab2" @click="$router.push('/fund2')">
					    生活基金
					</div>
				 
				</div>
				
				
				
			<div class="top-head-ch" style="background:#fff;padding-top:10px;">	
				<div class="lq">
					{{ config.fund1 && config.fund1.config_name }}<span>{{ config.fund1 && config.fund1.config_value }}</span> 份
				</div>
				<div class="lq">
					{{ config.fund2 && config.fund2.config_name }}<span>{{ config.fund2 && config.fund2.config_value }}</span> 份
				</div>
				
				<div class="lq" style="padding: 10px;">
					团队奖励
				</div>
				<div class="lq3">
					<div class="lq30" v-for="(vv, kk) in per" :key="kk">
						{{ vv.name }} <span> {{ vv.val }}</span>
					</div>
				</div>
				
				<div class="lq">
					{{ textT }} <span>{{ getT }}</span> 人
				</div>
				
				<div class="tabs data_tabs df_r">
						
					<div class="data_tab" v-for="(v, k) in all" :key="k" :class="pk == k ? 'tab_active' : ''" @click="handleTab(v.id, k)">
					    {{ v.name }}
					</div>
					
				 
				</div>
			</div>
			</div>
			
			
        </div>
		
        <div class="page1">
			
		  <div class="buy-div">	
			<div class="buy-btn">
			 <van-button @click="buyProject()">购买</van-button>
			</div>
		  </div>	
			
            <div class="content">
                <div class="content-box">
					
					
                    <div class="list" v-for="(item, key) in list" :key="key">
<!--                        <div class="header">
                            <span class="t1">{{ item.name }}</span>
                           
                            <span class="t2">送{{ item.score }}点圆梦贡献值</span>
                            <span class="t3"></span>
                        </div> -->
                        <div class="body">
							
							<div class="f-1">
								<div class="a-l a-b">{{ item.name }}</div>
							</div>						
							<div class="f-1">
								<div class="a-l">日收益 <span class="money">{{ item.per }}</span></div>	
							</div>
							
														
							<div class="f-1">
								<div class="a-l">日收益 <span class="money">{{ item.dailyIn }}元</span></div>
							</div>	
							<div class="f-1">
								<div class="a-l">总收益 <span class="money">{{ item.total }}元</span></div>	
							</div>
							
							<div class="f-1">
								<div class="a-l">{{ item.desc }}</div>
							</div>	
							<div class="f-1">
								<div class="a-l">{{ item.desc2 }}</div>
							</div>
							
							
						</div>
						
<!-- 						<div class="proc">
							<van-progress
							  stroke-width="10" 
							  :percentage="item.progress"				  
							  pivot-color="#F64848"
							  color="linear-gradient(180deg, rgba(246, 72, 72, 0.85) 0%, rgba(209, 26, 45, 0.85) 100%)"
							/>
						</div> -->
						
                    </div>
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
import { getListApi, getDetailApi, buyProjectApi } from "@/api/project";
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
        };
    },
    created() {
        if (this.$route.query.id != undefined) {
            this.classId = parseInt(this.$route.query.id);
        }
		this.getConfig();		
    },
	destroyed() {
		clearTimeout(this.timer);
	},
    methods: {
        handleTab(id,k) {
			this.fund = id;
			this.pk = k;
			this.getDetail();			
        },
		
        getProjectList() {
            getListApi({'type':1}).then((res) => {
                this.all = res.data;
				this.fund = res.data[0].id;
				this.config = res.config;
				this.textT = res.text;
				this.getT = res.get;
				this.per = res.per;
				this.getDetail();			
				if (res.pwd == '' && !this.showMask) {
					this.$dialog({ message: '请先设置支付密码', className: 'dialog-error', confirmButtonText: '去设置', showCancelButton: true }).then(() => {
					  this.$router.push('/set/set_pwd');
					}).catch(() => {});
				}
            });
        },
		
		getDetail() {
		    getDetailApi({id:this.fund}).then((res) => {
				if (res.code == 200) {
					this.list = res.data;
					this.projectTip = res.tip;	
				} else {
					Toast(res.msg);
				}
		        		
		    });
		},
		
		getConfig() {
		  getConfigKey({ 'key': 'endPreheatcle' }).then((res) => {
			if (res.data.uStatus && res.data.uStatus == 2) {
				this.showMask = true;
			}
			this.getProjectList();
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
			
			position: relative;
			width: 95%;
			text-align: center;
			padding-bottom: 0;
			//height: 290px;
			//background: #FFFFFF;
			text-align: center;
			margin:0 auto;
			margin-top: 22px;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
			
			.h1 {
				font-size: 20px;
				font-weight: 600;
				padding: 20px 10px 10px 10px;
			
			}
			.lq {
				font-size: 15px;
				font-weight: 600;
				padding: 7px;
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
				grid-template-columns: 33% 33% 33%;
				
				.lq30 {
					display: flex;
					justify-content: center;
					span {
						color:#D11A2D;
						font-size: 16px;
						font-weight: 600;
						padding-left: 2px;
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
            background:#fff;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
				
            box-shadow: rgba(225, 225, 225, 0.5) 0 5px 10px 0;

            .content-box {
				
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