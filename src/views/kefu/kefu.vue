<template>
  <div class="page">
    <div class="top-bg">
        <nav-bar title="学习中心" />
		<img src="@/assets/img/kefu.webp" style="width: 100%;">
    </div>
    <div class="head">
        <div class="narvbar">
            <div @click="$router.push('/online')">
                <div>联系我们</div>
                <div>在线客服 <!--08:00 ~ 22:00-->
                <span style="font-size:14px;">
                 <i data-v-067c0a25="" class="van-icon van-icon-arrow van-cell__right-icon"></i>
                </span></div>
            </div>
        </div>
    </div>



    <div class="questions">
        <div class="title">
            <div class="title-2">常见问题</div>
            <div class="more" @click="$router.push({ path: '/news?type=7' });">
                <i class="van-icon van-cell__right-icon">更多 &gt; </i>
            </div>
        </div>
        <van-cell-group inset>
            <van-cell v-for="(item, key) in qestionList" :key="key"
          :title="key+1 +'、'+ item.noticeTitle" size="large" title-class="cell-title" value="" @click="tolink(item)" is-link />
        </van-cell-group>
    </div>


</div>
</template>
<script>
import { getQuestionsApi } from "@/api/article";
//import { openChat } from "@/utils/chat";
export default {
    data() {
        return {
            qestionList: [],
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
                this.qestionList = res.data
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

.page {
 
    //background-color:#FFFBF6;
}

.van-cell{
    background: #F4F4F4;
}
.top-bg{
    position: relative;
    width: 100%;
	display: block;
	margin-top: 66px;

}
.head{
    position: relative;
    
    .narvbar{
        /*display: grid;*/
        //grid-template-columns: repeat(2, 1fr);
        
        width: 94%;
        margin: 10px auto 0 auto;
        text-align: left;
        padding: 10px 10px;
        line-height: 24px;
        /*border: 2px solid #999;*/
        border-radius: 8px;
       

        div{

            /*border:1px solid blue;*/
            div:nth-child(1){
             margin:0 auto;
                color:#D11A2D;
                font-size: 18px;
                font-weight: 600;
            }
            div:nth-child(2){
                //margin-left:6%;
                background-color:#fff;
                margin-top:15px;
                padding-left:20px;
                padding-right:0;
                padding-top:10px;
                padding-bottom:10px;
                color: #333;
                font-size: 16px;
                text-align:left;
                span {
                   position:absolute;

                   display:inline-block;
                   color:green;
                   text-align:right;
                   right:10%;
                }
            }
        }
    }   
}



.questions{
    
    width: 100%;
	margin:0 auto;
    margin-bottom: 110px;

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
            color: #D11A2D;
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
</style>