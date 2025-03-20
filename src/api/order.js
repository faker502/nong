import request from '@/utils/request'

// /project/mylist
export function myProjectApi(data){
  return request({
    url: '/home/order/list',
    method: 'post',
    data: data
  })
}
export function myProjectApi2(data){
  return request({
    url: '/home/order/list2',
    method: 'post',
    data: data
  })
}

export function myProjectApi5(data){
  return request({
    url: '/home/order/list5',
    method: 'post',
    data: data
  })
}
export function myProjectApi6(data){
  return request({
    url: '/home/order/list6',
    method: 'post',
    data: data
  })
}
export function getPackApi(data){
  return request({
    url: '/home/order/getPack',
    method: 'post',
    data: data
  })
}