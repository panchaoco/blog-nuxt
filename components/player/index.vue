<template>
  <div class="music-player">
    <div class="bg" :class="{show: open}">

    </div>
    <div class="player-container">
      <div class="player-content">
        <div class="back" @click="back">
          <Icon type="md-arrow-back" size="40" />
        </div>
        <transition name="fade">
          <div v-if="!showYes" class="left slide-item" :class="{'active': open}">
            <div class="player-img">
              <img src="../../assets/images/fm.jpeg" alt="">
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="!showYes" class="right slide-item" :class="{'active': open}">
            <div class="player-img">
              <img src="../../assets/images/fm.jpeg" alt="">
            </div>
          </div>
        </transition>
        <div v-if="showYes" class="yes">
          <div class="player-img">
            <img src="../../assets/images/fm.jpeg" alt="">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  // let cookie = {};
  // if (process.browser) {
  //   cookie = require('../../utils/music/cookie').cookie
  // }
  import { mapState } from 'vuex';
  export default {
    name: 'player',
    data() {
      return {
        open: false,
        showYes: false
      }
    },
    computed: {
      ...mapState({
        openPlayer: state => state.common.openPlayer
      })
    },
    mounted() {
      setTimeout(() => {
        this.open = true;
        setTimeout(() => {
          this.showYes = true
        }, 600)
      }, 20)
    },
    methods: {
      inspect() {

      },
      back() {
        this.open = false;
        this.showYes = false;
        this.$store.commit('common/updateOpenPlayer', false)
      }
    },
    inspect() {

    },
    watch: {
      openPlayer(val) {
        if (val) {
          setTimeout(() => {
            this.open = true
          }, 20)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .music-player {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1100;
    .bg {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/images/fm.jpeg");
      background-size: cover;
      filter: blur(10px);
      opacity: 0;
      transition: all .2s;
      &.show {
        opacity: 1;
      }
    }
    .player-container {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1101;
      .player-content {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        z-index: 1101;
        .back {
          position: absolute;
          left: 30px;
          top: 20px;
          z-index: 1102;
          animation: fontPos 1s ease-in-out forwards infinite;
          cursor: pointer;
          &:hover {
            animation-play-state: paused;
          }
        }
        .slide-item {
          flex: 1;
          transition: all ease-in .4s;
          position: relative;
          overflow: hidden;
          opacity: 0;
          &.active {
            transform: translateX(0%);
            opacity: 1;
          }
          .player-img {
            width: 260px;
            height: 260px;
            position: absolute;
            top: 200px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 260px;
              height: 260px;
            }
          }
        }
        .left {
          transform: translateX(-20%);
          .player-img {
            right: -130px;
          }
        }
        .right {
          transform: translateX(20%);
          .player-img {
            left: -130px;
          }
        }
        .yes {
          width: 100%;
          height: 100%;
          .player-img {
            margin-top: 200px;
            display: flex;
            justify-content: center;
            img {
              width: 260px;
              height: 260px;
              border-radius: 100%;
            }
          }
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .2s;
    }
    .fade-enter, .fade-levae-to {
      opacity: 0;
    }
  }
  @keyframes fontPos {
    0% {
      transform: translateX(30px);
      color: #ff5d15;
    }
    50% {
      transform: translateX(0);
      color: #ff0b20;
    }
    100% {
      transform: translateX(30px);
      color: #ff1682;
    }
  }
</style>
