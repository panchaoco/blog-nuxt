<template>
  <div class="app-wrapper app-container">
    <div class="left-container" v-if="asideNav">
      <blog-aside-nav :asideNav="asideNav" />
    </div>
    <div class="middle-container animate" v-if="$slots.middle">
      <slot name="middle"></slot>
    </div>
    <div class="right-container" v-if="asideRight">
      <blog-right-aside :aisdeRight="asideRight" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import BlogAsideNav from '../../components/aside-nav/aside-nav';
  import BlogRightAside from '../../components/right-aside/right-aside';
  export default {
    name: "Wrapper",
    props: {
      asideRight: {
        type: Boolean,
        default: true
      },
      asideNav: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        hide: false
      }
    },
    computed: {
      ...mapState({
        leftClick: state => state.common.leftClick
      })
    },
    created() {

    },
    components: {
      BlogAsideNav,
      BlogRightAside
    }
  }
</script>

<style lang="less" scoped>
  @import "./wrapper";
</style>
