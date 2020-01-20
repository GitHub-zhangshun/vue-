import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import filters from "./filters";
// 用于移动端多机型的适配方案。
import "amfe-flexible";
// 按需加载用到的 vant 依赖。
import { Toast, Swipe, SwipeItem, Tab, Tabs } from "vant";
Vue.use(Toast)
    .use(Swipe)
    .use(SwipeItem)
    .use(Tab)
    .use(Tabs);
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