<template>
  <div class="page">
	  
	<nav-bar :title="title0" titleColor="#fff" leftIconColor="#fff" :isLeftFn="true" @handleBack="$router.push('/')"  />
	<!-- <nav-bar :title="排行榜" left-arrow @click-left="$router.go(-1)" titleColor='#fff' leftIconColor="#fff" class="nav-top"/> -->

    <!--rank_top3 start-->
    <div class="rank_top3">
      
	  
	  <div class="tabs data_tabs2 df_r">
	  		
	  	<div class="data_tab2 tab_active2" v-show="isYuShen">
	  	    全民复兴排行
	  	</div>
	  	<div class="data_tab2" @click="$router.push('/rank2')" v-show="isYuShen">
	  	    预审排行
	  	</div>
	  	
	   
	  </div>
	  

      <div class="tabs data_tabs df_r">
        <div class="tab df_c" v-for="it in tabs" :key="it.value" @click="handleTab(it)" :class="it.value == idx ? 'actived' : ''">
            <span>{{ online ? it.subTitle : it.title }}</span>
        </div>
      </div>


      <!-- top3 start -->
       <div class="top3List df_r">

          <div class="item" v-for="(it, index) in leaderList" :key="index">
              <div class="circle_img"  >
                <img v-if="it.picture != ''" :src="it.picture"  style="width:60px;height:60px;position:relative;border-radius:50%;border: 1px solid #eee;" />
                <img v-else src="@/assets/img/my/def.jpg" style="width:60px;height:60px;position:relative;border-radius:50%;border: 1px solid #eee;" />
                <!--<svg-icon :iconClass="it.ranking === 1 ? 'v1' : it.ranking === 2 ? 'v2' : 'v3'" :size="24"/>-->
              </div>
			  <div class="award">
				<p>{{ it.name }}</p>
				<p class="my">{{ it.money }}</p>  
			  </div>

           
              <!--<p class="txt">{{ it.phone }}</p>-->
              <!--<p class="txt" >{{ it.num }}</p>-->
              <!--<p class="txt">奖金：<span class="money">{{ it.money }}￥</span></p>-->
          </div> 

        </div>

       <!-- top3 end -->   

       <!-- 1/2/3 pic--> 

       <div class="rank123">
            <img src="@/assets/photo/top-rank.webp" width="100%" height="auto" style="padding: 0px 10px;box-sizing: border-box;">
       </div>

       <!-- 1/2/3 pic--> 


    </div>
    <!-- rank_top3 end -->

    <!-- list start -->
    <div  class="container">
        <div class="list">
          <div class="list_th df_r">
            <div class="item33">名次</div>
            <div class="item33">姓名</div>
            <div class="item33">现金</div>
          </div>

          <div v-if="idx == 1">
            <div class="van-list" v-if="list.length > 0">
              <div  class="list_td df_r" v-for="it in list" :key="it.id">
                <div class="item33">{{ it.ranking }}</div>
                <div class="item33"> {{ it.name }} </div>
                <div class="item33">{{ it.money }}</div>
                <!-- <div class="item money">{{ it.money }}</div> -->
              </div>
            </div>

            <div class="van-list-empty" v-else>
              <van-cell-group style="width:100%;text-align: center;">
                <template>
                  <img :src="require('@/assets/img/no-record.png')" width="50%">
                </template>
                <div class="empty-txt" style="">暂时没有排名</div>
              </van-cell-group>   
              </div>
            <!-- <van-empty description="暂无数据" v-else /> -->
          </div>

          <van-list v-else v-model="loading" :finished="finished" finished-text="" @load="onLoad" :offset='50'>
            <div class="list_td df_r" v-for="it in yesterdayList" :key="it.id">
              <div class="item" style="color:#82111F;">{{ it.rank }}</div>
              <div class="item">{{it.name}}</div>
              <!-- <div class="item">{{ it.number }}</div> -->
              <div class="item">{{ it.money }}</div>
            </div>
          </van-list>
        </div>
    </div>
    
    <!-- list end -->

	    <div class="i-mask" v-if="showMask" @click="alertMsg()"></div>

  </div>
