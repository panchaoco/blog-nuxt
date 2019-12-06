<template>
  <wrapper>
    <div class="blog-user-wrapper" slot="middle">
      <p class="item"><em></em><span>花名：<strong style="font-size: 20px; transform: scaleY(1.3)">店小二</strong></span></p>
      <p class="item"><em></em><span>工作：全栈（努力）开发工程师</span></p>
      <p class="item"><em></em><span>擅长：Python、JavaScript、Vue、React、Fullter、Django等</span></p>
      <p class="item"><em></em><span>联系我：dxpanchao@gmail.com</span></p>
      <p class="item desc"><Icon size="16" type="md-code" /><span>致力于高效、可读性、可维护性的组件化代码实现</span></p>
<!--      <p class="item code">-->
<!--        <em></em>-->
<!--        <code>-->
<!--          <span>class View extends React.PureComponent {</span>-->
<!--          <span style="margin-left: 20px">construct(props) {</span>-->
<!--          <span style="margin-left: 40px">super(props)</span>-->
<!--          <span style="margin-left: 20px">}</span>-->

<!--          <span style="margin-left: 20px">render() {</span>-->
<!--          <span style="margin-left: 40px">return (</span>-->
<!--          <span style="margin-left: 60px">&lt;div&gt;hello word&lt;/div&gt;</span>-->
<!--          <span style="margin-left: 40px">)</span>-->
<!--          <span style="margin-left: 20px">}</span>-->
<!--          }-->
<!--        </code>-->
<!--      </p>-->
      <no-ssr>
        <h4 class="map-title">我的位置</h4>
        <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="vue-map">
        </el-amap>
      </no-ssr>
    </div>
  </wrapper>
</template>

<script>
  import Wrapper from '../../components/wrapper/wrapper';
  import BlogLeftAside from '../../components/aside-nav/aside-nav';
  import { AMapManager } from 'vue-amap';
  export default {
    transition: 'move',
    data() {
      return {
        zoom: 12,
        center: [113.92, 22.52],
        amapManager: AMapManager,
        events: {
          init(map) {
            AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
              const marker = new SimpleMarker({
                iconLabel: 'A',
                iconStyle: 'red',
                map: map,
                position: map.getCenter()
              });
            });
          }
        }
      };
    },
    methods: {
    },
    components: {
      Wrapper,
      BlogLeftAside
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>

<style lang="less" scoped>
  .blog-user-wrapper {
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 40px;
    > .item {
      min-height: 50px;
      line-height: 50px;
      position: relative;
      padding-left: 20px;
      font-size: 14px;
      color: #606063;
      > em {
        content: ' ';
        position: absolute;
        left: 0;
        top: 25px;
        margin-top: -10px;
        width: 5px;
        height: 20px;
        border-radius: 3px;
        background-color: #e8e8e8;
      }
      &.desc {
        font-weight: 600;
        padding-left: 0;
        span {
          margin-left: 10px;
        }
      }
      &.code {
        line-height: 30px;
        em {
          top: 15px;
          background-color: #2b85e4;
        }
      }
      code {

        span {
          display: block;
        }
      }
    }
    .map-title {
     padding: 25px 0 15px;
      font-size: 17px;
    }
    .vue-map {
      height: 350px;
    }
  }
</style>
