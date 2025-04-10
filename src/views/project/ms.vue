<template>
  <div class="test-page">
    <!-- <div class="i-mask2" v-if="showMask" @click="alertMsg()"></div>	 -->
    <div class="top">
      <div class="user-logo">
        <img src="@/assets/photo/ms-title.png"  />
      </div>

      <div class="top-head">
        <!-- <div class="right-m" @click="$router.push({ path: '/ms-rec' })">
          领取记录
        </div> -->

        <div class="tabs data_tabs2 df_r"></div>

        <!-- 			<div class="top-head-ch" style="background:#fff;padding-top:10px;">	
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
			</div> -->
      </div>
    </div>

    <div class="page1">
      <!-- 		  <div class="buy-div">	
			<div class="buy-btn">
			 <van-button @click="buyProject()">购买</van-button>
			</div>
		  </div> -->

      <div class="content">
        <div class="content-box">
          <!-- <div
            style="
              background: #fff;
              margin: 0 auto 15px auto;
              border-radius: 6px;
            "
            v-html="gg"
          ></div> -->
		 <section class="content-top">
			<p>为便于广大农民和农业生产经营主体以及社会各界更好的了解国家强农惠农富农政策，充分发挥政策引导作用，现将2025年稳定实施的中央财政到人到户农业补贴政策优先惠及1000万人员。1000万名额领取完毕即全额提现到账</p>
			<div class="content-top-center">
				<span>已领取名额：</span>
				<span><strong>1000万</strong>名额</span>
			</div>
			<div class="content-top-bottom">
				<h2></h2>
			</div>
		 </section>

		 <section class="content-info">
			<p>注册就可以领取强农基金<strong>200万</strong></p>
			<p>6份补贴每项领取一份, 可以领取惠农基金<strong>500万</strong></p>
			<p>6份补贴每项领取两份, 可以领取富衣基金<strong>1000万</strong></p>
		 </section>

		
          <div class="list" v-for="(item, key) in all" :key="key">
            <div class="header">
              <h1>
                {{ item.name }}
              </h1>
			  <h2>{{item.name}}</h2>
              <img
                :src="item.img"
                
              />
            </div>
            <div class="body">
              <div class="f-1">
                <!-- 								<div v-show="key != 0" style="position:absolute;height:70px;width:70px;right:80px;">
									<img src="@/assets/photo/2h.webp" style="width:70px;">
								</div> -->

                <!-- <div class="a-l a-b">{{ item.name }}</div> -->
                <div class="a-l a-bb">
                  <div>
					每月25日领取
                    <!-- <img src="@/assets/photo/ms/t1.webp" style="height: 30px" /> -->
                  </div>
                  <div class="bottom">
                    <strong>{{ item.title }}</strong>元
                  </div>
                </div>

                <div class="a-l a-bb">
                  <div>
					年终额外奖励
                    <!-- <img src="@/assets/photo/ms/t2.webp" style="height: 30px" /> -->
                  </div>
                  <div class="bottom">
                    <strong>{{ item.daysIncome }}</strong>元
                  </div>
                </div>

                <div class="a-l a-bb">
                  <div>
					直推实名
                    <!-- <img src="@/assets/photo/ms/t3.webp" style="height: 30px" /> -->
                  </div>
                  <div class="bottom">
                    <strong>{{ item.daily }}</strong>天
                  </div>
                </div>

                <!-- <div class="a-l a-bb">
                  <div
                    class="a-l a-c"
                    style="margin: 10px 10px 10px 0"
                    v-html="item.more"
                  ></div>
                </div> -->

                <!-- <div class="a-l a-c">
                  <div
                    style="
                      display: block;
                      line-height: 25px;
                      height: 25px;
                      padding-top: 5px;
                    "
                  >
                    <div class="proc" style="padding-top: 8px; width: 95%">
                      <van-progress
                        stroke-width="8"
                        :percentage="item.progress"
                        pivot-color="linear-gradient(135deg, rgb(171, 178, 135) 0%, rgb(170, 177, 134) 100%)"
                        color="linear-gradient(rgb(199, 206, 161) 0%, rgb(167, 174, 130) 100%)"
                      />
                    </div>
                  </div>
                </div> -->

                <!-- <div class="a-l">
                  <div
                    class="a-l a-c"
                    style="margin: 10px 10px 10px 0"
                    v-html="item.remark"
                  ></div>
                </div> -->
              </div>
              <div class="bottom-btn">
				立即购买
                <!-- <div class="a-ccc">
                  <van-button
                    @click="buyProject(item.tip, item.id)"
                  ></van-button>
                </div> -->
              </div>

              <!-- 							<div class="f-1">
								<div class="a-l">日收益 <span class="money">{{ item.dailyIn }}元</span></div>
							</div>	
							<div class="f-1">
								<div class="a-l">总收益 <span class="money">{{ item.total }}元</span></div>	
							</div> -->

              <!-- 							<div class="f-1">
								<div class="a-l">{{ item.desc }}</div>
							</div>	
							<div class="f-1">
								<div class="a-l">{{ item.desc2 }}</div>
							</div> -->
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
    <van-form
      ref="pwdForm"
      v-show="pwdShow"
      class="mt15 passwdForm"
      @submit="submitPwd"
    >
      <div style="margin: 15px 10px 0 30px" v-html="projectTip"></div>
      <van-cell-group inset>
        <van-password-input
          height="90%"
          :value="password"
          :focused="showKeyboard"
          :length="6"
          :gutter="10"
          @focus="showKeyboard = true"
          @blur="submitPwd"
        />
      </van-cell-group>
      <van-number-keyboard
        v-model="password"
        :show="showKeyboard"
        @blur="hidden"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          color="linear-gradient(180deg, #c0c79e 0%, #c0c79e 100%)"
          native-type="submit"
          style="font-size: 16px"
        >
          确认
        </van-button>
      </div>
    </van-form>
    <!--输入密码 end-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { getListApi, getDetailApi, buyProjectApi } from "@/api/fund";
