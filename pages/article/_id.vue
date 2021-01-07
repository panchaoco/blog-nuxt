<template>
  <article class="diary-article">
    <blog-wrapper :aside-nav="false">
      <div slot="middle" class="diary-con">
        <div class="origin" v-if="!!article && article.original" :class="{self: !!article && article.original}"><span>原创</span></div>
        <div class="origin" v-if="!!article && !article.original" :class="{other: !!article && !article.original}"><span>转载</span></div>
        <div class="render-text" :class="{show: !!article}">
          <div class="render" v-if="article">
            <header>
              <h1 class="art-title"><span>{{article.title}}</span></h1>
            </header>
            <div class="article-img">
              <img ref="img" :src="article.img_src" alt="">
            </div>

            <video style="width: 590px;" v-if="article.video_link" name="media" controls preload="auto">
              <source :src="article.video_link"  />
            </video>
            <div class="markdown-body" ref="body" v-html="article.content"></div>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="info" v-if="article">
            <p>本文于{{article.updated_at}}发表于 <strong>{{article.category_type}}</strong> 栏目下</p>
            <p>标签：{{article.category_type}}</p>
            <p>若需转载请注明出处：<a :href="href">{{ href }}</a> </p>
            <p>声明：所有原创博客与转载文章可随意转载，但不得用于商用，请署名来源</p>
          </div>
        </div>
        <div class="comment-container">
          <template v-if="commentList.length > 0">
            <div class="comment-item" v-for="(item, index) in commentList" :key="index">
              <div class="avatar">
                <img v-lazy="item.user.avatar" alt="">
              </div>
              <div class="content">
                <div class="user">
                  <span class="iconfont icon-mine_fill"></span>
                  <strong>{{item.user.nickname}}</strong>
                  <strong class="id">#{{item.id}}</strong>
                </div>
                <p class="replay" v-if="item.reply_user"> 回复 <strong>{{item.reply_user.nickname}}</strong></p>
                <p class="comment-text">{{item.content}}</p>
                <div class="row">
                  <span class="item">{{formatTime(item.created_at)}}</span>
                  <span class="item" @click="replay(item)"><strong>回复</strong></span>
                  <span class="item">赞</span>
                </div>
              </div>
            </div>
          </template>
          <p class="not-comment" v-else>一血还在</p>
        </div>
        <blog-comment :replayUser="replayUser" @clearReplay="replayUser = null"></blog-comment>
      </div>
      <blog-right-aside slot="right"></blog-right-aside>
    </blog-wrapper>
  </article>
</template>

<script>
  import BlogHeaderTop from '../../components/header-top/header-top'
  import BlogRightAside from '../../components/right-aside/right-aside'
  import BlogLeftAside from '../../components/aside-nav/aside-nav'
  import BlogWrapper from '../../components/wrapper/wrapper'
  import BlogComment from '../../components/comment/comment'
  import mixins from '../../mixins/mixins'
  import { formatTime } from '@/utils'
  import { mapState } from 'vuex'

  export default {
    name: "article-detail",
    data() {
      return {
        href: '',
        replayUser: null,
        formatTime
      }
    },
    head() {
      return {
        title: this.article.title + ' | PUBLIC博客站' || '...',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.article && this.article.keywords && this.article.keywords.join(',') || this.article.title || ''
          },
          {
            hid: 'description',
            name: 'description',
            content: this.article && this.article.description
          }
        ]
      }
    },
    mixins: [mixins],
    created() {

    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    mounted() {
      if (process.browser) {
        this.href = window.location.href;
      }
    },
    methods: {
      replay(item) {
        console.log('userInfo', this.userInfo, item)
        if (this.userInfo.id === item.reply_user.id) {
          return alert('不能回复自己')
        }
        this.replayUser = item;
      }
    },
    components: {
      BlogRightAside,
      BlogHeaderTop,
      BlogLeftAside,
      BlogWrapper,
      BlogComment
    }
  }
</script>

<style lang="less" scoped>
  @import "index";
</style>
