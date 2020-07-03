<template>
  <div class="diary-article">
    <blog-wrapper>
      <div slot="middle" class="diary-con">
        <!--<div class="origin" :class="{self: !!article && article.original}"><span>原创</span></div>-->
        <div class="render-text" :class="{show: !!article}">
          <div class="render" v-if="article">
            <header>
              <h4 class="art-title"><span>{{article.title}}</span></h4>
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
          </div>
        </div>
        <div class="comment-container">
          <div class="comment-item" v-for="(item, index) in commentList" :key="index">
            <div class="avatar">
              <img src="~assets/images/default.jpeg" alt="">
            </div>
            <div class="content">
              <p>
                <strong>{{item.nickname}}</strong>
                <strong class="id">#{{item.id}}</strong>
              </p>
              <p class="replay" v-if="item.replay"> 回复 <strong>{{item.replay.nickname}}</strong></p>
              <p class="comment-text">{{item.content}}</p>
              <div class="row">
                <span class="item">15:40</span>
                <span class="item" @click="replay(item)">
                  <Icon type="ios-undo" size="17" />
                  <strong>回复</strong>
                </span>
                <span class="item">
                  <Icon type="ios-thumbs-up" size="13" />
                  赞
                </span>
              </div>
            </div>
          </div>
        </div>
        <blog-comment :replayUser="replayUser" @clearReplay="replayUser = null"></blog-comment>
      </div>
      <blog-right-aside slot="right"></blog-right-aside>
    </blog-wrapper>
  </div>
</template>

<script>
  import BlogHeaderTop from '../../components/header-top/header-top';
  import BlogRightAside from '../../components/right-aside/right-aside';
  import BlogLeftAside from '../../components/aside-nav/aside-nav';
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogComment from '../../components/comment/comment';
  import mixins from '../../mixins/mixins';

  export default {
    name: "article-detail",
    data() {
      return {
        href: '',
        replayUser: null
      }
    },
    mixins: [mixins],
    created() {

    },
    mounted() {
      if (process.browser) {
        this.href = window.location.href;
      }
    },
    methods: {
      replay(item) {
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
  @import "article";
</style>
