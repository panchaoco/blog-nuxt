import Axios from '../utils/axios';

export const state = () => {
  return {
    tagList: [],
  }
}

export const mutations = {
  updateTagList(state, tagList) {
    state.tagList = tagList;
  }
}

export const actions = {
  async getTagList({ commit, state, dispatch }, payload) {
    const res = await Axios('/v1/api/tags');
    commit('updateTagList', res.data)
  },
}