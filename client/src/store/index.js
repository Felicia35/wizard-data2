import Vue from "vue";
import Vuex from "vuex";
import Data from "../api/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordData: [],
  },
  getters: {
    recordData: (state) => state.recordData,
  },
  mutations: {
    setRecordData(state, record) {
      state.recordData.push(record);
    },
  },
  actions: {
    async createRecordData({ commit }, data) {
      await Data.createRecordData(data).then((res) => {
        commit("setRecordData", res);
      });
    },
  },
});
