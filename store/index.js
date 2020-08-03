export const actions = {
  nuxtServerInit(store, { req }) {
    const initData = [
      store.dispatch('article/article', {

      }),
      store.dispatch('category/getCategory'),
      store.dispatch('tag/getTagList'),
      store.dispatch('article/getHotArticleList'),

    ]

    return Promise.all(initData);
  }

}
