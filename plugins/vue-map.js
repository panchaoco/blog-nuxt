import Vue from 'vue';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

if (!Vue.prototype.$isServer) {
  VueAMap.initAMapApiLoader({
    key: 'dc5d7b6d6b90fb79049ded8e7b081f26',
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
    uiVersion: '1.0',
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.8'
  })
}
