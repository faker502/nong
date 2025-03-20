<template>
    <div class="test-page">
        <div class="top">
            <div class="top-head">
                <nav-bar title="" right="收益详情"  @handleRight="$router.push('/income')" style=""/>
            </div>
        </div>
        <div class="page1">
            <div class="content">
                <div class="content-box">
                    <div class="list">
                        <div class="top-title">
                            <img :src="require('@/assets/img/project-detail.png')" width="100%"/>
                        </div>
                        <div class="list-column">
                            <div class="item">领取金额</div>
                            <div class="item">每日分红</div>
                            <div class="item">收益周期</div>
                            <div class="item">赠送国债</div>
                            <div class="item item-1">{{data.money}} <em>元</em></div>
                            <div class="item item-1">{{data.dayIncome}} <em>元</em></div>
                            <div class="item item-1">{{data.days}} <em>元</em></div>
                            <div class="item item-1">{{data.nationalDebt}} 元</div>
                        </div>
                        <div class="list-bottom">
                            <span>总收益：</span>
                            <span>{{ data.incomeTotal }} 元</span>
                        </div>

                        <div class="bottom">
                            <p></p>
                        </div>
                    </div>
                    <div class="remark">
                        
                    </div>
                </div>
            </div>

            <div class="bottom-button" @click="buyProject">
                <div class="button">点击领取</div>
            </div>
        </div>
        <div v-show="tips">
          <div class="van-overlay" style="z-index: 2001;"></div>  
            <div role="dialog" aria-labelledby="卖出" tabindex="0" class="van-dialog" style="z-index: 2002;">
              <div class="van-dialog__header" style="font-size: 18px;">级别奖励说明</div>
                <div class="van-dialog__content">
                  <div class="notice-content" style="padding: 0;">
                  <div>
                    <p>
                      <img src="#" width="100%" height="220px">
                    </p>
                    <div class="tips-content">
                        <p>累计领取1-587元，青铜会员，日可领取1元级别奖励；</p>
                        <p>累计领取588-987元，白银会员，日领取2元级别奖励；</p>
                        <p>累计领取988-2587元，黄金会员，日领取5元级别奖励；</p>
                        <p>累计领取2588-5187元，铂金会员，日领取10元级别奖励；</p>
                        <p>累计领取5188-9987元，钻石会员，日领取15元级别奖励；</p>
                        <p>累计领取9988元以上，卓越会员，日领取20元级别奖励。</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="van-hairline--top van-dialog__footer">
                <button type="button" class="van-button van-button--default van-button--large van-dialog__confirm" @click="showIncome(2)">
                  <div class="van-button__content"><span class="van-button__text">确认</span></div>
                </button>
            </div>
          </div>
        </div>

        <van-form ref="pwdForm" v-show="pwdShow" class="mt15 passwdForm" @submit="submitPwd">
            <van-cell-group inset>
                <van-password-input height="90%" :value="password" :focused="showKeyboard" :length="6" :gutter="10"
                  @focus="showKeyboard = true" @blur="submitPwd" />
            </van-cell-group>
            <van-number-keyboard v-model="password" :show="showKeyboard" />
            <div style="margin: 16px">
              <van-button round block type="primary" color="linear-gradient(91.27deg, #E7514C 0%, #CB2D27 100%)" native-type="submit" style="font-size: 16px;">
                确认
              </van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { getDetailApi, buyProjectApi } from "@/api/project";
