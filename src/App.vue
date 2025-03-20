<template>
  <div id="app">
    <router-view :key="$route.fullPath" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>

    <van-tabbar
        v-model="active"
        :route="true"
        :safe-area-inset-bottom="true"
        active-color="#737e57"
        inactive-color="#999"
        :placeholder="true"
        v-if="$route.meta.tabbar == true"
      >
        <van-tabbar-item name="home" to="/" icon="wap-home">
          <span style="font-size:14px;">首页</span>
          <template #icon="props">
            <img :src="props.active ? icon[0].active : icon[0].inactive" style="height:28px;"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="share" to="/fund-pro">
          <span style="font-size:14px;">基金</span>
          <template #icon="props">
            <img :src="props.active ? icon[2].active : icon[2].inactive" style="height:25px;"/>
          </template>
        </van-tabbar-item>	
			
			<van-tabbar-item name="fund" to="/fund-in">
			  <span style="font-size:14px;">预审</span>
			  <template #icon="props">
			    <img :src="props.active ? icon[3].active : icon[3].inactive" style="height:25px;"/>
			  </template>
			</van-tabbar-item>	
			
        <van-tabbar-item name="share" to="/share1">
          <span style="font-size:14px;">邀请</span>
          <template #icon="props">
            <img :src="props.active ? icon[1].active : icon[1].inactive" style="height:28px;"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="my" to="/my">
			
		  <span v-show="msgCount" class="red-p"><el-badge :value="msgCount" :max="99"></el-badge></span>	
			
          <span style="font-size:14px;">我的</span>
          <template #icon="props">
            <img :src="props.active ? icon[4].active : icon[4].inactive" style="height:28px;"/>			
          </template>
        </van-tabbar-item>
      </van-tabbar>


  </div>
</template>
<script>
import { getConfigKey } from "@/api/index";

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default {
  name: "App",
  components: {},
  mounted() {
    this.getConfig();
  },
  data() {
    return {
	  msgCount:0,
	  isYuShen:0,	
      active: "/",
      online: 'no',
      icon: {
        0:{
          //本地路径使用require请求图片
          active: require('@/assets/photo/home2.png'),
          inactive: require('@/assets/photo/home.png'),
        },
        2: {
          //本地路径使用require请求图片
          active: require('@/assets/photo/jj2.png'),
          inactive: require('@/assets/photo/jj.png'),
        },     
		  3: {
          //本地路径使用require请求图片
          active: require('@/assets/photo/pp2.png'),
          inactive: require('@/assets/photo/pp.png'),
        },		
        1: {
          //本地路径使用require请求图片
          active: require('@/assets/photo/in2.png'),
          inactive: require('@/assets/photo/in.png'),
        },
        4: {
          //本地路径使用require请求图片
          active: require('@/assets/photo/my2.png'),
          inactive: require('@/assets/photo/my.png'),
        }
      },
    };
  },
  provide() {
    // 父组件中通过provide来提供变量，在子组件中通过inject来注入。
    return {
      reload: this.reload,
	  getCC: this.getConfig
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    getConfig() {
      getConfigKey({mimi: 1, key: 'endPreheatcle' }).then((res) => {
        this.online = res.data.online;
		this.isYuShen = res.data.isYuShen;
		this.msgCount = res.data.msgCount;
      });
    },
  }
};
</script>
<style lang="scss">
body {


  //background: url('@/assets/img/newlist/logo.png') no-repeat 90% 100%;
  //background-size: 60% 40%;

}
.van-dialog__cancel{
  display: none;
}
::v-deep .van-dialog__cancel{
  display: none !important;
}
.van-nav-bar__content {
	height: 65px !important;
}
.van-nav-bar {
	position: fixed;
	width: 100%;
	top:0;
	//box-shadow: 0 4px 8px 0 #9521230A;

}
#app {
  overflow: visible;
  height: 100% !important;
  background: #fffcef !important;
}

.dialog-error{
  color:red;
  .van-dialog__message{
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
  }
}
.dialog-success {
  color: #0DAD48;
  .van-dialog__message {
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
  }
}
.van-dialog{
  border-radius: 6px !important;
  top: 50%;
  .van-dialog__header{
    padding: 20px 40px;
    font-weight: 600;
  }
  .van-dialog__message{
    color: #151E29;
    letter-spacing: 2px;
    line-height: 28px;
    font-size: 17px;
  }
  .van-button{
    font-size: 16px;
    font-weight: 600;
    .van-button__content{
      background-color: transparent !important;
      border-top: rgba(172, 32, 35, 0.06) 1px solid;
      .van-button__text{
        //background: radial-gradient(82.74% 862.49% at 28.76% 51.43%, rgba(114, 175, 248, 0.55) 0%, rgba(114, 175, 248, 0.12) 100%);
        //background-color: #fbfbfb;
        border-radius: 4px;
        padding: 10px 60px;
        color: #ee0a24;
        font-weight: 600;
      }
    }
  }
}
.van-toast {
  font-size: 18px !important;
  padding: 10px 14px !important;
  background: #a9ae8a !important;
  color: #fff !important;
  line-height: 32px !important;
}
::v-deep .van-toast--text{
  padding: 100px;
}
.van-nav-bar__title{
  font-size: 16px;
}
::v-deep .van-nav-bar__left, ::v-deep .van-nav-bar__right{
  font-size: 16px;
}
.notice-content {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 8%;
    height: 44vh;
    overflow: hidden;
    overflow-y: auto;
    margin: 0 auto 20px;
    line-height:35px;
    img {
      width: 100%;
      height: 100%;
    }
    p img{
      width: 100%;
      height: 100%;
    }
}
.notice-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 14px;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 10px;
  .button{
    width: 50%;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #BB2D1A;
    border-radius: 15px;
    padding: 8px;
    background-color: #BB2D1A;
    color: #fff;
  }
}

.van-bottom {
	height: 95px;
	position: fixed;
	bottom:0;
	left:0;
	box-sizing: content-box;
	width: 100%;
	background: linear-gradient(180deg, transparent 0%, #fef0ee 20%, #fff 50%, #fff 90%, #fff 100%) !important;
	//background:#fef0ee;
}
.van-tabbar {
  height: 65px !important;
  background-color: transparent !important;

  .van-tabbar-item{
    font-size: 15px;
	height:65px !important;
	//margin-top:25px;
	//border-top:solid 1px #fff;
	background-color: #fff !important;
	
	
	.red-p {
		position: absolute;
		top:5px;
		right: 8px;	
		font-size: 12px
	}
	
	.red-p2 {
		position: absolute;
		top:10px;
		right: 10px;	
		font-size: 12px
	}
	
  }
  .van-tabbar-item__icon{
    font-size: 24px;
  }
  .van-tabbar-item--active{
    font-weight: 600;
	// border-radius: 80px;
	// height:60px !important;
	// padding-top: 8px;
	// margin-top:-10px;
	//border:1px solid #f00;
	background-color: #fff !important;
  }
  .van-tabbar-item--active:after {
  	content: "";
  	position: absolute;
  	bottom: 0;
  	width: 100%;
  	height: 65px;
  	background: #fff;
  	left: 0;
	display:block;
	//border:1px solid #f00;
	z-index:-1;
  }
}
.van-tabbar__placeholder {
	    width: 100%;
	    overflow: hidden;
	    position: relative;
		z-index:1660;
}
.van-tabbar--fixed {
	position: fixed;
	z-index:1600;
	border-top: rgb(240, 240, 240, 0.7) 1px solid;
}

[class*=van-hairline]::after {border:none !important}
</style>
