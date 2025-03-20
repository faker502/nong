import request from '@/utils/request'

// 登录方法
export function loginApi(data) {
  return request({
    url: '/home/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
export function LoginSilenceApi(data) {
  return request({
    url: '/home/LoginSilence',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
// 登录方法
export function registerApi(data) {
  return request({
    url: '/home/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
//获取验证码
export function getImageCodeApi(data){
  return request({
    url: '/home/captchaImage',
    method: 'get',
    data: data
  })
}

//获取验证码
export function getPhoneCodeApi(data) {
    return request({
        url: '/home/getPhoneCode',
        method: 'post',
        data: data
    })
}

// 用户信息方法
export function userInfoApi(data) {
  return request({
    url: '/home/user/info',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}