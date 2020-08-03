<template>
    <blog-wrapper :asideNav="false">
        <div slot="middle">
            <blog-home-rec :articleList="articleList" />
        </div>
    </blog-wrapper>
</template>

<script>
  import { mapState } from 'vuex';
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogHomeRec from '../../components/article-item/article-item';
  export default {
    name: 'Category',
    components: {
      BlogWrapper,
      BlogHomeRec
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
      })
    },
  }
</script>

<style scoped>

</style>