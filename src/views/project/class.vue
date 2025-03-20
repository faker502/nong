<template>
    <div class="test-page">
        <div class="top">
            <div class="top-head">
                <div class="van-nav-bar__content">
                    <div class="van-nav-bar__left"></div>
                    <div class="van-nav-bar__title van-ellipsis">
                        <span>
                            <img src="@/assets/img/logo.png" style="width:50px;height:50px;vertical-align: middle;" />
                        </span>
                        <span class="nav-page-title"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="page1">
            <div class="tabs df_r">
                <div class="tab df_c" v-for="it in tabs" :key="it.value" @click="handleTab(it)" :class="it.value == idx ? 'actived' : ''">
                    <div class="tab_item df_c">
                        <p>{{ it.title }}</p>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="content-box" v-if="idx == 1">
                    <div class="list" v-for="(item, key) in list" :key="key">
                        <div class="left">
                            <img :src="item.logo" width="100%" height="100%"/>
                        </div>
                        <div class="center">
                            <div>日收益 ￥{{ item.project.dayIncome }}元 </div>
                            <div v-html="item.project.priceTitle"></div>
                            <div>今日剩余{{ item.project.progress }}份</div>
                        </div>
                        <div class="right">
                            <div @click="$router.push({path: '/project/list', query: {id: item.id}})">立即助力</div>
                        </div>
                    </div> 
                </div>
                <div class="content-box-2" v-else>
                    <div v-if="mylist.length>0">
                        <div class="list" v-for="(item, key) in mylist" :key="key">
                            <div class="left">
                                <img :src="item.logo" width="100%" height="100%"/>
                            </div>
                            <div class="center">
                                <div>已助力</div>
                                <div>￥<span>{{ item.money }}</span></div>
                            </div>
                            <div class="right">
                                <div><span>今日收益</span>：<span><em>{{ item.dayIncome }}</em> 元</span></div>
                                <div><span>剩余收益</span>：<span><em>{{ item.overDays }}</em> 天</span></div>
                            </div>
                            <div class="bottom">
                                助力时间：{{ item.createTime }}
                            </div>
                        </div>
                    </div>
                    <van-cell-group class="peration-item2" v-else>
                        <template>
                            <img :src="require('@/assets/img/no-record.png')">
                        </template>
                        <div style="font-size:16px;color: #BDC3CD;">暂时没有领取记录</div>
                    </van-cell-group>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import { getClassListApi } from "@/api/project";
export default {
    name:'projectClass',
    components: {},
    data() {
        return {
            tabs: [
                { value: 1, title: ""},
                { value: 2, title: "助力"},
            ],
            idx: 1,
            list: [],
            mylist: []
        };
    },
    created() {
        this.getClassList();
        this.myProject();
    },
    methods: {
        handleTab(it) {
            console.log(it.value + '-------' + this.idx);
            this.idx = it.value;
            this.title = it.title;
            if (this.idx == 1) {
      
            } else {
   
            }
        },
        getClassList() {
            getClassListApi().then((res) => {
                this.list = res.data;
            });
        },
        myProject() {
        }
    }
};
</script>
<style lang="scss" scoped>
.test-page {
    .top {
        position: relative;
        width: 100%;
        height: 90px;
        left: 0;
        top: 0px;
        background: #FFFFFF;
        background: linear-gradient(to bottom, #ffffff, #C1D7F2);
        .top-head {
            position: absolute;
            width: 100%;
            height: 60px;
            left: 0;
            top: 16px;
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
    .page1 {
        width: 100%;
        margin: 0 auto;
        background-color: #ffffff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: relative;
        overflow: hidden;
        margin-top: -12px;
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
            height: 40px;
            line-height: 40px;
            left: calc(50% - 335px/2);
            background: rgba(250, 252, 255, 0.7);
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18), inset 0px 0px 10px rgba(89, 119, 222, 0.08);
            border-radius: 8px;
            .tab {
                width: 50%;
                // height: halfSize(118px);
                border-radius: 8px;
                font-family: 'PingFang SC';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                display: flex;
                align-items: center;
                text-align: center;
                color: #2F6DB3;
                flex: none;
                order: 0;
                flex-grow: 0;
                font-size: 16px;
                color: #969696;
                &_item {
                    align-items: center;
                    .sub_title {
                    font-size: 13px;
                    margin-top: 5px;
                    }
                }
            }
            .actived{
                background: linear-gradient(135deg, rgba(114, 175, 248, 0.05) 0%, rgba(114, 175, 248, 0.35) 100%);
                color: #2F6DB3;
            }
        }
        .content {
            // margin: 0 10px;
            border-radius: 8px;
            margin-top: 20px;
            box-shadow: rgba(225, 225, 225, 0.5) 0 5px 10px 0;
            .content-box{
                .list {
                    width: 95%;
                    margin: 15px auto;
                    font-size: 16px;
                    padding: 10px 0;
                    box-shadow: rgb(225 225 225 / 0.5) 0 5px 10px 0;
                    .left,.center,.right {
                        display: inline-block;
                        width: 32%;
                        vertical-align: middle;
                        div {
                            padding: 10px 0;
                        }
                    }

                    .center {
                        display: inline-block;
                        width: 40%;
                        padding-left: 10px;
                        box-sizing: border-box;
                        white-space: nowrap;
                        div:nth-child(1) {
                            color: #2F6DB3;
                            font-weight: 600;
                            padding: 6px 0 6px;
                        }
                    }

                    .right {
                        width: 28%;
                        text-align: right;
                        padding-right: 4px;
                        box-sizing: border-box;
                        div {
                            display: inline-block;
                            text-align: center;
                            width: 80%;
                            color: #2F6DB3;
                            font-weight: 600;
                            font-size: 16px;
                            background: #B5D5FB;;
                            border-radius: 4px;
                        }
                    }
                }
            }
            .content-box-2{
                .list {
                    width: 95%;
                    margin: 20px auto;
                    font-size: 16px;
                    padding: 15px 0;
                    .left,.center,.right {
                        display: inline-block;
                        vertical-align: middle;
                        div {
                            padding: 10px 0;
                        }
                    }
                    .left{
                        width: 28%;
                    }
                    .center {
                        width: 28%;
                        padding-left: 10px;
                        box-sizing: border-box;
                        div {
                            color: #2F6DB3;
                            font-weight: 600;
                            padding: 6px 0 8px;
                            span{
                                font-size: 18px;
                            }
                        }
                    }

                    .right {
                        width: 44%;
                        text-align: right;
                        div {
                            display: inline-block;
                            span:nth-child(1){
                                display: inline-block;
                                width: 65px;
                            }
                            em{
                                color: #2F6DB3;
                                font-weight: 600;
                            }
                        }
                    }
                    .bottom{
                        padding-top: 10px;
                    }
                }
                .peration-item2{
                    margin-top:60px;
                    text-align:center;
                }
            }
        }
    }    
}
</style>