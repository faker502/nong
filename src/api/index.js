import request from '@/utils/request'

// 获取公告是否已读
export function getIndexApi(data) {
  return request({
    url: '/home/index',
    method: 'get',
    data: data
  })
}

// 设置公告已读
export function setReadApi(data) {
  return request({
    url: '/home/closeNotice',
    method: 'post',
    data: data
  })
}

//获取系统设置
export function getConfigKey(data){
  return request({
    url: '/home/config/getConfigKey',
    method: 'post',
    data: data
  })
}

//获取提现参数设置
export function getConfigPay(data) {
  return request({
    url: '/home/config/pay',
    method: 'post',
    data: data
  })
}
//获取提现参数设置
export function getConfigPay2(data) {
  return request({
    url: '/home/config/pay2',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: '/home/update',
    method: 'get',
    params: data
  })
}

export function getUriApi(data) {
  return request({
    url: '/home/update/urls',
    method: 'post',
    params: data
  })
}