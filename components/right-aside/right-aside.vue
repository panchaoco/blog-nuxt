<template>
  <div class="aside-recommend">
    <div class="hot">
      <h4>
        <Icon type="md-flame"/>
        {{asideHot.title}}
      </h4>
      <ul v-if="articleList.length > 0">
        <li v-for="(sub_item, sub_index) in articleList"
            :key="sub_index"
            ref="lis">
          <p class="content">
            <span class="rank">{{sub_index + 1}}</span>
            <span class="title" :title="sub_item.title">{{sub_item.title}}</span>
          </p>
        </li>
      </ul>
    </div>

    <!--<div class="curr-time">-->
      <!--<span>{{times.hours}}</span><em>:</em>-->
      <!--<span>{{times.minutes}}</span><em>:</em>-->
      <!--<span>{{times.seconds}}</span>-->
    <!--</div>-->
    <div class="category">
      <div class="tags">
        <Icon type="logo-instagram" size="18" />
        <span>标签</span>
      </div>
      <div class="cate-content">
        <div class="span" v-for="item in tagList" :key="item.icon">
          <span class="iconfont" :class="item.icon"></span>
          <span>{{item.name}}</span>
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
        articleList: state => state.article.articleList,
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
