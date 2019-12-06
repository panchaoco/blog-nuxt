<template>
  <div class="travel">
    <blog-wrapper>
      <blog-article-item slot="middle" :articleList="articleList"></blog-article-item>
    </blog-wrapper>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogLeftAside from '../../components/aside-nav/aside-nav';
  import BlogArticleItem from '../../components/article-item/article-item';
  export default {
    name: 'travel',
    transition: 'move',
    fetch({ store }) {
      return Promise.all([
        store.dispatch('article/article', {
          article_type: 3
        })
      ])
    },
    components: {
      BlogLeftAside,
      BlogWrapper,
      BlogArticleItem
    },
    computed: {
      ...mapState({
        articleList: state => state.article.articleList
      })
    }
  }
</script>

<style scoped>

</style>
