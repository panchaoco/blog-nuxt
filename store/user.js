import request from '@/utils/axios'

export const state = () => {
  return {
    token: process.browser ? window.localStorage.getItem('token') : '',
    userInfo: null
  }
}

export const mutations = {
  updateUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

export const actions = {
  async getUserInfo({ commit }) {
    const res = await request('/v1/api/user_info')
    if (res.state === 0) {
      commit('updateUserInfo', res.data)
    }
  }
}