export default {
    name: 'projectList',
    components: {},
    data() {
        return {
            data: [], 
            projectId: 0,
            tips: false,
            password: '',  
            pwdShow: false,
            pwdShow: false,
            loading: false,
            isSubmit: true,
            from: {
                payPwd: undefined
            },
            showKeyboard: true,
        };
    },
    created() {
        if (this.$route.query.id != undefined) {
            this.projectId = parseInt(this.$route.query.id);
        } else { 
            this.$dialog({ message: '没有要领取的项目！', className: 'dialog-error' });
            return false;
        }

        this.getDetail();
    },
    methods: {
        getDetail() {
            getDetailApi({ projectId: this.projectId }).then((res) => {
                this.data = res.data;
                if (res.data.progress <= 0) { 
                    this.$dialog({ message: '今日助力名额已满！', className: 'dialog-error' });
                    return false;
                }
            });
        },
        showIncome(i) { 
            this.tips = i== 1 ? true : false;
        },
        buyProject(item) {
            this.password = undefined;
            this.pwdShow = true;
            this.id = item.id;
            this.showKeyboard = true;
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
                    buyProjectApi({ id: this.projectId, pay_password: this.password }).then((res) => {
                        this.isSubmit = true;
                        this.loading = false;
                        if (res.code == 200) {
                            //传入对象参数
                            this.$dialog({ title: '提示', message: this.data.name + ' 领取成功！', className: 'buy_tips' });
                            return false;
                        } else {
                            Toast(res.msg);
                            return false;
                        }
                    }).catch((err) => {
                        this.isSubmit = true;
                        if (err.code == 304) {
                            this.$router.push("/updatepaypwd");
                        }
                        if (err.code == 204) {
                            this.$router.push("/recharge");
                        }
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
    }
};
</script>
<style lang="scss" scoped>
.test-page {
    //background: url('@/assets/img/project-2-bg.png');
    //background-size: 100% 100%;
    height: 100%;
    .top {
        position: relative;
        width: 100%;
        height: 90px;
        left: 0;
        top: 0px;
        .navbar{
           background: transparent !important;
        }
        .top-head {
            position: absolute;
            width: 100%;
            height: 60px;
            left: 0;
            top: 6px;
            background-size: 100% 100%;
            filter: drop-shadow(0px 4px 12px rgba(10, 74, 118, 0.16));
            display: inline-block;
            vertical-align: middle;
            text-align: center;

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
        }
    }

    .page1 {
        width: 100%;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        margin-top: 0;
        // -webkit-box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;
        // box-shadow: rgb(225 225 225 / 70%) 0 0.26667rem 0.53333rem 0;
        .tabs {
            justify-content: space-evenly;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding: 0px;
            width: 90%;
            margin: 30px auto 0;
            height: 112px;
            line-height: 112px;
            left: calc(50% - 335px/2);
            background: #F5F9FF;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18), inset 0px 0px 10px rgba(89, 119, 222, 0.08);
            border-radius: 8px;

            .tab-left,.tab-right{
                width: 50%;
                vertical-align: middle;
            }
            .tab-left{
                padding-left: 4%;
                img {
                    width: 68%;
                    height: 100%;
                    vertical-align: middle;
                }
            }
            .tab-right{
                padding-right: 4%;
                text-align: right;
                line-height: 0.8rem;
                div:nth-child(1){
                    font-size: 16px;
                    padding: 10px;
                }
                div:nth-child(2){
                    padding-right: 10px;
                    font-size: 16px;
                    color: #2F6DB3;
                    font-weight: 600;
                    span{
                        font-size: 18px;
                    }
                }
                div:nth-child(3){
                    padding-right: 10px;
                    font-size: 15px;
                    color: #A1A6AB;
                }
            }
        }

        .content {
            margin: 0 10px;
            border-radius: 8px;
            margin-top: 340px;
            .tips{    
                font-size: 18px;
                font-weight: 600;
                color: #323A44;
                padding: 20px 10px 10px;
            }
            .content-box {
                .list {
                    width: 99%;
                    margin: 10px auto 20px;
                    font-size: 16px;
                    padding: 15px 10px;
                    background: #F5F9FF;
                    border: 0.5px solid #FFFFFF;
                    border-radius: 10px; 
                    box-sizing: border-box;   
                    .top-title{
                        font-size: 18px;
                        text-align: center;
                        font-weight: 600;
                        margin-bottom: 12px;
                        margin-top: -36px;
                    }
                    .list-column{
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        .item{
                            background: rgba(172, 32, 35, 0.06);
                            border: 1px solid #D8D8D8;
                            padding: 10px 0;
                            text-align: center;
                        }
                        .item-1{
                            background: #ffffff;
                            border: 1px solid #D8D8D8;
                            padding: 10px 0;
                            text-align: center;
                            em{
                                font-size: 15px;
                            }
                        }
                    }
                    .list-bottom{
                        text-align: center;
                        border: 1px solid #D8D8D8;
                        border-top: none;
                        padding: 15px 0;
                    }
                    .left,
                    .center{
                        display: inline-block;
                        vertical-align: middle;
                        p{
                            padding: 10px 0;
                        }
                    }
                    .left{
                        width: 26%;
                    }
                    .center{
                        width: 34%;  
                        text-align: right;
                        p{
                            padding-right: 12px;
                        }
                    }
                    .right {
                        display: inline-block;
                        width: 40%;
                        text-align: center;
                        vertical-align: middle;
                        div {
                            display: inline-block;
                            text-align: center;
                            width: 80%;
                            color: #2F6DB3;
                            font-weight: 600;
                            font-size: 16px;
                            background: radial-gradient(82.74% 862.49% at 28.76% 51.43%, rgba(114, 175, 248, 0.55) 0%, rgba(114, 175, 248, 0.12) 100%);
                            border-radius: 4px;
                        }
                    }
                    .bottom{
                        font-size: 15px;
                        // margin: 20px 0 0px;
                        span:nth-child(2){
                            color: #2F6DB3;
                            font-weight: 600;
                        }
                    }
                }
                .remark{
                    text-align: center;
                    margin: 10px auto;
                    color: #A9ADB2;
                    font-size: 14px;
                }
            }
        }
        .bottom-button{
            width: 100%;
            margin: 0 auto;
            // position: fixed;
            // bottom: 0;
            // background-color: #fff;
            padding: 20px 0;
            .button{
                width: 70%;
                padding: 12px;
                text-align: center;
                margin: 0 auto;
                letter-spacing: 2px;
                background: linear-gradient(91.27deg, #E7514C 0%, #CB2D27 100%);
                border-radius: 20px;
                font-size: 18px;
                color: #fff;
            }
        }
    }
    .tips-content{
        margin-bottom: 20px;
        p{
            font-size: 16px;
            color: rgb(230, 0, 0);
            font-weight: 600;
            padding: 4px 40px;
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
        border-radius: 10px;
    }
    .van-password-input__security li {
        height: 95%;
        background-color: #F2F3F5;
        border-radius: 5px;
    }
    ::v-deep .van-cell-group--inset{
        margin: 20px 16px;
    }
}
</style>