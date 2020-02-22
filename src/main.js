import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters";
// 用于移动端多机型的适配方案。
import "amfe-flexible";
// 按需加载用到的 vant 依赖。
import {
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Sticky,
  Field,
  Uploader,
  Popup,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Lazyload,
  toast,
  List
} from "vant";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(Sticky)
  .use(Field)
  .use(Uploader)
  .use(Popup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Lazyload)
  .use(toast)
  .use(List);
// 引入瀑布流、懒加载组件。
import waterfall from "vue-waterfall2";
Vue.use(waterfall);
// 消除移动端 click 事件 300ms 延迟。
import attachFastClick from "fastclick";
attachFastClick.attach(document.body);

Vue.config.productionTip = false;
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
