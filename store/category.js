import Axios from '../utils/axios';
import { routes } from '../config/route'

export const state = () => {
  return {
    categoryList: [],
  }
}

export const mutations = {
  updateCategoryList(state, categoryList) {
    state.categoryList = categoryList;
  }
}

export const actions = {
  async getCategory({ commit, state }, payload) {
    const res = await Axios('/v1/api/category', payload);
    const data = res.data.map(item => {
      const index = routes.findIndex(item => item.title === item.name);
      console.log('index', index)
      if (index > -1) {
        item.path = routes[index].path;
      }
      return item;
    }).concat([
      {
        name: '个人资料',
        ivu_icon: 'md-easel',
        path: '/bloguser',
      },
      {
        name: '前端面试题',
        ivu_icon: 'ios-grid',
        path: '/interview',
      },

      {
        name: '客户端',
        ivu_icon: 'ios-phone-portrait',
        path: '/app',
      },
    ])
    commit('updateCategoryList',  data);
    return res
  },
}