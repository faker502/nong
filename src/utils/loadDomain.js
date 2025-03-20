import axios from 'axios'


//debugger;
//console.log(process.env.VUE_APP_API);
//console.log(process.env.VUE_APP_DOMAIN);

const config = {
 requestUrl: process.env.VUE_APP_DOMAIN, //动态域名所在地址
 baseUrl:  process.env.VUE_APP_API,   // 接口域名，会被动态覆盖

 requestRemoteIp: () => { // 动态获取
  return new Promise((resolve,reject)=>{
	  
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.src= config.requestUrl;
    document.body.appendChild(script);

    script.onload = ()=>{
      resolve();
      config.baseUrl = domainList[0];
    }
    script.onerror = ()=>{
      reject();
    }
  })
  
 }
}

export default config
