<template>
  <div class="hot-container">
<!--    <slide :banners="banners"></slide>-->
    <div class="hot-content">
      <ul v-if="!isFetching">
        <li v-for="(item, index) in articleList" :key="index">
          <no-ssr>
            <skeleton-list></skeleton-list>
          </no-ssr>
        </li>
      </ul>
      <ul v-else>
        <li v-for="(item, index) in articleList" :key="index">
          <div class="hot-item">
            <span class="tag" :class="{original: !!item.original}">{{ item.original ? '原创' : '转载' }}</span>
            <img :src="item.img_src || require('../../assets/images/default.jpeg')" alt="">
            <div class="content">
              <div class="top">
                <nuxt-link :to="`/article/${item.id}?type=${item.type || ''}`"><h1>{{item.title}}</h1></nuxt-link>
                <p>{{item.desc}}</p>
              </div>
              <div class="profile">
                <div class="item up">
                  <Icon size="18" type="md-eye"/>
                  <span>{{item.look_count}}</span>阅读
                </div>
                <div class="item time">
                  <Icon type="ios-time" />&nbsp;
                  <span>{{item.updated_at | formatTime}}</span>
                </div>
                <div class="item">
                  <Icon type="md-chatbubbles" />
                  <span>{{item.comment_count}} 评论 </span>
                </div>
                <div class="item">
                  <Icon type="md-thumbs-up" />
                  <span>{{item.thumbs_up_count}} 赞 </span>
                </div>
              </div>
            </div>

          </div>
        </li>
      </ul>
    </div>
    <!--<blog-footer></blog-footer>-->
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import Slide from '../slide/slide'
  export default {
    name: "article-item",
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
          simulateTouch : false,
          preloadImages: false,
          lazy: true
        },
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
          body: {product_name: 'article'},
        }).then(res => {
          if (res.state === 0) {
            this.slides = res.data
          }
        })
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
          path: `/diary/article/${item.id}`,
        })
      }
    },
    filters: {
      formatTime(time) {
        return time.split(/\s+/)[0]
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
