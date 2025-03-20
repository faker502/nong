
  
<template>
    <div class="Operation" >
        <!-- van-icon-question -->
        <van-nav-bar :title="title" left-text="" left-arrow @click-left="$router.go(-1)"/>
        

        <div v-if="type == -1 || type == 8 || type == 9 || type == 12 || type == 13 || type == 14">





         <!-- <div v-for="(item, key) in news" :key="key"  >-->
          

            <van-cell style="margin-top:-15px">
                 <div class="items" v-for="(item, key) in news"   @click="tolink(item)" is-link>
                      <div class="item">
						<img :src="item.img" style="width:100%;" />
                        <p class="tit">{{ item.noticeTitle }}</p>
                       
                    </div>

                </div>

              </van-cell>
    
              
          <!--</div>-->


        </div>
        <div v-else>
        <van-cell-group inset class="peration-item" style="margin-top: 50px;margin-bottom: 30px;">
            <van-cell title="" v-for="(item, key) in news" :key="key" @click="tolink(item)" is-link >
                <template #title>
                    <span class="custom-title">
                      {{ item.noticeTitle }} 
                    </span>
                </template>

<!--                <template #right-icon>
					<span class="time-bb">{{ item.createTime | substr }} &rsaquo;</span>                    
                </template> -->
            </van-cell>
        </van-cell-group>
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
            title: '政策文件',
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
        if (this.$route.query.type != undefined) {
            if (this.$route.query.type == 'all') {
                this.type = this.$route.query.type;
            } else {
                this.type = parseInt(this.$route.query.type);
            } 
        }
        this.getNews();
        if (this.type == 2) {
            this.title = '每日一习话';
        } else if(this.type == 3) {
            this.title = '新闻';
        } else if(this.type == 4) {
            this.title = '公告';
        }else if(this.type == 5) {
            this.title = '关于我们';
        }else if(this.type == 8) {
            this.title = '政策文件';
        } else {
            this.title = '政策文件';
        }
    },
    methods: {
        getNews() {
            getNewsListApi({ type: this.type }).then((res) => {
                this.news = res.data.data;
            });
        },
        jump(item) {
            this.$router.push({
                path: "/policy/info",
                query: { noticeId: item.noticeId },
            });
        },
        tolink(item) {
            this.$router.push('/news/info?noticeId=' + item.noticeId);
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
	box-shadow: 0px 4px 8px 0px #9521230A;
	

}
::v-deep .van-nav-bar__content {
	background-color: #fff;
}



.Operation {
     margin-top:77px;
	 padding-bottom: 50px;
    .van-nav-bar{
        background: $bg_liner_color_red;
    }
    .van-nav-bar__text{
        color: #ffffff;
    }
    .van-cell{
        // height: 55px;
        // line-height: 55px;
        padding: 14px 12px 10px 12px;
		// background-color: transparent !important;
		background-color: #f5f6f1;
		.van-cell__value {display:flex;flex-wrap: wrap;}
		.items {
			display:flex;
			width: 50%;
		
			.item{
				width:100%;
				display: inline-block;
				height: 185px;
				text-align:center;
				font-size:13px;
				background-color:#fff;
				padding:20px 10px;
				margin:8px 6px;
				border-radius:10px;			

				p.tit {
					height:80px;
					display: block;
					line-height:20px;
					overflow: hidden;
					font-weight: 600;
				}
			
			}
		}
    }
    .van-cell__title{
        line-height: 20px;
		
    }
	.time-bb {font-size: 13px;color:#ccc;}
    .custom-title {
        font-size: 14px;
        line-height: 20px;
		width: 80%;
		display: inline-block;

		
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
	.van-icon-question {
		color:#ccc !important;
	}
}
</style>