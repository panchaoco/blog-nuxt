<template>
  <div class="canvas-wrapper">
  </div>
</template>

<script>
  export default {
    name: "BlogCanvas",
    data() {
      return {
        context: null
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .canvas-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.2;
    filter: blur(3px);
    background-color: #eee;
    background-repeat: repeat-x;
    background-image: url("./img/bg.png");
  }
</style>
