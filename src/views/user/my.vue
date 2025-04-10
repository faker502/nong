<template>
  <div class="test-page" style="background: #f3f3f3">
    <div class="top">
      <div class="user-logo">
        <img src="@/assets/photo/user-logo.png" />
      </div>

      <!-- <div class="message" @click="$router.push('/message')" v-show="showMsg">
			<el-badge :value="msgCount" :max="99" :hidden="hiddenCount">
				<img src="@/assets/photo/icon.png" style="width:35px;height:35px;margin:-3px -3px 0 0;">
			</el-badge>
			<div>站内信</div>
		</div>	 -->
    </div>
    <div class="page1">
      <div class="wrap">
        <!--wrap-->

        <div class="wrap-1">
          <!--wrap-1-->

          <div class="money_box">
            <div class="top-head">
              <!--personal information and logout start -->
              <div class="account-head">
                <div class="left">
                  <div>
                    <!-- <img :src="require('@/assets/img/rank/default_head.png')" width="64px;" />-->
                    <!--<img :src="defaultHeadPicture" width="64px;" />-->

                    <!--图片上传 start-->

                    <van-uploader
                      :max-size="1024 * 1024"
                      :after-read="afterRead"
                    >
                      <van-image
                        round
                        width="90"
                        height="90"
                        :src="portraitUrl"
                      />
                    </van-uploader>

                    <!--图片上传 end-->
                  </div>
                  <div class="user-info" @click="$router.push('/lva')">
                    <!-- <div class="level-info">
                      <div class="level-txt">{{ user.levelText }}</div>
                    </div> -->
                    <div class="username">{{ user.name }}</div>
                    <div class="phone">{{ user.phone }}</div>
					<div class="status">
						<img src="@/assets/photo/actived.png"  />
					</div>
                  </div>
                </div>
              </div>
              <!--personal information and logout end -->
            </div>

            <div class="dddd">
				<ul>
					<li @click="$router.push('/meeting')">
						<img src="@/assets/photo/meeting.png" />
						<span>会议中心</span>
					</li>
					<li @click="$router.push('/file-list')">
						<img src="@/assets/photo/files.png" />
						<span>政策文件</span>
					</li>
					
				</ul>
              <!-- <div class="account-total" @click="goDetail()">
                <div class="d-left">
                  <img
                    src="@/assets/photo/peo.webp"
                    style="height: 40px; width: 40px"
                  />
                </div>
                <div class="d-right">
                  <div class="d-1">我的团队</div>
                  <div class="d-2">{{ account.inviteTotal }}</div>
                </div>
              </div>

              <div class="account-total" @click="$router.push('/new-award')">
                <div class="d-left">
                  <img
                    src="@/assets/photo/jf.webp"
                    style="height: 40px; width: 40px"
                  />
                </div>
                <div class="d-right">
                  <div class="d-1">积分</div>
                  <div class="d-2">{{ user.jf }}</div>
                </div>
              </div> -->
            </div>
          </div>

          <!-- <div class="detail-1"> -->
            <!-- <div class="detail-2">
		  	  <div class="flex-item" @click="$router.push('/my/total-balance');">
		  		  <p class="text">现金总资产</p>
		  		  <p class="gold">{{ account.balanceTotal }}</p>
		  	  </div>
		  	  <div class="flex-item">
		  		  
		  	  </div>
		    </div> -->

            <!-- <div class="detail-3">
				<div class="flex-item" @click="$router.push('/my/fund-list');">
				  <p class="text">专项基金</p>
				  <p class="gold">{{ account.fund }}</p>
				</div>
				
			  <div class="flex-item" @click="$router.push('/my/balance')">
				  <p class="text">现金资产</p>
				  <p class="gold">{{ account.balance }}</p>
			  </div>
			  
			  <div class="flex-item" @click="$router.push('/fund-record')">
				  <p class="text">基金收益</p>
				  <p class="gold">{{ account.fundAward }}</p>
			  </div>
			  <div class="flex-item" @click="$router.push('/sign-record')">
				  <p class="text">相关福利</p>
				  <p class="gold">{{ account.fl }}</p>
			  </div>
			</div>
			
			<div class="detail-3">
						  
						  
						  
						  <div class="flex-item" @click="$router.push('/my/bz')">
								  <p class="text">基本保障金</p>
								  <p class="gold">{{ account.bz }}</p>
						  </div>
						  
						  
						  <div class="flex-item" @click="$router.push('/detail_recharge')">
							  <p class="text">充值现金</p>
							  <p class="gold">{{ account.rechargeOver }}</p>
						  </div>
						  
			</div> -->
          <!-- </div> -->

          <div class="detail-11">
			<ul class="left">
				<li>
					<div class="item">
						<p @click="$router.push('/my/balance')">
							<span>总资产 (元)</span>
							<van-icon name="arrow" />
						</p>
						<h6>
							<strong>9999.00</strong>
							<img src="@/assets/photo/sync.png" />
						</h6>
					</div>
				</li>
				<li>
					<div class="item">
						<p>
							<span>现金余额 (元)</span>
							<van-icon name="arrow" />
						</p>
						<h6>
							<strong>9999.00</strong>
							<img src="@/assets/photo/sync.png" />
						</h6>
					</div>
				</li>
			</ul>
			<div class="right item">
				<p @click="$router.push('/my/fund-list')">
					<span>数字人民币</span>
					<van-icon name="arrow" />
				</p>
				<h6>
					<strong>9999.00</strong>
				</h6>
			</div>
            <!-- <div class="detail-4">
              <div class="flex-item">
                <div class="v-btn">
                  <van-button
                    style="margin-left: 15px"
                    @click="handleWithdraw"
                    type="default"
                    >提现</van-button
                  >
                </div>
              </div>

              <div class="flex-item" style="z-index: 1550">
                <div class="v-btn">
                  <van-button
                    style="margin-left: 15px"
                    @click="$router.push('/recharge')"
                    type="default"
                    >充值</van-button
                  >
                </div>
              </div>

              <div class="flex-item">
                <div class="v-btn">
                  <van-button
                    style="margin-left: 15px"
                    @click="$router.push('/transfer')"
                    type="default"
                    >转账</van-button
                  >
                </div>
              </div>
            </div> -->
          </div>

          <div class="menu-box">
            <!-- <div class="left" @click="$router.push('/zh-rule');">
				<div class="num">
					{{ price }}
				</div>
		      <div class="img">
		          <img src="@/assets/photo/zh.webp" style="width:100%;border-radius:4px;"/>
		      </div>
		    </div> -->
          </div>

          <!-- 
          <div class="base_box timer-box" >
            <div></div>
            <van-count-down :time="endTime" @finish="endCycle" 
			format="HH:mm:ss"
			>
              <template #default="timeData">
                <span class="timer">{{ timeData.days | substr1 }}</span>
                <span class="timer">{{ timeData.days | substr2 }}</span>
                <span class="time-item-uint">天</span>
                <span class="timer">{{ timeData.hours | substr1 }}</span>
                <span class="timer">{{ timeData.hours | substr2 }}</span>
                <span class="time-item-uint">时</span>
                <span class="timer">{{ timeData.minutes | substr1 }}</span>
                <span class="timer">{{ timeData.minutes | substr2 }}</span>
                <span class="time-item-uint">分</span>
                <span class="timer">{{ timeData.seconds | substr1 }}</span>
                <span class="timer">{{ timeData.seconds | substr2 }}</span>
              </template>
            </van-count-down>
			
          </div> -->

          <!--充值/提现 end-->

          <!--实名/我的客服 start-->

          <div class="base_box menu-box2">
			<van-button
              url="/recharge"
              :icon="require('@/assets/img/my/menu2/charge.png')"
              type="primary"
              >立即充值<span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button>
			<van-button
              url="/withdraw"
              :icon="require('@/assets/img/my/menu2/drawl.png')"
              type="primary"
              >立即提现<span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button>
            
            <van-button
              url="/set/cert"
              :icon="require('@/assets/img/my/menu2/sm.png')"
              type="primary"
              >实名信息<span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button>

			 <van-button
              url="/set"
              :icon="require('@/assets/img/my/menu2/mm.png')"
              type="primary"
              >修改密码<span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button>

            <van-button
              url="/card"
              :icon="require('@/assets/img/my/menu2/sk.png')"
              type="primary"
              >收款账户<span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button>

            <!-- 			  <van-button url="/set/address" :icon="require('@/assets/img/my/menu2/addr.png')" type="primary">收货地址<span class="im"><img src="@/assets/img/my/menu/arrow.png" /></span></van-button> -->

           

            <!-- <van-button
              v-if="update"
              :icon="require('@/assets/img/my/menu/update.png')"
              @click="doUpdate()"
              type="waring"
              >更新应用<sup></sup
              ><span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button> -->

			<van-button
              url="/online"
              :icon="require('@/assets/img/my/menu2/kf.png')"
              type="primary"
              >联系客服<span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button>

            <!-- <van-button
              @click="showLogout = true"
              :icon="require('@/assets/img/my/menu2/tc.png')"
              type="primary"
              >退出登录<span class="im"
                ><img src="@/assets/img/my/menu/arrow.png" /></span
            ></van-button> -->

            <!-- 
            <div class="left"   @click="$router.push('/set/cert');">
              <div class="img">
                  <img :src="require('@/assets/img/my/icon/real.png')" width="50px"/>
              </div>
              <div class="title">
                <p>实名认证</p>
              </div>
            </div>

            <div class="left"  @click="$router.push('/card');">
              <div class="img">
                  <img :src="require('@/assets/img/my/icon/pay.png')" width="50px"/>
              </div>
              <div class="title">
                <p>收款账户</p>
              </div>
            </div>

            <div class="right" @click="$router.push({ path: '/my/fund', query: { type: 2 } })">
              <div class="img">
                  <img :src="require('@/assets/img/my/icon/bill.png')" width="50px"/>
              </div>
              <div class="title">
                <p>账户明细</p>
              </div>
            </div> -->

            <!--next start -->

            <!-- <div class="left"   @click="$router.push('/set');">
              <div class="img">
                  <img :src="require('@/assets/img/my/icon/account_safe.png')" width="50px"/>
              </div>
              <div class="title">
                <p>账户安全</p>
              </div>
            </div>

            <div class="left"  @click="$router.push('/kefu');">
              <div class="img">
                  <img :src="require('@/assets/img/my/icon/service.png')" width="50px"/>
              </div>
              <div class="title">
                <p>我的客服</p>
              </div>
            </div>

            <div class="right" @click="showLogout = true" >
              <div class="img">
                  <img :src="require('@/assets/img/my/icon/logout.png')" width="50px"/>
              </div>
              <div class="title">
                <p class="quit"  >退出登录</p>
              </div>
            </div> -->

            <!-- next end -->
          </div>
        </div>
      </div>
      <!--wrap-1-->
    </div>
    <!--wrap-->
    	
	<div class="logout" @click="showLogout = true">
	<van-button  type="default">退出登录</van-button>
	</div>

    <van-popup
      closeable
      class="lingqu-jihuo"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="lingqu-title">温馨提示</div>
      <div class="lingqu-tips">是否退出当前登录？</div>
      <div class="lingqu-bottom">
        <div class="lingqu-button cancle" @click="showLogout = false">取消</div>
        <div class="lingqu-button" @click="loginOut">确认</div>
      </div>
    </van-popup>

    <van-dialog
      use-slot
      v-model="showLogout"
      cancel-button-text="取消"
      confirmButtonText="退出"
      show-cancel-button
      @confirm="loginOut"
      @cancel="showLogout = false"
    >
      <div
        style="
          white-space: pre-wrap;
          text-align: center;
          width: 311px;
          height: 123px;
          padding: 30px;
          box-sizing: border-box;
        "
      >
        <div
          style="
            font-size: 20px;
            color: #3f3d38;
            font-weight: 600;
            padding: 10px;
          "
        >
          温馨提示
        </div>
        <div
          style="
            font-size: 14px;
            color: #3f3d38;
            font-weight: 600;
            padding: 10px;
          "
        >
          是否退出当前登录？
        </div>
      </div>
    </van-dialog>

    <van-popup v-model="showActive" style="width: 85%; height: 80%">
      <div class="active-pop">
        <!-- <img :src="require('@/assets/img/icon/icon-caishen-2.png')" width="95%"> -->
        <div v-if="online == 'no'">
          <div class="active-content">
            <p
              style="
                font-size: 22px;
                font-weight: 600;
                color: #ac2023;
                padding-bottom: 12px;
              "
            >
              账户激活说明
            </p>
            <p class="p-content">
              <em></em>
              <span
                >提交100元可激活账户，账户激活后可获得专属邀请码，邀请好友加入；激活账户可于6月15日退回现金余额（可提现）！</span
              >
            </p>
          </div>

          <div
            class="active-button"
            @click="$router.push('/recharge')"
            v-if="account.rechargeMoney < 100"
            style="margin-top: 10px"
          >
            去激活
          </div>
          <div
            class="active-button"
            @click="showActive = false"
            v-else
            style="margin-top: 10px"
          >
            您已激活
          </div>
          <div
            class="active-button-2"
            @click="showActive = false"
            style="margin-top: 10px"
          >
            我知道了
          </div>
        </div>
        <div v-else>
          <div class="active-content">
            <p
              style="
                font-size: 22px;
                font-weight: 600;
                color: #ac2023;
                padding-bottom: 12px;
              "
            >
              账户激活说明
            </p>
            <p class="p-content">
              <em></em>
              <span>领取任一项目可激活</span>
            </p>
          </div>
          <div
            class="active-button"
            style="margin-top: 10px"
            @click="$router.push('/project')"
            v-if="account.projectMoney == 0"
          >
            去激活
          </div>
          <div
            class="active-button"
            style="margin-top: 10px"
            @click="$router.push('/project')"
            v-else
          >
            您已激活，去领取
          </div>
          <div
            class="active-button-2"
            @click="showActive = false"
            style="margin-top: 10px"
          >
            我知道了
          </div>
        </div>
      </div>
    </van-popup>

    <div class="i-mask" v-if="showMask" @click="alertMsg()"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import { mapActions, mapGetters } from "vuex";
