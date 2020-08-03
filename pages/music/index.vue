<template>
  <section class="music-container">
    <blog-wrapper>
      <div class="music-wrapper" slot="middle">
        <slide :banners="slides"></slide>
        <div class="content">
          <ul class="song-list">
            <li v-for="(item, index) in musicList" :key="index" @click="playMusic(item, index)">
              <div class="song-wrapper">
                <dl>
                  <dt>
                    <img :src="item.img_src" alt="">
                    <span class="mask">
                    <Icon type="md-play" v-if="!item.play"/>
                    <Icon type="md-pause" v-else/>
                  </span>
                  </dt>
                  <dd>
                    <h6>
                      <span>{{item.name}}</span>
                      -
                      <span class="single" v-for="(s_item, i) in item.singer" :key="s_item.id">
                      {{s_item.name}}
                      {{i !== item.singer.length - 1 ? '-' : ''}}
                    </span>
                    </h6>
                    <p>{{item.title}}</p>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
          <div class="more-music">
            <span @click="moreMusic">加载更多</span>
          </div>
        </div>
      </div>
      <blog-right-aside slot="right"></blog-right-aside>
    </blog-wrapper>
  </section>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import BlogLeftAside from '../../components/aside-nav/aside-nav';
  import BlogRightAside from '../../components/right-aside/right-aside';
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogHeaderTop from '../../components/header-top/header-top';
  import Slide from '../../components/slide/slide';

  import Scroll from '../../components/scroll/scroll';

  export default {
    name: "Music",
    transition(to, from) {
      return 'move'
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          // effect: 'fade',
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
        },
        scrollOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          mousewheel: true
        },
        slides: [],
        musicList: [],
        songBegin: 0,
        songNum: 10,
        isOpen: false,
        scroll: null
      }
    },
    computed: {
      ...mapState({
        current: state => state.music.musicOpt.current,
        play: state => state.music.play,
        songList: state => state.music.songList,
      })
    },
    created() {
      this.getBanners()
      this.getMusicDate()
    },
    mounted() {
      window.addEventListener('storage', (e) => {
        if (e.key === 'isOpen') {
          this.isOpen =  (e.newValue === '1')
        }
      }, false);
    },
    methods: {
      ...mapMutations({
        updateSongUrl: 'music/updateSongUrl',
        updatePlayStatus: 'music/updatePlayStatus',
        updateMusicPic: 'music/updateMusicPic',
        updateMusicAlbumMid: 'music/updateMusicAlbumMid',
      }),
      getMusicDate() {
        this.$store.dispatch('music/musicDate').then(res => {
          const date = res.data[0].get_music_date
          this.getMusicList(date)
        })
      },
      getBanners() {
        this.$store.dispatch('common/getBanners', {
          method: 'GET',
          body: {product_name: 'music'},
        }).then(res => {
          if (res.state === 0) {
            this.slides = res.data
          }
        })
      },
      getMusicList(date) {
        this.$store.dispatch('music/getMusicComment').then(res => {
          this.musicList = res.detail.data.songInfoList.map(item => {
            const newItem = Object.assign({}, item)
            newItem.play = false
            newItem.img_src = `//y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=${Math.ceil(Math.random() * 3000000)}`
            return newItem
          })
          this.musicList = this.musicList.filter(item => {
            return item.pay.pay_play !== 1
          })
        })
      },
      moreMusic() {
        this.songNum += 10
        this.getMusicList()
      },
      handleCookie() {
        cookie.set("yq_index", 0, null, null, 2400)
        cookie.set("yqq_stat", 0)
      },
      playMusic(item, index) {
        const playList = window.localStorage.getItem('playList')
        let json = playList ? JSON.parse(playList) : []
        this.$store.commit('common/updateOpenPlayer', true)
        // const isHave = json.filter(d => d.albumid === item.data.albumid).length === 0
        // if (isHave) {
        //   json = [item.data].concat(json)
        // }
        // window.localStorage.setItem('playList', JSON.stringify(json))
        // console.log('window.localStorage.getItem(\'isOpen\')', window.localStorage.getItem('isOpen'))
        // if (window.localStorage.getItem('isOpen') !== '1') {
        //   this.isOpen = true
        //   window.localStorage.setItem('isOpen', '1')
        //   // window.open('/player/' + item.data.songmid)
        // }
      },
    },
    watch: {

    },
    components: {
      BlogLeftAside,
      BlogWrapper,
      BlogRightAside,
      BlogHeaderTop,
      Scroll,
      Slide
    }
  }
</script>

<style lang="less" scoped>
  @import "index";
</style>
