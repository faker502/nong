require("es6-promise").polyfill();
import Vue from "vue";
import App from "./App.vue";
import "./vant";

import "reset-css";
import "vant/lib/index.css";
import "animate.css";
import "./styles/index.scss";
import "./assets/font/font.scss";
//import DomainList from '@/utils/domain.js'
// 读取接口域名
//import loadDomain from '@/utils/loadDomain.js'


import "./utils/permission";
import "lib-flexible/flexible";
import router from "./router";
import store from "./store";
// import Tabbar from "./components/Tabbar.vue";
import Navbar from "./components/Navbar.vue";
import Modal from "@/components/Modal.vue";
// import Empty from "@/components/Empty.vue";
import UploadImage from "@/components/UploadImage.vue";
import vanLoading from "@/components/Loading.vue";

import "@/icons";
import VueClipboard from "vue-clipboard2";
import LatticeLottery from "lattice-lottery";
import "lattice-lottery/lib/lattice-lottery.css";
import * as filters from "./utils/filters";
import { showLoading, hideLoading, vantToast } from "@/utils/toast";
import dayjs from "dayjs";

import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css'
Vue.use(VuePlyr)

import VueLuckyCanvas from '@lucky-canvas/vue'
Vue.use(VueLuckyCanvas)

// 解决300毫秒延时
import FastClick from "fastclick";
// 修复点击300ms延迟
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      FastClick.attach(document.body);
    },
    false
  );
}
FastClick.prototype.focus = function (targetElement) {
  targetElement.focus();
};

// Vue.component("tab-bar", Tabbar);
Vue.component("nav-bar", Navbar);
Vue.component("vv-modal", Modal);
// Vue.component("empty-page", Empty);
Vue.component("upload-image", UploadImage);

import { PasswordInput, NumberKeyboard, SwipeCell, Dialog } from 'vant';

Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(VueClipboard);
Vue.use(LatticeLottery);
Vue.use(SwipeCell);

Vue.config.productionTip = false;
// Vue.prototype.$encrypt = ASE.encrypt;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
Vue.prototype.$vantToast = vantToast;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$dialog = Dialog;

import notifyMessage from '@/utils/notifyMessage'
Vue.use(notifyMessage.register)

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

import VueHtml5Plus from 'vue-html5plus';
Vue.use(VueHtml5Plus);

new Vue({
  router,
  store, //挂载store，this将自动生成$store属性
  render: (h) => h(App),
}).$mount("#app");

// 读取接口域名
/*
loadDomain.requestRemoteIp().finally(res => {
 new Vue({
  router,
  store, //挂载store，this将自动生成$store属性
  render: (h) => h(App),
}).$mount("#app");

});
*/


