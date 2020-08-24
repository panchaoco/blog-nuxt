<template>
  <div class="submit-comment">
    <p class="nickname-wrapper" v-if="userInfo">
      <span>
        宇宙通用昵称：{{userInfo.nickname}}
      </span>
    </p>
    <div class="comment-wrapper">
      <p class="replay" v-if="replayUser">
        # <strong>{{replayUser.user.nickname}}</strong> #
      </p>
      <textarea v-model="commentData.content" name="" id="" rows="8"></textarea>
    </div>
    <div class="comment-btn">
      <button class="submit-btn" @click.prevent.stop="submit">评论</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  const COMMENT_DATA = {
    nickname: '',
    email: '',
    link: '',
    content: ''
  }
  export default {
    name: "Comment",
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
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    methods: {
      submit() {
        if (!this.commentData.content) {
          alert('评论内容不能为空')
        }
        const payload = {
          article_id: Number(this.$route.params.id),
          ...this.commentData
        }
        if (this.replayUser) {
          payload.parent_id = this.replayUser.id
          payload.reply_user_id = this.replayUser.user.id
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
    .nickname-wrapper {
      color: #ffffff;
      line-height: 30px;
      height: 30px;
      background-color: #24282d;
      padding-left: 10px;
      span {
        font-size: 12px;
        border-radius: 3px;
      }
    }
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
      background-color: #cfcfcf;
      font-size: 14px;
      .replay {
        border-bottom: 1px solid #acacac;
        padding: 10px 5px;
      }
      textarea {
        width: 100%;
        background-color: #cfcfcf;
        padding: 10px;
        min-height: 140px;
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
