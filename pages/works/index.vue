<template>
  <blog-wrapper>
    <div class="works-container" slot="middle">
      <ul>
        <li v-for="(work, index) in works" :key="index">
          <div class="item-bg" :style="{backgroundImage: `url(${work.image})`}"></div>
          <div class="content">
            <h4>{{work.name}}</h4>
            <p>{{work.desc}}</p>
            <footer class="footer">
            <span class="item">
              <Icon type="md-eye"/>
              <span>{{work.look_count}}</span>
            </span>
              <span class="item">
              <Icon type="md-thumbs-up" />
              <span>{{work.thumbs_up}}</span>
            </span>
            </footer>
          </div>
        </li>
      </ul>
    </div>
  </blog-wrapper>
</template>

<script>
  import BlogWrapper from '../../components/wrapper/wrapper';
  import BlogLeftAside from '../../components/aside-nav/aside-nav';
  import BlogRightAside from '../../components/right-aside/right-aside';
  export default {
    name: 'work',
    transition: 'move',
    data() {
      return {
        works: [
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
          {
            id: 1,
            look_count: 100,
            thumbs_up: 250,
            name: 'BIGame 电竞',
            desc: 'Vue 电竞老大',
            image: require('../../assets/img/default.jpeg')
          },
        ]
      }
    },
    components: {
      BlogWrapper,
      BlogLeftAside,
      BlogRightAside
    }
  }
</script>

<style lang="less" scoped>
  .works-container {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 0 0 286px;

        width: 286px;
        margin-right: 10px;
        margin-bottom: 10px;
        background: #fff;
        cursor: pointer;
        transition: all .2s;
        overflow: hidden;
        &:hover {
          background-color: #ddd;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        .content {
          padding: 10px 10px 0;
        }

        .item-bg {
          width: 286px;
          height: 140px;
          background-position-y: 50%;
          background-size: cover;
          transition: all .2s;
        }
        p {
          padding: 10px 0;
        }
        .footer {
          border-top: 1px solid #eee;
          padding: 7px 0;
          font-size: 12px;
          .item {
            margin-right: 40px;
            font-size: 12px;
            display: inline-flex;
            align-items: center;
            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
