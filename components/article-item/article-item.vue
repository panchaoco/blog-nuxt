<template>
  <div class="hot-container">
    <!--    <slide :banners="banners"></slide>-->
    <div class="hot-content">
      <ul v-if="!isFetching">
        <li v-for="(item, index) in articleList" :key="index">
          <client-only>
            <skeleton-list></skeleton-list>
          </client-only>
        </li>
      </ul>
      <ul class="article-item-wrapper" v-else>
        <li class="article-item" v-for="(item, index) in articleList" :key="index">
          <div class="hot-item">
            <span class="tag" :class="{original: !!item.original}">{{ item.original ? '原创' : '转载' }}</span>
            <div class="img-box">
              <img v-lazy="item.img_src" :alt="item.title" :title="item.title">
            </div>
            <div class="content">
              <div class="top">
                <nuxt-link :to="`/article/${item.id}`"><h1>{{item.title}}</h1></nuxt-link>
                <p>{{item.desc}}</p>
              </div>
              <div class="profile">
                <div class="item time">
                  <span class="iconfont icon-time_fill" style="font-size: 12px;"></span>
                  <span>{{item.updated_at | formatTime}}</span>
                </div>
                <div class="item up">
                  <span class="iconfont icon-browse_fill"></span>
                  <span>{{item.look_count}}</span>
                </div>
                <div class="item">
                  <span class="iconfont icon-message_fill"></span>
                  <span>{{item.comment_count}} </span>
                </div>
                <div class="item">
                  <span class="iconfont icon-like_fill"></span>
                  <span>{{item.thumbs_up_count}} </span>
                </div>
                <div class="item">
                  <span class="iconfont icon-order_fill"></span>
                  <span class="btn open-close" @click="onOpen(item, index)">
                    {{ item.comment_count > 0 ? item.openComment ? '收起评论' : '展开评论' : '暂无评论'}}
                  </span>
                </div>
              </div>
            </div>

          </div>
          <client-only>
            <ul class="comments" :class="{open: item.openComment}" v-if="item.comments">
              <li class="comment-item" v-for="(cItem, index) in item.comments.slice(0, 2)" :key="index">
                <div class="avatar-img">
                  <img v-lazy="cItem.avatar" alt="">
                </div>
                <div class="comment-cont">
                  <div class="info">
                    <span>{{cItem.user.nickname}}</span>
                    <span>{{cItem.created_at}}</span>
                  </div>
                  <p class="replay" v-if="cItem.reply_user"> 回复 <strong>{{cItem.reply_user.nickname}}</strong></p>
                  <p>{{cItem.content}}</p>
                </div>
              </li>
            </ul>
          </client-only>
        </li>
      </ul>
    </div>
    <!--<blog-footer></blog-footer>-->
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Slide from '../slide/slide'

  export default {
    name: 'article-item',
    props: ['articleList'],
    transition: 'move-right',
    data() {
      return {
        hots: [],
        slides: [],
        swiperOption: {
          autoplay: {
            delay: 3500,
            disableOnInteraction: false
          },
          pagination: {
            clickable: true,
            el: '.swiper-pagination'
          },
          setWrapperSize: true,
          mousewheel: true,
          observeParents: true,
          // 禁用 PC 拖动手指样式
          grabCursor: false,
          // 警用 PC 拖动
          simulateTouch: false,
          preloadImages: false,
          lazy: true
        },
        openComment: false
      }
    },
    computed: {
      ...mapState({
        bodyWidth: state => state.common.bodyWidth,
        banners: state => state.common.banners,
        isFetching: state => state.article.list.isFetching
      })
    },
    created() {
      // this.getArticle();
      // this.getBanners()
    },
    methods: {
      ...mapMutations({
        updateLeftClick: 'common/updateLeftClick'
      }),
      getBanners() {
        this.$store.dispatch('common/getBanners', {
          method: 'GET',
          body: { product_name: 'article' }
        }).then(res => {
          if (res.state === 0) {
            this.slides = res.data
          }
        })
      },
      onOpen(item, index) {
        if (item.comment_count === 0) return
        const newItem = Object.assign(item, {
          openComment: !!!item.openComment
        })
        const data = JSON.parse(JSON.stringify(this.articleList))
        this.$set(data, index, newItem)
        this.$store.commit('article/updateArticleList', data)
      },
      getArticle() {
        const article_type = this.$route.name !== 'Diary' ? 1 : 2
        this.$store.dispatch('article/article', {
          body: {
            article_type
          }
        }).then(res => {
          this.hots = res.data
        })
      },
      articleDetail(item) {
        const type = Number(this.$route.query.id)
        this.updateLeftClick(false)
        this.$router.push({
          path: `/diary/article/${item.id}`
        })
      }
    },
    filters: {
      formatTime(time) {
        return time.split(' ')[0]
      }
    },
    components: {
      Slide
    }
  }
</script>

<style lang="less" scoped>
  @import "article-item";
</style>
