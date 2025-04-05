<template>
  <div class="page">
    	
	<!-- <nav-bar title="" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>	 -->
		
	<div class="top">
		<div class="user-logo">
			<img src="@/assets/photo/user-logo.png" />
		</div>
	</div>
	
    <div class="part1">
	 
      <!-- <div class="top-head">
		<div class="top-1">
			<div class="top-2">
				<img :src="portraitUrl" style="width:50px;height:50px;border-radius:50px;">
			</div>
			<div class="top-2" @click="$router.push('/lva');">
				<div class="username">{{ user.name ? user.name : '---' }} <span class="level-txt">{{ user.levelText }}</span></div>
				<div class="user-phone">{{ user.phone }}</div>
			</div>	
			<div class="top-3">
				<div @click="ttt" class="button">特权邀请</div>
			</div>		
		</div>
		<div class="top-1"></div>
      </div>-->
	 
      <div class="container df_c">
     
	 
	 <!-- <div class="m-grid3" >
	 	<div class="m-flex3" @click="$router.push('/roll')">
			
			  <img  src="@/assets/photo/roll.webp" style="width:100%;height:150px;border-radius:5px;">
			
		</div>
	 </div>  -->
	 
	 
	 
<!-- 		<div class="m-grid">					
			<div class="m-flex">{{ data.curr }}</div>
			<div class="m-flex">{{ data.exp }}</div>

		</div> -->
		
		<!-- <div class="m-grid" style="margin-top: 20px;">					
			<div class="m-flex">{{ data.desc }}</div>
			<div class="m-flex">{{ data.today }}</div>

		</div> -->
		
		

		<h2>二维码</h2>
		
        <div class="part1-2 df_r" v-show="ifShow">
          <div class="code">
            <div @click="handleCopyQr" class="qr-code">
              <vue-qr
                :correctLevel="3"
                :autoColor="false"
                :text="shareLink"
                :size="180"
                :margin="5"
                :logoMargin="3"
              ></vue-qr>
            </div>
			<p>保存二维码图片</p>
          </div>

		   <div class="copy_box">
            <div class="copy_item df_r">
              <div class="left">
                 <p>与您的朋友分享此邀请码</p>
				 <div>
					 <span>{{ shareCode }}</span>
					 <strong @click="handleCopyCode"><van-icon name="records-o" color="#fff" size="18" /></strong>
				</div> 
                
              </div>
            </div>
          </div>

        </div>
		
		<!-- <div class="part2"  v-show="ifShow">
		  <div @click="handleCopyCode" class="button">复制邀请码</div>
		  <div @click="handleCopyLink" class="button" style="margin-top:20px">复制邀请链接</div>
		</div>
		
		<div class="part2"  v-show="data.buy">
		  <div @click="$router.push(data.buyUrl)" class="button">{{ data.buy }}</div>
		</div> -->
				
	
			
			
      </div>
    </div>

	<!-- 列表 -->
	<ul class="part1 list" style="margin-top: 20px;">
		<li v-for="item in 5" :key="item">
			<img src="@/assets/photo/team.png" alt="" class="list-left">
			<div class="list-right">
				<div class="list-top">
					<div class="list-top-left">
						<p>直推<strong>1</strong>人</p>
						<p>奖励<strong>10000</strong>元数字人民币</p>
					</div>
					<button :class="{'active': item == 1}">领取</button>
				</div>
				<div class="list-bottom">
					<p></p>
					<span>1/5</span>
				</div>
			</div>
		</li>
	</ul>
	
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VueQr from "vue-qr";
import { getCodeApi1,getPrizeApi } from "@/api/member.js";
import { getConfigKey } from "@/api/index";
import { Toast } from "vant";
export default {
  name: "Share",
  inject: ["getCC"],  
  components: {
    VueQr,
  },
  data() {
    return {
      shareCode: '',
	  ifShow: 0,
      shareLink: '1',
      num: 0,
	  img: require('@/assets/img/share/def.png'),
      showMask: false,   
	  code: 0,	
	  msg:'',	
	  portraitUrl: require('@/assets/photo/blank.jpg'),
	  user: {
		  'curr': {},
		  'next': {},
		  'old': {},
	  },
	  data : [],
	  buy: '',	
	  showTips:'加载中, 请稍后',
			
			
	//prize config start
	
	  blocks: [{ padding: '5px', background: '#adb392' }],
	  prizes: [
		{ fonts: [{ text: '未中奖', top: '10%',fontSize: '12px', fontColor: '#666' }], background: '#dee2c8' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '1', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#eee' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '30', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#dee2c8' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '50', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#eee' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '100', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#dee2c8'},
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '500', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#eee' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '1000', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#dee2c8' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '1500', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#eee' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '3000', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#dee2c8' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '5000', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#eee' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '7000', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#dee2c8' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '1万', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#eee' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '2万', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#dee2c8' },
		{ fonts: [{ text: '现金', top: '10%', fontSize: '12px', fontColor: '#666'  },{ text: '5万', top: '40%', fontSize: '12px', fontColor: '#333' },], background: '#eee' },
	  ],
		buttons: [
		  //{ radius: '40%', background: '#adb392' },
		  { radius: '35%', background: '#eee' },
		  {
			radius: '30%', background: '#b9bf98',
			pointer: true,
			fonts: [{ text: '抽奖', top: '-10px' }]
		  }
		],
	  
	  key:0,
	  tips:'',
	  award:'',
			
	//prize end		
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
	this.getConfig();
    this.getCode();
	this.getPrize(1);
	this.getCC();
  },
  methods: {
	  
	  //prize start
	  
	  // 点击抽奖按钮会触发star回调
	  startCallback () {
		
		if (this.tips != '') {
			Toast(this.tips);
			return;
		}
						
		this.getPrize(0);
		
		
	  },
	  // 抽奖结束会触发end回调
	  endCallback (prize) {
		console.log(prize);
		if (this.award != '') {
			this.$dialog({ message: this.award});
		}
	  },
	  
	  //prize end
	  
	alertMsg() {
		this.$vantToast(this.user.alert);
	},  
	ttt() {
		this.$dialog({ message: '特权邀请已关闭'});
	},
    getCode() {
      getCodeApi1().then((res) => {
        this.shareLink = res.data.extensionUrl;
        this.shareCode = res.data.code;
		this.ifShow = res.data.show;
		this.code = res.code;
		this.msg = res.msg;
		this.user = res.data.member;
		this.data = res.data;
		this.buy = res.data.buy;
		if (res.data.member.portraitUrl &&  res.data.member.portraitUrl.length > 10) {
			this.portraitUrl = res.data.member.portraitUrl;
		} else {
			this.portraitUrl = require('@/assets/img/my/def.png');
		}
      });
    },
	getConfig() {
	  getConfigKey({ 'key': 'endPreheatcle' }).then((res) => {
		if (res.data.uStatus && res.data.uStatus == 2) {
			this.showMask = true;
		}
	  });
	},
	
	showTip() {
		this.$dialog({  message: this.showTips});
	},
	
	getPrize(check) {
	  getPrizeApi({"check":check}).then((res) => {
		  if (check) {
			  if (res.code == 0) {
				  this.tips = res.msg;
				  this.showTips = res.data.showTips;
			  }
		  } else {
			 if (res.code == 200) {
				 this.$refs.myLucky.play()
			 	this.key = res.data.key;
				this.award = res.data.award;
			 	this.$refs.myLucky.stop(this.key)
			 } else {
			 	Toast(res.msg || '请重试')
			 } 
		  }
	  });
	},

	refresh() {
		refreshCodeApi().then((res) => {
			this.$vantToast(res.msg);
			if (res.code == 200) {
				this.shareCode = res.data.shareCode;
				this.shareLink = res.data.extensionUrl;
			}
		});
	},
    handleCopyCode() {
      this.$copyText(this.shareCode)
        .then(() => {
          this.$vantToast("复制成功");
        })
        .catch((err) => {
          this.$vantToast("复制失败");
        });
    },
    handleCopyLink() {
      this.$copyText(this.shareLink)
        .then(() => {
          this.$vantToast("复制成功");
        })
        .catch((err) => {
          this.$vantToast("复制失败");
        });
    },
    handleCopyQr() {
      //let link = this.shareUrl + "/reg/" + this.shareCode;
      let link = this.shareLink;
      this.$copyText(link)
        .then(() => {
          this.$vantToast("复制成功");
        })
        .catch((err) => {
          this.$vantToast("复制失败");
        });
    },
  },
};
</script>
<style>


	.i-mask {
	    position: absolute;
	    z-index: 1500;
	    /* background-color: rgba(255, 255, 255, 0); */
	    margin: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    min-height: 930px;
	    height: 100%;
	    width: 100%;
	}

</style>
<style lang="scss" scoped>

.page {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  
	.top {
	  position: relative;
	  /*border:3px solid blue;*/
	  width: 100%;
	  height: 196px;
	  left: 0;
	  top: 0px;
	  background-image: url('@/assets/photo/top-bg.png');
		//background-color: #a9ae8a;
	  background-size: 100% 100%;
		
		.user-logo {
			width: 121px;
			height: 44px;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			img {
				width: 100%;
			}
		}
	}
  
  .part1{
    position: relative;
    height: auto;
    left: 0;
    background: #FFFFFF6B;
    text-align: center;
    margin:0 auto;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin-top: -130px;
    width:95%;
	border-radius: 8px;
	
	.top-head {
		
      position: relative;
    //   display: grid;
    //   grid-template-columns:65% 35%;
      text-align: center;
	  margin:0 auto ;

	//   height: 100px;
	  .top-1 {
		  display: flex;
		      align-items: center;
			justify-content: center;
		  
		  .top-2 {
			  .level-txt {
			  	margin: 0 auto;
				display: inline-block;
			  	width: 52px;
			  	height: 19px;
			  	background: #FF8A00;
			  	backdrop-filter: blur(1px);
			  	border-radius: 2px;
			  	font-style: normal;
			  	font-weight: 500;
			  	font-size: 12px;
			  	line-height: 19px;
			  	text-align: center;
			  	color: #fff;											
			    margin-bottom: 5px;
			  }
			  .user-phone {font-size: 14px;padding-top: 6px;}
			  .username {
				  font-size: 18px;font-weight: 600;line-height: 24px;width: 140px;
			  }
		  }
		  .top-3 {
			  position: absolute;
			  right:20px;
			  top:20px;
			  line-height: 48px;
			  height: 48px;
			  width: 120px;
			  .button {
			    display: flex;
			    justify-content: center;
			    //border: 1px solid #ebedf0;
			    border-radius: 4px;
			    color: #A7AF78;
			    font-size: 15px;
			    width: 80%;
			    margin: 10px auto 0 auto;
			    height: 38px;
			    line-height: 38px;
			  	//background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
			  	letter-spacing: 1px;
			  		background: rgba(157, 164, 112, 0.12);
			  		border: 1.5px solid #AAB086;
			  }
		  }
	  }
				
	  }
	
    .container {
      position: relative;
      top: calc(33%);
      display: block;
	//   margin:0 0 3rem 0;
	  color:#3F3D38;
	  min-height: 400px;
	  padding: 12px;
	  h2 {
		font-size: 18px;
		font-weight: 600;
		color: #313231;
		margin-bottom: 10px;
		width: 100%;
		text-align: left;
		height: 40px;
		line-height: 40px;
	  }
	  .m-grid {
		  display: grid;
		  position: relative;
		  grid-template-columns:100%;
		  grid-gap: 10px;
		  width:80%;
		  margin: 0 auto 0 auto;
		  
		  .m-flex {
			  display: flex;
			  //border: 1px solid #f00;
			  font-size: 16px;
			  font-weight: 400;
			  padding-top: 16px;
			  .right {
				  position: absolute;
				  right: 50px;
			  }
		  }
		  
	  }
	  
	  .m-grid3 {
	  		  display: grid;
	  		  position: relative;
	  		  grid-template-columns:100%;
	  		  grid-gap: 10px;
			  margin: 0 auto 10px auto;
	  		  //border:1px solid #f00;
			  height:150px;
			  width: 90%;
	  		  .m-flex3 {
	  			  display: flex;
	  			  font-size: 16px;
	  			  font-weight: 600;
	  			  padding:0;
	  		  }
	  		  
	  }
	  
	  
	  .m-grid2 {
		  margin: 30px auto 15px auto;
		  position: relative;
		  width:80%;	
	  		  
	  }
      
      .part1-2 {
        margin:0 auto;
        // width: 80%;
        // display: block;
		position: relative;
		// display: grid;
		// grid-template-columns:50% 50%;
		display: flex;
		flex-direction: column!important;
		align-items: center;
        
		// margin:30px auto ;
      }
      .copy_box {
        // margin: 10px 0;
		margin-top: 40px;
		width: 100%;
        .copy_item {
			font-size: 13px;
			color: #6C6E6C;
			width: 100%;
          .left {
			display: flex;
			flex-direction: column;
            border-radius: 7px;
            width: auto;
            height: halfSize(64px);
            line-height: halfSize(64px);
            padding: 0px 5px;
            color: $font_color_dark;
			width: 100%;
			div {
				background: #fff;
				height: 40px!important;
				flex: 1;
				border-radius: 8px;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 4px 12px;
				box-sizing: border-box;
				span{
					font-size: 18px;
					color: #313231;
					font-weight: 600;
					margin-top:0;display:block;
					text-align: left;
				}
				strong {
					width: 24px;
					height: 24px;
					background: #4B594A;
					border-radius: 5px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
            
			p {color:#626571; font-size:15px;margin-bottom:8px;text-align: left;}
           
            
          }
        }
      }
      .code {
        margin-top:12px;
		.qr-code {
			width: 180px;
			height: 180px;
			border-radius: 8px;
			background: #fff;
			overflow: hidden;
		}
		p {
			width: 180px;
			height: 40px;
			font-size: 16px;
			color: #fff;
			// margin-top: 10px;
			line-height: 40px;
			background: linear-gradient(180deg, #7E963C 0%, #455117 100%);
			font-weight: 500;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}
        .button {
          display: flex;
          justify-content: center;
          border: 1px solid #ebedf0;
          border-radius: 4px;
          color: #333;
          font-size: 15px;
          margin: 10px auto 0 auto;
          height: 38px;
          line-height: 38px;
        		//background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
				width: 150px;

				letter-spacing: 2px;
        }
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
	  padding: 20px 0 100px 0;
	  margin: 30px auto;
      img{
        width: 25px;
        vertical-align: middle;
        margin-right: 6px;
      }
	  .button {
	    display: flex;
	    justify-content: center;
	    //border: 1px solid #ebedf0;
	    border-radius: 4px;
	    color: #A7AF78;
	    font-size: 15px;
	    width: 80%;
	    margin: 10px auto 0 auto;
	    height: 38px;
	    line-height: 38px;
		//background: linear-gradient(180deg, #dbe1ba 0%, #a8ad89 100%);
		//background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
		letter-spacing: 2px;
		
		background: rgba(157, 164, 112, 0.12);
		border: 1.5px solid #AAB086;
	  }
    }
  }
  
  .part3 {
	  width: 100%;
	  text-align: center;
	  img{
	    width: 25px;
	    vertical-align: middle;
	    margin-right: 6px;
	  }
	  .button {
	    display: flex;
	    justify-content: center;
	    //border: 1px solid #ebedf0;
	    border-radius: 4px;
	    color: #A7AF78;
	    font-size: 15px;
	    width: 80%;
	    margin: 10px auto 0 auto;
	    height: 38px;
	    line-height: 38px;
	  	//background: linear-gradient(180deg, #fcfcfc 0%, #ebedf0 100%);
	  	letter-spacing: 1px;
		background: rgba(157, 164, 112, 0.12);
		border: 1.5px solid #AAB086;
	  }
  }
  
}
::v-deep .copy_box {
  .van-button {
    width: halfSize(201px);
    height: halfSize(80px);
    padding: 0;
    border: none;
    border-radius: halfSize(30px);
    font-size: 14px;
    color: $font_color_white !important;
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

.list {
	background: transparent;
	padding-bottom: 30px;
	li {
		display: flex;
		padding: 12px;
		margin-bottom: 10px;
		background: #fff;
		border-radius: 8px;
		.list-left {
			width: 40px;
			height: 40px;
			overflow: hidden;
			flex-shrink: 0;
			margin-right: 10px;
		}
		.list-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			.list-top {
				display: flex;
				justify-content: space-between;
				.list-top-left {
					display: flex;
					flex-direction: column;
					p {
						text-align: left;
						font-size: 15px;
						color:#6C6E6C;
						line-height: 20px;
						strong {
							font-weight: 600;
							color: #313231;
						}
					}
				}
				button {
					width: 62px;
					height: 26px;
					border-radius: 20px;
					background: #BEC0BD;
					color: #fff;
					font-size: 12px;
					border: none;
					outline: none;
					&.active {
						background: #4B594A;
					}
				}
			}
			.list-bottom {
				width: 100%;
				height: 16px;
				background: #F5F5F5;
				border-radius: 8px;
				margin-top: 6px;
				position: relative;
				p {
					width: 100%;
					background: radial-gradient(100% 125.11% at 0% 50%, #CD9D00 0%, #FFE591 100%);
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					border-radius: 8px;
				}
				span {
					font-size: 11px;
					display: flex;
					line-height: 16px;
					height: 100%;
					position: absolute;
					right: 10px;
					z-index: 1;
					color: #6C6E6C;
				}
			}
		}
	}
}
</style>
