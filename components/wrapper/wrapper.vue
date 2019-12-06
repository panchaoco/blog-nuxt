<template>
  <div class="app-wrapper app-container">
    <div class="left-container" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="middle-container animate" v-if="$slots.middle">
      <slot name="middle"></slot>
    </div>
    <div class="right-container" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Wrapper",
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

    }
  }
</script>

<style lang="less" scoped>
  @import "./wrapper";
</style>
