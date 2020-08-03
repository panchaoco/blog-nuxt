import Axios from '../utils/axios';
import { routes } from '../config/route'
import { deepClone } from '../utils'

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

function handleRoutes(data = []) {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    const dataItem = deepClone(data[i]);
    const index = routes.findIndex(item => {
      return item.title.trim() === dataItem.name.trim()
    });
    if (index > -1) {
      dataItem.path = routes[index].path;
      newData.push(dataItem);
      // break;
    }
  }
  return newData;
}

export const actions = {
  async getCategory({ commit, state }, payload) {
    const res = await Axios('/v1/api/category', payload);
    const data = handleRoutes(res.data || [])
    commit('updateCategoryList',  data);
    return res
  },
}