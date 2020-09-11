<template>
  <div class="submit-comment">
    <div class="comment-wrapper">
      <p class="replay" v-if="replayUser">
        # <strong>{{replayUser.user.nickname}}</strong> #
      </p>
      <textarea v-model="commentData.content" name="" id="" rows="8"></textarea>
    </div>
    <div class="avatar-container">
    </div>
    <div class="comment-btn">
      <button class="submit-btn" @click.prevent.stop="submit">评论</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  const COMMENT_DATA = {
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
    position: relative;
    .nickname-wrapper {
      color: #ffffff;
      line-height: 30px;
      height: 30px;
      background-color: #24282d;
      padding-left: 10px;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 18px;
      }
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
      font-size: 14px;
      .replay {
        border-bottom: 1px solid #acacac;
        padding: 10px 5px;
      }
      textarea {
        width: 100%;
        background-color: #282c34;
        padding: 10px;
        resize: none;
        display: block;
        margin-right: 0;
        color: #abb2bf;
      }

    }
    .avatar-container {
      width: 80px;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -40px;
      text-align: center;
      background-color: #ffffff;
      .user-avatar {
        border: 2px solid #ffffff;
        width: 80px;
        height: 80px;
        img {
          width: 76px;
          height: 76px;
          display: block;
        }
      }
    }
    .comment-btn {
      height: 35px;
      background-color: #bcbcbc;
      .submit-btn {
        background-color: #fd4801;
        float: right;
        display: block;
        width: 80px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        outline: none;
        cursor: pointer;
        color: #ffffff;
        font-weight: 600;
        animation: btnColor 1s linear infinite alternate;
      }
    }
  }

  @keyframes btnColor {
    0% {
      background-image: linear-gradient(to right, #ffaa00, #ff0000)
    }
    50% {
      background-image: linear-gradient(to right, #437a9e, #0480e0)
    }
    100% {
      background-image: linear-gradient(to right, #9500ff, #ff00a1)
    }
  }
</style>
