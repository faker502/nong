<template>
    <div class="PolicyInfo">
        <nav-bar :title="'政策详情'" left-arrow @click-left="onClickLeft" titleColor='#313231' leftIconColor="#313231" class="nav-top"/>
		

		
        <div class="top-content" v-if='showTitle'>
            <p class="top-content-title">
                {{ info.noticeTitle }}
            </p>
            <span class="top-content-time" v-show="showTime">{{ info.createTime }}</span>
        </div>
		
		<div class="top-content" v-else>
		    <p class="top-content-title">
		       
		    </p>
		</div>
		
		
		<div class="download" v-show="showDown">
			<div class="w80">
				
				<div class="item">
					<img :src="info.app1" style="width:80%;" />	 
				</div>
				<div class="item">
					<img :src="info.app2" style="width:80%;" />	 
				</div>
				
				<div class="item">
					<van-button :url="info.h1" type="info">{{ info.t1 }}</van-button>	 
				</div>
				<div class="item">
					<van-button :url="info.h2" type="info">{{ info.t2 }}</van-button>	 
				</div>
				
			</div>
		</div>
		
		
		<!--video start-->
		<div class="top-body middle-video" v-show="vdo">
		  <div class="havelogin t_title_b df_c">		
		    <vue-plyr ref="plyr" :options="option">
		      <video :webkit-playsinline="true" :playsinline="true" :poster="poster">
		      </video>
		    </vue-plyr>
		  </div>
		</div>
		
		<div class="top-body middle-video" v-show="vdo2">
		  <div class="havelogin t_title_b df_c">		
			<vue-plyr ref="plyr2" :options="option">
			  <video :webkit-playsinline="true" :playsinline="true" :poster="poster" :src="mp4">
			  </video>
			</vue-plyr>
		  </div>
		</div>
		<!--video end-->
		
		

        <div class="content-info" :class="showTitle ? '' : 'mt-10'" id="page1" style='white-space: pre-wrap;text-align: justify' v-html="info.noticeContent"></div>
		
		<div class="copy_box" v-show="img != ''">
		   <!-- <van-button @click="downloadFile(info.img, title)" type="info">下载文件</van-button> -->	 		   
		   <van-button :url="info.img" type="info">下载文件</van-button>	 		   
		 </div>
		
    </div>
</template>
<script>
import { getNewsContentApi } from "@/api/article";
import Hls from 'hls.js';

