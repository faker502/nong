<template>
  <div class="page">
    	
	<nav-bar title="" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>	
		
	<div class="top">
		<div class="user-logo">
			<img src="@/assets/photo/user-logo-tq.webp" style="height:50px;" />
		</div>
	</div>
	
    <div class="part1">
	 
      <div class="top-head">
		<div class="top-1">
			<div class="top-2">
				<img :src="portraitUrl" style="width:50px;height:50px;border-radius:50px;">
			</div>
			<div class="top-2" @click="$router.push('/lv-rule');">
				<div class="username">{{ user.name ? user.name : '---' }} <span class="level-txt">{{ user.levelText }}</span></div>
				<div class="user-phone">{{ user.phone }}</div>
			</div>			
		</div>
		<div class="top-1"></div>
      </div>
	 
      <div class="container df_c">
     
		<div class="m-grid">					
			<div class="m-flex">当前积分: </div> <div class="m-flex">{{ user.jf }}</div>
			<div class="m-flex">当前等级: </div> <div class="m-flex">{{ user.levelText }} <span class="right">{{ user.activeTxt }}</span></div>
			<div class="m-flex">每日签到: </div> <div class="m-flex">{{ user.curr.day }}元现金</div>	
			<div class="m-flex">邀请特权: </div> <div class="m-flex">{{ user.curr.invite ? user.curr.invite + '人' : '无' }} </div>
			<div class="m-flex">每月津贴: </div> <div class="m-flex">{{ user.curr.month > 0 ? user.curr.month + '现金' : '无' }} </div>
			<div class="m-flex">年终福利: </div> <div class="m-flex">{{ user.curr.year }}元现金 </div>
		</div>
		
		<div class="m-grid3" v-show="user.old != 5">	
			<div class="m-flex3">{{ user.tobe }}</div>
		</div>
		
		<div class="m-grid" v-show="user.old != 5">				
			<div class="m-flex">每日签到: </div> <div class="m-flex">{{ user.next.day }}元现金</div>
			<div class="m-flex">邀请特权: </div> <div class="m-flex">{{ user.next.invite ? user.next.invite + '人' : '无' }} </div>
			<div class="m-flex">每月津贴: </div> <div class="m-flex">{{ user.next.month > 0 ? user.next.month + '现金' : '无' }} </div>
			<div class="m-flex">年终福利: </div> <div class="m-flex">{{ user.next.year }}元现金 </div>

		</div>
		
		<div class="m-grid2" @click="$router.push('/share-rule');">
			
			<img src="@/assets/photo/kh.webp" style="width:100%">
			
		</div>
		
        <div class="part1-2 df_r" v-show="ifShow">


         <div class="copy_box">
            <div class="copy_item df_r">
              <div class="left">
                 <p>我的邀请码</p> 
                 <span>{{ shareCode }}</span>
              </div>
            </div>
          </div>


          <div class="code" @click="refresh">
            <div class="button">刷新邀请码</div>
          </div>

        </div>
		
		<div class="part2" style="margin-top:30px;" v-show="ifShow">
		  <div @click="handleCopyCode" class="button">复制邀请码</div>
		  <div @click="handleCopyLink" class="button" style="margin-top:20px">复制邀请链接</div>
		</div>
			
		
		<div class="part3" style="margin-top:30px;padding-bottom: 50px;" v-show="user.tips != ''">
		  <div @click="alertMsg" class="button">{{ user.tips }}</div>
		</div>


	
			
			
      </div>
    </div>
	
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VueQr from "vue-qr";
import { getCodeApi,refreshCodeApi } from "@/api/member.js";
import { getConfigKey } from "@/api/index";
export default {
  name: "Share",
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
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
	this.getConfig();
    this.getCode();
  },
  methods: {
	alertMsg() {
		this.$vantToast(this.user.alert);
	},  
    getCode() {
      getCodeApi().then((res) => {
        this.shareLink = res.data.extensionUrl;
        this.shareCode = res.data.code;
        this.num = res.data.num;
		this.ifShow = res.data.show;
		this.code = res.code;
		this.msg = res.msg;
		this.user = res.data.member;
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
  
	.top {
	  position: relative;
	  /*border:3px solid blue;*/
	  width: 100%;
	  height: 240px;
	  left: 0;
	  top: 0px;
	  background-image: url('@/assets/photo/top-bg.webp');
		//background-color: #a9ae8a;
	  background-size: 100% 100%;
		
		.user-logo {
			width: 100%;
			height: 50px;
			text-align: center;
			padding-top: 30px;
		}
	}
  
  .part1{
    position: relative;
    height: auto;
    left: 0;
    background: #FFFFFF;
	text-align: center;
	margin:0 auto;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	margin-top: -130px;
	width:95%;
	
	.top-head {
		
      position: relative;
      display: grid;
      grid-template-columns:65% 35%;
      text-align: center;
	  margin:0 auto ;;
	  height: 100px;
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
	  }
				
	  }
	
    .container {
      position: relative;
      top: calc(33%);
      display: block;
	  margin:0 0 3rem 0;
	  color:#3F3D38;
	  
	  .m-grid {
		  display: grid;
		  position: relative;
		  grid-template-columns:25% 75%;
		  grid-gap: 10px;
		  width:80%;
		  margin: 0 auto 0 auto;
		  
		  .m-flex {
			  display: flex;
			  //border: 1px solid #f00;
			  font-size: 16px;
			  font-weight: 400;
			  padding-top: 6px;
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
	  		  width:80%;
			  margin: 8px auto 10px auto;
	  		  
	  		  .m-flex3 {
	  			  display: flex;
	  			  font-size: 16px;
	  			  font-weight: 600;
	  			  padding-top: 12px;
	  		  }
	  		  
	  }
	  
	  
	  .m-grid2 {
		  margin: 30px auto 15px auto;
		  position: relative;
		  width:80%;	
	  		  
	  }
      
      .part1-2 {
		align-items: flex-start;
        margin-top: 1px;
        height: 100px;
        width: 80%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
		margin:10px auto -30px auto;
      }
      .copy_box {
        margin: 10px 0;
        .copy_item {
          .left {

            border-radius: 7px;
            width: auto;
            height: halfSize(64px);
            line-height: halfSize(64px);
            padding: 0px 5px;
            color: $font_color_dark;
            
			p {color:#626571; font-size:15px;margin:0;text-align: left;}
           
            span{
              font-size: 18px;
              color: #0E2529;
              font-weight: 600;
			  margin-top:0;display:block;
			  text-align: left;
            }
          }
        }
      }
      .code {
        margin-top:10px;
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
</style>
