<template>
  <div>
    <blog-canvas key="bg"></blog-canvas>
    <blog-header-top class="app-header"></blog-header-top>
    <div class="nuxt-view">
      <div class="left-container" v-if="!$route.path.includes('playervideo')">
        <blog-aside-nav></blog-aside-nav>
      </div>
      <nuxt class="router-page" />
    </div>
    <client-only>
      <player v-if="openPlayer"></player>
    </client-only>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import BlogHeaderTop from '../components/header-top/header-top';
  import BlogAsideNav from '../components/aside-nav/aside-nav';
  import BlogRightAside from '../components/right-aside/right-aside';
  import BlogCanvas from '../components/canvas/canvas';
  import BlogWrapper from '../components/wrapper/wrapper';
  import Player from '../components/player'
  export default {
    computed: {
      isShow() {
        return this.$route.name !== 'article-id'
      },
      ...mapState({
        openPlayer: state => state.common.openPlayer
      })
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
        console.log(this)
      }
    }
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 100px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555;
  width: 100%;
}
a {
  color: #555;
}
</style>

<style lang="less" scoped>

  .nuxt-view {
    width: 1090px;
    display: flex;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    .left-container {
      flex: 0 0 200px;
      width: 200px;
      padding-top: .2rem;
    }
    .router-page {
      flex: 1;
      transform-origin: left;
      min-height: calc(100vh - 60px);
    }
  }
</style>
