<template>
  <div>
    <form class="form">
      <h1>Public</h1>
      <span class="iconfont icon-close" @click="$emit('close')"></span>
      <div class="login-type">
        <transition name="left">
          <div v-if="phone">
            <div class="item" key="1">
              <span class="iconfont icon-down"></span>
              <span class="area">+86</span>
              <input class="phone" v-model="formData.phone" type="text" placeholder="请输入您的手机号" />
              <span class="label" @click="phone = false">密码登录</span>
            </div>
            <div class="item" key="2" v-if="phone">
              <input type="text" v-model="formData.code" placeholder="请输入验证码" />
              <span class="label" @click="getCode" :class="{disabled: codeFlag}">{{ codeFlag ? `${downCount}秒后重新获取` : '获取验证码' }}</span>
            </div>
          </div>
        </transition>
        <transition name="right">
          <div v-if="!phone">
            <div class="item" key="3">
              <span class="iconfont icon-down"></span>
              <span class="area">+86</span>
              <input v-model="formData.phone" class="phone" type="text" placeholder="请输入您的手机号" />
              <span class="label" @click="codeLogin">验证码登录</span>
            </div>
            <div class="item" key="4">
              <input v-model="formData.password" type="password" placeholder="请输入密码" />
            </div>
            <div class="item ok-password" key="5" :class="{height: register}">
              <input v-model="formData.ok_password" type="password" placeholder="请确认密码" />
            </div>
            <div class="item ok-password" key="6" :class="{height: register}">
              <input v-model="formData.nickname" type="text" placeholder="请输入昵称" />
            </div>
            <div class="to-register">
              <div v-if="!register">
                <span>没有账号？</span>
                <span @click="toRegister">点击注册</span>
              </div>
              <span @click="toLogin" v-else>密码登录</span>
            </div>
          </div>
        </transition>
      </div>
      <div class="login-btn" type="button" v-show="!register" @click.prevent="gotoLogin">点击登录</div>
      <div class="login-btn" type="button" v-show="register" @click.prevent="gotoRegister">点击注册</div>
      <div class="other-btn">
        <button class="btn github">
          <span class="iconfont icon-github"></span>
          <span type="button">GitHub</span>
        </button>
      </div>
      <div class="rule">
        <span>登录即</span>
        <p>同意Public站用户协议与隐私条款</p>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from '../../utils/axios'
  import MessageToast from '@/components/message/toast'
  import { getPhoneCode } from '@/api/user'

  export default {
    name: 'Login',
    components: {
      MessageToast
    },
    data() {
      return {
        phone: true,
        register: false,
        formData: {
          phone: '',
          password: '',
          ok_password: '',
          username: '',
          nickname: '',
        },
        downCount: 60,
        codeFlag: false,
        tip: '验证码发送成功',
        visible: false
      }
    },
    methods: {
      toRegister() {
        this.register = true;
      },
      codeLogin() {
        this.register = false
        this.phone = true
      },
      toLogin() {
        this.register = false
      },
      async gotoRegister() {
        if (this.formData.password !== this.formData.ok_password) {
          alert('密码不一致')
        } else {
          const res = await axios( '/v1/api/register', {
            method: 'post',
            body: this.formData
          })
          if (res.state === 0) {
            window.localStorage.setItem('token', res.data.token)
            this.$emit('close')
          }
        }
      },
      async gotoLogin() {
        let res
        if (this.phone) {
          res = await axios( '/v1/api/code_login', {
            method: 'post',
            body: {
              phone: this.formData.phone,
              code: this.formData.code
            }
          })
        } else {
          res = await axios( '/v1/api/login', {
            method: 'post',
            body: {
              username: this.formData.phone,
              password: this.formData.password
            }
          })
        }

        if (res.state === 0) {
          window.localStorage.setItem('token', res.data.token)
          this.$emit('close')
        }
      },
      handleCount() {
        this.codeFlag = true
        let timer = null
        let _this = this
        const down = function down () {
          timer = setTimeout(() => {
            _this.downCount--
            if (_this.downCount > 0) {
              down()
            } else {
              _this.codeFlag = false
              _this.downCount = 60
              clearTimeout(timer)
              timer = null
            }

          }, 1000)
        }
        down()
      },
      async getCode() {
        if (!this.formData.phone) {
          return this.$message({
            type: 'error',
            text: '请收入手机号'
          })
        }

        if (this.codeFlag) return

        this.handleCount()
        const res = await getPhoneCode({
          phone: this.formData.phone
        })
        if (res.state === 0) {
          this.$message({
            text: '发送验证码成功'
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @mainColor: #1d83f5;
  .form {
    font-size: 14px;
    padding: 50px 50px 20px;
    position: relative;
    .icon-close {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }
    .item {
      height: 60px;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        flex: 1;
        &.phone {
          padding-left: 10px;
        }
      }
      &.ok-password {
        height: 0;
        transform: translate3d(0, 0, 0);
        overflow: hidden;
        transition: all .3s;
        opacity: 0;
        &.height {
          height: 60px;
          opacity: 1;
        }
      }
      .icon-down {
        color: #666666;
        font-size: 12px;
        transform: scale(0.8);
        margin-right: 3px;
        position: relative;
        top: 1.5px;
      }
      .label {
        color: #1d83f5;
        font-size: 13px;
        cursor: pointer;
        &.disabled {
          color: #b5b1b1;
        }
      }
    }
    .login-btn {
      width: 100%;
      height: 45px;
      background-color: @mainColor;
      color: #ffffff;
      margin-top: 40px;
      line-height: 45px;
      text-align: center;
      cursor: pointer;
    }
    .to-register {
      text-align: right;
      padding: 5px 0;
      position: absolute;
      right: 50px;
      span:last-child {
        color: @mainColor;
        cursor: pointer;
      }
    }
    .other-btn {
      display: flex;
      margin-top: 30px;
      .btn {
        flex: 1;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
        text-align: center;
        button {
          background-color: transparent;
        }
        height: 45px;
        color: #666666;
        &:nth-child(1) {
          /*margin-right: 20px;*/
        }
        &.wechat {
          .iconfont {
            color: #15CF77;
          }
        }
      }
    }
    .rule {
      display: flex;
      margin-top: 40px;
      font-size: 13px;
      justify-content: center;
      p {
        color: @mainColor;
      }
    }
    .login-type {
      display: flex;
      min-height: 130px;
      overflow: hidden;
      > div {
        flex: 0 0 100%;
        width: 100%;
      }
    }
  }
  .left-enter-active, .left-leave-active {
    transition: all .6s;
  }
  .left-enter, .left-leave-to {
    opacity: 0;
    transform: translateX(-60px);
  }
  .right-enter-active, .right-leave-active {
    transition: all .6s;
  }
  .right-enter, .right-leave-to {
    opacity: 0;
    transform: translateX(60px);
  }
  .height-enter-active, .height-leave-active {
    transition: height .3s;
  }
  .height-enter, .height-leave-to {
    height: 0;
  }
</style>
