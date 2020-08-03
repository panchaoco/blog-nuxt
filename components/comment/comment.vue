<template>
  <div class="submit-comment">
    <ul class="top">
      <li>
        <label>昵称*</label>
        <input v-model="commentData.nickname" type="text" />
      </li>
      <li>
        <label>邮箱*</label>
        <input v-model="commentData.email" type="email" />
      </li>
      <li>
        <label>网址</label>
        <input v-model="commentData.link" type="url" />
      </li>
    </ul>
    <div class="comment-wrapper">
      <p class="replay" v-if="replayUser">
        # <strong>{{replayUser.nickname}}</strong>
      </p>
      <textarea v-model="commentData.content" name="" id="" rows="8"></textarea>
    </div>
    <div class="comment-btn">
      <button class="submit-btn" @click="submit">评论</button>
    </div>
  </div>
</template>

<script>
  const COMMENT_DATA = {
    nickname: '',
    email: '',
    link: '',
    content: ''
  }
  export default {
    name: "comment",
    props: {
      replayUser: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        commentData: Object.assign({}, {...COMMENT_DATA})
      }
    },
    methods: {
      submit() {
        if (!this.commentData.nickname) {
          return this.$Message.warning('昵称不能为空');
        }
        if (!this.commentData.email) {
          return this.$Message.warning('邮箱地址不能为空');
        }
        if (!this.commentData.content) {
          return this.$Message.warning('评论内容不能为空');
        }
        const payload = {
          article_id: this.$route.params.id,
          ...this.commentData
        }
        if (this.replayUser) {
          payload.parent_id = this.replayUser.id
        }
        this.$store.dispatch('article/createComment', payload).then(res => {
          this.commentData = Object.assign({}, {...COMMENT_DATA})
        });
        this.$emit('clearReplay')
      }
    }
  }
</script>

<style lang="less" scoped>
  .submit-comment {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    ul {
      display: flex;
      li {
        flex: 1;
        display: flex;
        height: 26px;
        align-items: center;
        box-sizing: content-box;
        label {
          display: block;
          flex: 0 0 50px;
          border: 1px dotted #bfbfbf;
          height: 26px;
          line-height: 26px;
          text-align: center;
          font-size: 12px;
        }
        input {
          background-color: #bcbcbc;
          flex: 0 0 143px;
          width: 143px;
          height: 26px;
          padding-left: 10px;
        }
      }
    }
    .comment-wrapper {
      margin-top: 10px;
      background-color: #cfcfcf;
      .replay {
        border-bottom: 1px solid #acacac;
        padding: 10px 5px;
      }
      textarea {
        width: 100%;
        background-color: #cfcfcf;
        padding: 10px;
        min-height: 160px;
        resize: none;
      }
    }
    .comment-btn {
      height: 28px;
      background-color: #bcbcbc;
      .submit-btn {
        background-color: #bcbcbc;
        border-left: 1px solid #ddd;
        float: right;
        display: block;
        width: 60px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        outline: none;
        cursor: pointer;
      }
    }
  }
</style>