import { getConfigKey } from "@/api/index";
import { Toast, Progress } from "vant";
export default {
  name: "FundList",
  inject: ["getCC"],
  components: {
    [Progress.name]: Progress,
  },
  data() {
    return {
      gg: "",
      tabs: [
        { value: 1, title: "中国圆梦" },
        { value: 2, title: "我的助力" },
      ],
      list: [],
      all: [],
      classId: 0,
      showKeyboard: false,
      pwdShow: false,
      password: "",
      projectId: 0,
      score: 0,
      price: 0,
      fund: 1,
      isSubmit: true,
      timer: null,
      projectTip: "",
      showMask: false,
      pk: 0,
      config: [],
      textT: "",
      getT: "",
      per: [],
    };
  },
  created() {
    if (this.$route.query.id != undefined) {
      this.classId = parseInt(this.$route.query.id);
    }
    this.getConfig();
    this.getCC();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    handleTab(id, k) {
      //this.fund = id;
      //this.pk = k;
      //this.getDetail();
    },

    getProjectList() {
      getListApi({ type: 2 }).then((res) => {
        this.all = res.data;
        //this.fund = res.data[0].id;
        this.config = res.config;
        this.textT = res.text;
        this.getT = res.get;
        this.per = res.per;

        this.gg = res.gg;

        //this.getDetail();
        if (res.pwd == "" && !this.showMask) {
          this.$dialog({
            message: "请先设置支付密码",
            className: "dialog-error",
            confirmButtonText: "去设置",
            showCancelButton: true,
          })
            .then(() => {
              this.$router.push("/set/set_pwd");
            })
            .catch(() => {});
        }
      });
    },

    getConfig() {
      getConfigKey({ key: "endPreheatcle" }).then((res) => {
        if (res.data.uStatus && res.data.uStatus == 2) {
          this.showMask = true;
        }
        this.getProjectList();
      });
    },
    alertMsg() {
      this.$dialog.alert({
        title: "该账户已冻结",
        message: "请联系在线客服申请解冻",
      });
    },
    submit() {
      this.show = false;
      cache.local.remove("loginType");
      setReadApi().then((res) => {});
    },
    applyOrder(id) {
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
        Toast("请输入6位支付密码");
        return false;
      }
      if (this.password.length == 6) {
        if (this.isSubmit) {
          this.pwdShow = false;
          this.loading = true;
          this.loadingText = "正在领取，请稍后！";
          this.isSubmit = false;
          buyProjectApi({ fund: this.fund, pay_password: this.password })
            .then((res) => {
              this.isSubmit = true;
              this.loading = false;
              if (res.code == 200) {
                //传入对象参数
                // this.$dialog({ title: '提示', message: this.data.name + ' 领取成功！', className: 'buy_tips' });
                this.$dialog({ message: res.msg, className: "buy_tips" });
                return false;
              } else if (res.code == 304) {
                this.$dialog({
                  message: "请先设置支付密码",
                  className: "dialog-error",
                  confirmButtonText: "去设置",
                  showCancelButton: true,
                })
                  .then(() => {
                    this.$router.push("/set/set_pwd");
                  })
                  .catch(() => {});
              } else if (res.code == 204) {
                Toast(res.msg);
                this.$router.push("recharge");
                return false;
              } else {
                Toast(res.msg);
                return false;
              }
            })
            .catch((err) => {
              this.isSubmit = true;
              this.loading = false;
            });
        } else {
          Toast("提交中请稍后...");
          return false;
        }
      } else {
        this.showKeyboard = true;
        Toast("请输入6位支付密码");
        return false;
      }
    },
    buyProject(tip, id) {
      this.password = undefined;
      this.pwdShow = true;
      this.fund = id;
      this.projectTip = tip;
      this.showKeyboard = true;
      clearTimeout(this.timer);
    },
  },
};
</script>
<style>
#app {
  overflow: visible;
}
.van-dialog .van-dialog__cancel {
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
  color: #d11a2d;
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
  background: #f3f3f3 !important;
  .top {
    position: relative;
    //border:1px solid red;
    width: 100%;
    height: 240px;
    overflow: visible;
    background: url("@/assets/photo/top-bg.png") top left no-repeat;
    //background-color: #a9ae8a;
    // background-size: 100% 240px;
    text-align: center;

    .user-logo {
      width: 280px;
      height: 100px;
      text-align: center;
      padding-top: 5px;
      font-family: PingFang SC;
      font-size: 18px;
      font-weight: 600;
      line-height: 25.2px;
      letter-spacing: 6px;
      text-align: center;
	  margin: 0 auto;
      color: #fff;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
	  img {
		width: 100%;
	  }
    }

    .top-head {
      .right-m {
        position: absolute;
        top: -50px;
        right: 0;
        width: auto;
        color: #fff;
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
      margin: 0 auto;
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
          color: #d11a2d;
          font-size: 18px;
          font-weight: 600;
        }
      }
      .lq3 {
        font-size: 15px;
        font-weight: 600;
        width: 90%;
        padding: 10px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 33% 33% 33%;

        .lq30 {
          display: flex;
          justify-content: center;
          span {
            color: #d11a2d;
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
        margin-top: 0;

        position: relative;
        //border-bottom: #f00 1px solid;

        display: grid;
        grid-template-columns: 100%;
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
          background: #fff;
          color: #333;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          padding: 10px 0 0 0;
          height: 26px;
          width: 100%;
          margin: 0;
          height: 50px;
        }
        .tab_active2 {
          margin: 0;
          color: #333;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 10px;

          //background: linear-gradient(180deg, #d8debe, #b4ba97);

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
        margin-top: 6px;

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
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          padding: 10px 0;
          height: 26px;
          width: 100%;
          margin-right: 1px;
          margin-top: 2px;
        }
        .tab_active {
          color: #fff;
          margin-right: 1px;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 10px;
          //background: linear-gradient(180deg, #d8debe, #b4ba97);
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
          border: 2px solid #2f6db3;
          color: #2f6db3;
          border-radius: 20px;
          padding: 10px;
          font-size: 16px;
          font-weight: 600;
          font-family: "PingFang SC";
        }
      }
    }
  }

  ::v-deep .passwdForm {
    position: fixed;
    width: 100%;
    bottom: 242px;
    z-index: 2000;
    background-color: #ffffff;
  }
  .van-button--round {
    border-radius: 3px;
  }
  .van-password-input__security li {
    height: 95%;
    background-color: #f2f3f5;
    border-radius: 5px;
  }
  ::v-deep .van-cell-group--inset {
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
    margin-top: -115px;

    .buy-div {
      width: 95%;
      margin: 0 auto;
      bottom: 80px;
      text-align: center;
      position: relative;
      height: 1px;
      .buy-btn {
        position: fixed;
        bottom: 80px;
        display: block;
        width: 95%;
        margin: 0 auto;
        height: 50px;
        .van-button {
          border-radius: 4px;
          color: #a7af78;
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

      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;

      .content-box {
        border-radius: 7px;
		.content-top {
			background: #FFFFFF6B;
			border-radius: 8px;
			box-sizing: border-box;
			padding: 16px;
			font-size: 13px;
			line-height: 20px;
			color: #6C6E6C;
			margin-bottom: 20px;

			p {
				font-size: 12px;
				color: #626571;
			}
			.content-top-center {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 16px;
				font-size: 14px;
				span {
					display: flex;
					strong {
						font-size: 20px;
						color: #313231;
						align-content: flex-end;
					}
				}
				gap: 10px;
			}
			.content-top-bottom {
				width: 100%;
				height: 24px;
				background: #C2C2C23D;
				margin-top: 8px;
				border-radius: 12px;
				position: relative;
				overflow: hidden;
				h2 {
					height: 100%;
					width: 30%;
					background: radial-gradient(485% 126.39% at 0% 50%, #CD9D00 0%, #FFE591 100%);
					border-radius: 12px;
				}
			}
		}
		.content-info {
			background: #FFFFFF6B;
			padding: 16px;
			font-size: 14px;
			color: #6C6E6C;
			box-sizing: border-box;
			border-radius: 8px;
			margin-bottom: 20px;
			p {
				line-height: 24px;
				strong {
					font-size: 20px;
					color: #313231;
					margin-left: 2px;
				}
			}

		}
        .list {
          width: 100%;
          margin: 0 auto;
          border-radius: 7px;
          font-size: 16px;
        //   background: #fff;
          margin-bottom: 15px;

          .header {
            /* background: linear-gradient(135deg, #E7514C 0%, #CB2D27 100%);*/
            //background:url('@/assets/img/project/tips3.png') no-repeat top left;
            //background-size: 100% 100%;
            display: flex;
			flex-direction: column;
			justify-content: center;
            width: 96%;
			left: 2%;
            height: 73px;
            position: relative;
			// border: 1px solid blue;
			font-size: 12px;
			color: #fff;
			padding-left: 16px;
			box-sizing: border-box;
			h1,h2 {
				position: relative;
				z-index: 1;
			}
			h2 {
				font-size: 16px;
				font-weight: 600;
				margin-top: 5px;
			}
			img {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}
            // line-height: 30px;
            .t1 {
              color: #d11a2d;
              font-weight: 600;
              width: 40%;
              padding-left: 5px;
              display: block;
            }
            .t2 {
              color: #626571;
              font-size: 12px;

              display: inline-block;
              padding-left: 20px;
            }
            .t3 {
              float: right;
              display: inline-block;
              color: #626571;
              font-size: 12px;

              text-align: right;

              padding-right: 20px;
              em {
                font-size: 16px;
                font-weight: 600;
                color: #d11a2d;
              }
            }
          }
          .body {
            width: 100%;
            margin: 0 auto;
            // display: grid;
            //height:125px;
            // margin-top: 10px;
            // padding-top: 0;
            // padding-bottom: 25px;
            // grid-template-columns: 100%;
            //border-top: 1px solid #f0f0f0;
            //border-bottom: 1px solid #f0f0f0;
            // box-shadow: 5px 5px 10px 0 hsla(0, 0%, 88%, 0.3);
            //box-shadow: rgba(225, 225, 225, 0.5) 0 5px 10px 0;
            // border-radius: 6px;
			.bottom-btn {
				// display: flex;
				// align-items: center;
				// justify-content: center;
				// flex-direction: column;
				height: 40px;
				background: #7E963C;
				border-bottom-left-radius: 8px;
				border-bottom-right-radius: 8px;
				background: linear-gradient(180deg, #7E963C 0%, #455117 100%);
				line-height: 40px;
				text-align: center;
				color: #fff;
				&.disabled {
					background: #BEC0BD;
				}
              }

            .f-1 {
              	position: relative;
            //   text-align: left;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: #fff;
				// border-width: 0.5px, 0.5px, 0px, 0.5px;
				// border-style: solid;
				// border-color: #7E963C;
				border: 1px solid #7E963C;
				border-bottom: none;
				width: 100%;
				height: 81px;
				box-sizing: border-box;
				// border-radius: 8px;
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				color: #6C6E6C;
				font-size: 14px;
				width: 100%;
              .a-l {
                // padding: 0 10px;
                // line-height: 150%;
                // margin-top: 5px;
                // text-align: left;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				font-weight: normal;
				.bottom {
					margin-top: 10px;
					strong {
						font-weight: bold;
						font-size: 20px;
						color: #313231;
					}
					color: #626571;
				}
              }
              
              .a-ccc {
                // padding: 0 10px;
                // line-height: 150%;
                // margin-top: 5px;
                // text-align: center;
				width: 100%;
                ::v-deep .van-button {
                  // border-radius: 4px;
                  // color: #A7AF78;
                  // font-size: 15px;
                  // width: 100%;
                  // margin: 0 auto;
                  // height: 35px;
                  // line-height: 35px;
                  // letter-spacing: 0;
                  // //background: rgb(242 243 230);
                  // //background: rgb(242 243 230);
                  // border: 1px solid #b0be6b;

                //   
					width: 100%;
                }
              }

              .a-b {
                font-weight: 600;
                font-size: 18px;
                color: rgba(14, 37, 41, 1);
              }
              .a-bb {
                // font-weight: 600;
                // font-size: 15px;
                // color: rgba(14, 37, 41, 1);
                // position: relative;
              }
              .a-c {
                font-size: 14px;
                color: #999;
              }
              .money {
                color: #d11a2d;
                font-size: 14px;
                font-weight: 600;
              }
              .unit {
                color: #626571;
                font-size: 12px;
              }
            }
          }

          .submit_button {
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            margin-top: 50px;
            div {
              display: inline-block;
              text-align: center;

              width: 73px;
              color: #fff;
              background: linear-gradient(180deg, #ee6863 0%, #d11a2d 100%);
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
            padding: 0 10px 20px 10px;
            width: 97%;
          }
        }
      }
    }
  }
}
</style>
