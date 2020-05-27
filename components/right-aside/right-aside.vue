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
        <div class="span" v-for="item in allCategory" :key="item.text">
          <Icon size="18" :type="item.type"></Icon>
          <span>{{item.text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
          {
            type: 'logo-angular',
            text: 'Angular'
          },
          {
            type: 'logo-android',
            text: 'Android'
          },
          {
            type: 'logo-javascript',
            text: 'JS'
          },
          {
            type: 'logo-sass',
            text: 'Sass'
          },{
            type: 'logo-python',
            text: 'Python'
          },{
            type: 'logo-nodejs',
            text: 'NodeJS'
          },
          {
            type: 'logo-markdown',
            text: 'Markdown'
          },
          {
            type: 'logo-html5',
            text: 'HTML5'
          },{
            type: 'logo-css3',
            text: 'CSS3'
          },
        ]
      }
    },
    computed: {
      ...mapState({
        articleList: state => state.article.articleList,
        categoryList: state => state.article.categoryList
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
