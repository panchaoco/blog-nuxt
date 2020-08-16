<template>
  <section class="left-aside" key="aside-nav">
    <ul>
      <li v-for="(item, index) in categoryList" :key="index">
        <nuxt-link class="nav-link" v-if="item.path === '/group'" :to="`${item.path}/${item.id}`">
          <span class="iconfont" :class="`${item.icon}`" v-if="!item.ivu_icon"></span>
          <span class="ivu-icon" :class="`ivu-icon-${item.ivu_icon}`" v-else></span>
          <span class="nav-text" :class="{hot: !!item.isHot}">{{item.name}}</span>
          <transition name="line">
            <strong class="line" v-show="(item.id === Number($route.params.category) || item.path === $route.path) && isLoad "></strong>
          </transition>
        </nuxt-link>
        <nuxt-link v-else class="nav-link" :to="`${item.path}`">
          <span class="iconfont" :class="`${item.icon}`" v-if="!item.ivu_icon"></span>
          <span class="ivu-icon" :class="`ivu-icon-${item.ivu_icon}`" v-else></span>
          <span class="nav-text" :class="{hot: !!item.isHot}">{{item.name}}</span>
          <transition name="line">
            <strong class="line" v-show="(item.id === Number($route.params.category) || item.path === $route.path) && isLoad "></strong>
          </transition>
        </nuxt-link>
      </li>
    </ul>

  </section>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
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
    computed: {
      ...mapState({
        categoryList: state => state.category.categoryList,
      })
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
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "aside-nav";
</style>
