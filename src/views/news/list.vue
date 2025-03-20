
  
<template>
    <div class="Operation">
        <!-- van-icon-question -->

		<nav-bar :title="title" titleColor="#fff" leftIconColor="#fff" right="" @click-left="$router.go(-1)" />
        

        <div>

          

            <van-cell>
                 <div class="items" is-link @click="$router.push('/news?type=8')">
                      <div class="item">
                       <p >
						<img style="width:100px;" :src="require('@/assets/img/news/8.jpg')"  />                          
                        </p>
                        <p class="tit">国务院政策文件</p>                       
                    </div>
				</div>	
				<div class="items" is-link @click="$router.push('/news?type=9')">
					<div class="item">
					   <p >
						<img style="width:100px;" :src="require('@/assets/img/news/9.jpg')"  />                          
					    </p>
					    <p class="tit">财政部政策文件</p>                       
					</div>
				</div>	
				<div class="items" is-link @click="$router.push('/news?type=13')">	
					<div class="item">
					   <p >
						<img style="width:100px;" :src="require('@/assets/img/news/13.jpg')"  />                          
					    </p>
					    <p class="tit">央行政策文件</p>                       
					</div>
				</div>	
				<div class="items" is-link @click="$router.push('/news?type=14')">	
					<div class="item">
					   <p >
						<img style="width:100px;" :src="require('@/assets/img/news/9.jpg')"  />                          
					    </p>
					    <p class="tit">政策文件</p>
					</div>

                </div>

              </van-cell>
    
              
          <!--</div>-->


        </div>


    </div>
</template>
<script>
import { getQuestionsApi,getNewsListApi } from "@/api/article";
export default {
    name: "NewsClass",
    data() {
        return {
            news: [],
            title: '相关文件',
            type: 1
        };
    },
	filters: {
		substr(val) {
			return val.toString().substr(0, 10);
		}
	},
    components: {},
    created() {
        this.getNews();
    },
    methods: {
        getNews() {
            getNewsListApi({ type: this.type }).then((res) => {
                this.news = res.data;
            });
        },
        jump(item) {
            this.$router.push({
                path: "/policy/info",
                query: { noticeId: item.noticeId },
            });
        },
        tolink(item) {
            this.$router.push('/news/info?type=' + item.noticeType + '&noticeId=' + item.noticeId);
        }
    },

    destroyed() { },
};
</script>
  
<style lang="scss" scoped>


::v-deep .van-nav-bar__title,::v-deep .van-nav-bar__text{
    font-size: 18px;
    color: #000;
	font-weight: 600;
}
::v-deep .van-nav-bar .van-icon{
    color: #626571;
}
::v-deep .van-icon-arrow-left:before{
    font-size: 18px;
}
::v-deep .van-nav-bar__left,::v-deep .van-nav-bar__right{
    font-size: 16px;
}
::v-deep .van-nav-bar {
position: fixed;width: 100%;top:0;
	//box-shadow: 0px 4px 8px 0px #9521230A;

}



.Operation {
     //margin-top:77px;
	 padding-top: 77px;
	 height: 100%;
	   position: relative;
	   overflow-y: auto;
	   width: 100%;
	   background: url('@/assets/photo/top2.webp') no-repeat top left;
	 //background-color: #a9ae8a;
	   background-size: 100% 168px;
    .van-nav-bar{
        background: $bg_liner_color_red;
    }
    .van-nav-bar__text{
        color: #ffffff;
    }
    .van-cell{
        // height: 55px;
        // line-height: 55px;
        padding: 0 12px 10px 12px;
		background-color: transparent !important;
		.van-cell__value {display:flex;flex-wrap: wrap;}
		.items {
			display: flex;
			width:50%;
			//grid-template-columns: repeat(2, 1fr);
		
			.item{
			width:100%;
			display: inline-block;
			height: 140px;
			text-align:center;
			font-size:16px;
			background-color:#fff;
			padding:20px 10px;
			margin:8px 6px;
			border-radius:10px;

			p {display: block;overflow: hidden;}
			p.tit {
				height: 40px; padding-top: 7px;
				font-weight: 600;
			}
			}
		}
    }
    .van-cell__title{
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
		
    }
	.time-bb {font-size: 13px;color:#ccc;}
    .custom-title {
        font-size: 14px;
        line-height: 20px;
		width: 80%;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		
    }
    .custom-title:nth-child(1) {
        margin-left: 0.2rem;
    }
    .custom-icon,.custom-right{
        line-height: 28px;
    }
    .peration-item-icon {
        margin-top: 0.3rem;
    }
    .peration-item-left-icon {
        margin-top: 0.4rem;
    }
}
</style>