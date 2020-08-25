<template>
  <blog-wrapper :aside-nav="false">
    <div slot="middle">
      <blog-home-rec :articleList="videoList" />
    </div>
    <blog-right-aside slot="right"></blog-right-aside>
  </blog-wrapper>
</template>

<script>
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogHomeRec from '../../components/article-item/article-item';
  import BlogRightAside from '../../components/right-aside/right-aside';
  import { mapState } from 'vuex';
  export default {
    name: 'Video',
    transition: 'move',
    head() {
      return {
        title: 'PUBLIC【博客】—' + (this.categoryList ? this.categoryList.find(item => this.$route.path.includes(item.path)).name : '趣味和学习视频'),
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: 'nuxt, public, video, article'
          },
          {
            hid: 'description',
            name: 'description',
            content: this.categoryList ? 'PUBLIC【博客】—' + this.categoryList.find(item => this.$route.path.includes(item.path)).name : '趣味和学习视频'
          }
        ]
      }
    },
    fetch({ store }) {
      return Promise.all([
        store.dispatch('article/article', {
          is_video: 1
        }),
      ])
    },
    computed: {
      ...mapState({
        videoList: state => state.article.articleList,
        categoryList: state => state.category.categoryList
      })
    },
    data() {
      return {

      }
    },
    components: {
      BlogWrapper,
      BlogHomeRec,
      BlogRightAside
    }
  }
</script>

<style lang="less" scoped>
  .video-list-wrapper {
    width: auto;
    margin-left: 10px;
    display: grid;
    grid-template-columns: repeat(3, 283px);
    grid-template-rows: repeat(3, auto);
    grid-row-gap: 12px;
    grid-column-gap: 12px;
    box-sizing: border-box;
    .video-pic-item {
      width: auto;
      background-color: #ffffff;
      .pic {
        width: auto;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 220px;
          display: block;
          transition: all .2s;
        }
        .block {
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: all .2s;
          cursor: pointer;
          .play-icon {
            width: 45px;
            height: 45px;
            border: 1.5px solid #f1f1f1;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 3px;
            .ivu-icon-md-play {
              color: #f1f1f1;
              font-size: 26px;
            }
          }
        }
        &:hover {
          .block {
            opacity: 1;
          }
          img {
            transform: scale(1.1);
          }
        }
      }
      .info {
        padding-left: 10px;
        padding-bottom: 15px;
        background-color: #f8f8f8;
        .title {
          padding: 10px 0;
          font-size: 16px;
          font-weight: 400;
        }
        .count {
          font-size: 12px;
          display: flex;
          padding-top: 8px;
          .item {
            flex: 1;
            display: flex;
            align-items: center;
            font-size: 14px;
            .up {
              transform: translateY(-1px);
            }
            span {
              margin-left: 3px;
            }
          }
        }
      }
    }
  }
</style>
