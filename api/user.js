import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/v1/api/user_info',
    method: 'get'
  })
}
