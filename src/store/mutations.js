import * as types from "@/store/mutation-types.js";

export default {
  [types.SET_INFO](state, info) {
    state.msg = info;
  }
}
