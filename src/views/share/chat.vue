<template>
  <div class="page">
    <div class="part1">
     <nav-bar title="官方群聊" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
	 
	 
      <div class="container df_c">
     
        <div class="part1-2 df_c">
	

		  <div class="qr1">
			<div class="bbox">
				<div class="tit">{{ title1 }}</div>
				<div class="tips">扫码二维码参与</div>
			  <div class="code">
				<div>
				  <img :src="qr1" style="width:150px;height:150px;">
				</div>
			  </div>
			  </div>
			
			  
			  <div class="copy_box">
				 <van-button :url="qr1"  type="info">保存二维码</van-button>
				 
			   </div>
			</div>

         
			<div class="qr1">
			   <div class="bbox">
				   <div class="tit">{{ title2 }}</div>
				   <div class="tips">扫码二维码参与</div>
				   <div class="code">
					 <div>
					   <img :src="qr2" style="width:150px;height:150px;">
					 </div>
				   </div>
			   </div>
			   
			   
			   <div class="copy_box">
				  <van-button :url="qr2" :icon="require('@/assets/img/down.png')" type="info">保存二维码</van-button>
				  
				</div>
			</div>
		   
         
        </div>
      </div>
    </div>

    <div class="van-overlay" style="z-index: 2001;" v-show="0"></div>
  </div>
</template>
<script>
import { getChatApi } from "@/api/member.js";
export default {
  name: "Share",
  components: {},
  data() {
    return {
      qr1: '',
	  qr2: '',
	  title1: '',
	  title2: '',
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    getCode() {
      getChatApi().then((res) => {
        this.qr1 = res.data[0].img;
        this.title1 = res.data[0].noticeTitle;
		
		this.qr2 = res.data[1].img;
		this.title2 = res.data[1].noticeTitle;
      });
    },
	
	download1() {
		const a = document.createElement('a')
		a.download = this.title1
		a.href = this.$refs.qrCode1.$el.src
		a.click()            
	 },
	download2() {
		const a = document.createElement('a')
		a.download = this.title2
		a.href = this.$refs.qrCode2.$el.src
		a.click()            
	 },
	
	
  },
};
</script>

<style lang="scss" scoped>
.page {

  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  background: url('@/assets/photo/top2.webp') no-repeat top left;
//background-color: #a9ae8a;
  background-size: 100% 168px;

  .part1{
    position: relative;
    width: 100%;
    height: 100%;
	//background-image: url("@/assets/img/qr_bg.jpg") ;
	//background-size: 100% 100%;
    .container {
      position: relative;
      top: 0;
      display: block;
	  width: 95%;
	  margin: 0 auto;
	  margin-top: 80px;
	  
	  border-top-right-radius: 4px;
	  border-top-left-radius: 4px;
      
      .part1-2 {

        align-items: center;
        margin-top: 22px;
		text-align: center;
		::v-deep .van-button--info {
			//background:  linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
			height: 36px;
			//font-size:14px;
			//font-weight: 500;
			width: 95%;
			border-radius: 4px;
			
			color:#A7AF78;
			font-size: 16px;
			font-weight: 600;
			line-height: 22.4px;
			text-align: center;
			background: rgba(157, 164, 112, 0.12);
			border: 1.5px solid #D8DFB5;
			letter-spacing: 2px;
			
		}
		.qr1 {
			background: #fff;
			border-radius: 4px;
			width: 95%;
			margin: 0 auto;
			margin-bottom: 20px;
			.bbox {
				position: relative;
			  box-sizing: border-box;
			  //background: url('@/assets/photo/chat.webp') no-repeat #fff;
			  //background-size:100% 180px;
			  width: 95%;
			  height: 200px;
			  margin: 10px auto;
			  font-size: 14px;
			  padding: 0 14px;
			  color: #626571;
			  border-top-left-radius: 4px;
			  border-top-right-radius: 4px;
			  
			  display: grid;
			  grid-template-columns: 60% 40%;
			  
			  //border:1px solid #979494;
			  .tit {
				  position: relative;
				  width: 90%;
				  height: 27px;
				  left: 0;
				  top: 20px;
				  text-align: left;
				  
				  font-weight: 600;
				  font-size: 18px;
				  line-height: 27px;
				  
				  color: #0E2529;

			  }
			  .code {
				  position: absolute;
				  //border:#f00 1px solid;
				  width: 150px;
				  height: 150px;
				  top:0;
				  right:0;
				  img {			  
					//border: 1px solid #707070; 
					width:82px;
				  }
			  }
			  .tips {
				  position: absolute;
				  width: 110px;
				  height: 32px;
				  left: 15px;
				  top: 120px;
				  
				  color: #5F7376;
				  
				  font-size: 14px;
				  font-weight: 400;
				  line-height: 16.8px;
				  text-align: left;
			  }
			}
		}
      }
      .copy_box {
        margin: 10px auto 50px auto;
		//border:#f00 1px solid;
        width:95%;
      }
      .code {
		//border:#f00 1px solid;

        .tip {
          color: $font_color;
          font-size: 14px;
          justify-content: center;
        }
      }
    
    }
    .part2{
      width: 100%;
      text-align: center;
      img{
        width: 25px;
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
}
::v-deep .copy_box {
  .van-button {



  }
}
::v-deep .btns {
  .van-button {
    width: halfSize(369px);
    height: halfSize(80px);
    padding: 0;
    border: none;
    border-radius: halfSize(30px);
    font-size: 14px;
    color: $font_color_white !important;
  }
}
</style>
