<template>
  <div class="aside-recommend">
    <div class="search-wrapper">
      <input type="text" placeholder="请输入搜索内容" />
      <span class="iconfont icon-search"></span>
    </div>
    <div class="hot">
      <h4>
        {{asideHot.title}}
      </h4>
      <ul v-if="hotArticleList.length > 0">
        <li v-for="(sub_item, sub_index) in hotArticleList"
            :key="sub_index"
            ref="lis"
        >
          <nuxt-link :to="`/article/${sub_item.id}`" class="content">
            <span class="rank">{{sub_index + 1}}</span>
            <span class="title" :title="sub_item.title">{{sub_item.title}}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="category">
      <div class="tags">
        <span>标签</span>
      </div>
      <div class="cate-content">
        <div class="span" v-for="item in tagList" :key="item.icon">
          <span class="iconfont icon" :class="item.icon"></span>
          <span class="name">{{item.name}}</span>
          <span class="count">[{{item.article_count}}]</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '../../utils/axios'
  import { mapState } from 'vuex';
  export default {
    name: "RightAside",
    data() {
      return {
        asideHot: {
          title: '热门浏览',
          list: [
          ]
        },
        times: {
          hours: '',
          minutes: '',
          seconds: ''
        },
        timer: null,
        categoryData: [],
        allCategory: [

        ]
      }
    },
    computed: {
      ...mapState({
        hotArticleList: state => state.article.hotArticleList,
        tagList: state => state.tag.tagList
      })
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  @import "right-aside";
</style>
