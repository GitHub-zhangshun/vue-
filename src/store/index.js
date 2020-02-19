import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import community from "./community";

Vue.use(Vuex);

let modules = {
  ...community
};

export default new Vuex.Store({
  state: {},
  modules,
  // 根级别的 action 。
  actions,
  // 根级别的 mutations 。
  mutations,
  // 根级别的 getters 。
  getters: {}
});
