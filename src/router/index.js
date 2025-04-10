import Vue from "vue";
import VueRouter from "vue-router";

import { getToken } from "@/utils/auth";
import store from "@/store";

Vue.use(VueRouter);

/**
 * 解决重复点击菜单会控制台报错bug
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

const routes = [
  {
    path: "/pre_page",
    name: "pre_page",
    component: () => import("@/views/prePage/pre_page.vue"),
    meta: { title: "预计上线" },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/home.vue"),
    meta: {
      title: "中华民生",
      tabbar: true
    },
  },
  {
    path: "/login/:name?",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: { title: "登录" },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/login/signup.vue"),
    meta: { title: "注册" },
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("@/views/login/forget.vue"),
    meta: { title: "找回密码" },
  },
  {
    path: '/news',
    name: 'NewsClass',
    component: () => import('@/views/news/index.vue'),
    meta: {
      title: "新闻列表",
      tabbar: false
    }
  },
  {
    path: '/message',
    name: 'MessageClass',
    component: () => import('@/views/news/message.vue'),
    meta: {
      title: "站内信",
      tabbar: false
    }
  },
  {
    path: '/message/detail',
    name: 'messageDetail',
    component: () => import('@/views/news/mess-detail.vue'),
    meta: {
      title: "站内信",
      tabbar: false
    }
  },
  {
    path: '/daily',
    name: 'NewsDaily',
    component: () => import('@/views/news/daily.vue'),
    meta: {
      title: "每日一习话",
      tabbar: false
    }
  },
  {
    path: '/news-list',
    name: 'NewsList',
    component: () => import('@/views/news/list.vue'),
    meta: {
      title: "新闻",
      tabbar: false
    }
  },
  {
    path: '/meeting',
    name: 'Meeting',
    component: () => import('@/views/news/meeting.vue'),
    meta: {
      title: "相关文件",
      tabbar: false
    }
  },
  {
    path: '/file-list',
    name: 'FileList',
    component: () => import('@/views/news/file-list.vue'),
    meta: {
      title: "相关文件",
      tabbar: false
    }
  },
  {
    path: '/news/info',
    name: 'NewsInfo',
    component: () => import('@/views/news/detail.vue'),
    meta: {
      title: "新闻资讯",
      tabbar: false
    }
  },
  {
    path: "/list",
    component: () => import("@/views/list/index.vue"),
    children: [
      {
        path: "",
        name: "list",
        component: () => import("@/views/list/list.vue"),
        meta: { title: "助力" },
      },
      {
        path: "/list/:id",
        component: () => import("@/views/list/detail.vue"),
        meta: { title: "助力详情" },
      },
    ],
  },
  {
    path: "/position",
    component: () => import("@/views/position/position.vue"),
    meta: { title: "持仓", tabbar: true },
  },
  {
    path: "/selltips",
    component: () => import("@/views/position/sellTips.vue"),
    meta: { title: "持仓" },
  },
  {
    path: "/my",
    component: () => import("@/views/user/index.vue"),
    meta: { title: "我的", tabbar: true },
    children: [
      {
        path: "/",
        name: "myIndex",
        component: () => import("@/views/user/my.vue"),
        meta: { title: "我的资产", tabbar: true },
      },
	  {
	    path: "score",
	    name: "myScore",
	    component: () => import("@/views/user/score.vue"),
	    meta: { title: "民生积分", tabbar: true },
	  },{
	    path: "bz",
	    name: "BZ",
	    component: () => import("@/views/user/bz.vue"),
	    meta: { title: "保障专项补助金", tabbar: false },
	  },
	  {
	    path: "balance",
	    name: "myBalance",
	    component: () => import("@/views/user/balance.vue"),
	    meta: { title: "余额明细" },
	  },
	  {
	    path: "fund-list",
	    name: "myBalance2",
	    component: () => import("@/views/user/fund-list.vue"),
	    meta: { title: "专项基金明细" },
	  },
	  {
	    path: "rmb",
	    name: "RMB",
	    component: () => import("@/views/user/rmb.vue"),
	    meta: { title: "", tabbar: true },
	  },
	  {
	    path: "digital",
	    name: "digital",
	    component: () => import("@/views/user/digital.vue"),
	    meta: { title: "明细" },
	  },
	  {
	    path: "total-balance",
	    name: "totalBalance",
	    component: () => import("@/views/user/total.vue"),
	    meta: { title: "总资产明细", tabbar: true },
	  },
	  {
	    path: "gold",
	    name: "gold",
	    component: () => import("@/views/user/gold.vue"),
	    meta: { title: "", tabbar: true },
	  },
      {
        path: "/order",
        name: "order",
        component: () => import("@/views/record/order.vue"),
        meta: { title: "", tabbar: true },
      },
	  {
	    path: "/score-rule",
	    name: "scoreRule",
	    component: () => import("@/views/user/score-rule.vue"),
	    meta: { title: "贡献值说明" },
	  },
	  {
	    path: "/sign-rule",
	    name: "signRule",
	    component: () => import("@/views/sign/sign-rule.vue"),
	    meta: { title: "签到规则" },
	  },
	  {
	    path: "/zh-rule",
	    name: "zhRule",
	    component: () => import("@/views/user/zh-rule.vue"),
	    meta: { title: "中国民生基金" },
	  },
	  {
	    path: "/lv-rule",
	    name: "lvRule2",
	    component: () => import("@/views/user/my.vue"),
	    meta: { title: "用户等级", tabbar: true },
	  },
	  {
	    path: "/lv",
	    name: "lvRule",
	    component: () => import("@/views/user/lv.vue"),
	    meta: { title: "等级" },
	  },
      /*{
        path: "/income",
        name: "income",
        component: () => import("@/views/record/income.vue"),
        meta: { title: "认购项目收益", tabbar: true },
      },*/
    ]
  },
  {
    path: "/subscribe/:id?",
    name: "subscribe",
    component: () => import("@/views/subscribe/subscribe.vue"),
    meta: { title: "认购" },
  },
  {
    path: "/share",
    name: "Share",
    component: () => import("@/views/share/share.vue"),
    meta: { title: "邀请好友", tabbar: true },
  },
  {
    path: "/share1",
    name: "Share1",
    component: () => import("@/views/share/share-1.vue"),
    meta: { title: "邀请好友", tabbar: true },
  },
  {
    path: "/roll",
    name: "roll",
    component: () => import("@/views/share/roll.vue"),
    meta: { title: "幸运转盘" },
  },
  {
    path: "/record_roll",
    name: "recordRoll",
    component: () => import("@/views/record/roll.vue"),
    meta: { title: "抽奖记录" },
  },
  {
    path: "/share2",
    name: "Share2",
    component: () => import("@/views/share/share-2.vue"),
    meta: { title: "邀请好友", tabbar: true },
  },

  {
    path: "/share-more",
    name: "ShareMore",
    component: () => import("@/views/share/shareMore.vue"),
    meta: { title: "邀请好友", tabbar: true },
  },
  {
    path: "/share-rule",
    name: "ShareRule",
    component: () => import("@/views/share/share-rule.vue"),
    meta: { title: "考核标准", tabbar: true },
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/share/chat.vue"),
    meta: { title: "官方群聊" },
  },
  {
    path: "/active",
    name: "explainActive",
    component: () => import("@/views/share/active.vue"),
    meta: { title: "激活账户" },
  },
  {
    path: "/share/explain",
    name: "explain",
    component: () => import("@/views/share/shareExplain.vue"),
    meta: { title: "邀请好友说明" },
  },
  {
    path: "/award",
    name: "award",
    component: () => import("@/views/award/award.vue"),
    meta: { title: "领取奖励" },
  },
  {
    path: "/levelawardlist",
    name: "levelawardlist",
    component: () => import("@/views/team/levelawardlist.vue"),
    meta: { title: "团队奖励记录" },
  },
  {
    path: "/recharge",
    name: "recharge",
    component: () => import("@/views/recharge/recharge.vue"),
    meta: { title: "在线充值" },
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("@/views/team/team.vue"),
    meta: { title: "我的团队", tabbar: true },
  },
  {
    path: "/team-ext",
    name: "TeamBz",
    component: () => import("@/views/team/ext.vue"),
    meta: { title: "团队补助金" },
  },
  {
    path: "/system",
    name: "TeamSystem",
    component: () => import("@/views/team/system.vue"),
    meta: { title: "团队规则" },
  },
  {
    path: "/team-rule",
    name: "TeamRule",
    component: () => import("@/views/team/rule.vue"),
    meta: { title: "团队奖励制度", tabbar: true },
  },
  {
    path: "/assets/:id?",
    name: "assets",
    component: () => import("@/views/assets/assets.vue"),
    meta: { title: "我的资产" },
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    component: () => import("@/views/withdraw/index.vue"),
    meta: { title: "提现" },
  },
  {
    path: "/withdraw2",
    name: "Withdraw2",
    component: () => import("@/views/withdraw/index2.vue"),
    meta: { title: "提现" },
  },
  {
    path: "/withdraw3",
    name: "Withdraw3",
    component: () => import("@/views/withdraw/index3.vue"),
    meta: { title: "提现" },
  },
  {
    path: "/record_wthdraw",
    name: "Withdraw_r",
    component: () => import("@/views/record/withdraw.vue"),
    meta: { title: "提现记录" },
  },
  {
    path: "/record_wthdraw2",
    name: "Withdraw_r2",
    component: () => import("@/views/record/withdraw2.vue"),
    meta: { title: "提现记录" },
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import("@/views/leaderboard/leaderboard2.vue"),
    meta: { title: "排行榜", tabbar:true },
  },
  {
    path: "/rank2",
    name: "rank2",
    component: () => import("@/views/leaderboard/leaderboard2.vue"),
    meta: { title: "排行榜", tabbar:true },
  },
  {
    path: "/rank-rule",
    name: "rankRule",
    component: () => import("@/views/leaderboard/rule.vue"),
    meta: { title: "规则" },
  },
  {
    path: "/record_recharge",
    name: "recharge_r2",
    component: () => import("@/views/record/recharge.vue"),
    meta: { title: "充值记录" },
  },
  {
    path: "/detail_recharge",
    name: "recharge_r",
    component: () => import("@/views/user/recharge.vue"),
    meta: { title: "充值余额明细" },
  },
  {
    path: "/record_transfer",
    name: "transfer_list",
    component: () => import("@/views/record/transfer.vue"),
    meta: { title: "转账记录" },
  },
  {
    path: "/fund",
    name: "fund",
    component: () => import("@/views/project/list.vue"),
    meta: { title: "基金", tabbar:true  },
  },
  {
    path: "/new-award",
    name: "newAward",
    component: () => import("@/views/project/new-award.vue"),
    meta: { title: "积分奖励", tabbar:true  },
  },
  {
    path: "/team-lv1",
    name: "teamLv1",
    component: () => import("@/views/project/list5.vue"),
    meta: { title: "团队奖励"  },
  },
  {
    path: "/fund2",
    name: "fund2",
    component: () => import("@/views/project/list2.vue"),
    meta: { title: "基金", tabbar:true  },
  },
  {
    path: "/fund-pro",
    name: "fundPro",
    component: () => import("@/views/project/list3.vue"),
    meta: { title: "基金", tabbar:true  },
  },
  {
    path: "/lva",
    name: "lva",
    component: () => import("@/views/project/lva.vue"),
    meta: { title: "民生等级" },
  },
  {
    path: "/fund-in",
    name: "fundIn",
    component: () => import("@/views/project/fund-in.vue"),
    meta: { title: "预审", tabbar:true  },
  },
  {
    path: "/ms",
    name: "MS",
    component: () => import("@/views/project/ms.vue"),
    meta: { title: "民生", tabbar:true  },
  },
  {
    path: "/ms-rec",
    name: "MS",
    component: () => import("@/views/project/ms-rec.vue"),
    meta: { title: "记录", tabbar:true  },
  },
  {
    path: "/pro-list6",
    name: "proList6",
    component: () => import("@/views/project/list6.vue"),
    meta: { title: "民生就业保障"  },
  },
  {
    path: "/pro-rec6",
    name: "proRec6",
    component: () => import("@/views/project/record6.vue"),
    meta: { title: "申领记录"  },
  },
  {
    path: "/fund/record",
    name: "fundRecord0",
    component: () => import("@/views/project/record.vue"),
    meta: { title: "基金", tabbar:true  },
  },
  {
    path: "/fund/record2",
    name: "fundRecord2",
    component: () => import("@/views/project/record2.vue"),
    meta: { title: "领取记录", tabbar:true  },
  },
  {
    path: "/fund/record3",
    name: "fundRecord3",
    component: () => import("@/views/project/record3.vue"),
    meta: { title: "领取记录", tabbar:true  },
  },
  {
    path: "/fund/record4",
    name: "fundRecord4",
    component: () => import("@/views/project/record4.vue"),
    meta: { title: "领取记录", tabbar:true  },
  },
  {
    path: "/set/address",
    name: "SetAddress",
    component: () => import("@/views/set/address.vue"),
    meta: { title: "收货地址" },
  },
  {
    path: "/fund/record5",
    name: "fundRecord5",
    component: () => import("@/views/project/record5.vue"),
    meta: { title: "申领记录", tabbar:true  },
  },
  {
    path: "/team-record",
    name: "teamRecord",
    component: () => import("@/views/user/team-record.vue"),
    meta: { title: "团队奖励"  },
  },
  {
    path: "/fund-record",
    name: "fundRecord",
    component: () => import("@/views/user/fund-record.vue"),
    meta: { title: "基金收益"  },
  },
  {
    path: "/sign-record",
    name: "signRecord",
    component: () => import("@/views/user/sign-record.vue"),
    meta: { title: "福利"  },
  },
  {
    path: "/sign",
    name: "Sign",
    component: () => import("@/views/sign/index.vue"),
    meta: { title: "每日签到" },
  },
  {
    path: "/transfer/search",
    name: "transferSearch",
    component: () => import("@/views/transfer/search.vue"),
    meta: { title: "转账查找" },
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: () => import("@/views/transfer/transfer.vue"),
    meta: { title: "转账" },
  },
  {
    path: "/kefu",
    name: "kefu",
    component: () => import("@/views/kefu/kefu.vue"),
    meta: { title: "客服中心" },
  },
  {
    path: "/online",
    name: "online",
    component: () => import("@/views/kefu/online.vue"),
    meta: { title: "在线客服" },
  },
  {
    path: "/kefu/recharge",
    name: "onlineRecharge",
    component: () => import("@/views/kefu/onlineRecharge.vue"),
    meta: { title: "专属客服" },
  },
  {
    path: "/card",
    component: () => import("@/views/bankCard/index.vue"),
    children: [
      {
        path: "",
        name: "CardInfo",
        component: () => import("@/views/bankCard/cardInfo.vue"),
        meta: { title: "收款账户" },
      },
      {
        path: "/card/bind",
        name: "CardBind",
        component: () => import("@/views/bankCard/bind.vue"),
        meta: { title: "绑定银行卡" },
      },
      {
        path: "/card/bindBankcard",
        name: "bindBankcard",
        component: () => import("@/views/bankCard/bindBankcard.vue"),
        meta: { title: "绑定银行卡" },
      },
      {
        path: "/card/bindAlipay",
        name: "bindAlipay",
        component: () => import("@/views/bankCard/bindAlipay.vue"),
        meta: { title: "绑定支付宝" },
      },
    ],
  },
  {
    path: "/project",
    component: () => import("@/views/project/index.vue"),
    meta: { title: "分类", tabbar: true },
    children: [
      {
        path: "/project/class",
        name: "projectClass",
        component: () => import("@/views/project/class.vue"),
        meta: { title: "分类", tabbar: true },
      },
      {
        path: "/",
        name: "projectList",
        component: () => import("@/views/project/list.vue"),
        meta: { title: "列表", tabbar: true},
      },
      {
        path: "/project/detail",
        name: "projectDetail",
        component: () => import("@/views/project/detail.vue"),
        meta: { title: "详情" },
      },
    ],
  },
  {
    path: "/set",
    component: () => import("@/views/set/index.vue"),
    children: [
      {
        path: "",
        name: "Settings",
        component: () => import("@/views/set/settings.vue"),
        meta: { title: "设置" },
      },
      {
        path: "/set/info",
        name: "UserInfo",
        component: () => import("@/views/set/userInfo.vue"),
        meta: { title: "个人信息" },
      },
      {
        path: "/set/set_pwd",
        name: "SetPwd",
        component: () => import("@/views/set/setPwd.vue"),
        meta: { title: "创建交易密码" },
      },
      {
        path: "/set/set_pay_pwd",
        name: "SetPayPwd",
        component: () => import("@/views/set/setPayPwd.vue"),
        meta: { title: "修改交易密码" },
      },
      {
        path: "/set/login_pwd",
        name: "SetLoginPwd",
        component: () => import("@/views/set/setLoginPwd.vue"),
        meta: { title: "修改登录密码" },
      },
      {
        path: "/set/cert",
        name: "Cert",
        component: () => import("@/views/set/cert.vue"),
        meta: { title: "实名认证" },
      },
    ],
  },
  {
    path: "/download",
    name: "download",
    component: () => import("@/views/download/index.vue"),
    meta: { title: "下载" },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 切换路由后滚动条置顶
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

// const whiteList = [
//   "login",
//   "reg",
//   store.getters?.baseData?.csLink,
//   "list",
//   "home",
//   "user",
// ];

// router.beforeEach((to, from, next) => {
// window.document.title = to.meta.title;
// whiteList.includes(to.name) || getToken() ? next() : next("/login");
// next();
// });

export default router;
