<template>
  <div class="skeleton-list">
    <div class="img">

    </div>
    <div class="content">
      <div class="line" v-for="item in 4" :key="item">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'skeleton-list'
  }
</script>

<style lang="less" scoped>
  .skeleton-list {
    display: flex;
    .img {
      width: 1.5rem;
      flex: 0 0 1.5rem;
      height: 1rem;
      background-color: #eee
    }
    .content {
      flex: 1;
      margin-left: 10px;
      .line {
        height: 13px;
        width: 100%;
        background-color: #eee;
        margin-bottom: 15px;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        &:nth-child(2) {
          width: 80%;
        }
        &:nth-child(3) {
          width: 60%;
        }
        &:nth-child(4) {
          width: 40%;
        }
      }
    }
  }

</style>
