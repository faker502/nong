import axios from "axios";
import { Toast, Dialog } from "vant";
import { getToken, removeToken } from "@/utils/auth";
import router from "@/router";
import errorCode from "@/utils/errorCode";
import store from "@/store";
import { tansParams } from "@/utils/common";
//import DomainList from '@/utils/domain.js'
//import loadDomain from '@/utils/loadDomain.js'


export let isRelogin = { show: false };


var baseURL = process.env.VUE_APP_API;
//if (process.env.NODE_ENV == 'development'){
//   baseURL = process.env.VUE_APP_API
//}

if (process.env.NODE_ENV == 'production'){
  //baseURL = loadDomain.baseUrl
}

var DOMAIN_URI = baseURL;
if (typeof(domainURI) != 'undefined') {
	DOMAIN_URI = domainURI.replace(/\/+$/, '') + '/';
}


// 创建实例
const service = axios.create({
    withCredentials: true,
  //baseURL: process.env.VUE_APP_API,
    baseURL: DOMAIN_URI,
    timeout: 30000, // 请求超时
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发送请求前，可在此携带 token
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    if (getToken()) {
      config.headers["Authorization"] = getToken();
    }
   
    // get请求映射params参数
    if (config.method === "get" && config.params) {
		
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;	  
	  
	  //update by LocalFlutter
	  if (navigator.userAgent.indexOf('ua-new-wz') !== -1) { 
	    if (url.indexOf('home/update') !== -1 && url.indexOf('doFlutterUpdate') !== -1) {	
	  	  config.baseURL = '/';
	  	  config.url += ("&domain=" + encodeURIComponent(DOMAIN_URI));
	    }
	  }		
	  //end update by LocalFlutter
	  console.log('GET URL: ' +config.url);
	  
    }



    if (config.method === "post" && config.contentType === 2) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    // 请求错误，可在此进行统一错误处理
    console.log(error);
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(async (response) => {
  // 未设置状态码则默认成功状态
  let code = response.data.code || 200;
  // 获取错误信息
  let msg = errorCode[code] || response.data.msg || errorCode["default"];
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true;
    }
    Toast.fail(msg);

    // store.dispatch("FrontLogOut").then(() => {
    //   location.href = "/";
    // });
    //跳转
    Dialog.alert({ message: "登录已过期，请重新登录", className: "dialog-error", }).then(() => {
      removeToken();
      router.push("/login");
    }).catch(() => { });
	
  } else if (code === 118) {
    
	Dialog.alert({ message: msg, className: "dialog-error", }).then(() => {
	  router.push("/set/cert");
	}).catch(() => { });
	
  } else if (code === 500) {
    Toast({message: msg,duration: 3 * 1000});
    return Promise.reject(new Error(msg));
  } else if (code === 104) {
    Toast({message: msg,duration: 3 * 1000});
    return Promise.resolve(response.data);
    //return Promise.reject(response.data);
  } else {
    return response.data;
  }
},
(error) => {
    console.log("err" + error); // for debug
    Toast({
      message: error.msg || "网络异常",
      duration: 3 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
