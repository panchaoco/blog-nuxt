import Axios from '../utils/axios';

export const state = () => {
  return {
    articleList: [],
    articleDetail: null,
    articleNode: [],
    commentList: [],
    hotArticleList: [],
    list: {
      isFetching: false,
    }
  }
}

export const mutations = {
  updateArticleList(state, article) {
    state.articleList = article;
  },
  updateArticleDetail(state, detail) {
    state.articleDetail = detail;
  },
  updateArticleNode(state, articleNode) {
    state.articleNode = articleNode;
  },
  updateComment(state, comment) {
    state.commentList = handleComment(comment);
  },
  updateListFetching(state, fetching) {
    state.list.isFetching = fetching;
  },
  updateHotArticleList(state, list) {
    state.hotArticleList = list
  }
}

export const actions = {
  async article({ commit, state }, payload) {
    commit('updateListFetching', false);
    const res = await Axios('/v1/api/articles', {
      method: 'GET',
      params: payload
    });
    commit('updateArticleList', res.data || []);
    commit('updateListFetching', true);
    return res
  },

  async articleDetail({ commit, state, dispatch }, payload) {
    const res = await Axios('/v1/api/articles', {
      method: 'GET',
      params: payload
    });
    const lookCount = res.data.look_count || 0;
    commit('updateArticleDetail', res.data);
    dispatch('updateArticle', {
      ...payload,
      look_count: lookCount + 1
    })
    return res
  },
  async articleNode({ commit, state }, payload) {
    const res = await Axios('/v1/api/articles', payload);
    commit('updateArticleNode', handleArticleNode(res) || [])
  },
  async updateArticle({ commit, state }, payload) {
    const res = await Axios('/v1/api/articles', {
      method: 'PATCH',
      body: payload
    });
  },

  async createComment({ commit, state, dispatch }, payload) {
    const res = await Axios('/v1/api/comments', {
      method: 'POST',
      body: payload
    });
    dispatch('getComments', {
      article_id: payload.article_id
    })
    return res;
  },
  async getComments({ commit, state }, payload) {
    const res = await Axios('/v1/api/comments', {
      method: 'GET',
      params: payload
    });
    commit('updateComment', res.data || [])
    return res;
  },
  async getResume({ commit, state }, payload) {
    const res = await Axios('/v1/api/get_resume');
    return res
  },
  async getHotArticleList({ commit, state }, payload) {
    const res = await Axios('/v1/api/articles', {
      method: 'GET',
      params: {
        page: 1,
        page_size: 10,
        is_hot: 1
      }
    });
    if (res && res.state === 0) {
      commit('updateHotArticleList', res.data)
    }
  }
}

function handleArticleNode(res) {
  const dataSource = [];
  res.data.map(item => {
    const updateTime = new Date(item.updated_at.replace(/-/g,'/'));
    const year = updateTime.getFullYear();
    const month = updateTime.getMonth() + 1 < 10 ? `0${updateTime.getMonth() + 1}` : updateTime.getMonth() + 1;
    const date = updateTime.getDate() < 10 ? `0${updateTime.getDate()}` : updateTime.getDate();
    const have = dataSource.find(item => item.year === year);
    const index = dataSource.findIndex(item => item.year === year);
    const subItem = {
      time: `${month}-${date}`,
      id: item.id,
      title: item.title,
      desc: item.desc,
      article_type: item.article_type
    }
    if (have) {
      const data = JSON.parse(JSON.stringify(have));
      data.sub_data.push(subItem);
      dataSource[index] = data;
    } else {
      dataSource.push({
        year,
        sub_data: [
          subItem
        ]
      })
    }
  });
  return dataSource;
}

function handleComment(comment) {
  const newComment = JSON.parse(JSON.stringify(comment));
  newComment.forEach((item, index) => {
    const d = newComment.find(newItem => newItem.id === item.parent_id);
    if (d) {
      item.replay = d;
    }
  })
  return newComment;
}
