import Axios from '../utils/axios';


export const state = () => ({
  play: false,
  songList: [],
  currentMusicPic: '',
  musicOpt: {
    currentMusicPic: '',
    current_song_url: '',
    album_mid: '',
    current: -1,
  },
});


export const mutations = {
  updateSongUrl(state, {url, index}) {
    state.musicOpt.current_song_url = url
    state.musicOpt.current = index
    state.songList.push({
      song_url: url,
      id: index
    })
  },
  updatePlayStatus(state, status) {
    state.play = status
  },
  updateMusicPic(state, pic) {
    state.musicOpt.currentMusicPic = pic
  },
  updateMusicAlbumMid(state, mid) {
    state.musicOpt.album_mid = mid
  },
}

export const actions = {
  async getMusicComment({commit}, payload) {
    const res = await Axios('/v1/api/get_music_list', {
      method: 'GET',
      body: payload
    })
    return res
  },
  async getMusicPlayUrl({commit}, payload) {
    const path = '/cgi-bin/musicu.fcg?'
    let str = ''
    for (let key in payload) {
      str += `${key}=${key === 'data' ? escape(payload[key]) : payload[key]}&`
    }
    str = str.substring(0, str.length - 1)
    const headerPath = `${path}${str}`
    const res = await Axios('/v1/api/get_music_play_url', {
      method: 'GET',
      body: payload,
    })
    return res
  },
  async getMusicAlbum({commit}, payload) {
    const res = await Axios('/v1/api/get_music_play_album', {
      method: 'GET',
      body: payload
    })
    return res
  },
  async getMusicLyric({commit}, payload) {
    const res = await Axios('/v1/api/get_music_lyric', {
      method: 'GET',
      body: payload
    })
    return res
  },
  async musicDate({commit}, payload) {
    const res = await Axios('/v1/api/music_date', {
      method: 'GET',
      body: payload
    })
    return res
  }
}
