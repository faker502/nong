<template>
  <div class="page">
	<div class="part_top"></div>
    <div class="part1">
      <nav-bar
        title="官方群聊"
        titleColor="#313231"
        leftIconColor="#313231"
        class="nav-top"
      />

      <div class="container df_c">
        <div class="part1-2 df_c">
          <div class="qr1">
            <div class="bbox">
              <div class="tit">{{ title1 }}
				<p>了解更多助农项目详情</p>
			  </div>
              <div class="code">
				<div class="tips">扫码二维码参与</div>
                <div class="img_box">
                  <img :src="qr1" style="width: 96px; height: 96px" />
                </div>
              </div>
            </div>

            <div class="copy_box">
              <van-button :url="qr1" type="info">保存二维码</van-button>
            </div>
          </div>

          <div class="qr1">
            <div class="bbox">
              <div class="tit">{{ title2 }}<p>了解更多助农项目详情</p></div>
              
              <div class="code">
				<div class="tips">扫码二维码参与</div>
                <div class="img_box">
                  <img :src="qr2" style="width: 96px; height: 96px" />
                </div>
              </div>
            </div>

            <div class="copy_box">
              <van-button
                :url="qr2"
               
                type="info"
                >保存二维码</van-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="van-overlay" style="z-index: 2001" v-show="0"></div>
  </div>
</template>
<script>
import { getChatApi } from "@/api/member.js";
export default {
  name: "Share",
  components: {},
  data() {
    return {
      qr1: "",
      qr2: "",
      title1: "",
      title2: "",
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

    download1() {
      const a = document.createElement("a");
      a.download = this.title1;
      a.href = this.$refs.qrCode1.$el.src;
      a.click();
    },
    download2() {
      const a = document.createElement("a");
      a.download = this.title2;
      a.href = this.$refs.qrCode2.$el.src;
      a.click();
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
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
//   background: url("@/assets/photo/top2.webp") no-repeat top left;
  //background-color: #a9ae8a;
  background-size: 100% 168px;
  .part_top {
    width: 100%;
    height: 168px;
    // background: url("@/assets/photo/top2.webp") no-repeat top left;
	background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
    // border: 1px solid blue;

  }
  .part1 {
    position: relative;
    width: 100%;
    // height: 100%;
	margin-top: -168px;
	
    //background-image: url("@/assets/img/qr_bg.jpg") ;
    //background-size: 100% 100%;
    .container {
      position: relative;
      top: 0;
      display: block;
      width: 95%;
      margin: 0 auto;
      margin-top: 60px;

      border-top-right-radius: 4px;
      border-top-left-radius: 4px;

      .part1-2 {
        align-items: center;
        // margin-top: 22px;
        text-align: center;
        ::v-deep .van-button--info {
 
          height: 40px;

          width: 95%;
          border-radius: 30px;

          color: #fff;
          font-size: 16px;
          font-weight: 600;
          line-height: 22.4px;
          text-align: center;
		  background: #4B594A;

		border: none;
        //   letter-spacing: 2px;
        }
        .qr1 {
        //   background: #fff;
		  background: #FFFFFF6B;

          border-radius: 4px;
          width: 95%;
		  height: 253px;
          margin: 0 auto;
          margin-bottom: 20px;
		 
          .bbox {
            position: relative;
            box-sizing: border-box;
            //background: url('@/assets/photo/chat.webp') no-repeat #fff;
            //background-size:100% 180px;
            width: 100%;
            height: 161px;
			// border: 1px solid red;
            // margin: 10px auto;
            font-size: 14px;
            padding: 12px;
            color: #626571;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
			 background: url('@/assets/photo/chat_bg.png') no-repeat center top;
		  background-size: 100%;

            display: grid;
            grid-template-columns: 60% 40%;

            //border:1px solid #979494;
            .tit {
            //   position: relative;
            //   width: 90%;
            //   height: 27px;
            //   left: 0;
            //   top: 20px;
              text-align: left;

            //   font-weight: 600;
              font-size: 12px;
              line-height: 27px;
			  p	{
				font-size: 16px;
				font-weight: 600;
				color: #4B594A;
			  }

              color: #313231;
            }
            .code {
            //   position: absolute;
              //border:#f00 1px solid;
			  box-sizing: border-box;
			  display: flex;
			  flex-direction: column;
			  align-items: center;
			  justify-content: center;
			 .img_box{
				width: 112px;
				height: 112px;
				border-radius:8px;
				box-sizing: border-box;
				// border: 1px solid #4B594A;
				//   background: #F2F6D4;
				background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);
				padding: 8px;
				img {
					width: 82px;
				}
			 }
            }
            .tips {
            //   position: absolute;
            //   width: 110px;
            //   height: 32px;
            //   left: 15px;
            //   top: 120px;

              color: #6C6E6C;

              font-size: 13px;
              font-weight: 400;
              line-height: 20px;
              text-align: center;
            }
          }
        }
      }
      .copy_box {
        // margin: 10px auto 50px auto;
		margin-top: 40px;
        //border:#f00 1px solid;
        width: 100%;
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
    .part2 {
      width: 100%;
      text-align: center;
      img {
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
