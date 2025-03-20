import request from '@/utils/request'

// 获取分类列表
export function getClassListApi(data) {
  return request({
    url: '/home/project/class',
    method: 'post',
    data: data
  })
}

// 获取列表
export function getListApi(data) {
  return request({
    url: '/home/project/list',
    method: 'get',
    params: data
  })
}
export function getListApi3333(data) {
  return request({
    url: '/home/project/list3333',
    method: 'get',
    params: data
  })
}
export function getListApiLv1(data) {
  return request({
    url: '/home/project/listLv1',
    method: 'get',
    params: data
  })
}
// 获取项目详情
export function getDetailApi(data) {
  return request({
    url: '/home/project/detail',
    method: 'post',
    data: data
  })
}
export function buyProjectApi(data){
  return request({
    url: '/home/order/buy',
    method: 'post',
    data: data
  })
}
export function buyProject222Api(data){
  return request({
    url: '/home/member/bz2b',
    method: 'post',
    data: data
  })
}
export function getAwardApi(data){
  return request({
    url: '/home/project/getAward',
    method: 'post',
    data: data
  })
}
export function getAwardApi3333(data){
  return request({
    url: '/home/project/getAward3333',
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
export function getAwardApi4(data){
  return request({
    url: '/home/project/getAward4',
    method: 'post',
    data: data
  })
}
export function getAwardApi5(data){
  return request({
    url: '/home/project/getAward5',
    method: 'post',
    data: data
  })
}
export function getAwardApi52(data){
  return request({
    url: '/home/project/getAward52',
    method: 'post',
    data: data
  })
}
export function myProjectApi4(data){
  return request({
    url: '/home/fund/list4',
    method: 'post',
    data: data
  })
}

export function getJFAwardApi(data){
  return request({
    url: '/home/project/getJfAward',
    method: 'post',
    data: data
  })
}


export function lingquApi(data){
  return request({
    url: '/home/project/lingqu',
    method: 'post',
    data: data
  })
}


export function getAwardApi333(data) {
  return request({
    url: '/home/member/regAwardInfo',
    method: 'post',
    data: data
  })
}
export function getAward333(data){
  return request({
    url: '/home/member/regAward',
    method: 'post',
    data: data
  })
}