import * as types from "@/store/mutation-types.js";
// import { productImageData } from "@/api/common";

export default {
  namespaced: true,
  state: {
    msg: 'this is info'
  },
  getters: {
    getInfo() {
      const { info } = state;
      return `${info} test`;
    }
  },
  actions: {
    changeInfo({commit}, info) {
      let testInfo = `this is ${info}`;
      commit(types.SET_INFO, testInfo);
    }
  },
  mutations: {
    [types.SET_INFO](state, info) {
      state.msg = info;
    }
  }
}