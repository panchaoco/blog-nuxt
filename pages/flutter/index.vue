<template>
  <blog-wrapper>
    <blog-article-item slot="middle" :articleList="articleList"></blog-article-item>
  </blog-wrapper>
</template>

<script>
  import {mapState} from 'vuex';;
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogArticleItem from '../../components/article-item/article-item';
  import Slide from '../../components/slide/slide';

  export default {
    name: 'flutter',
    transition: 'move',
    fetch({ store }) {
      return Promise.all([
        store.dispatch('article/article', {
          article_type: 5
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
      BlogArticleItem
    }
  }
</script>

<style scoped>

</style>
