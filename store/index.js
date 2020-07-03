export const actions = {
  nuxtServerInit(store, { req }) {
    const initData = [
      store.dispatch('article/article', {

      }),
      store.dispatch('category/getCategory'),
      store.dispatch('tag/getTagList'),

    ]

    return Promise.all(initData);
  }

}
