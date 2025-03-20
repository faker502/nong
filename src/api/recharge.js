import request from '@/utils/request'

// 获取支付列表
export function getListApi(data) {
  return request({
    url: '/home/recharge/getList',
    method: 'post',
    data: data
  })
}

// 获取支付渠道
export function getPayMoneyApi(data) {
  return request({
    url: '/home/recharge/getPayMoneyList',
    method: 'post',
    data: data
  })
}

// 提交支付信息
export function payRequestApi(data) {
  return request({
    url: '/home/pay/request',
    method: 'post',
    data: data
  })
}

// 提交支付信息
export function payRequestNoApi(data) {
  return request({
    url: '/home/pay/requestNo',
    method: 'post',
    data: data
  })
}

//获取充值记录
export function RechargeLogsApi(data = {}) {
  return request({
    url: '/home/recharge/list',
    method: 'get',
    params: data
  })
}

export function TransferLogApi(data = {}) {
  return request({
    url: '/home/transfer/list',
    method: 'get',
    params: data
  })
}