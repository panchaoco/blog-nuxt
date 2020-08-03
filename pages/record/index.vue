<template>
  <BlogWrapper :aside-nav="false" :aside-right="false" class="record-container">
    <div slot="middle">
      <ul class="record-content">
        <li class="record-item" v-for="(item, index) in articleNode" :key="index">
          <div class="year">
            <div class="line">
              <span class="point"></span>
            </div>
            <span class="year-data">{{item.year}}</span>
          </div>
          <ul class="sub-time-wrapper">
            <li v-for="sub_item in item.sub_data" :key="sub_item.id">
              <div class="sub-item">
                <div class="line">
                  <span class="point"></span>
                </div>
                <div class="content">
                  <p class="curr-time">{{sub_item.time}}</p>
                  <nuxt-link :to="`/article/${sub_item.id}`">
                    <span class="title">{{sub_item.title}}</span>
                  </nuxt-link>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </BlogWrapper>
</template>

<script>
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogAsideNav from '../../components/aside-nav/aside-nav'
  import { mapState } from 'vuex';
  export default {
    name: "Record",
    data() {
      return {
        dataSource: []
      }
    },
    transition: 'move',
    fetch({ store }) {
      return Promise.all([
        store.dispatch('article/articleNode')
      ])
    },
    computed: {
      ...mapState({
        articleNode: state => state.article.articleNode
      })
    },
    methods: {
      gotoPage(item) {
        const path = item.article_type === 2 ? '/diary/article' : '/article'
        this.$router.push({
          path: `${path}/${item.id}`
        })
      }
    },
    components: {
      BlogWrapper,
      BlogAsideNav
    }
  }
</script>

<style lang="less" scoped>
  @import "./index";
</style>
