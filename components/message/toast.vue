<template>
  <div class="message-container">
    <transition name="visible">
      <div class="toast" v-show="visible">
        <div class="icon" :class="type">
          <span class="icon-right iconfont" v-if="type === 'success'"></span>
          <span class="icon-close iconfont" v-if="type === 'error'"></span>
        </div>
        <span class="message">{{ text }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      duration: {
        type: Number,
        default: 3000
      },
      type: {
        type: String,
        default: 'success'
      }
    },
    data() {
      return {
        visible: false
      }
    },
    created() {
      setTimeout(() => {
        this.visible = this.value
        this.close()
      }, 300)
    },
    methods: {
      close() {
        setTimeout(() => {
          this.$emit('input', false)
          this.visible = false
          setTimeout(() => {
            this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
          }, 300)
        }, this.duration)
      }
    },
    watch: {
      value(val) {
        if (val) {
          this.close()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .message-container {
    .toast {
      position: fixed;
      z-index: 99999999;
      /*background-color: #0cd28a;*/
      background-color: #ffffff;
      height: 40px;
      line-height: 40px;
      padding: 0 20px 0 0;
      left: 50%;
      top: 40px;
      margin-left: -150px;
      display: flex;
      min-width: 300px;
      .icon {
        text-align: center;
        width: 40px;
        height: 40px;
        background-color: #0cd28a;
        color: #ffffff;
        .iconfont {
          font-size: 18px;
        }
        &.error {
          background-color: #ff0f25;
        }
      }
      .message {
        padding-left: 20px;
      }
    }
  }
  .visible-enter-active, .visible-leave-active {
    transition: all .3s;
  }
  .visible-enter, .visible-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
</style>
