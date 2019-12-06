<template>
  <section class="left-aside" key="aside-nav">
    <ul>
      <li v-for="(item, index) in leftNav" :key="index"
          :class="{active: current === index && isLoad}"

      >
        <nuxt-link class="nav-link" :to="`${item.path}?id=${index}`">
          <Icon :type="item.icon"></Icon>
          <span :class="{hot: !!item.isHot}">{{item.title}}</span>
          <transition name="line">
            <strong class="line" v-show="current === index && isLoad "></strong>
          </transition>
        </nuxt-link>
      </li>
    </ul>
    <div class="blog-user" v-if="info">
      <a href="./img/user.jpg" download>
        <img class="user-img" width="100" height="" src="./img/user.jpg" alt="">
      </a>
      <div class="info ">
        <span class="username">小二</span>
      </div>
      <div class="cate">
        <div class="item">
          <span class="name">猿人</span>
          <span class="count">{{info.code_len}}</span>
        </div>
        <div class="item">
          <span class="name">心情</span>
          <span class="count">{{info.essay_len}}</span>
        </div>
        <div class="item">
          <span class="name">分类</span>
          <span class="count">{{info.category_len}}</span>
        </div>
      </div>
      <div class="links">
        <a href="https://github.com/pc1995" title="github" target="_blank">
          <Icon size="20" type="logo-github" />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex'
  import { routes } from '../../config/route'
  export default {
    name: "LeftAside",
    data() {
      return {
        leftNav: routes,
        current: 0,
        route: '',
        isLoad: false,
        info: null
      }
    },
    created() {
    },
    mounted() {
      if (process.browser) {
        this.current = this.leftNav.findIndex(item => item.path === window.location.pathname)
      }
      this.$nextTick(() => {
        this.isLoad = true
      })
    },
    methods: {
      ...mapMutations({
        updateLeftClick: 'common/updateLeftClick'
      }),
      toggle(item, index) {
        this.current = index
        this.updateLeftClick(true)
        setTimeout(() => {
          this.updateLeftClick(false)
        }, 600)
        this.$router.push({
          path: item.path,
          query: {
            id: index
          }
        })
      },
      getBlogInfo() {
        this.$store.dispatch('blog/blogInfo').then(res => {
          this.info = res.data
        })
      }
    },
    watch: {
      $route(val) {
        if (process.browser) {
          this.current = this.leftNav.findIndex(item => item.path === window.location.pathname)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "aside-nav";
</style>
