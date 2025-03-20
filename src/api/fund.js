import request from '@/utils/request'

export function getListApi(data) {
  return request({
    url: '/home/fund/list',
    method: 'get',
    params: data
  })
}
export function getListApi6(data) {
  return request({
    url: '/home/fund/list6',
    method: 'get',
    params: data
  })
}
export function getJYApi(data) {
  return request({
    url: '/home/fund/getJY',
    method: 'post',
    data: data
  })
}
// 获取项目详情
export function getDetailApi(data) {
  return request({
    url: '/home/fund/detail',
    method: 'post',
    data: data
  })
}
export function buyProjectApi(data){
  return request({
    url: '/home/fund/buy',
    method: 'post',
    data: data
  })
}

export function myProjectApi2(data){
  return request({
    url: '/home/fund/list2',
    method: 'post',
    data: data
  })
}

export function myProjectMsApi2(data){
  return request({
    url: '/home/fund/msRec',
    method: 'post',
    data: data
  })
}

export function getAwardApi2(data){
  return request({
    url: '/home/project/getAward2',
    method: 'post',
    data: data
  })
}
export function getPackApi(data){
  return request({
    url: '/home/fund/getPack',
    method: 'post',
    data: data
  })
}