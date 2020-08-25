<template>
  <div class="weather snow">
            <blog-canvas key="bg"></blog-canvas>
    <blog-header-top class="app-header"></blog-header-top>
    <div class="nuxt-view" ref="nuxtWrapper">
      <div class="left-container" v-if="showLeft">
        <blog-aside-nav></blog-aside-nav>
      </div>
      <nuxt class="router-page"/>
    </div>
    <client-only>
      <player v-if="openPlayer"></player>
    </client-only>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import BlogHeaderTop from '../components/header-top/header-top'
  import BlogAsideNav from '../components/aside-nav/aside-nav'
  import BlogRightAside from '../components/right-aside/right-aside'
  import BlogCanvas from '../components/canvas/canvas'
  import BlogWrapper from '../components/wrapper/wrapper'
  import Player from '../components/player'

  export default {
    computed: {
      isShow() {
        return this.$route.name !== 'article-id'
      },
      ...mapState({
        openPlayer: state => state.common.openPlayer
      }),
      showLeft() {
        return !this.$route.path.includes('topic')
      }
    },
    fetch({ store }) {

    },
    async mounted() {
      this.setClickPoint()
      if (process.client) {
        this.getUserInfo()
      }
    },
    components: {
      BlogHeaderTop,
      BlogAsideNav,
      BlogRightAside,
      BlogCanvas,
      BlogWrapper,
      Player
    },
    watch: {
      $route() {
      }
    },
    methods: {
      getUserInfo() {
        this.$store.dispatch('user/getUserInfo')
      },
      setClickPoint() {
        let a_idx = 0
        this.$store.dispatch('category/getCategory')
        jQuery(document).ready(function($) {
          $('body').click(function(e) {
            const a = new Array('天真', '富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善')
            const $i = $('<span/>').text(a[a_idx])
            a_idx = (a_idx + 1) % a.length
            let x = e.pageX,
              y = e.pageY
            $i.css({
              'z-index': 999999999999999999999999999999999999999999999999999999999999999999999,
              'top': y - 20,
              'left': x,
              'position': 'absolute',
              'font-weight': 'bold',
              'color': '#0b7eff',
              'font-size': 18
            })
            $('body').append($i)
            $i.animate({
                'top': y - 180,
                'opacity': 0
              },
              1000,
              function() {
                $i.remove()
              })
          })
        });
      }
    }
  }
</script>

<style lang="less" scoped>

  .nuxt-view {
    width: 1150px;
    display: flex;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    .left-container {
      flex: 0 0 170px;
      width: 170px;
      padding-top: 20px;
    }

    .router-page {
      flex: 1;
      transform-origin: left;
      min-height: calc(100vh - 60px);
    }
  }
</style>
