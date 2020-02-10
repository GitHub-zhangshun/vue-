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
  state: {
    groups: [1]
  },
  modules,
  // 根级别的 action、mutations、getters 。
  actions,
  mutations,
  getters: {
    getGroups(state) {
      return state.groups;
    }
  }
});
