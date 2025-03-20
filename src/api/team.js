import request from '@/utils/request'

export function getlevelAwardApi(data = {}) {
  return request({
    url: '/home/levelaward/list',
    method: 'post',
    data: data
  })
}