</template>
<script>
import { getTeamRankingApi, getRankingApi, getTodayRankingApi, getYesterdayTopApi } from "@/api/member";
import { getConfigKey } from "@/api/index";
export default {
  data() {
    return {
		title0:"",
		isYuShen:0,
      showMask: false,        		
      title: "",
      tabs: [
        { value: 1, title: "今日排行", subTitle: "今日排行" },
        { value: 2, title: "昨日排行", subTitle: "昨日排行" },
      ],
      idx: 1,
      leaderList: [],
      list: [],
      yesterdayList: [],
      user:[],
      loading: false,
      finished: false,
      pageNum: 1,
      totalPage: 0,
      total: 0,
      online: 0,
    };
  },
  created() {
    this.getTodayRankingApi();
	this.getConfig();
  },
  methods: {
    handleTab(it) {
      //console.log(it.value+'-------'+this.idx);
      if (it.value != this.idx) { 
        this.list = [];
        this.topList = [];
        this.pageNum = 1;
      }
      this.idx = it.value;
      this.title = it.title;
      if (this.idx == 1) {
        this.getTodayRankingApi();
      } else {
        this.getYesterdayTop();
      }
    },
	getConfig() {
	  getConfigKey({ 'key': 'endPreheatcle' }).then((res) => {
		  this.isYuShen = res.data.isYuShen;
		  if (this.isYuShen) {
			  this.title0 = "排行榜";
		  } else {
			  this.title0 = "全面复兴排行榜";
		  }
	    if (res.data.online == 'yes') { 
	      this.online = 1;
	    }
        if (res.data.uStatus && res.data.uStatus == 2) {
            this.showMask = true;
        }		
	  });
	},
    getTodayRankingApi() { 
      let that = this;
      getTodayRankingApi({ pageNum: that.pageNum }).then((res) => {
        this.leaderList = res.data.topList;
        this.list = res.data.bottomList;
        this.user = res.data.user;
      });
    },
    async getYesterdayTop(){
      getYesterdayTopApi().then((res) => {
        //this.leaderList = res.data;
         this.leaderList = res.data.topList;
      });
    },
    async getTeamRanking() {
      let that = this;
      getTeamRankingApi({ pageNum: that.pageNum }).then((res) => {
        if (that.pageNum == 1) {
          that.yesterdayList = res.data.data;
        } else {
          that.yesterdayList = that.yesterdayList.concat(res.data.data);
        }

        that.loading = false;
        that.pageNum++
        if (that.pageNum > res.data.last_page) {
          that.finished = true;
          return false;
        }
      });
    },
    alertMsg() {
        this.$dialog.alert({ title: '该账户已冻结', message: '请联系在线客服申请解冻'});
    },	
    getRanking() {
      let that = this;
      getRankingApi({ pageNum: 1 }).then((res) => {
        //console.log(res);
        if (that.pageNum == 1) {
          that.ranking = res.data.data;
        } else {
          that.ranking = that.ranking.concat(res.data.data);
        }
        that.loading = false;
        that.pageNum++
        if (that.pageNum > res.data.last_page) {
          that.finished = true;
          return false;
        }
      });
    },
    onLoad() {
      if (this.idx == 1) {
        this.getRanking();
      } else {
        console.log('team');
        this.getTeamRanking();
      }
    }
  },
};
</script>
<style lang="scss" scoped>
[class*=van-hairline]::after {
  border: none;
}
.page {
  height: 100%;
   position: relative;
  overflow-y: auto;
  
  
    width: 100%;
    background: url('@/assets/photo/top2.webp') no-repeat top left;
  //background-color: #a9ae8a;
    background-size: 100% 168px;
  
  ::v-deep .van-nav-bar {
    //background-color: #d11a2d !important;
	 //.van-icon-arrow-left {display: none;}
	 padding-top: 5px;
	 box-shadow: none !important;
		.van-nav-bar__right {
			 .navbar-right {
				font-weight: normal;font-size: 15px;
			 }
		}
	}


  .rank_top3{
       position:relative;
        width: 95%;
        background: #fff;
		margin: 80px auto 0 auto;
        /*border:1px solid red;*/
		border-radius: 8px;
      .navbar {
        //background: $bg_liner_color_red;
      }
	  
	  .data_tabs {
	    width: 100%;
	    //background-color:#fff;
	    overflow-x: auto;
	    box-sizing: border-box;
	    padding-top: 20px;
		
		//border-bottom: #f00 1px solid;
		
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-content: stretch;
		justify-content: space-evenly;
		//box-shadow: 0px 4px 8px 0px rgba(149, 33, 35, 0.0392156863);
		
	    .tab{
	      flex-shrink: 0;
	      padding: 4px 10px;
	      font-size: 16px;		
			
	    }
	    .tab.actived {
	      color: #555;
	  	font-weight: 600;
	      span{
	        padding-bottom: 5px;
	        border-bottom: 3px solid #8d965c;
	      }
	    }
	  }
	  
	  
	  .data_tabs2 {
	    width: 100%;
	    overflow-y: visible;
	    box-sizing: border-box;
	    //background: #faeeec;
	    height: auto;
	    margin-top:0;			  
	  
	    position: relative;
	  		//border-bottom: #f00 1px solid;
	  		
	  		display: grid;
	  		grid-template-columns: 50% 50%;
	  		//flex-direction: row;
	  		//flex-wrap: nowrap;
	  		
	  		align-content: stretch;
	  		justify-content: space-evenly;
	  		//box-shadow: 4px 4px 8px 4px rgba(149, 33, 35, 0.02);
	  		
	  		.data_tab2 {
	  			display: flex;
	  			flex-direction: row;
	  			justify-content: center;
	  			align-items: center;
	  			text-align: center;
	  			font-size: 16px;
	  			background: #f0f0f0;
	  			color: #999;
	  			border-top-right-radius:5px;
	  			border-top-left-radius:5px;
	  			padding: 10px 0;
	  			height:26px;
	  			width: 100%;						
	  			margin: 0;
	  	  }
	  	  .tab_active2 {
	  		  margin: 0;
	  		color:#fff;
	  		font-weight: 600;
	  		font-size: 16px;
	  		display: flex;
	  		flex-direction: row;
	  		justify-content: center;
	  		align-items: center;
	  		gap: 10px;
	  		background: linear-gradient(180deg, #d8debe, #b4ba97);
	  	
	  		//border-top-right-radius:5px;
	  		//border-top-left-radius:5px;
	  
	  	  }
	  		
	  
	  
	  }

      .top3List{
        width: 95%; 
        background-color:#fff;
        height: 120px;
		margin:0 auto;
		margin-top: 20px;
		color:#40424a;
        .item{

          width: 33.33%;
          height:120px;
          /*border: 1px solid red;*/
          /*line-height:200px;*/
		  //background: rgba(167, 175, 120, 0.16);
          
          text-align:center; 
          .circle_img{
               width:60px;
               height:60px;
               margin:0 auto;

               /*background-image: url("@/assets/img/rank/circle.png") ;*/
               background-size: 100% 100%;
               background-position: 50% 50% ;
               background-repeat: no-repeat;
               /*border:1px solid red;*/
			   
			   //border-radius: 60px;
			   padding-bottom: 5px;
			   margin-bottom: -30px;
          }

		 .award {
			 background: rgba(167, 175, 120, 0.16);
			 border-radius: 4px;
			 height: 45px;
			 width: 80%;
			 
			 
			 margin: 0 auto;
			 padding-top: 35px;
			 padding-bottom: 0;
			 p {
			    font-size:12px;
			 			 line-height: 22px;
			 			
			 			 
			 }
			 .my {
				 background: linear-gradient(315deg, #F8E5C8 0%, #EDBB8D 100%);
				 
			 }
		 }


          .txt{
            color: #717474;
            padding: 6px 0;
          }
        }

        .item:first-child{
          
          margin-top: 70px;
        }

        .item:last-child{
          margin-top: 100px;
        }

      }

      .rank123{
        background-color:#fff;
        width: 95%; 
        margin: 0  auto 0 auto;
      }

    }

 

  .container {
    position:relative;
    width: 95%;
	margin:0 auto;
    margin-top:-5px;
	padding-bottom: 130px;
  
      .list {
        font-size: 14px;
        color: #fff;
        border-radius: 5px;
		    padding-bottom: 50px;
		    background: #fff;
        .list_th{
         /* position: fixed;*/
          width: 100%;
          background: #fff;
          border-radius: 8px 8px 0px 0px;
          box-sizing: border-box;
          color: rgba(110, 130, 133, 1);
		  padding-top: 15px;
          height: 36px;
		  line-height:36px;
		  font-size:14px;
          /*margin-top: -3px;*/
          box-sizing: border-box;
          
          .item{
            /*border:1px solid blue;*/
             width:25%;
             font-weight: 400;
             text-align:center;

          }
		  .item33 {
			  width:33.3%;
			  font-weight: 400;
			  text-align:center;
			  font-size: 14px;
		  }
        }

         .list_td{
         /* position: fixed;*/
          width: 100%;
          
         
          box-sizing: border-box;
          color: #40424a;
          height: 45px;
          box-sizing: border-box;
          
          .item{
            /*border:1px solid blue;*/
             width:33.3%;
             font-weight: 400;
             text-align:center;
             
          }
		  .item33 {
		    /*border:1px solid blue;*/
		     width:33.3%;
		     font-weight: 400;
		     text-align:center;
		     
		  }
        }

     
      }
    
  }


}

.color_b {
  color: $font_color_b;
}


.list_td:nth-child(odd){
   
    background-color:#fff;
  }
.list_td:nth-child(even){
    padding:0;
   background-color:#f7f8fa;
  }

</style>
<style>
.i-mask {
    position: absolute;
    z-index: 1500;
    background-color: rgba(255, 255, 255, 0);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 1200px;
    height: 100%;
    width: 100%;
}

.van-dialog .van-dialog__cancel{
  display: inline-block !important;
}    
.van-dialog {
     border-radius: 8px;
 }
.van-dialog .van-button .van-button__content .van-button__text {
     background-color: transparent !important;
 }
.van-dialog .van-dialog__cancel .van-button__content .van-button__text {
     color: #626571;
     font-weight: 400;
     
 }
 .van-dialog__cancel {
      display: inline-block !important;
 }
.van-dialog .van-dialog__cancel {
     display: inline-block !important;
 }
.van-dialog .van-dialog__confirm .van-button__content .van-button__text {
     color: #D11A2D; 
     font-weight: 600;
 }
.van-dialog .van-hairline--top {
     border-top: rgba(172, 32, 35, 0.06) 1px solid;
 }
.van-dialog .van-button__content {
     border-left: rgba(172, 32, 35, 0.06) 1px solid;
 }

</style>