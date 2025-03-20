<template>
  <div class="page">
    <div class="part_1" >
		
		<nav-bar title="我的团队" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
<!--    <van-nav-bar
      
      safe-area-inset-top
      class="navbar">
    <template #left>
      <van-icon
        name="arrow-left"
        size="22"
        :color="leftIconColor"
        @click="$router.go('-1')"
      />
    </template>
     <template #title>
        <span class="navbar-title-middle">{{ title }}</span>
      </template>
	<template #right>
	 <span class="navbar-title-right" @click="$router.push('/system')">团队规则</span>
	</template>
    </van-nav-bar> -->
	
	<div class="user-logo">
		<!-- <img src="@/assets/photo/user-logo-td.webp" style="height:50px;" /> -->
	</div>


      <div class="info_box0" style="height: auto; padding:0" v-if="online=='yes'">
        <div class="my-inviter0" >
          <!-- <div><p style="height:25px;"></p></div> -->
			<!-- <div style="margin-top:10px;"><p><span class="num">{{ teamCount.allAward }}</span> <span style="color:#3F3D38;font-size: 12px;"></span></p></div> -->
		
        </div>

        <div class="w_700">
			
<!--          <div class="info_item df_c">		
            <div class="text">
               <span @click="$router.push({ path: '/levelawardlist', query: { level: 1 } })"  v-if="online=='yes'">一级推荐奖励</span>
               <span v-else>一级总人数</span>
            </div>

            <div class="num">
              <span v-if="online=='yes'">{{ teamCount.level1Award }}</span>
              <span v-else>{{ teamCount.level1People}}</span>
              <span style="font-size:15px"></span>
			</div>
         </div> -->

<!--          <div class="info_item df_c">
            <div class="text">
               <span @click="$router.push({ path: '/levelawardlist', query: { level: 2 } })" v-if="online=='yes'">二级推荐奖励</span>
               <span v-else>二级总人数</span>
            </div>
            <div class="num">
              <span  v-if="online=='yes'">{{ teamCount.level2Award }}</span>
              <span v-else>{{ teamCount.level2People}}</span>
              <span style="font-size:15px"></span>
			</div>
          </div> -->

<!--          <div class="info_item df_c">
              <div class="text">
               <span @click="$router.push({ path: '/levelawardlist', query: { level: 3 } })" v-if="online=='yes'">三级推荐奖励</span>
               <span v-else>三级总人数</span>
              </div>
              <div class="num">
                  <span  v-if="online=='yes'">{{ teamCount.level3Award }}</span>
                  <span v-else>{{ teamCount.level3People}}</span>
                  <span style="font-size:15px"></span>
				  </div>
        </div> -->
		

		<div class="info_item0 " style="border-bottom: 1px solid rgba(172, 32, 35, 0.06);">
			
			<div class="iii">总人数:&emsp;&emsp;</div>
			<div class="iiib">{{ teamCount.allPeople }}</div>
			
			
		</div>	
<!-- 		<div class="info_item1 " style="border-bottom: 1px solid rgba(172, 32, 35, 0.06);">
			<div></div>
			 <div class="bb" v-if="!teamCount.award2"><div class="btn"><van-button @click="getAward(2)" type="default">领取</van-button></div></div>
			 <div class="bb" v-else><div class="btn gray"><van-button type="default">已领取</van-button></div></div>
			
		</div> -->
		

<!-- 		<div class="info_item0 " style="border-bottom: 1px solid rgba(172, 32, 35, 0.06);">
			<div class="iii">激活人数:&emsp;</div>
			<div class="iiib">{{ teamCount.activeTeamTotal }}</div>
			
		</div> -->
<!-- 		<div class="info_item1 ">
			<div></div>
			 <div class="bb" v-if="!teamCount.award8"><div class="btn"><van-button @click="getAward(8)" type="default">领取</van-button></div></div>
			 <div class="bb" v-else><div class="btn gray"><van-button type="default">已领取</van-button></div></div>
			
		</div> -->
		
		<div class="info_item0 ">
			<div class="iii">团队总奖励: </div>
			<div class="iii iiib">{{ teamCount.allAward }}</div>
			
		</div>
		
		<div class="info_item0 " v-show="isYuShen">
			<div class="iii">团队奖励: </div>
			<div class="iii iiib" >{{ spp }}</div>
			
		</div>
		
    </div>
	
