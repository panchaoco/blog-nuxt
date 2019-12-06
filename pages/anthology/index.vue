<template>
  <blog-wrapper>
    <blog-article-item slot="middle" :articleList="articleList"></blog-article-item>
    <blog-right-aside slot="right"></blog-right-aside>
  </blog-wrapper>
</template>

<script>
  import {mapState} from 'vuex';
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogArticleItem from '../../components/article-item/article-item';
  import BlogRightAside from '../../components/right-aside/right-aside';
  export default {
    name: 'anthology',
    transition: 'slide',
    fetch({ store }) {
      return Promise.all([
        store.dispatch('article/article', {
          article_type: 3
        })
      ])
    },
    computed: {
      ...mapState({
        articleList: state => state.article.articleList
      })
    },
    components: {
      BlogWrapper,
      BlogArticleItem,
      BlogRightAside
    }
  }
</script>

<style lang="less" scoped>

</style>
