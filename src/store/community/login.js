import * as types from "@/store/mutation-types.js";
import { setStore, getStore, removeStore } from "@/common/util";

export default {
  state: {
    token: ''
  },
  getters: {
    // 获取用户 token 的方法。
    [types.GET_USER_TOKEN]: (state) => {
      if(!state.token) {
        state.token = getStore('token');
      }
      return state.token;
    }
  },
  actions: {},
  mutations: {
    // 登录成功，将 token 保存在 localStorage 中。
    [types.USER_LOG_IN]: (state, data) => {
      setStore("token", data);
      state.token = data;
    },
    // 退出登录，将 token 清空 。
    [types.USER_LOG_OUT]: state => {
      removeStore("token");
      state.token = null;
    }
  }
};