</div>
	  
	  <div style="width:95%;;margin:15px auto;" @click="$router.push('/team-lv1')">
	  	
	  	<img src="@/assets/photo/ban.webp?123" style="width:100%;border-radius:5px" />
	  	
	  </div>
	  
	  
	  <div class="info_box" style="margin:0 auto;height: 150px;" v-if="online=='no'">
		  

		  
	<div class="flex-gold">
		  <div class="flex-item">
			  <p><span>账户：</span>{{ member.phone }}</p>			
		  </div>
		  <div class="flex-item">
			  <p><span>姓名：</span>{{ member.name }}</p>
			 
		  </div>
		  <div class="flex-item">
			  <p><span>推荐人：</span> {{ member.topName }}</p>
			
		  </div>
		  <div class="flex-item">
				<p><span>推荐人电话：</span>{{ member.topPhone }}</p>
				
		  </div>
	</div>
	  
	 
		
	<div class="flex-right" @click="$router.push('/team-ext')">
		<img src="@/assets/img/team/bz.webp" style="width:100px;">
	</div>
		
	  	
	  </div>
	  
	



    </div>
    <div class="part_2">
      <div class="data_box">
<!--        <div class="count-list">
          <div class="count-column">
			  <div><img :src="require('@/assets/img/team/reg.png')" width="50px" /></div>
			  <div><span>{{ teamCount.exTeamPeople }}</span></div>
              <div><h2>注册总人数</h2></div>
              
          </div>
          <div class="count-column">

            <div v-if="online=='yes'"><img :src="require('@/assets/img/team/act.png')" width="50px" /></div>
            <div  v-if="online=='yes'"><span>{{ teamCount.activeTeamTotal }}</span></div>
			<div  v-if="online=='yes'"><h2>激活总人数</h2></div>
          </div>
          <div class="count-column">
			  <div><img :src="require('@/assets/img/team/name.png')" width="50px" /></div>
			   <div><span>{{ teamCount.isRealPeople }}</span></div>
            <div><h2>实名总人数</h2></div>
           
          </div>
        </div> -->
		
		
		 <div class="info-count">
			<div class="text" v-if="activeIndex == -1 || activeIndex == 0">
			   一级推荐人数：{{ teamCount.level1People}}人{{ teamCount.fund1 }}
			</div>
			<div class="text" v-else-if="activeIndex == 1">
			   二级推荐人数：{{ teamCount.level2People}}人{{ teamCount.fund2 }}
			</div>
			<div class="text" v-else>
			   三级推荐人数：{{ teamCount.level3People}}人{{ teamCount.fund3 }}
			</div>
		 </div>
		
		
        <div class="data_tabs df_r">
          <div
            class="data_tab"
            :class="it.id === activeIndex ? 'tab_active' : ''"
            v-for="it in tabs"
            :key="it.id"
            @click="handleTab(it.id)"
          >
            {{ it.title }}
          </div>
        </div>
        <div class="data_list">
          <!-- <div class="list_top df_r">
            <div class="text_d">
              <p>{{ levelCount.exTeamPeople }}</p>
              <p>注册总人数</p>
            </div>
            <div class="text_d">
              <p>{{ levelCount.isRealPeople }}</p>
              <p>已激活</p>
            </div>
          </div> -->
          <div class="d_table">
            <div class="d_thead df_r">
              <div class="th_item">姓名</div>
              <div class="th_item">账号</div>
<!--              <div class="th_item">激活</div> -->
              <div class="th_item" v-show="isYuShen">预审</div>
            </div>
            <div class="d_body">
              <!--  -->
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
                <div class="d_td df_r" v-for="it in list" :key="it.id">
                  <div class="td_item ellipsis">{{ it.name }}</div>
                  <div class="td_item">{{ it.phone }}</div>
                  <!--<div class="td_item mr_5 color_g" v-if="it.isActive==1">
                    <img src="@/assets/img/success.png" width="12px" height="12px">
                    <span>已激活</span>
                  </div>
				  -->
                 <div class="td_item mr_5 color_r" v-show="isYuShen">
                    <img :src="require(it.isFund==1 ? '@/assets/img/team/yes.png' : '@/assets/img/team/no.png')" width="16px">
                  </div>
				  
				  
                </div>
              </van-list>
              <!-- </div> -->
            </div>
          </div>
          <!-- <div class="more df_r">点击更多</div> -->
        </div>
      </div>
    </div>
	
