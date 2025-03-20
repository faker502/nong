import axios from 'axios'		//引入axios
import { Toast } from 'vant'	//引入Toast
//import DomainList from '@/utils/domain.js'
import loadDomain from '@/utils/loadDomain.js'

export function upLoaderImg (file) {	//file为 你读取成功的回调文件信息

	//new 一个FormData格式的参数
	let params = new FormData()
	params.append('file', file)
	/*let config = {
        headers: { //添加请求头
          	'Content-Type': 'multipart/form-data',
          	 'Access-Control-Allow-Origin': '*',

        },
        withCredentials: true
  	}*/


	var baseURL = process.env.VUE_APP_API;
	//if (process.env.NODE_ENV == 'development'){
	//   baseURL = process.env.VUE_APP_API
	//}

	if (process.env.NODE_ENV == 'production'){
	   //baseURL = DomainList.Url
		//debugger;
	  baseURL = loadDomain.baseUrl
	}



  	axios.defaults.withCredentials = true;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	return new Promise((resolve, reject) => {
		//把 uploadUrl 换成自己的 上传路径
		axios.post('/home/uploadImg', params).then(res => {
			//debugger;
	        if (res && res.data && res.data.code == 200) {				//如果为真 resolve出去
	        	resolve(res.data)
	        	//return res
	        } else {
	        	//否则 Toast 提示
	        	Toast.fail(res.data && (res.data.msg))
	        	reject(res.data)
	        	//return res
	        }
        }).catch(err => {
        	//debugger;
          	Toast.fail('系统异常')
          	reject(err)
    	});
	})
}


