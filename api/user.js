import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/v1/api/user_info',
    method: 'get'
  })
}

export function getPhoneCode(data) {
  return request({
    url: '/v1/api/code',
    method: 'post',
    data
  })
}