export default {
    name: "PolicyInfo",
    data() {
        return {
            id: "",
            type: "",
            showTitle: false,
            info: {},
            title:'',
			img: '',
			vdo: false,
			vdo2: false,
			option: {
			  i18n: {
			    speed: '速度',
			    normal: '正常'
			  },
			  video: {}
			},
			poster: '',
			uri: '',
			mp4:'',
			showDown:0,
			showTime:0,
        };
    },
    mounted() {
		var pl = this.$refs.plyr.player;
		document.getElementById('page1').addEventListener("touchstart", function (event) {
			pl.pause();
		});
	},
    created() {
        this.id = this.$route.query.noticeId;
        this.getPolicyInfo();
    },

    methods: {
        //获取政策详情
        getPolicyInfo() {
            console.log(this.id);
            getNewsContentApi({ id: this.id }).then((res) => {
                this.info = res.data;
				this.img = this.info.img;
				this.showDown = res.data.showDown;
				
				this.poster = res.data.poster;
				this.uri = res.data.video;
				if (this.poster && this.uri) {
					if (this.uri.indexOf('.mp4') !== -1) {
						this.mp4 = this.uri;
						this.vdo2 = true;
					} else {
						this.hls();
						this.vdo = true;
					}					
					
				}
				
				//title
				this.type = this.info.noticeType;
				if (this.type == 2) {
				    this.title = '每日一习话';
					this.showTime = 1;
				} else if(this.type == 3) {
				    this.title = '新闻';
				} else if(this.type == 4) {
				    this.title = '公告';
				}else if(this.type == 5) {
				    this.title = '关于我们';
				} else if(this.type == 8) {
				    this.title = '相关文件';
				} else {
				    this.title = '';
				}
				if (this.type != 4) {
					this.showTitle = true;
				}
                // this.imgContent();
            });
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        homeSetting() { },
		
		hls() {
			var pll = this.$refs.plyr.player;
			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.loadSource(this.uri);
				hls.attachMedia(pll.media);
				window.hls = hls;
			}
		},  
 

		downloadFile(img,name) {
		  let image = new Image()
		  image.setAttribute('crossOrigin', 'anonymous')
		  image.src = img + '?' + new Date().getTime();
		  image.onload = () => {
			let canvas = document.createElement('canvas')
			canvas.width = image.width
			canvas.height = image.height
			let ctx = canvas.getContext('2d')
		   ctx.drawImage(image, 0, 0, image.width, image.height)
		   canvas.toBlob((blob) => {
			 let url = URL.createObjectURL(blob)
			 let eleLink = document.createElement('a');
			 eleLink.download = name
			 eleLink.href = url
			 eleLink.click()
			 eleLink.remove()
			 URL.revokeObjectURL(url)
		   })
		 }
	   },


    },
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
.PolicyInfo {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
//   background: url('@/assets/photo/top2.webp') no-repeat top left;
//background-color: #a9ae8a;
  background-size: 100% 168px;
  
	.middle-video {
		width: 95%;
		margin: 0 auto;
		background: #fff;
	}
}
::v-deep img{
  width: 100%;
}
.copy_box {
	width: 92%;
	margin: 0 auto;
    padding-bottom: 40px;	
}
::v-deep .van-button--info {
	background:  linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
	height: 36px;
	color:#fff;
	font-size:14px;
	font-weight: 500;
	width: 100%;
	border-radius: 4px;
	border:none;
}


.ql-editor .ql-size-huge {
    font-size: 2.5em;
}
.download {
	height: auto;
	width: 95%;
	display: block;
	background: #fff;
	margin: 0 auto;
	.w80 {
		width: 90%;
		display: grid;
		grid-template-columns:50% 50%;
		gap:10px;
		margin: 0 auto;
		.item {
			display: flex;
			align-items: flex-start;
			//border:1px solid #f00;
			margin-top: 10px;
			min-height: 45px;
			.van-button {
				border-radius: 4px;
				    color: #A7AF78;
				    font-size: 14px;
				    width: 100%;
				    margin: 0 auto;
				    height: 45px;
				    line-height: 45px;
				    letter-spacing: 0;
				    background: rgb(242, 243, 230);
				    border: 1px solid #b0be6b;
			}
		}
	}
	
}
.top-content {
    // width: 95%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
	// background: #fff;
	background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	margin: 0 auto;
	// margin-top: 44px;
	padding-top: 44px;
}

.top-content-title {
    width: 90%;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    margin: 20px auto;
    line-height: 30px;
}

.top-content-time {
    width: 90%;
    margin-top: 0.3rem;
    color: #848e9c;
	margin: -17px auto 30px auto;
    text-align: right;
}

.content-info {
    margin: 0 auto;
	margin-bottom: 20px;
    width: 95%;
    line-height:24px;
    font-size: 15px;
	// background: #fff;
	padding: 0 15px;
	box-sizing: border-box;
	//border:1px solid #f00;
    img {
        width: 100%;
        height: 100%;
    }
    p {
        line-height: 200%;
		border:1px solid #f00;
    }
	span {
		//text-align: right; 
		display:block;
	    //white-space: pre !important;
	}
}


.mt-10{
    margin-top:-40px !important;
}


</style>
<style>
	.content-info 	span {
		display:block;
	}
	.ql-size-small {
	    font-size: .75em !important;
		line-height: 200%;
	}
	
	.ql-size-large {
	     font-size: 1.5em !important;
		line-height: 200%;
	}
	
	.ql-size-huge {
	    font-size: 2.5em !important;
		line-height: 200%;
	}
	.ql-align-center{
	    text-align: center;
	}
</style>