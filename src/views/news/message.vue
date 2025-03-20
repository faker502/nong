<template>
    <div class="Operation" >
        <!-- van-icon-question -->
        <van-nav-bar title="站内信" left-text="" left-arrow @click-left="$router.go(-1)"/>
        




		

		
		<van-cell-group inset class="peration-item" >
		
		
		<div class="main" >
		    <div class="list-it" v-for="(item, key) in news" :key="key" @click="$router.push('/message/detail?id=' + item.id)">
		        
				<div class="item">
					<img src="@/assets/img/mail.webp" style="width:30px;height:30px;padding-top: 10px;">
				</div>
				<div class="item">
				   <div class="title">
					   <el-badge is-dot class="iii" :hidden="item.hidden">
							{{ item.noticeTitle }}
						</el-badge>	
				   </div>
				   <div class="time-bb">{{ item.createTime }}</div>
				</div>
				
		    </div>
		</div>
		
		
		</van-cell-group>

  
    </div>
</template>
<script>
import { getNewsListApi } from "@/api/message";
export default {
    name: "NewsClass",
    data() {
        return {
            news: [],
            title: '常见问题',
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
			console.log('tolink');
            this.$router.push('/message/detail?id=' + item.id);
        }
    },

    //destroyed() { },
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



.Operation {
     margin-top:77px;
	 
    .van-nav-bar{
        background: $bg_liner_color_red;
    }
    .van-nav-bar__text{
        color: #ffffff;
    }
	.main {
		z-index: 999;
		width: 95%;
		margin: 0 auto;
		box-sizing: border-box;
		
		font-size: 15px;
		line-height: 30px;
		color:#666;
		.list-it {
			display:grid;
			grid-template-columns: 40px auto;
			padding: 15px;

		
			background: #fff;
			border-bottom: rgba(52,52,52, .1)  1px solid;
			.item {
				display: flex;
				flex-direction: column;
				.title {
					font-size: 15px;
					line-height: 30px;
					//max-height: 65px;
					overflow:visible;
					.iii {
						 margin-top: 0;
						  margin-right: 0;
						  box-sizing: border-box;
					}
				}
				
			}
			&:last-child {
				border-bottom:none;
			}
		}
	}
	
	
    .van-cell{
        // height: 55px;
        // line-height: 55px;
        padding: 14px 12px 10px 12px;
		background-color: transparent !important;
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
	.time-bb {font-size: 12px;color:#ccc;}
    .custom-title {
        font-size: 14px;
        line-height: 20px;
		width: 100%;
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