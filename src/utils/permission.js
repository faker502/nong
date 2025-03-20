import router from "../router";
import { getToken } from "@/utils/auth";
// import store from '@/store'



// import { Toast } from 'vant';
// import cache from "@/utils/cache"
// import { Dialog } from 'vant';

const whiteList = ["/","/login","/signup","/forget","/kefu",'/online',"/kh","/khnotice", "/news/info", "/home/domain/list","/home/domain/check/status"]; //token 白名单

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : "中华民生";
    if ((getToken() != undefined && getToken() != 'undefined') && getToken()) {
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) == -1) {
            next(`/login`); // 否则全部重定向到登录页
        }else{
            next();
        }
    }
});

router.afterEach(() => { });
