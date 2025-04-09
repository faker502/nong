<template>
  <div class="page">
    <div class="top-bg">
        <nav-bar title="客服中心" titleColor="#313231"
        leftIconColor="#313231"
        class="nav-top"/>
		<!-- <img src="@/assets/img/kefu.webp" style="width: 100%;"> -->
    </div>
    <div class="head">
        <img src="@/assets/photo/kf_left.png" style="width: 100%;">
        <div class="kf_right">
            <div class="kf_right_top">
                <p>欢迎访问客服中心！</p>
                <h6>了解更多助农项目详情</h6>
                <p class="last">点击下方联系客服！客服在线时间：</p>
                <h5>08:00-22:00</h5>
            </div>
            <div class="kf_right_bottom" @click="$router.push('/online')">
            联系客服
            </div>
        </div>
        <!-- <div class="narvbar">
            <div @click="$router.push('/online')">
                <div>联系我们</div>
                <div>在线客服 
                <span style="font-size:14px;">
                 <i data-v-067c0a25="" class="van-icon van-cell__right-icon"></i>
                </span></div>
            </div>
        </div> -->
    </div>



    <div class="questions">
        <div class="title">
            <div class="title-2">常见问题</div>
            <!-- <div class="more" @click="$router.push({ path: '/news?type=7' });">
                <i class="van-icon van-cell__right-icon">更多 &gt; </i>
            </div> -->
        </div>
        <van-collapse v-model="activeNames" accordion>
            <van-collapse-item v-for="(item, key) in qestionList" 
                :key="key"
                :title="item.noticeTitle"
                :name="key">
                <div class="question-content">
                    {{ item.noticeContent }}
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>


</div>
</template>
<script>
import { getQuestionsApi } from "@/api/article";
import { Collapse, CollapseItem } from 'vant';
//import { openChat } from "@/utils/chat";
export default {
    components: {
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem
    },
    data() {
        return {
            qestionList: [],
            activeNames: []
        };
    },
    computed: {},
    //openchat() {
    //  
    //},
    mounted() {
     
    },

    created() {

        this.getQuestions();
       //openChat();;
    },
    methods: {
        getQuestions() {
            getQuestionsApi().then((res) => {
                if (res.code === 200) {
                    this.qestionList = res.data || [];
                }
            });
        },
        tolink(item) { 
            // this.$router.push('/online'); { name: '/news/info', params: { noticeId: item.noticeId } }
            this.$router.push('/news/info?type=' + item.noticeType + '&noticeId=' + item.noticeId);
        }
    }
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

.page {
 
    //background-color:#FFFBF6;
}

.van-cell{
    background: #F4F4F4;
}
.top-bg{
    // position: relative;
    width: 100%;
	display: block;
	// margin-top: 66px;
    background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
    height: 165px;


}
.head{
   
    // border: 1px solid red;
    height: 139px;
    margin: 0px 16px;
     margin-top: -109px;
     display: flex;
     justify-content: space-between;
     img {
        width: 128px!important;
        height: 100%;
        margin-right: 12px;
     }
     .kf_right{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        padding-bottom: 0px;
        padding-right: 0px;
        box-sizing: border-box;
        color: #313231;
        p {
            font-size: 14px;
            &.last {
                color: #6C6E6C;
                font-size: 10px;
            }
        }
        h6 {
            font-size: 16px;
            font-weight: 600;
            background: linear-gradient(117.82deg, #7A963C 10.14%, #34420D 110.18%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            margin-top: 6px;
            margin-bottom: 12px;
        }
        h5 {
            font-size: 16px;
            color: #313231;
            font-weight: 600;
            text-align: center;
            margin-top: 10px;
        }
        .kf_right_bottom {
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            height: 30px;
            background: linear-gradient(180deg, #7E963C 0%, #455117 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            color: #fff;
        }
     }
}



.questions{
    
    width: 100%;
	margin:0 auto;
    margin-bottom: 110px;
    padding: 0 16px;
    box-sizing: border-box;

    .title{
        width: 100%;
        margin: 25px auto;
        padding: 0 16px;
        box-sizing: border-box;

        .title-2{
            display: inline-block;
            width: 170px;
            font-size: 18px;
            font-weight: 600;
            color: #313231;
        }
        .more{
     
            display: inline-block;
            width: 100px;
            text-align: right;
			float: right;
            color: #E23F32;
            font-weight: 600;
            font-size: 16px;
            .van-cell__right-icon{
                color: #E23F32;
            }
        }
    } 
    .van-cell__title{
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
		line-height: 150%;
    }
}
.van-cell__title{
    width: 90%;
}
.van-cell__value{
    width: 30%;
}
.van-cell {
    
    background-color:#fff; /*question list background-color*/
}
.van-cell__title, .van-cell__value {
    -webkit-box-flex: unset;
    -ms-flex: unset;
    flex: unset;
}
.van-cell__value {width: 1px;}
.bottom{
    position: fixed;
    bottom: 0px;
    width: 100%;
    text-align: center;
    background-color: #ffffff;
    .button{
        width: 60%;
        background: linear-gradient(153.43deg, #A5CCFA 0%, #3476D4 83.33%);
        border-radius: 8px;
        margin: 26px auto;
        padding: 16px 0;
        font-size:16px;
        color: #ffffff;
    }
}

::v-deep .van-collapse-item {
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
    
    .van-collapse-item__title {
       background: #fff;

;
        padding: 15px;
        font-size: 16px;
        color: #313231;
        
        &::after {
            border-color: #fff;
        }
    }
    
    .van-collapse-item__content {
        background: #fff;
        padding: 15px;
        color: #6C6E6C;
        font-size: 14px;
        line-height: 1.5;
    }
}

::v-deep .van-collapse-item__wrapper {
    .van-collapse-item__content {
        background: #fff;
    }
}
</style>