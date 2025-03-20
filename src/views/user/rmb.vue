<template>
    <div class="wallet">
        <div style="position: relative">
            <div class="wallet-top">
                <div class="wallet-top-msg" @click="$router.push({ path: '/my' })">
                    <div class="flex-line-between">
                        {{info.user.name}}
                    </div>
			
                    <div class="flex-line-between-2">由中国人民银行提供钱包服务</div>
        
                </div>
                <div class="wallet-top-msg-2" @click="$router.push({ path: '/my/digital' })">
                    明细
                </div>      
            </div>
			
			
            <div class="wallet-content">
                <div class="wallet-content-2">
                    <div class="wallet-tips">
                        <span class="wallet-title">钱包余额</span>
                        <i class="van-icon van-icon-eye" v-if="isCloseEye"  @click="closeEye('open')"></i>
                        <i class="van-icon van-icon-closed-eye" v-if="!isCloseEye" @click="closeEye('close')"></i>
                    </div>
                    <div class="wallet-money">
                        <span class="money-icon">¥</span>
                        <span class="money-money" v-if="isCloseEye">{{ info.account.rmb }}</span>
                        <span class="money-money" v-else style="vertical-align: middle;padding-left: 10px;">****</span>
                    </div>
                    <div class="wallet-button">
                        <div class="wallet-btn">
                            <van-button class="wallet-btn-1 mt15" @click="toTrance" style="border-radius: 6px;" block>
                                <span style="color:#0C0C0C">转账</span>
                            </van-button>
                        </div>
                        <div class="wallet-btn right">
                            <van-button class="wallet-btn-1 mt15" @click="withdrawSubmit" style="background-color: #DD443C;border-radius: 10px;" block>
                                <span style="color:#ffffff">提现</span>
                            </van-button>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        <van-popup v-model="isActive" closeable class="lingqu-jihuo" position="bottom" :style="{ height: '30%' }">
            <div class="lingqu-title">激活钱包</div>
            <div class="lingqu-tips">您暂未激活数字人民币钱包</div>
            <div class="lingqu-bottom">
                <div class="lingqu-button cancle" @click="isActive = false">取消</div>
                <div class="lingqu-button" @click="$router.push('/project')">激活</div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import "@/assets/css/wallet.scss";
import { getAccountApi, bankListApi, withdrawRequestApi } from "@/api/member";
import { encrypt } from "@/utils/jsencrypt";
import { getConfigKey } from "@/api/index";
export default {
    name: "wallet",
    components: {},
    data() {
        return {
            info: {},
            //isGo: 'no',
            isCloseEye: false,
            isActive: false,
            bankList: [],
        };
    },
    mounted() {
        this.getBankList();
        this.getInfo();
        //this.config();
    },
    computed: {},
    methods: {
        getInfo() {
            getAccountApi({key: encrypt('withdrawal_amount,number_money')}).then((res) => {
                this.info = res.data;
            });
        },
        getBankList() {
            bankListApi().then((res) => {
                this.bankList = res.data;
            });
        },
        closeEye(type) {
            this.isCloseEye = type == 'open' ? false : true;
        },
        toTrance() {
            this.$myMsg.notify({ content: '该功能暂未开放！', type: 'message', noNotifyBtn: false, time: 2000 });
            return false;
        },		
        withdrawSubmit() {
            this.$myMsg.notify({ content: '该功能暂未开放！', type: 'message', noNotifyBtn: false, time: 2000 });
            return false;
        },
    }
};
</script>

<style scoped lang="scss">
.wallet-content{
    width: 100%;
    padding-bottom: 200px;
    .wallet-content-2{
        width: 70%;
        margin: 0 auto;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .wallet-tips{
            margin: 50px auto 40px;
            .wallet-title{
                color: #141414;
                font-size: 16px;
                font-weight: 600;
            }
            .van-icon-eye,.van-icon-closed-eye{
                padding-left: 6px;
            }
       }
        .wallet-money{
            font-weight: 600;
            margin-bottom: 20px;
            .money-icon{
                font-size: 20px;
            }
            .money-money{
                font-size: 26px;
            }
        }
        .wallet-button{
            display: inline-block;
            width: 100%;
            .wallet-btn{
                display: inline-block;
                width: 50%;
                .wallet-btn-1{
                    width: 92%;
                }
            }
        }
        .right {
            text-align: right;
            text-align: -webkit-right;
        }
    }
}
.wallet-top{
    width: 100%;
    margin:20px auto;
    vertical-align: middle;
    padding: 0px 8%;
    box-sizing: border-box;
}
.wallet-top-msg{
    display: inline-block;
    width: 70%;
    vertical-align: middle;
}
.wallet-top-msg-2{
    display: inline-block;
    width: 30%;
    vertical-align: middle;
    font-size:16px;
    color:#ffffff;
    text-align: right;
}
.flex-line-between{
    font-size: 18px;
    font-weight: 600;
    padding: 10px 0;
}
.flex-line-between-2{
    font-size:13px;
    line-height: 24px;
}
.flex-line-between-3{
    font-size: 18px;
    line-height: 24px;
    .money{
        font-size: 20px;
        font-weight: 600;
    }
}
.tips-content {
    background: rgba(222, 222, 222, 0.4);
    border-radius: 3px;
    padding: 8px 13px;
    margin-right: 10px;
}
.video-content {
    position: absolute;
    width: 95%;
    top: 35%;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 54vw;
    z-index: 999;
    border-radius: 10px;
    overflow: scroll;
    box-shadow: 20px -10px 80px #ff4848;
}
.lingqu-jihuo{
    width: 100%;
    padding: 0 8%;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    .lingqu-title{
      height: 60px;
      line-height: 60px;
      text-align: left;
      font-size: 18px;
    }
    .lingqu-tips{
      text-align: center;
      font-size: 17px;
      margin-top: 20px;
    }
    .lingqu-bottom{
      width: 100%;
      position: absolute;
      bottom: 30px;
      text-align: center;
      font-size: 17px;
      left: 0;
      right: 0;
      .lingqu-button{
        display: inline-block;
        width: 45%;
        border: 1px solid #CB2D27;
        background: linear-gradient(91.27deg, #E7514C 0%, #CB2D27 100%);
        color: #ffffff;
        width: 38%;
        margin: 0 auto;
        border-radius: 8px;
        padding: 12px 8px;
        text-align: center;
      }
      .cancle{
        background: #ffffff;
        color: #000;
        border: 1px solid rgba(0,0,0,.2);
        margin-right: 10px;
      }
    }
}
::v-deep .van-dialog__header {
    padding-bottom: 26px;
    font-size: 18px;
}
::v-deep .van-button__content {
    font-size: 18px;
    font-weight: 600;
}
::v-deep .ql-size-small {
    font-size: 12px;
}
::v-deep .ql-size-large {
    font-size: 18px;
}
::v-deep .ql-size-huge {
    font-size: 32px;
}
video::-webkit-media-controls-fullscreen-button {
    display: none;
}
//播放按钮样式
.vjs-custom-skin>.video-js .vjs-big-play-button {
    width: 70px !important;
    height: 45px !important;
    line-height: 45px !important;
    border-radius: 5px !important;
    font-size: 2.5em !important;
    border: 1px solid #ffffff !important;
    background: rgba(222, 222, 222, 0.6) !important;
}
.vjs-custom-skin>.video-js .vjs-big-play-button {
    top: 53%;
}
.vjs-poster {
    border-radius: 10px i !important;
}
.vjs-custom-skin>.video-js .vjs-control-bar {
    display: none !important;
}
</style>
