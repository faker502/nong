<template>
    <div class="PolicyInfo">
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
        <div class="top-content">
            <p class="top-content-title">
                {{ info && info.noticeTitle }}
            </p>
            <span class="top-content-time">{{ info.createTime }}</span>
        </div>

        <div class="content-info" style='white-space: pre-wrap;text-align: justify' v-html="info && info.noticeContent"></div>
		

		
    </div>
</template>
<script>
import { getNewsContentApi } from "@/api/message";

export default {
    name: "PolicyInfo",
    data() {
        return {
            id: "",
            info: {},
            title:'站内信',
        };
    },
    mounted() {},
    created() {
        this.id = this.$route.query.id;
        this.getPolicyInfo();
    },

    methods: {
        //获取政策详情
        getPolicyInfo() {
            console.log(this.id);
            getNewsContentApi({ id: this.id }).then((res) => {
                this.info = res.data;
            });
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        homeSetting() { },
		
 

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
.PolicyInfo {
    position: absolute;
    width: 100%;
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
.van-nav-bar {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: $bg_liner_color_red;
}
.van-nav-bar__title{
    font-size:18px;
}
.van-nav-bar__left{
    font-size: 16px;
}
::v-deep .van-nav-bar__title,::v-deep .van-nav-bar__text{
    font-size: 18px;
}
::v-deep .van-nav-bar .van-icon{
}
::v-deep .van-icon-arrow-left:before{
    font-size: 18px;
}
.ql-editor .ql-size-huge {
    font-size: 2.5em;
}
.top-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 80px;
	background: #fff;
}

.top-content-title {
    width: 90%;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    margin: 15px auto;
    line-height: 30px;
}

.top-content-time {
    width: 90%;
    margin-top: 0.3rem;
    color: #848e9c;
    margin: 5px auto 15px auto;
	text-align: right;
}

.content-info {
    margin: 0 auto 10px auto;
    width: 85%;
    line-height:180%;
    font-size: 15px;
    padding-bottom: 10px;
	background: #fff;
    img {
        width: 100%;
        height: 100%;
    }
    p {
        line-height: 200%;
    }
}
.mt-70{
    margin-top:70px;
}

</style>
<style>
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