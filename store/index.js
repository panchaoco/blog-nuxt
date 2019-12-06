export const actions = {
  nuxtServerInit(store, { req }) {
    const initData = [
      store.dispatch('article/article', {
        params: {
          article_type: 1
        }
      }),
      store.dispatch('article/category')

    ]

    return Promise.all(initData);
  }

}
