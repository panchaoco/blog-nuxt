<template>
  <blog-wrapper>
    <iframe src="http://localhost:8081/" width="100%" frameborder="0" slot="middle"></iframe>
  </blog-wrapper>
</template>

<script>
  import BlogWrapper from '../../components/wrapper/wrapper'
  export default {
    name: 'interview',
    components: {
      BlogWrapper
    }
  }
</script>

<style scoped>
  iframe {
    min-height: 100vh;
    position: relative;
    z-index: 100;
  }
</style>
