<template>
  <div class="header-container">
    <div class="header-top" :class="{open: isOpenMenu}">
      <div class="header-wrapper">
        <div class="logo">
          <h1>
            <nuxt-link to="/">
              <span>Public</span>
            </nuxt-link>
          </h1>
        </div>
        <nav class="nav-wrapper">
          <ul>
            <li v-for="(item, index) in navigation" :key="index" v-if="item.show">
              <nuxt-link :to="item.path">{{item.name}}</nuxt-link>
            </li>
          </ul>
          <div class="search-input">
            <input v-model="searchValue" placeholder="搜索内容" />
          </div>
        </nav>
        <span class="app-d">
<!--          <Icon type="ios-phone-portrait"></Icon>-->
          客户端
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "HeaderTop",
    data() {
      return {
        appNav: [
          {name: '主页', path: '/', show: true},
          {name: '技术栈', path: '/', show: true},
          {name: '音乐馆', path: '/music', show: true},
        ],
        navigation: [
          {name: '首页', path: '/', show: true},
          {name: '话题', path: '/', show: true},
        ],
        searchValue: ''
      }
    },
    props: {
      isOpenMenu: {
        type: Boolean,
        default: false
      },
      isFixed: {
        type: Boolean,
        default: false
      }
    },
    computed: {
    },
    created() {
    },
    methods: {
      searchSubmit(e) {

      },
      openMenu() {
        this.$emit('open-menu')
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "header-top";
</style>
