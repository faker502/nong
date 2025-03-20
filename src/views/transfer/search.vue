<template>
  <div class="page">
    <nav-bar title="转账" right='转账记录'  @handleRight="$router.push('/record_transfer')" style="position: absolute;"/>
    <div class="part_1">

    </div>

    <div class="page1">
      <div class="search">
        <van-field
          v-model="phone"
          placeholder="请输入对方手机号或选择最近转账"
          autosize
          autocomplete="off"
          :border="false"
          left-icon="search"
        >
        </van-field>
      </div>
      <div class="history-title">
        最近转账
      </div>
      <van-cell-group inset class="peration-item" v-if="list.length > 0">
        <van-cell class="van-content-cell" :class="isSelect == key ? 'active': ''" v-for="(item, key) in list" :key="key" @click="select(key,item.inPhone)">
          <template #title>
            <span class="custom-title">
              {{ item.type }} - {{ item.name }} 
            </span>
			<span class="custom-time">
				{{ item.createTime }}
			</span>
          </template>
          <template #right-icon>
            <span class="custom-right">
              {{ item.money }}<br>
			  <span class="custom-time2">已到账</span>
            </span>
			
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="peration-item2" v-else>
          <template>
            <img :src="require('@/assets/img/no-record.png')" width="100%">
          </template>
          <div style="font-size:16px;color: #BDC3CD;">暂时没有转账记录</div>
      </van-cell-group>
      <div class="bottom-button">
        <div class="button" @click="next">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { getUserApi, transferApi, getByPhone } from "@/api/member";
