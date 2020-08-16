<template>
  <div class="dialog-container">
    <transition name="mask">
      <div class="mask" @click="close" v-if="newValue"></div>
    </transition>
    <transition name="content">
      <div class="content" v-if="newValue">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        newValue: this.value
      }
    },
    created() {
    },
    methods: {
      close() {
        this.newValue = false;
        this.$emit('input', false)
      }
    },
    watch: {
      value(val) {
        this.newValue = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .dialog-container {
    overflow: hidden;
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1005;
  }
  .content {
    margin: 100px auto 0;
    width: 440px;
    position: relative;
    z-index: 1006;
    background-color: #ffffff;
  }
  .mask-enter-active, .mask-leave-active {
    transition: all .35s;
  }
  .mask-enter, .mask-leave-to {
    opacity: 0;
  }
  .content-enter-active, .content-leave-active {
    transition: all .2s;
  }
  .content-enter, .content-leave-to {
    transform: scale(0.8) translateY(-30px);
    opacity: 0;
  }
</style>