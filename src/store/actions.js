import * as types from "@/store/mutation-types.js";

export default {
  changeInfo({commit}, info) {
    let testInfo = `this is ${info}`;
    commit(types.SET_INFO, testInfo);
  }
}