import {
  getAccountApi,
  uploadPortraitUrlApi,
  signAwardApi,
} from "@/api/member";
import { upLoaderImg } from "@/utils/upLoaderImg";
import { getConfigKey, update } from "@/api/index";
import local from "@/components/SaveDoc.vue";
import VueHtml5Plus from "vue-html5plus";
Vue.use(VueHtml5Plus);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

export default {
  name: "my",
  inject: ["getCC"],
  components: {},

  filters: {
    substr1(value) {
      value = value.toString();
      if (value.length == 2) {
        return value.substr(0, 1);
      }
      return "0";
    },
    substr2(value) {
      value = value.toString();
      if (value.length == 2) {
        return value.substr(1, 1);
      }
      return value;
    },
  },

  data() {
    return {
      hiddenCount: true,
      msgCount: 0,
      showMsg: 0,
      showAssets: false,
      account: [],
      user: {
        level: 0,
        tx: 1,
      },
      isShowLingQu: false,
      showLogout: false,
      endTime: 0,
      showActive: false,
      online: "no",
      fileList: [],
      portraitUrl: require("@/assets/photo/blank.jpg"),
      showMask: false,
      price: "",
      version: 0,
      update: false,
      fTips: "该账户已冻结，仅可进行实名、充值、购买操作",
      //defaultHeadPicture:'https://test202309.oss-cn-hongkong.aliyuncs.com/test/default.png'
    };
  },
  created() {
    this.getConfig();
    //this.GetConfig();
    //this.online = this.$store.getters.OnLine;
    //this.endTime = this.$store.getters.EndTime;
    //this.showMask = this.$store.getters.ShowMask;
    this.getAccountInfo();
    this.flutterApp();
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", this.plusReady, false);
    }
    this.getCC();
    console.log();
  },
  mounted() {},
  computed: {
    ...mapGetters(["OnLine", "EndTime", "ShowMask"]),
  },
  methods: {
    ...mapActions(["FrontLogOut", "GetConfig"]),
    async getAccountInfo() {
      await getAccountApi().then((res) => {
        this.account = res.data.account;
        this.user = res.data.user;
        if (res.data.user.portraitUrl != "") {
          //this.defaultHeadPicture =  res.data.user.portraitUrl
          this.portraitUrl = res.data.user.portraitUrl;
        } else {
          this.portraitUrl = require("@/assets/img/my/def.png");
        }

        if (this.online == "no") {
          if (this.account.rechargeMoney < 100) {
            this.showActive = false;
          }
        } else {
          console.log(this.account.projectMoney);
          if (this.account.projectMoney == 0) {
            this.showActive = false;
          }
        }
      });
    },
    getConfig() {
      getConfigKey().then((res) => {
        this.online = res.data.online;
        this.endTime = res.data.onlineTime;
        this.price = res.data.fundTotal;
        this.fTips = res.data.tips;
        this.msgCount = res.data.msgCount;
        this.showMsg = res.data.showMsg;
        if (this.msgCount > 0) {
          this.hiddenCount = false;
        }
        if (res.data.uStatus && res.data.uStatus == 2) {
          this.showMask = true;
        }
      });
    },

    handleWithdraw() {
      if (this.user.tx) {
        this.$router.push({ path: "/withdraw" });
      } else {
        Toast("您暂未激活，无法提现");
      }
    },

    plusReady() {
      const self = this;
      plus.runtime.getProperty(plus.runtime.appid, function (inf) {
        self.version = parseInt(inf.version.replace(/\./g, ""));
        if (self.version > 0) {
          self.checkUpdate();
        }
      });
    },
    flutterApp() {
      if (navigator.userAgent.indexOf("ua-new-wz") !== -1) {
        this.checkUpdateFlutterApp();
      }
    },
    checkUpdateFlutterApp() {
      console.log("checkUpdateFlutterApp in");
      update({ version: VersionCode }).then((res) => {
        if (res.version && res.download && res.version > VersionCode) {
          this.update = true;
        }
      });
    },
    checkUpdate() {
      console.log("checkUpdate in");
      update({ version: this.version }).then((res) => {
        if (res.version && res.download && res.version > this.version) {
          this.update = true;
        }
      });
    },
    doUpdate() {
      console.log("doUpdate in");
      if (this.update) {
        //in plus5 app
        if (navigator.userAgent.indexOf("ua-new-wz") === -1) {
          update({ version: this.version }).then((res) => {
            if (res.version && res.download && res.version > this.version) {
              this.downWgt(res.download);
            } else {
              Toast("当前版本号已是最新");
            }
          });
        } else {
          //flutter app
          update({ version: VersionCode, doFlutterUpdate: 1 }).then((res) => {
            Toast("更新中...");
          });
        }
      }
    },
    downWgt(url) {
      const self = this;
      Toast("下载更新中, 请稍候");
      plus.downloader
        .createDownload(
          url,
          {
            filename: "_doc/update/",
          },
          function (d, status) {
            if (status == 200) {
              console.log("download file:" + d.filename);
              self.installWgt(d.filename);
            } else {
              Toast("更新失败");
            }
          }
        )
        .start();
    },
    installWgt(path) {
      Toast("安装更新中, 请稍候");
      plus.runtime.install(
        path,
        {},
        function () {
          plus.nativeUI.closeWaiting();
          console.log("install OK");
          plus.nativeUI.alert("更新完成, 点确定重启", function () {
            plus.runtime.restart();
          });
        },
        function (e) {
          //Toast('更新失败!');
          Toast("更新失败:" + e.code + ", " + e.message);
          console.log("install failed:[" + e.code + "]：" + e.message);
          plus.nativeUI.closeWaiting();
        }
      );
    },

    alertMsg() {
      this.$dialog.alert({ title: "该账户已冻结", message: this.fTips });
    },
    delImg() {
      this.fileList = [];
    },
    goDetail() {
      this.$router.push({ path: "/team" });
    },
    select(i, phone) {
      this.isSelect = i;
      this.phone = phone;
    },
    next() {
      if (this.phone == "") {
        this.$dialog({
          message: "请选择转账账户！",
          className: "dialog-error",
        });
        return false;
      } else {
        this.$router.push({ path: "/transfer", query: { phone: this.phone } });
        return false;
      }
    },
    tolink(item) {
      if (item == "phone") {
        this.$dialog({
          message: "您的手机号码是" + this.info.phone,
          className: "dialog-error",
        });
        return false;
      } else if (item == "passwd") {
        this.$dialog({
          message: "为了您的资金安全修改密码请联系在线客服！",
          className: "dialog-error",
        });
        return false;
      } else if (item == "paypwd") {
        if (this.info.payPassword == "") {
          this.$router.push("/set/set_pwd");
        } else {
          this.$dialog({
            message: "为了您的资金安全修改支付密码请联系在线客服！",
            className: "dialog-error",
          });
        }
        return false;
      }
    },
    endCycle() {
      //this.getList();
    },
    signAward() {
      signAwardApi().then((res) => {
        Toast(res.msg);
        if (res.code == 200) {
          this.account.signOk = 1;
        }
      });
    },
    loginOut() {
      if (typeof plus != "undefined") {
        local.storageDoc("logout.json", { logout: "yes" });
      }
      this.FrontLogOut();
      this.$router.push("/login");
    },
    beforeRead(file) {
      //上传之前校验
      // debugger;
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("只允许上传jpg/png格式的图片！");
        return false;
      }
      return true;
    },
    async afterRead(file) {
      this.portraitUrl = file.content;
      console.log(file.file);
      let formData = new FormData();

      formData.append("file", file);
      console.log(formData);

      //文件读取完成后的回调函数
      let uploadImg = await upLoaderImg(file.file); //使用上传的方法。file.file
      //debugger;

      if (uploadImg.data.imgurl != "") {
        //console.log(uploadImg)

        uploadPortraitUrlApi({ portraitUrl: uploadImg.data.imgurl });

        //JSON.stringify(this.form))

        //this.defaultHeadPicture =  uploadImg.data.imgurl
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.test-page {
	padding-bottom: 50px;
  .active-pop {
    height: 100%;
    margin: 0 auto;
    display: grid;
    align-items: center;
    .active-content {
      width: 100%;
      background-color: #ffffff;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20px;
      font-size: 18px;
      .p-content {
        line-height: 30px;
      }
    }
    .active-button,
    .active-button-2 {
      background: linear-gradient(91.27deg, #e7514c 0%, #cb2d27 100%);
      border-radius: 24px;
      width: 100%;
      text-align: center;
      padding: 10px 0;
      box-sizing: border-box;
      margin: 0 auto;
      color: #fff;
      font-size: 18px;
    }
    .active-button-2 {
      bottom: 0px;
    }
  }
  .top {
    position: relative;
    width: 100%;
    height: 196px;
    left: 0;
    top: 0px;
    background-image: url("@/assets/photo/top-bg.png");
    background-size: 100% 100%;

    .user-logo {
      width: 121px;
      height: 44px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }

    .message {
      position: absolute;
      height: 50px;
      width: 50px;
      top: 30px;
      right: 20px;
      font-size: 12px;
      color: #fff;
    }
  }
  .page1 {
    position: relative;
    height: auto;
    left: 0;
    // background: #ffffff6b;
    text-align: center;
    margin: 0 auto;
    // border-top-left-radius: 4px;
    // border-top-right-radius: 4px;
    margin-top: -130px;
    width: 95%;
    border-radius: 8px;
    // padding-bottom: 10px;
    .wrap {
      width: 100%;
      color: #000;
      margin-top: -100px;
    //   padding-bottom: 20px;
      .users {
        justify-content: flex-start;
        &_name {
          margin-left: 10px;
          color: $font_color_white;
          font: normal normal normal 20px/30px Yuanti SC;
        }
      }

      .money_box {
        position: relative;
        // width: 95%;
        margin: 24px auto 10px auto;
        padding: 5px 20px 15px 20px;
        // margin-top: -50px;
        justify-content: space-between;
        border-radius: 4px;
        box-sizing: border-box;
        text-align: left;
		background: #FFFFFF6B;
		border: 0.5px solid #FFFFFF;
		// box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		// backdrop-filter: blur(10px);
		border-radius: 8px;

        .top-head {
          position: relative;
          width: 100%;
          height: 90px;
          display: inline-block;
          vertical-align: middle;
          text-align: center;
          margin-top: 15px;

          .account-head {
            .left,
            .right {
              display: inline-block;
            }
            .left {
              width: 100%;
              text-align: center;
              color: #fff;
			  margin-top: -60px;
              ::v-deep .van-image {
                border-radius: 90px;
              }
              ::v-deep .van-uploader__preview-delete {
                border-radius: 0;
              }
              .phone img {
                height: 14px;
                padding-right: 5px;
              }

              .user-info {
                color: #0e2529;
                margin-top: -10px;
                position: relative;
                height: 70px;
                .level-info {
                  position: relative;
                  width: 100%;
                  height: 22px;
                  text-align: center;
                  .level-txt {
                    margin: 0 auto;
                    width: 80px;
                    height: 22px;
                    left: calc(50% - 80px / 2);
                    top: 82px;

                    background: #ff8a00;
                    backdrop-filter: blur(1px);
                    border-radius: 6px;

                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 22px;
                    letter-spacing: 1px;
                    text-align: center;
                  }
                }
                .username {
                  font-size: 20px;
                  font-weight: 500;
                  color: #313231;
                  padding-top: 10px;
				  margin-top: 10px;
                }
                .phone {
                  padding-top: 8px;
                  font-size: 13px;
                  line-height: 18px;
                  color: #313231;
                }
				.status{
					width: 72px;
					height: 24px;
					margin: 4px auto;
					img{
						width: 100%;
						
					}
				}
              }
            }
          }
        }

        .dddd {
          position: relative;
          margin-top: 26px;
		  margin-bottom: 16px;
		  height: 74px;
		  ul{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;
			li{
				display: flex;
				flex: 1;	
				flex-direction: column;
				align-items: center;
				justify-content: center;
				img{
					width: 48px;
					height: 48px;
				}
				span{
					font-size: 14px;
					color: #313231;
					font-weight: 500;
					margin-top: 6px;
				}
			}
		  }
        //   display: grid;
        //   grid-template-columns: repeat(2, 1fr);
        //   .account-total {
        //     padding-top: 15px;
        //     padding-bottom: 10px;
        //     display: flex;
        //     justify-content: center;
        //     height: 40px;

        //     .d-left {
        //       .d-1 {
        //         font-size: 12px;
        //         color: #626571;
        //         padding-left: 7px;
        //         font-weight: 400;
        //         line-height: 17px;
        //       }
        //       .d-2 {
        //         font-size: 18px;
        //         font-weight: 600;
        //         padding-left: 7px;
        //         color: #0e2529;
        //         line-height: 25px;
        //       }
        //     }
        //     .d-right {
        //       .d-1 {
        //         font-size: 12px;
        //         color: #626571;
        //         font-weight: 400;
        //         padding-left: 7px;
        //         line-height: 17px;
        //       }
        //       .d-2 {
        //         font-size: 18px;
        //         font-weight: 600;
        //         padding-left: 7px;
        //         color: #0e2529;
        //         line-height: 25px;
        //       }
        //     }
        //   }
        }

        .money-list-items {
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          margin: 0 auto;

          overflow-x: auto;
          .amount {
            color: #626571;
            display: inline-block;
            min-width: 30%;
            justify-content: flex-start;
            font: normal normal normal 17px/24px PingFang SC;
            padding: 15px 4px 0;
            flex-shrink: 0;
            &:nth-child(2) {
              border-bottom: none;
            }
            .money {
              font-size: 16px;
              font-weight: 500;
              color: #3f3d38;
              margin-top: 0;
            }
            .text {
              color: #626571;
              font-size: 12px;
              font-weight: 400;
            }
          }
        }

        .op {
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          margin: 20px auto 10px auto;
          .van-button--info {
            width: 150px;
            background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
            height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 3px;
            border: none !important;
          }
          .van-button--warning {
            width: 100%;
            background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
            height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 3px;
            border: none !important;
          }
        }
      }

      .detail-11 {
        box-sizing: border-box;
        // width: 95%;
        margin: 0 auto 10px auto;
        display: inline-block;
        // padding: 10px 5px 10px 5px;
        // background: #fff;
        border-radius: 4px;
		// border: 1px solid red;
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 4px;
		color: #fff;
		.left {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			// align-items: center;
			li{
				background: url("@/assets/photo/my-left_bg.png") no-repeat center center;
				background-size: 100% 100%;
				height: 51px;
				width: 100%;
				border-radius: 8px;
				width: 100%;
			}
		}
		.right{
			flex: 1;
			height: 106px;
			background: url("@/assets/photo/my-right_bg.png") no-repeat center center;
			background-size: 100% 100%;
			border-radius: 8px;
		}
		.item{
			display: flex;
			flex-direction: column;
			padding: 8px;
			box-sizing: border-box;
			// justify-content: center;
			// align-items: center;
			p{
				display: flex;
				justify-content: space-between;
				font-size: 10px;
			}
			h6{
				display: flex;
				align-items: center;
				font-size: 14px;
				font-weight: 700;
				margin-top: 4px;
				line-height: 120%;
				img {
					width: 13px;
					height: 13px;
					margin-left: 4px;
				}
			}
		}
        // .detail-4 {
        //   height: 70px;
        //   display: grid;
        //   grid-template-columns: 33.3% 33.3% 33.3%;
        //   align-content: center;
        //   justify-items: center;
        //   .flex-item {
        //     display: flex;

        //     .v-btn {
        //       display: inline-block;
        //       width: 100%;
        //       text-align: right;
        //       .van-button {
        //         color: #fff;
        //         line-height: 20px;
        //         font-weight: 600;
        //         font-size: 12px;
        //         width: 100px;
        //         border-radius: 4px;
        //         height: 35px;
        //         background: rgba(157, 164, 112, 0.12);
        //         border: 1px solid #aab086;
        //         color: #a7af78;
        //       }
        //     }
        //   }
        // }
      }

      .detail-1 {
        box-sizing: border-box;
        width: 95%;
        margin: 0 auto 10px auto;
        display: inline-block;
        padding: 10px 10px 10px 20px;
        background: #fff;
        border-radius: 4px;
        .detail-3 {
          display: grid;
          grid-template-columns: 50% 50%;
          justify-items: start;
          font-size: 12px;
          color: #626571;

          .flex-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: left;
            .text {
              font-size: 13px;
              color: #626571;

              font-weight: 400;
              display: inline-block;
              width: 100%;
              line-height: 20px;
            }
            .gold {
              font-weight: 600;
              font-size: 18px;
              color: #0e2529;
              display: inline-block;
              width: 100%;
              line-height: 35px;
              span {
                color: #0e2529;
                font-weight: 400;
                font-size: 12px;
              }
            }
          }
        }

        .detail-2 {
          height: 70px;
          display: grid;
          grid-template-columns: 50% 50%;

          .flex-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: left;

            .v-btn {
              display: inline-block;

              text-align: right;
              .van-button {
                color: #fff;
                line-height: 20px;
                font-weight: 600;
                font-size: 12px;
                width: 120px;
                border-radius: 4px;
                height: 35px;
                background: rgba(157, 164, 112, 0.12);
                border: 1px solid #aab086;
                color: #a7af78;
              }
            }

            .text {
              font-size: 13px;
              color: #626571;

              font-weight: 400;
              display: inline-block;
              width: 100%;
              line-height: 20px;
            }
            .gold {
              font-weight: 600;
              font-size: 18px;
              color: #0e2529;
              display: inline-block;
              width: 100%;
              line-height: 35px;
              span {
                color: #0e2529;
                font-weight: 400;
                font-size: 12px;
              }
            }
          }
        }
      }

      .base_box {
        // width: 95%;
        margin: 15px auto;
        // padding: 16px 20px;
        justify-content: space-between;
        // background: #fff;
        box-sizing: border-box;
      }
      .timer-box {
        background: #fff;
        text-align: center;
        padding: 16px 0;
        div:nth-child(1) {
          margin-top: 10px;
          font-size: 16px;
          margin-bottom: 10px;
          letter-spacing: 3px;
        }
        div:nth-child(2) {
          margin: 35px 0 20px;
          font-size: 16px;
        }
        .timer {
          padding: 10px 8px;
          margin-right: 4px;
          font-weight: bold;
          color: #ac2023;
          background-color: #faf2f2;
          border-radius: 3px;
        }
        .time-item-uint {
          padding: 0 4px;
          font-size: 16px;
          color: #626571;
        }
      }

      .menu-box {
        // width: 95%;
        margin: 0 auto;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        position: relative;
        .left {
          position: relative;
          .num {
            position: absolute;
            top: 5px;
            left: 0;
            display: flex;
            color: #9b2c11;
            font-size: 33px;
            font-weight: 600;
            width: 100%;
            height: 100%;
            overflow: visible;
            line-height: 50px;
            align-items: center;
            justify-content: center;
          }
        }

        .title {
          display: inline-block;
        }

        .flex-gold {
          display: grid;
          grid-template-columns: auto 65px 100px;
          grid-gap: 0;
          margin: 0 auto;
          height: 80px;
          padding: 5px 0;
          .flex-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: left;
            .im {
              display: inline-block;
              width: 100%;
              text-align: left;
              padding-top: 0;
              text-align: center;
              margin-top: -5px;
            }
            .text {
              box-sizing: border-box;
              font-size: 14px;
              color: #626571;
              padding-left: 20px;
              font-weight: 400;
              display: inline-block;
              width: 100%;
              line-height: 20px;
              letter-spacing: 3px;
              padding-top: 8px;
              span {
                font-weight: 600;
                font-size: 18px;
                color: #3f3d38;
                padding: 0 3px;
              }
            }
            .text2 {
              letter-spacing: 0;
            }
            .gold {
              box-sizing: border-box;
              height: 39px;
              font-style: italic;
              font-weight: 400;
              font-size: 28px;
              line-height: 39px;
              letter-spacing: 5px;
              width: 100%;
              padding-left: 20px;
              padding-top: 4px;
              color: #3f3d38;

              text-shadow: 0.5px 0.5px 0px rgba(0, 0, 0, 0.28),
                0px 2px 2px rgba(219, 117, 6, 0.2);
            }
            .num {
              box-sizing: border-box;
              font-weight: 700;
              font-size: 18px;
              color: #3f3d38;
              display: inline-block;
              width: 100%;
              line-height: 20px;
              padding-top: 8px;
              span {
                color: #626571;
                font-weight: 400;
                font-size: 14px;
              }
            }
          }
        }

        .v-btn {
          display: block;
          width: 100%;
          text-align: center;
          height: 36px;
          padding: 7px 0 15px 0;
          .van-button {
            background: linear-gradient(180deg, #ee6863 0%, #d11a2d 100%);
            color: #fff;
            line-height: 20px;
            font-weight: 600;
            font-size: 14px;
            width: 90%;
            border-radius: 4px;
            height: 36px;
          }
          .gray {
            background: linear-gradient(180deg, #e9e9e9 0%, #dddddd 100%);
          }
          .gray2 {
            background: linear-gradient(180deg, #ee6863 0%, #d11a2d 100%);
          }
        }
      }

      .menu-box-ok {
        background: url("@/assets/img/my/bg.jpg") no-repeat #fff;
        background-size: 100% 100%;
      }

      .menu-box2 {
        // width: 95%;
        // margin: 10px auto 70px auto;
        // padding: 3px 8px 3px 20px;
        .van-button--primary {
          width: 100%;
          background: transparent;
          height: 36px;
          font-size: 14px;
          color: #3f3d38;
          border: none !important;
          text-align: left;
          font-weight: 600;
          padding: 8px auto;
          height: 56px;
        //   border-bottom: 1px solid #ac20230f !important;
          .van-button__content {
            border: none !important;
            justify-content: left;
            .van-icon__image {
              width: 26px;
              height: 26px;
			  margin-right: 10px;
            }
            .van-button__text {
              .im {
                position: absolute;
                right: 10px;
                top: 15px;
                display: inline-block;
                width: 8px;
                height: 16px;
                img {
                  width: 8px;
                  height: 15px;
                }
              }
            }
          }
        }

        .van-button--waring {
          width: 100%;
          background: #fff;
          height: 36px;
          font-size: 14px;
          color: #d11a2d;
          border: none !important;
          text-align: left;
          font-weight: 600;
          padding: 8px auto;
          height: 56px;
          border-bottom: 1px solid #ac20230f !important;
          .van-button__content {
            border: none !important;
            justify-content: left;
            .van-button__text {
              .im {
                position: absolute;
                right: 10px;
                top: 15px;
                display: inline-block;
                width: 16px;
                height: 16px;
                img {
                  width: 15px;
                  height: 15px;
                }
              }
            }
            sup {
              box-sizing: border-box;
              text-align: center;
              position: absolute;
              background: #d11a2d;
              color: #fff;
              border-radius: 999px;
              padding: 0;
              min-width: 10px;
              height: 10px;
              line-height: 10px;
              font-size: 14px;
              transform: scale(0.7);
              font-family: tahoma !important;
              margin-left: 2px;
            }
          }
        }

        button:last-child {
          border: none !important;
        }
      }

      .a_btns {
        justify-content: space-between;
        margin-top: 10px;
      }
      .video_w {
        width: 100%;
        height: auto;
        padding: 0px 20px;
        box-sizing: border-box;
      }
      .policy {
        margin-top: 20px;
        &_title {
          font: normal normal 600 15px/18px PingFang SC;
          color: $font_color_b;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 5px;
            width: 50px;
            height: 4px;
            background: $font_color_b;
          }
        }
        &_box {
          margin-top: 20px;
          justify-content: space-evenly;
          .static,
          .dynamic {
            width: halfSize(329px);
            height: halfSize(115px);
            justify-content: center;
            font-size: 14px;
            color: $font_color_white;
          }
          .static {
            // background: url("@/assets/images/static.png");
            // background-size: 100% 100%;
          }
          .dynamic {
            // background: url("@/assets/images/dynamic.png");
            background-size: 100% 100%;
          }
        }
      }
    }
    ::v-deep .a_btns {
      .van-button {
        width: halfSize(162px);
        height: halfSize(69px);
        padding: 0;
        border: none;
        border-radius: halfSize(14px);
        font-size: 14px;
      }
    }
    .van-content-cell {
      .img-icon {
        width: 50px;
        line-height: 40px;
      }
      img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
        border-radius: 6px;
      }
      .van-cell__title {
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .custom-title {
        font-size: 18px;
        line-height: 45px;
      }

      .custom-icon,
      .custom-right {
        line-height: 45px;
      }

      .custom-right {
        color: red;
        font-size: 18px;
      }
    }

    .bottom-button {
      width: 100%;
      position: fixed;
      bottom: 0;
      .button {
        width: 50%;
        padding: 12px;
        text-align: center;
        margin: 40px auto;
        letter-spacing: 2px;
        background: linear-gradient(153.43deg, #a5ccfa 0%, #3476d4 83.33%);
        border-radius: 8px;
        font-size: 18px;
        color: #fff;
      }
    }
  }
  .lingqu-jihuo {
    width: 100%;
    padding: 0 8%;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    .lingqu-title {
      height: 60px;
      line-height: 60px;
      text-align: left;
      font-size: 18px;
    }
    .lingqu-tips {
      text-align: left;
      font-size: 17px;
      margin-top: 20px;
    }
    .lingqu-bottom {
      width: 100%;
      position: absolute;
      bottom: 30px;
      text-align: center;
      font-size: 17px;
      left: 0;
      right: 0;
      .lingqu-button {
        display: inline-block;
        width: 45%;
        border: 1px solid #cb2d27;
        background: linear-gradient(91.27deg, #e7514c 0%, #cb2d27 100%);
        color: #ffffff;
        width: 38%;
        margin: 0 auto;
        border-radius: 8px;
        padding: 12px 8px;
      }
      .cancle {
        background: #ffffff;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin-right: 10px;
      }
    }
  }
  ::v-deep .modal_a {
    width: 95%;
    height: halfSize(1180px);
    background: $bg_color;
    border-radius: 13px;
    .close {
      justify-content: flex-end;
      margin: 10px 10px 0 0;
    }
    .assets_modal {
      padding: 0px 50px;
      .title {
        font-size: 17px;
      }
      .money {
        margin-top: 10px;
        font-size: 26px;
        font-weight: bold;
        color: $font_color;
      }
    }
    .txt {
      font-size: 18px;
      color: red;
      line-height: 24px;
    }
  }

  /*档案上传 css*/
  .van-uploader {
    /*border:1px solid red;*/
    /*display:none;*/
  }

  .van-uploader__upload-icon {
    border: 1px solid red;
    display: none;
  }

  .van-uploader__upload-icon {
    border: 1px solid red;
    font-size: 0;
  }

  .logout {
    // margin: -20px auto 140px auto;
    width: 96%;
	margin: 0 auto;
    position: relative;
	border: 1px solid blue;
    z-index: 1550;
    height: 42px;
	border: 1px solid #4B594A;
	border-radius: 8px;
    .van-button--default {
      width: 100%;
      background: transparent;
      height: 42px;
      font-size: 14px;
      color: #4B594A;
      border: none !important;
      text-align: left;
      font-weight: 600;
    //   padding: 8px auto;
      margin: 0 auto;
    //   height: 46px;
      border-radius: 8px;
    //   border-bottom: 1px solid #f0f3dc !important;
      .van-button__text {
        color: #4B594A;
        font-weight: normal;
        font-size: 17px;
		font-weight: 600;
      }
    }
  }

  .van-dialog {
    border-radius: 8px;
    background: #F6FEF2;
    ::v-deep .van-hairline--top {
      border-top: none;
      padding-bottom: 16px;
    }
  }

  .van-dialog__cancel {
    display: inline-block !important;
  }
  ::v-deep .van-dialog .van-button--default {
    background: #F6FEF2;
    color: #4B594A;
    // border: 1px solid #4B594A;
    border-radius: 33px;
    // margin: 16px;
    box-sizing: border-box;
    .van-button__text {
      padding: 0;
      border: 1px solid #4B594A;
      width: 90%;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      color: #4B594A;
    }
    &.van-dialog__confirm {
        .van-button__text {
          color:#fff;
          background: #4B594A;
        }
    }
  }
  ::v-deep .van-dialog__cancel {
    display: inline-block !important;
  }

  ::v-deep .van-hairline--top {
    // border-top: rgba(172, 32, 35, 0.06) 1px solid;
  }
}
</style>
<style>
.i-mask {
  position: absolute;
  z-index: 1500;
  background-color: rgba(255, 255, 255, 0);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 1100px;
  height: 100%;
  width: 100%;
}
</style>