<!--   <div class="part_3">
      <div class="button" @click="$router.push('/share')">立即邀请</div>
    </div> -->
        <div class="i-mask" v-if="showMask" @click="alertMsg()"></div>	
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getTeamApi,getTeamAward } from "@/api/member";
import { getConfigKey } from "@/api/index";
export default {
  name: "Team",
  data() {
    return {
		isYuShen:0,
      'title': '我的团队',
      list: [],
      loading: false,
      finished: false,
      tabs: [
        { title: "一级会员", id: 0 },
        { title: "二级会员", id: 1 },
        { title: "三级会员", id: 2 },
      ],
      tabCurrent: 1,
      moreText: "点击更多",
      inviter: [],
      balance: 0,
      numberMoney: 0,
      teamCount: {allAward:'-', exTeamPeople:'-',isRealPeople:'-',activeTeamTotal:'-'},
	  spp:'',
	  member: [],
      levelCount: {
        exTeamPeople: 0,
        isRealPeople: 0
      },
      activeIndex: -1,
      totalPage: 0,
      pageNum: 1,
      total: 0,
      online: 'yes',
	  height:'',
	  marginTop: '',
      showMask: false                 	  
    };
  },
  computed: {
    ...mapGetters(["host", "baseData"]),
  },
  mounted() {

     //第一次载入
     this.handleTab(0);

  },
	created() {
		this.getConfig();            
	},  
  methods: {
    handleTab(id) {
      if (id != this.activeIndex) {
        this.activeIndex = id;
        this.pageNum = 1;
        this.finished = false;
        this.list = [];
        this.getTeam(this.activeIndex);
      }
      this.activeIndex = id;
    },
	getAward(amount) {
		getTeamAward({ amount: amount }).then((res) => {
			if (res.code !== 200) {
				this.$dialog({ message: res.msg, className: 'dialog-error' })
			} else {				
				if (amount == 8) {
					this.teamCount.award8 = 1;
				} else {
					this.teamCount.award2 = 1;
				}
				this.$dialog({ message: res.msg, className: 'dialog-success' })
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
	alertMsg() {
		this.$dialog.alert({ title: '该账户已冻结', message: '请联系在线客服申请解冻'});
	},        	
    getTeam(activeIndex) {

      //这里不知道为什么this.list会出不来,用that正常
      let that = this;


      getTeamApi({ index: activeIndex, pageNum: this.pageNum }).then((res) => {

        //console.log(this.pageNum);

        this.balance = res.data.balance;
        this.teamCount = res.data.teamCount;
        this.spp = res.data.spp;
		this.member = res.data.member;
		this.isYuShen = res.data.teamCount.isYuShen;

        //总笔数
        this.total = res.data.memberList.total;

        //第几页
        //this.pageNum = res.data.memberList.current_page;
        //this.pageNum = pageNum;



        //总页数
        this.totalPage = res.data.memberList.last_page;

        //this.inviter = res.data;
        this.online = res.data.online
		
		if (this.online == 'no') {
			this.height = 'height:210px';
			this.marginTop = 'margin-top:20px;';
		}


        this.levelCount.exTeamPeople = res.data.teamCount.exTeamPeople;
        this.levelCount.isRealPeople = res.data.teamCount.isRealPeople;

        /*if (activeIndex == 2) { //三级会员

          if (this.pageNum == 1)
          {
            this.list = res.data.memberList.data;
          } else {
            this.list = this.list.concat(res.data.memberList.data);
          }

        } else if (activeIndex == 1) { //二级会员

          if (this.pageNum == 1)
          {
            this.list = res.data.memberList.data;
          } else {
            this.list = this.list.concat(res.data.memberList.data);
          }

        } else if (activeIndex == 0) { //一级会员

          if (this.pageNum == 1)
          {
            that.list = res.data.memberList.data;
          } else {
            that.list = that.list.concat(res.data.memberList.data);
          }

        }*/

        if (this.pageNum == 1) {
          that.list = res.data.memberList.data;
        } else {
          that.list = that.list.concat(res.data.memberList.data);
        }

        this.loading = false;

        this.pageNum++

        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        if (this.pageNum >  this.totalPage) {
          this.finished = true
          return false;
        }


      });
    },
    onLoad() {

       //挡掉重复执行了二次
       if (this.pageNum == 1 ){
          return 
       }
	   
      
       this.getTeam(this.activeIndex);
      
       //console.log('pageNum=' +this.pageNum);

    }
  },
};
</script>

<style>
#app {
	height: 100% !important;
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
	 color: #40424a;
	 font-weight: 400;
	 
 }
 .van-dialog__cancel {
 	 display: inline-block !important;
 }
.van-dialog .van-dialog__cancel {
	 display: inline-block !important;
 }
.van-dialog .van-dialog__confirm .van-button__content .van-button__text {
	 color: #b4ba97; 
	 font-weight: 600;
 }
.van-dialog .van-hairline--top {
	 border-top: rgba(172, 32, 35, 0.06) 1px solid;
 }
.van-dialog .van-button__content {
	 border-left: rgba(172, 32, 35, 0.06) 1px solid;
 }

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

</style>

<style lang="scss" scoped>
.van-hairline--bottom::after{
    border-bottom: none;
}
.page {
  height: 100%;
  position: relative;


  .navbar-title-middle {
    color: #ffffff;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 600;
  }

   .navbar-title-right {
    color: #ffffff;
    font-size: 16px;
    letter-spacing: 2px;
	font-weight: normal;
  }
  .van-nav-bar .van-icon{
    color: #ffffff;
  }
  .van-nav-bar {
    background-color:transparent;
  }
  .part_1 { 
    height: auto;
    padding: 0;

    //background: linear-gradient(180deg, #F64848 0%, #D11A2D 100%) ;
	background: url('@/assets/photo/top-bg.webp') top left no-repeat;
	//background-color: #a9ae8a;
	background-size: 100% 240px;
	
	.user-logo {
		width: 100%;
		height: 30px;
		text-align: center;
		padding-top:30px;
	}
	
	.info_box0 {
		
	  position: relative;
	  width: 94%;
	  //background: #fff;
	  margin: 0 auto;
	  border-radius: 5px;
	  top:0px;
	  padding:15px 0;
	  box-sizing: border-box;
	  color: #40424a;
	  .w_700 {
	  			 background: #fff;
	  			 border-radius: 5px;
				 margin-top: 0;
				 padding:20px 30px;
				 padding-bottom: 50px;

				 display: grid;
				 grid-template-columns:100%;
				 
				 .info_item0 {
				    align-items: center;
				 	display: grid;
				 	grid-template-columns: 90px auto;
				 	padding: 15px 0;
				 	font-size: 14px;
				 	color:#40424a;
				 	font-weight: 400;
					.iii {
						font-size: 14px;
					}
					.iiib {
						font-weight: 600;
					}
				 	
				 	.bb {text-align: right; display: inline-block;width:100%}
				    .num {
				      font-size: 16px;
				      font-weight: 600;
				  	display: grid;
				  	grid-template-columns:34% 64%;
				  	height: 40px;
				  	width: 130px;
				 		.rmb {
				 			line-height: 16px;
				 			padding: 12px 0;
				 		}					
				    }
				    .text {
				      font-size: 15px;
				  	line-height: 15px;
				  	padding: 0 0 20px 0;
				  	width: 130px;
				    }
				    .van-button {
				    	background: linear-gradient(180deg, #d8debe, #b4ba97);
				    	color:#fff;
				    	line-height: 20px;
				    	font-weight: 600;
				    	font-size: 12px;
				    	width: 75px;
				    	border-radius: 4px;
				    }
				    .van-button--normal {
				  	  height: 34px;
				    }
					.gray .van-button{
						//background: linear-gradient(180deg, #E9E9E9 0%, #DDDDDD 100%);
					}
				 }
				 
				 
				 
				 .info_item1 {
				    align-items: center;
				 	display: grid;
				 	grid-template-columns: 0 100%;
				 	padding: 15px 0;
				 	font-size: 14px;
				 	color:#40424a;
				 	font-weight: 400;
				 	
				 	.bb {text-align: right; display: inline-block;width:100%}
				    .num {
				      font-size: 16px;
				      font-weight: 600;
				  	display: grid;
				  	grid-template-columns:34% 64%;
				  	height: 40px;
				  	width: 130px;
				 		.rmb {
				 			line-height: 16px;
				 			padding: 12px 0;
				 		}					
				    }
				    .text {
				      font-size: 15px;
				  	line-height: 15px;
				  	padding: 0 0 20px 0;
				  	width: 130px;
				    }
				    .van-button {
				    	background: linear-gradient(180deg, #d8debe, #b4ba97);
				    	color:#fff;
				    	line-height: 20px;
				    	font-weight: 600;
				    	font-size: 12px;
				    	width: 75px;
				    	border-radius: 4px;
				    }
				    .van-button--normal {
				  	  height: 34px;
				    }
					.gray .van-button{
						//background: linear-gradient(180deg, #E9E9E9 0%, #DDDDDD 100%);
					}
				 }
				 
				 
				 
	  }
	  .my-inviter0{
	     text-align:center;
		height: 25px;
		 .t1 {
			 height: 60px;
			 font-size: 20px;line-height: 60px;font-weight: 400;color:#FFFBF8
		 }
		 .num {

			 height: 42px;
			 font-weight: 700;
			 font-size: 28px;
			 line-height: 42px;
			 
			 background: linear-gradient(180deg, #FCFCE8 0%, #F8D19F 100%);
			 -webkit-background-clip: text;
			 -webkit-text-fill-color: transparent;
			 background-clip: text;
			 text-fill-color: transparent;
			 
			 text-shadow: 0px 2px 2px rgba(232, 93, 40, 0.24);

		 }
	    div h1{
	
	      text-align:center;
	      font-size: 16px;
	      margin-top:15px;
	      margin-bottom:10px;
	
	    }
	    div h2{
	       font-size: 30px;
	      font-weight: bolid;
	      text-align:center;
	      margin-top : 0px;
	      margin-bottom : 20px;
	    }
	  }
	}
	  
	
    .info_box {
		
      position: relative;
      width: 94%;
	  background: #fff;
      margin: 0 auto;
	  border-radius: 5px;
      top:0px;
      padding:15px 0;
      box-sizing: border-box;
      color: #40424a;
      .my-inviter{
         text-align:center;
        div h1{

          text-align:center;
          font-size: 16px;
          margin-top:15px;
          margin-bottom:10px;

        }
        div h2{
           font-size: 30px;
          font-weight: bolid;
          text-align:center;
          margin-top : 0px;
          margin-bottom : 20px;
        }
      }
	  
	  
	  
	  .flex-gold {
	  	    display: grid;
	  	    grid-template-columns: repeat(1, 1fr);
	  	    grid-gap: 10px;
	  	    margin: 0 auto;
	  	    height: 80px;
	  		//border:1px solid #fc0;
	  		.flex-item {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				text-align: left;
				padding: 0 0 10px 25px;
				//border:1px solid #f00;
				p {
					font-size: 14px;
					font-weight: 500;
							
				}

	  		}
	  }
	  
	  .flex-right {
		  display: inline-block;
		  height: 100px;
		  width: 100px;
		  top:25px;
		  right: 20px;
		  position: absolute;
	  }
	  
	  
    }
    .w_70 {
      justify-content: space-between;
      height: 100%;
    }
    .line {
      height: 25px;
      width: 2px;
      background: #707070;
    }
    .info_item {
      align-items: center;
      flex: 1;
      height: 100%;
      .num {
        font-size: 16px;
        font-weight: 600;
		display: grid;
		grid-template-columns:34% 64%;
		height: 40px;
		width: 130px;
		.rmb {
			line-height: 16px;
			padding: 12px 0;
		}
		.btn {
			
		}
      }
      .text {
        font-size: 15px;
		line-height: 15px;
		padding: 0 0 20px 0;
		width: 130px;
      }
	  .van-button {
	  	background: linear-gradient(180deg, #d8debe, #b4ba97);
	  	color:#fff;
	  	line-height: 20px;
	  	font-weight: 600;
	  	font-size: 12px;
	  	width: 75px;
	  	border-radius: 4px;
	  }
	  .van-button--normal {
		  height: 34px;
	  }
    }
  }
  .part_2 {
    margin-top: 12px;
    height: auto;
    //background: $bg_liner_color2;
	//background: #fff;
    padding-bottom: 20px;
	
	.info-count {
	  align-items: center;
	  height: 45px;
	  background: #fff;
	  border-radius: 4px;
	  width: 95%;
	  margin: 0 auto;
	  margin-bottom: 12px;
		  .text {
			font-size: 14px;
			font-weight: 600;
			height: 20px;
			line-height: 20px;
			padding: 12px 0;
			text-align: center;
			width: 100%;
			color: #40424a;
		  }
	  }
	
    .data_box {
      min-height: 362px;
      //background: $bg_color;
      //padding: 10px 0;

      .count-list{
        width: 95%;
        margin: 10px auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 8px;
        height: 160px;
        text-align: center;
        
        //box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0528889);
    
        border-radius: 12px;
        font-size: 18px;
        .count-column{
          padding: 10px;
          margin: 0px;
          display: grid;
		  background: #ffffff;
          div span{
            font-size: 18px;
            font-weight: 500;
            text-align: center;
			display: inline-block;
			width: 100%;

          }
          div {
              padding:5px 0 0 0;
          }
         div h2 {
             font-size: 14px;
             color:#40424a;
             font-weight: 400;
          }
        }
      }
      .data_tabs {
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        height: 45px;
        justify-content: space-between;
        background: #fff;
        border-radius: 8px;
        flex: none;
        order: 0;
        flex-grow: 1;
		margin-top: 10px;
      }
      .data_tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 16px;
        background: #f0f0f0;
        color: #40424a;
        border-top-right-radius:5px;
        border-top-left-radius:5px;
        padding: 10px 0;
        height:26px;
		width: 33%;
      }
      .tab_active {
        color:#fff;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background: linear-gradient(180deg, #d8debe, #b4ba97);
        border-top-right-radius:5px;
        border-top-left-radius:5px;

      }
      .data_list {
        margin-top: 1px;
        .list_top {
          padding: 0;
          justify-content: space-between;
          .text_d {
            text-align: center;
            color: $font_color;
            font-size: 14px;
            font-weight: bold;
            line-height: 30px;
            p:nth-child(1){
              font-weight: normal;
              font-size: 16px;
              text-align: center;
              color: #fff;
            }
            p:nth-child(2){
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: normal;
            }
          }
        }
        .d_table {
          width:95%;
          margin: 0 auto;
          //box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0528889);
          border-bottom-right-radius:8px;
          border-bottom-left-radius:8px;
		  padding-bottom: 70px;

          .d_thead {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 500;
            padding: 0 25px  0 25px;
            margin:0;
			background: #b4ba97;
            height: 33px;
            line-height: halfSize(61px);
            justify-content: space-between;
            color: #fff;
            font-size: 14px;
            .th_item {
              flex: 1;
              &:nth-child(2),&:nth-child(3) {
                text-align: center;
              }
              &:last-child {
                text-align: center;
              }
            }
            .th_item:nth-child(2) {
              flex: 1.5;
            }
          }
          .d_body {
			  background: #fff;
            padding: 0px 25px;
			.van-list {
				padding-bottom: 100px;
				color:#40424a;
			}
            .d_td:nth-child(1){
              margin-top: 10px;
            }
            .d_td {
              justify-content: space-between;
              font-size: 15px;
              padding: 14px 0;
              .td_item {
                flex: 1;
                &:nth-child(2) {
                  text-align: center;
                }
                &:last-child {
                  text-align: center;
                }
                img{
                  vertical-align: middle;
                }
              }
              .td_item:nth-child(2){
                flex: 1.5;
              }
              .td_item:nth-child(3){
                text-align: center;
                font-weight: 600;
              }
              .color_g {
                color: $font_success;
              }
              .color_r {
                color: $font_faild;
              }
            }
          }
        }
        .more {
          margin-top: 20px;
          justify-content: center;
          color: $font_color6;
          font-size: 13px;
        }
      }
    }
  }
  .part_3 {
    //position: fixed;
    //bottom: 46px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 20px;
	margin-bottom: 2rem;
    background: #ffff;
    .button{
      width: 60%;
      margin: 0 auto;
      background: #b4ba97;
      border-radius: 30px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      padding: 16px;
    }
  }
}
</style>
