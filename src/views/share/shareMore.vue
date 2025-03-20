<template>
  <div class="page">
    <!-- van-icon van-icon-arrow-left -->
    <div class="part1">
	 
	 <div class="top-head" @click="$router.push({ path: '/share' })">
	 </div>
	 
      <div class="container df_c">
     

        <div class="part1-2 df_r" v-show="shareCode">





          <div class="code">
            <div @click="handleCopyQr">
			   <vue-qr
				 :correctLevel="3"
				 :autoColor="false"
				 :text="shareLink"
				 :size="190"
				 :margin="5"
				 :logoMargin="3"
			   ></vue-qr>
            </div>
          </div>
		  
		  
		  <div class="copy_box">
		     <div class="copy_item df_r">
		       <div class="left">
		          <p>我的邀请码</p> 
		          <span>{{ shareCode }}</span>
		       </div>
		     </div>
		   </div>

        </div>
		
		<div class="part2" v-if="shareCode">
		  <div @click="handleCopyCode" class="button">复制邀请码</div>
		  <div @click="handleCopyLink" class="button" style="margin-top:20px">复制邀请连接</div>
		</div>
			
		
		<div class="part2" style="margin-top:50px;padding-bottom: 50px;" v-if="!shareLink">
			<div style="font-size:14px;color:#626571">激活账号才能邀请好友</div>
		  <div @click="$router.push({ path: '/project' })" style="margin-top:40px" class="button">立即激活账号</div>
		</div>


	
			
			
      </div>
    </div>

    <div class="van-overlay" style="z-index: 2001;" v-show="isInvite == false"></div>
	
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VueQr from "vue-qr";
import { getCodeApi } from "@/api/member.js";
export default {
  name: "Share",
  components: {
    VueQr,
  },
  data() {
    return {
      shareCode: '',
      shareLink: '1',
      num: 0,
      isInvite: false,
	  img: require('@/assets/img/share/def.png'),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCodeApi().then((res) => {
        this.isInvite = res.data.isInvite;
        //this.isInvite = true;
        if (this.isInvite == false) {
          this.$router.push('/share/explain');
          return false;
        }
        this.shareLink = res.data.extensionUrl;
        this.shareCode = res.data.code;
        this.num = res.data.num;
		if (this.shareCode) {
			this.img = require('@/assets/img/share/ok.webp');
		} else {
			this.img = require('@/assets/img/share/no.webp');
		}
        //if (res.data.level == undefined || res.data.level == 0) {
        //  this.inviter = false;
        //}
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
	body {
		overflow-x: hidden !important;
	}
</style>
<style lang="scss" scoped>

.page {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  .part1{
     border:1px solid #fff;
    position: relative;
    width: 100%;
    height: auto;
    background-size: 100% 100%;
	background: #fff;
	
	.top-head {
	
	  //background-color:#fff;
	  /*background-image: url("@/assets/img/index/top-background.png");*/
	
	  background-image: url("@/assets/img/logo-top-alt.png");
	  // background-image: url("@/assets/img/index/logo.png"),url("@/assets/img/index/top-background.png");
	  background-position: center 80%, center bottom ;
	  background-repeat: no-repeat, no-repeat;
	  background-size:  160px auto,100% 100%;
	
	  position: relative;
	  width: 100%;
	  height: 80px;
	  left: 0;
	  top: 0;
	  /*background-size: 100% 100%;*/
	  //filter: drop-shadow(0px 4px 12px rgba(10, 74, 118, 0.16));
	  display: inline-block;
	  vertical-align: middle;
				
	  }
	
    .container {
      position: relative;
      top: calc(33%);
      display: block;
	  margin:0 0 3rem 0;
      
      .part1-2 {
        height: 300px;
        width: 90%;
        display: flex;
        justify-content: center;
		margin:60px auto 0 auto;
		align-items: center;
		flex-direction: column;
      }
      .copy_box {
        margin: 10px 0;
        .copy_item {
          .left {

            border-radius: 7px;
            width: 100px;
            height: halfSize(64px);
            line-height: halfSize(64px);
            padding: 0px 5px;
            color: $font_color_dark;
            
			p {color:#626571; font-size:15px;margin:0;text-align: left;}
           
            span{
              font-size: 18px;
              color: #D11A2D;
              font-weight: 600;
			  margin-top:0;display:block;
			  text-align: left;

            }
          }
        }
      }
      .code {
        margin-top:10px;
        img {

          border: 1px solid #707070; 
          margin-bottom:20px;
          width:180px;
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
	  margin-top: 60px;
      img{
        width: 25px;
        vertical-align: middle;
        margin-right: 6px;
      }
	  .button {
	    display: flex;
	    justify-content: center;
	    border: 1px solid #ffffff;
	    border-radius: 4px;
	    color: #ffffff;
	    font-size: 15px;
	    width: 80%;
	    margin: 10px auto 0 auto;
	    height: 38px;
	    line-height: 38px;
		background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
	  }
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
