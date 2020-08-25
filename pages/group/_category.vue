<template>
  <blog-wrapper :asideNav="false">
    <div slot="middle">
      <blog-home-rec :articleList="articleList"/>
    </div>
  </blog-wrapper>
</template>

<script>
  import { mapState } from 'vuex'
  import BlogWrapper from '../../components/wrapper/wrapper'
  import BlogHomeRec from '../../components/article-item/article-item'

  export default {
    name: 'Category',
    components: {
      BlogWrapper,
      BlogHomeRec
    },
    head() {
      return {
        title: 'PUBLIC【博客】 | ' + (this.categoryList ? this.categoryList.find(item => this.$route.path.includes(item.path)).name : '文章列表'),
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: 'nuxt, public, 文章列表, article'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'PUBLIC【博客】 | ' + (this.categoryList ? this.categoryList.find(item => this.$route.path.includes(item.path)).name : '文章列表'),
          }
        ]
      }
    },
    fetch({ store, params }) {
      return Promise.all([
        store.dispatch('article/article', {
          article_type: params.category
        })
      ])
    },
    computed: {
      ...mapState({
        articleList: state => state.article.articleList,
        banners: state => state.common.banners,
          categoryList: state => state.category.categoryList,
      })
    }
  }
</script>

<style scoped>

</style>
