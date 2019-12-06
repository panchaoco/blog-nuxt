import Axios from '../utils/axios';

export const state = () => {
  return {
    videoList: [],
    videoDetail: null
  }
}

export const mutations =  {
  updateVideoList(state, videoList) {
    state.videoList = videoList
  },
  updateVideoDetail(state, detail) {
    state.videoDetail = detail;
  }
}

export const actions = {
  async getVideoList({ commit, state }, payload) {
    const res = await Axios('/v1/api/articles', {
      method: 'GET',
      params: {
        article_type: 2
      }
    });
    commit('updateVideoList', res.data || []);
    return res
  },
  async getVideoDetail ({ commit, state }, payload) {
    const res = await Axios('/v1/api/course', {
      method: 'GET',
      params: {
        id: payload.id
      }
    })
    commit('updateVideoDetail', res.data)
    return res
  }
}
