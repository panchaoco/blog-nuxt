<template>
  <div class="topic-menu">
    <ul>
      <li v-for="(item, index) in menuList" :key="index">
        <span>#{{item.name}}#</span>
        <button>相关</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TopicMenu',
    data() {
      return {
        menuList: [
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
          { 'name': '前端未来的路', id: 1 },
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .topic-menu {
    ul {
      li {
        font-size: 14px;
        height: 35px;
        line-height: 35px;
        width: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
          border: 1px solid #0b7eff;
          height: 24px;
          padding: 0 8px;
          border-radius: 3px;
          color: #0b7eff;
        }
      }
    }
  }
</style>