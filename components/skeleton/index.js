import SkeletonLine from './skeleton-line';
import SkeletonList from './skeleton-list';

const skeleton = {
  install(Vue) {
    Vue.component(SkeletonLine.name, SkeletonLine);
    Vue.component(SkeletonList.name, SkeletonList);
  }
}

export default skeleton
