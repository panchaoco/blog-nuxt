<template>
  <div v-if="videoDetail" class="player-video-wrapper">
    <div class="main-content">
      <h4 class="title">{{videoDetail.title}}</h4>
      <p class="desc">{{videoDetail.desc}}</p>
      <div class="video-wrapper">
<!--        <iframe class="iframe" :src="videoDetail.video_link" frameborder="0"></iframe>-->
        <video controls :src="videoDetail.video_link"></video>
      </div>
      <div class="markdown-body" ref="body" v-html="videoDetail.content"></div>
      <blog-comment :replayUser="replayUser" @clearReplay="replayUser = null"></blog-comment>
    </div>
    <aside class="aside">
      <h2>视频集</h2>
      <div class="block">
        <h4>React</h4>
        <ul>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
          <li><span>React教学视频一</span></li>
        </ul>
      </div>
    </aside>
    <aside class="tags">
      <ul>
        <li v-for="(item, index) in tags" :key="index" :class="{active: tagIndex === index}" @mouseover="onMouseover" @mouseout="onMouseout">{{item}}</li>
      </ul>
    </aside>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import BlogComment from '../../components/comment/comment';
  export default {
    name: 'PlayerVideo',
    fetch({ store, params }) {
      return Promise.all([
        store.dispatch('video/getVideoDetail', params),
      ])
    },
    data() {
      return {
        replayUser: null,
        tags: ['React', 'Vue', 'Node', 'Python', 'Flutter'],
        tagIndex: 0,
        timer: null
      }
    },
    computed: {
      ...mapState({
        videoDetail: state => state.video.videoDetail
      })
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
       this.handleAside()
      })
    },
    methods: {
      handleAside() {
        this.timer = setInterval(() => {
          if (this.tagIndex < this.tags.length - 1) {
            this.tagIndex += 1;
          } else  {
            this.tagIndex = 0;
          }
        }, 3000)
      },
      getVideoDetail() {

      },
      onMouseover() {
        clearInterval(this.timer)
      },
      onMouseout() {
        this.handleAside()
      }
    },
    components: {
      BlogComment
    }
  }
</script>

<style lang="less" scoped>
  .player-video-wrapper {
    display: flex;
    .main-content {
      width: 800px;
      .video-wrapper {
        .iframe {
          width: 800px;
          height: 40em;
          overflow: hidden;
        }
        > video {
          width: 100%;
          border: none;
          outline: none;
        }

      }
      .title {
        padding: 15px 0;
        font-size: 18px;
      }
      .desc {
        font-size: 16px;
        padding-bottom: 15px;
      }
      .markdown-body {
        margin: 10px 0;
      }
    }
    .aside {
      flex: 1;
      margin-left: 15px;
      background-color: #ffffff;
      padding-left: 10px;
      margin-top: 20px;
      > h2 {
        font-size: 18px;
        font-weight: normal;
        padding: 10px 0;
      }
      .block {
        width: 100%;
        h4 {
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 10px;
          color: #0b7eff;
        }
        ul {
          border-left: 1px solid #dddddd;
          margin-left: 10px;
          transition: all .2s;
          &:hover {
            border-color: #0b7eff;
          }
          li {
            font-size: 14px;
            padding: 10px 0 10px 30px;
            position: relative;
            cursor: pointer;
            transition: all .2s;
            &::after {
              position: absolute;
              content: ' ';
              width: 20px;
              height: 1px;
              background-color: #e4e4e4;
              left: 0;
              top: 20px;
              transition: all .2s;
            }

            &:hover {
              padding-left: 36px;
              span {
                text-decoration: underline;
              }
              &::after {
                background-color: #0b7eff;
              }
            }
          }
        }
      }
    }
    .tags {
      position: fixed;
      right: 0;
      top: 300px;
      ul {
        li {
          font-size: 15px;
          width: 60px;
          height: 28px;
          line-height: 28px;
          color: #ffffff;
          text-align: center;
          margin-bottom: 20px;
          transition: all .3s;
          transform: translateX(55px);
          &:nth-child(1) {
            background-color: #440fda;
          }
          &:nth-child(2) {
            background-color: #b614d7;
          }
          &:nth-child(3) {
            background-color: #e30a66;
          }
          &:nth-child(4) {
            background-color: #478561;
          }
          &:nth-child(5) {
            background-color: #aa8626;
          }
          &.active {
            transform: translateX(0);
          }
        }
      }
    }
  }
</style>
