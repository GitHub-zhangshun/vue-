import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import filters from "./filters";
// 用于移动端多机型的适配方案。
import "amfe-flexible";
// 按需加载用到的 vant 依赖。
import {
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  Sticky,
  Field,
  Uploader,
  Popup,
  Checkbox,
  CheckboxGroup
} from "vant";
Vue.use(Toast)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Tab)
  .use(Tabs)
  .use(Sticky)
  .use(Field)
  .use(Uploader)
  .use(Popup)
  .use(Checkbox)
  .use(CheckboxGroup);
// 引入瀑布流、懒加载组件。
import waterfall from "vue-waterfall2";
Vue.use(waterfall);
// 消除移动端 click 事件 300ms 延迟。
import attachFastClick from "fastclick";
attachFastClick.attach(document.body);

Vue.config.productionTip = false;
// 如果是非线上环境，加载移动端的 VConsole 。
// if (process.env.NODE_ENV !== 'production') {
//     var VConsole = require('vconsole/dist/vconsole.min.js');
//     var vConsole = new VConsole();
// }
// 全局过滤器。
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
