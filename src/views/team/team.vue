<template>
  <div class="page">
    <div class="part_1">
      <div class="user-logo">
        <img src="@/assets/photo/user-logo.png" />
      </div>
      <section class="info_section">
        <div class="top">
          <img :src="member.portraitUrl" alt="">
          <div class="right">
            <strong>{{member.topName}}</strong>
            <span>{{ member.topPhone }}</span>
          </div>        
        </div>
        <ul>
          <li>
            <span>团队收益</span>
            <strong>{{teamCount.allAward}}</strong>
          </li>
          <li>
            <span>团队人数</span>
            <strong>{{teamCount.allPeople}}</strong>
          </li>
          <li>
            <span>已激活人数</span>
            <strong>{{teamCount.activeTeamTotal}}</strong>
          </li>
        </ul>
      </section>

      <div class="info_box0" style="height: auto; padding:0" v-if="online=='yes' && false">
        <!-- <div class="my-inviter0">
          <div><p style="height:25px;"></p></div>
			<div style="margin-top:10px;"><p><span class="num">{{ teamCount.allAward }}</span> <span style="color:#3F3D38;font-size: 12px;"></span></p></div>
		
        </div>

        <div class="w_700">
			
          <div class="info_item df_c">		
            <div class="text">
               <span @click="$router.push({ path: '/levelawardlist', query: { level: 1 } })"  v-if="online=='yes'">一级推荐奖励</span>
               <span v-else>一级总人数</span>
            </div>

            <div class="num">
              <span v-if="online=='yes'">{{ teamCount.level1Award }}</span>
              <span v-else>{{ teamCount.level1People}}</span>
              <span style="font-size:15px"></span>
			</div>
         </div>

          <div class="info_item df_c">
            <div class="text">
               <span @click="$router.push({ path: '/levelawardlist', query: { level: 2 } })" v-if="online=='yes'">二级推荐奖励</span>
               <span v-else>二级总人数</span>
            </div>
            <div class="num">
              <span  v-if="online=='yes'">{{ teamCount.level2Award }}</span>
              <span v-else>{{ teamCount.level2People}}</span>
              <span style="font-size:15px"></span>
			</div>
          </div>

          <div class="info_item df_c">
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
		

		<!-- <div class="info_item0 " style="border-bottom: 1px solid rgba(172, 32, 35, 0.06);">
			
			<div class="iii">总人数:&emsp;&emsp;</div>
			<div class="iiib">{{ teamCount.allPeople }}</div>
			
			
		</div>	 -->
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
		
		<!-- <div class="info_item0 ">
			<div class="iii">团队总奖励: </div>
			<div class="iii iiib">{{ teamCount.allAward }}</div>
			
		</div>
		
		<div class="info_item0 " v-show="isYuShen">
			<div class="iii">团队奖励: </div>
			<div class="iii iiib" >{{ spp }}</div>
			
		</div> -->
		
      </div>
    </div>

    <div class="part_2">
      <div class="data_box">
        <!-- <div class="info-count">
          <div class="text" v-if="activeIndex == -1 || activeIndex == 0">
            一级推荐人数：{{ teamCount.level1People}}人{{ teamCount.fund1 }}
          </div>
          <div class="text" v-else-if="activeIndex == 1">
            二级推荐人数：{{ teamCount.level2People}}人{{ teamCount.fund2 }}
          </div>
          <div class="text" v-else>
            三级推荐人数：{{ teamCount.level3People}}人{{ teamCount.fund3 }}
          </div>
        </div> -->

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
          <div class="d_table">
            <div class="d_thead df_r">
              <div class="th_item">昵称</div>
              <div class="th_item">手机号</div>
              <div class="th_item" v-show="isYuShen">是否激活</div>
            </div>
            <div class="d_body">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset='50'>
                <div class="d_td df_r" v-for="it in list" :key="it.id">
                  <div class="td_item ellipsis">{{ it.name }}</div>
                  <div class="td_item">{{ it.phone }}</div>
                  <div class="td_item mr_5" v-show="isYuShen" :style="{ color: it.isFund == 1 ? '#00851D' : '#BEC0BD' }">
                    <!-- <img :src="require(it.isFund==1 ? '@/assets/img/team/yes.png' : '@/assets/img/team/no.png')" width="16px"> -->
                    {{ it.isFund == 1 ? '已激活' : '未激活' }}
                  </div>
                </div>
              </van-list>
            </div>
          </div>
        </div>
      </div>
    </div>

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
      info: {},
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
    this.info = res.data
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
.van-hairline--bottom::after {
  border-bottom: none;
}

