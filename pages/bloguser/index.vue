<template>
  <wrapper>
    <div class="blog-user-wrapper" slot="middle">
      <p class="item"><em></em><span>花名：<strong style="font-size: 20px; transform: scaleY(1.3)">店小二</strong></span></p>
      <p class="item"><em></em><span>工作：全栈（努力）开发工程师</span></p>
      <p class="item"><em></em><span>擅长：Python、JavaScript、Vue、React、Fullter、Django等</span></p>
      <p class="item"><em></em><span>联系我：dxpanchao@gmail.com &nbsp;&nbsp; 15520870525@163.com</span></p>
      <p class="item desc"><Icon size="16" type="md-code" /><span>致力于高效、可读性、可维护性的组件化代码实现</span></p>
      <no-ssr>
        <h4 class="map-title">我的位置</h4>
        <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="vue-map">
        </el-amap>
      </no-ssr>
      <div class="resume-wrapper">
        <div class="info">
          <div class="item">
            <div class="item-c">
              姓名：潘超
            </div>
            <div class="item-c">
              邮箱：155208705255@163.com
            </div>
          </div>
          <div class="item">
            <div class="item-c">
              联系方式：15520870525
            </div>
            <div class="item-c">
              状态：在职
            </div>
          </div>
        </div>
        <div class="resume" v-html="resume"></div>
      </div>
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
        },
        resume: ''
      };
    },
    methods: {
    },
    components: {
      Wrapper,
      BlogLeftAside
    },
    async mounted() {
      const res = await this.$store.dispatch('article/getResume');
      this.resume = res.data.resume
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
<style lang="less">
  .resume-wrapper {
    .info {
      margin-top: 20px;
      margin-bottom: 20px;
      .item {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        margin: 10px 0;
        .item-c {
          flex: 1;
        }
      }
    }
    .resume {
      * {
        margin: 15px 0;

      }
    }
    ol {
      font-size: 14px;
    }
    h4 {
      strong {
        font-size: 16px;
      }
    }
  }
</style>