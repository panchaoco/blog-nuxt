import Axios from "../utils/axios";

export const state = () => {
  return {
    router: '',
    leftClick: false,
    banners: [],
    openPlayer: false
  }
}

export const mutations = {
  updateRouter(state, router) {
    state.router = router
  },
  updateLeftClick(state, leftClick) {
    state.leftClick = leftClick
  },
  updateBanners(state, data) {
    state.banners = data;
  },
  updateOpenPlayer(state, openPlayer) {
    state.openPlayer = openPlayer;
  }
}

export const actions = {
  async getBanners({commit}, payload) {
    const res = await Axios('/v1/api/banners', payload);
    commit('updateBanners', res.data || [])
    return res
  }
}