.page {
  // height: 100%;
  position: relative;
  background: #f3f3f3;

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

  .van-nav-bar .van-icon {
    color: #ffffff;
  }

  .van-nav-bar {
    background-color: transparent;
  }

  .part_1 {
    height: auto;
    padding: 0;
    background: linear-gradient(180deg, #F2F6D4 0%, rgba(255, 254, 252, 0) 100%);

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

    .info_box0 {
      position: relative;
      width: 94%;
      margin: 0 auto;
      border-radius: 8px;
      top: 0px;
      padding: 15px 0;
      box-sizing: border-box;
      color: #40424a;
      background: #FFFFFF6B;
    }
  }

  .part_2 {
    margin-top: 12px;
    height: auto;
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

      .data_tabs {
        margin: 12px 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 44px;
        justify-content: space-between;
        background: #fff;
        border-radius: 22px;
        border: 1px solid #FFFFFF;
        flex: none;
        order: 0;
        flex-grow: 1;
        box-sizing: border-box;
      }

      .data_tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 14px;
        color: #4B594A;
        height: 100%;
        width: 33.33%;
      }

      .tab_active {
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: radial-gradient(202.91% 100% at 50% 0%, #7E963C 0%, #455117 100%);
        border-radius: 22px;
      }

      .data_list {
        margin-top: 1px;

        .d_table {
          width: 95%;
          margin: 0 auto;
          border-radius: 8px;
          padding-top: 12px;
          padding-bottom: 70px;
          background: #FFFFFF6B;

          .d_thead {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 500;
            padding: 0 25px 0 25px;
            margin: 0;
            height: 33px;
            justify-content: space-between;
            color: #313231;
            font-size: 14px;

            .th_item {
              flex: 1;
              &:nth-child(2), &:nth-child(3) {
                text-align: center;
              }
              &:last-child {
                text-align: center;
              }
            }
          }

          .d_body {
            padding: 0px 25px;

            .van-list {
              padding-bottom: 100px;
              color: #40424a;
            }

            .d_td {
              justify-content: space-between;
              padding: 14px 0;

              &:nth-child(1) {
                margin-top: 10px;
              }

              .td_item {
                flex: 1;
                font-size: 14px;
                color: #313231;
                &:nth-child(2) {
                  text-align: center;
                }
                &:last-child {
                  text-align: center;
                }
                img {
                  vertical-align: middle;
                }
              }

              .td_item:nth-child(2) {
                flex: 1.5;
              }

              .td_item:nth-child(3) {
                text-align: center;
                font-weight: 600;
              }
            }
          }
        }

        .more {
          margin-top: 20px;
          justify-content: center;
          font-size: 13px;
        }
      }
    }
  }

  .part_3 {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 2rem;
    background: #ffff;
    
    .button {
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

.info_section {
  .top {
    display: flex;
    align-items: center;
    margin: 0 24px;
    
    background: radial-gradient(202.91% 100% at 50% 0%, #7E963C 0%, #455117 100%);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px 16px;
    box-sizing: border-box;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      font-size: 13px;
      color: #fff;
      strong {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 4px;
      }
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 87px;
    border-radius: 8px;
    background: #FFFFFF6B;
    margin: 0 12px;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color:#6C6E6C;
      height: 47px;
      strong {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 4px;
        color:#313231;
      }
    }
    
  }
}
</style>
