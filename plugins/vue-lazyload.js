import Vue from 'vue';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: '/_nuxt/assets/img/default.jpeg'
})
