import Vue from "vue";
import { Toast } from "vant";
import { loginApi,LoginSilenceApi, LoginSet, LoginGet } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { getConfigKey } from "@/api/index";
import local from "@/components/SaveDoc.vue";
import VueHtml5Plus from 'vue-html5plus';
Vue.use(VueHtml5Plus);

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
	online: "",
	endTime: "",
	showMask: "",
   
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
	SET_ONLINE: (state, data) => {
	  state.online = data;
	},
	SET_TIME: (state, data) => {
	  state.endTime = data;
	},
	SET_MASK: (state, data) => {
	  state.showMask = data;
	},
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {		
      return new Promise((resolve, reject) => {
        loginApi({"key":userInfo.key}).then(res => {

          if (res.code == 200) {
            setToken(res.data.token);
            commit("SET_TOKEN", res.data.token);
			if (typeof(plus) != 'undefined') {			
				local.storageDoc('login.json', {"u":userInfo.u,"p":userInfo.p,"r":userInfo.r});
				local.storageDoc('logout.json', {"logout":"no"});								
			}
			
			//flutter save user+pwd
			if (window.flutter_inappwebview) {
				window.flutter_inappwebview.callHandler('LoginSet', userInfo.u+'__SP__'+userInfo.p);
			}		
					
			//no ok
			//LoginSet({"u":userInfo.u,"p":userInfo.p}).then(res => {}).catch(error => {});
			
            resolve();
            Toast({ message: '登录成功', duration: 3 * 1000 });
            location.href = "#/";
			//this.$router.push('/');
          } else {
            Toast({ message: res.msg, duration: 1 * 1000 });
            return false;
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
	
    LoginSilence({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginSilenceApi(userInfo).then(res => {

          if (res.code == 200) {
            setToken(res.data.token);
            commit("SET_TOKEN", res.data.token);
            resolve();
			console.log('auto login success');			
          }
		  
        }).catch(error => {});
      });
    },	
	
    // 前端登出
    FrontLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
	
	GetConfig({ commit }) {
	  return new Promise(resolve => {

		getConfigKey({mome:1, key: 'endPreheatcle'}).then(res => {	
			
		  commit("SET_ONLINE", res.data.online);		  
		  commit("SET_TIME", res.data.onlineTime);		  
		  if (res.data.uStatus && res.data.uStatus == 2) {
			  commit("SET_MASK", 1);
		  } else {
			  commit("SET_MASK", 0);
		  }
		  
		})

	  });
	},
	
  }
};

export default user;
