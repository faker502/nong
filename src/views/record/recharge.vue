<template>
  <div class="page">
	<nav-bar title="充值记录"  titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    <div class="part_1"></div>
    <div class="part_2">
      <div class="record box_shadow">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="~没有更多记录了~"
          @load="onLoad"
          class="list_wrap"
          :offset='10'
		  v-if="!noData"
        >
          <div class="list_box">
            <div class="list_box_item df_r" v-for="it in list" :key="it.id">
              <div class="left">
                <p>
                  <!-- <svg-icon :iconClass="it.key" :size="28" /> -->
                  <!-- <svg-icon iconClass="alipay" :size="28" v-if="it.key == 'alipay'"/>
                  <svg-icon iconClass="wechat" :size="28" v-else-if="it.key == 'wechat'"/>
                  <svg-icon iconClass="unionPay" :size="28" v-else-if="it.key == 'bankpay'"/>
                  <svg-icon iconClass="shanpay" :size="28" v-else-if="it.key == 'shanpay'"/>
                  <svg-icon iconClass="unionPay" :size="28" v-else-if="it.key == 'unionPay'"/> -->
                  <span class="pay_type">{{ it.name }}充值<span class="state_default"  :class="{'state_paying': it.state == 0,'state_success':it.state == 1,'state_fail':it.state == 2,'state_expired':it.state == 3}" :style=" {backgroundColor : it.state_css}">{{it.state_name}}</span></span>
                </p>
                <p class="create-time">{{ it.createTime }}</p>
              </div>
              <div class="right">
                <p>+{{ it.receiptMoney | unitPrice }}</p>
              </div>
              <!-- <div class="text"><svg-icon :iconClass="it.key" :size="30" /><span class="name">{{ it.name }}</span></div>
              <div class="text">{{ it.receiptMoney | unitPrice }}</div>
              <div class="text" v-html="it.state"></div>
              <div class="text mr_5">{{ it.createTime }}</div> -->
            </div>
          </div>
        </van-list>
        <van-empty description="暂无数据" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { RechargeLogsApi } from "@/api/recharge";
import ListCellPay from "@/components/ListCellPay.vue";
export default {
  name: "recharge_r",
  components: {
    ListCellPay
  },
  data() {
    return {
      list: [],
      //params: {
      //  pageNum: 1,
      //  pageSize: 10,
      //},
      teamData: {},
      tabs: [],
      tabCurrent: 1,
      moreText: "点击更多",
      current: 1,
      loading: false,
      finished: false,
      pageNum: 1,
      totalPage: 0,
      total: 0,
	  noData: 0
    };
  },
  computed: {},
  mounted() { },
  created() {
    //this.rechargeLogList();
  },
  methods: {
    handleTab(it) {
      this.tabCurrent = it.id;
    },
    handleCellClick(it) {
      this.current = it.id;
    },
    onLoad() {
      console.log(1);
      this.rechargeLogList();
    },
    async rechargeLogList() {
      let that = this
      RechargeLogsApi({ pageNum: that.pageNum }).then((res) => {
        if (that.pageNum == 1) {
          that.list = res.data.data;
		  if (res.empty == 1) {
			  that.noData = 1;
		  }
        } else {
          that.list = that.list.concat(res.data.data);
		  that.noData = 0;
        }

        that.loading = false;
        that.pageNum++;
        //最后一次请求返回的数据为空或小于10条，不在请求，finished = true
        //根据业务需求更改
        //if (res.data.billList.length == 0 || res.data.billList == null || res.data.billList.length < 10) {
        if (that.pageNum > res.data.last_page) {
          that.finished = true
          return
        } else {
          this.pageNum = that.pageNum
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.svg-icon{
  vertical-align: middle;
}
.navbar{
  background: $bg_liner_color_red;
  color: #000;
}
.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  background: url('@/assets/photo/top2.webp') no-repeat top left;
//background-color: #a9ae8a;
  background-size: 100% 168px;
  
  .part_1 {

    height: halfSize(120px);
  }
  .part_2 {
    margin-top: 0;
    width: 100%;
    height: auto;
    .record {
      background: $bg_color;
     border-top-left-radius: 5px;
     border-top-right-radius: 5px;
      padding: 10px 18px;
      box-sizing: border-box;
      margin: 20px auto;
	  width: 96%;
      .thead {
        justify-content: space-around;
        padding: 20px 0px;
        font-size: 15px;
        &_item {
          //color: $base_color;
          font-size: 16px;
          font-weight: bold;
          flex: 1;
          text-align: center;
        }
      }
      .list_box {
        padding: 10px;
        .list_box_item{
          height: 75px;
          font-size: 16px;
          border-bottom: 1px solid #EDEDF1;
          .left{
            width: 70%;
            img{
              vertical-align: middle;
            }
            .pay_type{
              padding-left: 0;
              font-size: 14px;
             /*vertical-align: middle;*/
              color: #3F3D38;
              font-weight: 400;
            }

            .state_default{
              color:#fff;
              border-radius:2px;
              margin-left:15px;
              padding: 2px;
              font-size:12px;
              vertical-align: middle;
			  width: 60px;
			  line-height: 14px;
			  height: 14px;
			  text-align: center;
			  display: inline-block;				
            }

            .state_paying{
              background-color:#3c9be2;
            }

            .state_fail{
              background-color:red;
            }

            .state_success{
              background-color:#0aae0a;
            }

            .state_expired{
              background-color:orange;
            }


            .create-time{
              padding-top: 6px;
              color: #626571;
			  font-size: 12px;
			 font-weight: normal;
            }
          }
          .right{
            width: 30%;
            text-align: right;
            font-size: 15px;
			color:#3F3D38;
            font-weight: 600;
            .state{

              padding: 6px 0;

            }
          }
        }
      }
    }
  }
}
</style>
