import { mapState } from 'vuex';

export default {
  fetch({ store, params, query }) {
    return Promise.all([
      store.dispatch('article/articleDetail', params),
      store.dispatch('article/getComments', {
        article_id: params.id
      }),
    ])
  },
  computed: {
    ...mapState({
      article: function(state) {
        if (this.$route.query.type === '3') {
          return state.video.videoDetail
        }
        return state.article.articleDetail
      },
      commentList: state => state.article.commentList,
    })
  },
  methods: {
    setHighlight() {
      this.$nextTick(() => {
        const pres = document.querySelectorAll('pre')
        const body = document.querySelector('.markdown-body')
        if (body.children.length > 0) {
          const arr = Array.from(body.children).filter(item => item.tagName === 'P' || item.tagName.includes('H'))
          if (arr.length === Array.from(body.children).length) {
            Array.from(body.children).forEach(item => {
              if (item.tagName === 'P') {
                item.classList.add('text-indent')
              }
            })
          }
        }
        Array.from(pres).map(item => {
          const code = item.querySelector('code')
          if (!item.className && !code.className) {
            item.className = 'padding'
          }
        })
      })
    },
  }
}
