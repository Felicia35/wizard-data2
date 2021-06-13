import Vue from "vue";
import Vuex from "vuex";
import Data from "../api/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editorData: [],
  },
  getters: {
    editorData: (state) => state.editorData,
  },
  mutations: {
    setEditorData(state, editorLists) {
      state.editorData = editorLists;
    },
  },
  actions: {
    async importEditorData({ commit }, data) {
      await Data.importEditorData(data).then((res) => {
        commit("setEditorData", res);
      });
    },
  },
});
