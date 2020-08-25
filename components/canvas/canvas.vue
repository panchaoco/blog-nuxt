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
    filter: blur(2px);
    background-color: #333;
    background-repeat: repeat;
    background-size: cover;
    background-image: url("./img/bg-1.png");
  }
</style>