export default {
  name: 'projectList',
  components: {},
  data() {
    return {
      phone: '',
      info: [],
      list: [],
      isSelect: undefined
    };
  },
  created() {
    this.getUserInfo();
    this.getTransfer();
  },
  methods: {
    ...mapActions(["FrontLogOut"]),
    getUserInfo() {
      getUserApi().then((res) => {
        this.info = res.data;
		if (this.info.payPassword == '' || this.info.payPassword == null) {
			this.$dialog({ message: '转账前请先设置支付密码', className: 'dialog-error' });
			this.$router.push('/set/set_pwd');
		}
      });
    },
    getTransfer() {
      transferApi().then((res) => {
        this.list = res.data;
      });
    },
    select(i,phone) { 
      this.isSelect = i;
      this.phone = phone;
    },
    next() { 
      if (this.phone == '') {
        this.$dialog({ message: '请输入对方手机号', className: 'dialog-error' });
        return false;
      } else { 
		getByPhone({phone:this.phone}).then((res) => {
		  if (res.code != 200) {
		  	this.$dialog({ message: '用户手机号不存在', className: 'dialog-error' });
			return false;
		  }	else {
			  this.$router.push({ path: '/transfer', query: { phone: this.phone } });
		  }
		});  
        return false;
      } 
    },
    tolink(item) {
      if (item == 'phone') {
        this.$dialog({ message: '您的手机号码是' + this.info.phone, className: 'dialog-error' });
        return false;
      } else if (item == 'passwd') {
        this.$dialog({ message: '为了您的资金安全修改密码请联系在线客服！', className: 'dialog-error' });
        return false;
      } else if (item == 'paypwd') {
        if (this.info.payPassword == '' || this.info.payPassword == null) {
          this.$router.push('/set/set_pwd');
        } else {
          this.$dialog({ message: '为了您的资金安全修改支付密码请联系在线客服！', className: 'dialog-error' });
        }
        return false;
      }
    },
    loginOut() {
      this.FrontLogOut();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
	.page {
	  height: 100%;
	  position: relative;
	  overflow-y: auto;
	  
	  .navbar{
	    background: $bg_liner_color_touming;
	    color: #000;
		::v-deep .navbar-right {font-weight: normal;font-size: 14px;}
	  }	  
	  .part_1 {
	    background: $bg_liner_color_red;
	    height: halfSize(130px);
	    .amount_box {
	      background: $bg_color;
	      border-radius: 7px;
	      height: halfSize(266px);
	      box-shadow: 0px 1px 3px #00000029;
	      padding: 15px 10px;
	      .a_title {
	        color: $font_color;
	        font-size: 16px;
	      }
	      .a_text {
	        color: $font_color7;
	        line-height: 2;
	      }
	    }
	  }
	  .part_2 {
	    background: #ffffff;
	    padding: 30px 15px;
	    border-radius: 20px;
	    .mt_40{
	      margin-top: 40px;
	    }
	    .amount_box{
	      font-size:18px;
	      .a_text {
	        font-size: 15px;
	        span{
	          display: inline-block;
	          width: 50%;
	        } 
	        span:nth-child(2){
	          text-align: right;
	        }
	      }
	    }
	    .method_box {
	      font-size: 18px;
	      .m_title {
	        font-size: 17px;
	        color: $font_color;
	        // font-weight: 600;
	        padding-left: 10px;
	      }
	      .m_item {
	        margin-top: 20px;
	        display: grid;
	        grid-template-columns: repeat(3, 1fr);
	        grid-gap: 4px;
	      }
	      .m_item_box{
	        display: grid;
	        grid-template-columns: repeat(3,1fr);
	        grid-gap: 18px;
	        width: 90%;
	        margin: 0 auto;
	      }
	      .money-select{
	        .money-grid{
	          display: grid;
	          grid-template-columns: repeat(3,1fr);
	          grid-gap: 18px;
	          width: 100%;
	          margin: 0 auto;
	          > div {
	            // background: #ebedf0;
	            text-align: center;
	            //line-height: 50px;
	            padding: 12px 0;
	            border-radius: 5px;
	            font-size: 18px;
	            font-weight: 500;
	            border: 1px solid #EDEDF1;
	          }
	          .between{
	            padding: 12px 0;
	          }
	          .money-on{
	            background: url('@/assets/img/selected.png');
	            background-size: 100% 100%;
	            color: #AC2023;
	            border:none;
	          }
	        }
	      }
	      ::v-deep .van-cell{
	        margin-top: 20px;
	        font-size: 18px;
	        border-bottom: 1px solid #E0E1E5;
	      }
	      ::v-deep .van-field__label{
	        width: 16px;
	        font-weight: 600;
	      }
	    }
	    .btns {
	      margin-top: 50px;
	      align-items: center;
	    }
	  }
	}
	::v-deep .amount_box {
	  .van-cell {
	    font-size: 16px;
	    padding: 0;
	    background-color: transparent;
	    border-bottom: 1px solid $border_color_g;
	  }
	  .van-field__body {
	    height: halfSize(60px);
	  }
	  .van-field__label {
	    width: 20px;
	    color: #AC2023;
	    font-size: 16px;
	    font-weight: bold;
	    margin: 8px 8px 8px 0;
	  }
	
	  input.van-field__control {
	    color: #AC2023;
	    height: 100%;
	    font-size: 24px;
	  }
	}
	  ::v-deep input.van-field__control::-webkit-input-placeholder {
	    color: #7C7C7C !important;
	    font-size: 20px;
	    //font-weight: 600;
	  }
	::v-deep .btns {
	  .van-button {
	    width: halfSize(496px);
	    height: 45px;
	    padding: 0;
	    border: none;
	    border-radius: 20px;
	    font-size: 15px;
	  }
	}
	
	
.page {
  

  .page1 {
    width: 96%;
    margin: 0 auto;
    background-color: #ffffff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
    overflow-x: hidden;
    margin-top: 10px;
    padding-bottom: 60px;

    ::v-deep .search {
      margin: 24px 20px;
      border: 1px solid #C7C7C7;
      border-radius: 10px;
      .van-cell {
        font-size: 13px;
        padding: 0;
        border-radius: 9px;
        height: halfSize(90px);
        line-height: halfSize(90px);
      }
      .van-field__control::placeholder{
        font-size: 15px;
        color: #929292;
      }

      .van-field__body {
        height: halfSize(90px);
        font-size: 20px;
        input.van-field__control::-webkit-input-placeholder,input.van-field__control::placeholder{
          font-size: 16px;
          color: #929292;;
        }
      }
      .van-field__left-icon {
        padding-left: 10px;

        .van-icon {
          font-size: 22px;
          color: #adadad;
        }
      }
    }
    .history-title{
      margin: 10px 25px 10px;
      font-size: 17px;
      color: #979797;
    }
    .active{
      background-color: #EDF4FC;
      border-radius: 10px;
    }
    .van-content-cell {
      .img-icon {
        width: 50px;
        line-height: 40px;
		font-size: 17px;
      }

      img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
        border-radius: 6px;
      }
      .van-cell__title {

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .custom-title {
        font-size: 14px;
        line-height: 20px;
		display: block;
      }
	  .custom-time {
		  font-size: 12px;
		  color:#ccc;
		  line-height: 13px;
	  }
      .custom-icon,
      .custom-right {
        line-height: 20px;
		display: block;
      }
      .custom-right{
        color: #333;
		font-weight: 600;
        font-size: 14px;
		.custom-time2 {
		  font-size: 12px;
		  color:#ccc;
		  line-height: 13px;
		  text-align:right;
		  display:block;
		  line-height: 20px;
		  font-weight: normal;
	  }
      }
    }

    .bottom-button{
      width: 100%;
      position: fixed;
      bottom: 0;
      .button{
          width: 80%;
          padding: 12px;
          text-align: center;
          margin: 40px auto;
          letter-spacing: 2px;
          background: linear-gradient(180deg, #EE6863 0%, #D11A2D 100%);
          border-radius: 4px;
          font-size: 18px;
          color: #fff;
      }
    }
    .peration-item2{
      margin-top:60px;
      text-align:center;
    }
  }
}
</style>