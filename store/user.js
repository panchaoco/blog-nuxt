import { getUserInfo } from '@/api/user'

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
    const res = await getUserInfo()
    if (res.state === 0) {
      commit('updateUserInfo', res.data)
    }
  }
}
