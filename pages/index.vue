<template>

  <blog-wrapper :aside-nav="false">
    <div slot="middle" style="width: 100%">
      <!-- <slide :banners="banners"></slide> -->
      <blog-home-rec :articleList="articleList" />
    </div>
    <blog-right-aside slot="right"></blog-right-aside>
  </blog-wrapper>
</template>

<script>
  import { mapState } from 'vuex';
  import BlogWrapper from '../components/wrapper/wrapper';
  import BlogHomeRec from '../components/article-item/article-item';
  import BlogAsideNav from '../components/aside-nav/aside-nav';
  import BlogRightAside from '../components/right-aside/right-aside';
  import Slide from '../components/slide/slide';
  export default {
    head() {
      return {
        title: 'PUBLIC【博客】——主页'
      }
    },
    fetch({ store }) {
      return Promise.all([
        store.dispatch('common/getBanners'),
        store.dispatch('article/article', {
          article_type: store.state.category.categoryList[0].id
        }),
      ])
    },
    transition: 'slide',
    computed: {
      ...mapState({
        articleList: state => state.article.articleList,
        banners: state => state.common.banners,
      })
    },
    components: {
      BlogWrapper,
      BlogHomeRec,
      BlogAsideNav,
      BlogRightAside,
      Slide
    }
  }
</script>

