<template>
  <blog-wrapper>
    <div class="video-list-wrapper" slot="middle">
<!--      <div class="pic">-->
<!--        <img src="../../assets/images/fm.jpeg" alt="">-->
<!--      </div>-->
<!--      <div class="video">-->
<!--        <h4 class="video-title">Flutter 入门教学视频（一）</h4>-->
<!--        <video controls>-->
<!--          <source src="../../assets/video/lyf.mp4" />-->
<!--        </video>-->

<!--      </div>-->
<!--      <div class="points">-->
<!--        <div class="point-item">-->
<!--          <span>评论</span>-->
<!--        </div>-->
<!--        <div class="point-item">-->
<!--          <span></span>-->
<!--        </div>-->
<!--        <div class="point-item">-->
<!--          <span>评论</span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="desc">-->
<!--        <h4 class="desc-title">说在前面的话</h4>-->
<!--        <p>Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。 Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。</p>-->
<!--      </div>-->

      <div class="video-pic-item" v-for="(item, index) in videoList" :key="index">
        <nuxt-link :to="`/playervideo/${item.id}`" target="_blank">
          <div class="pic">
            <img :src="item.img_src" alt="">
            <div class="block">
              <div class="play-icon">
                <Icon type="md-play" />
              </div>
            </div>
          </div>
        </nuxt-link>
        <div class="info">
          <h4 class="title">{{item.title}}</h4>
          <div class="count">
            <div class="item">
              <Icon class="up" type="md-thumbs-up" size="16" />
              <span>{{item.thumbs_up_count}}</span>
            </div>
            <div class="item">
              <Icon size="18" type="md-eye"/>
              <span>{{item.look_count}}</span>
            </div>
            <div class="item">
              <Icon type="md-chatbubbles" size="16" />
              <span>66</span>
              <span>评论</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </blog-wrapper>
</template>

<script>
  import BlogWrapper from '../../components/wrapper/wrapper';
  import { mapState } from 'vuex';
  export default {
    name: 'Video',
    transition: 'move',
    fetch({ store }) {
      return Promise.all([
        store.dispatch('video/getVideoList'),
      ])
    },
    computed: {
      ...mapState({
        videoList: state => state.video.videoList,
      })
    },
    data() {
      return {
        videoPicList: [
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/1.jpg')
          },
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/2.jpeg')
          },
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/3.jpg')
          },
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/4.jpg')
          },
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/5.jpg')
          },
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/6.jpg')
          },
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/7.jpg')
          },
          {
            title: 'Flutter入门教学视频（一）',
            look_count: 124,
            thumbs_up: 544,
            comment: 66,
            pic: require('../../assets/images/pic/8.jpg')
          },
        ]
      }
    },
    components: {
      BlogWrapper
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
