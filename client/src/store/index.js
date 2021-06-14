import Vue from "vue";
import Vuex from "vuex";
import Data from "../api/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordData: [],
    behaviorDatas: [],
    moleDatas: [],
    editorDatas: [],
    eyeDatas: [],
  },
  getters: {
    recordData: (state) => state.recordData,
    behaviorDatas: (state) => state.behaviorDatas,
    moleDatas: (state) => state.moleDatas,
    editorDatas: (state) => state.editorDatas,
    eyeDatas: (state) => state.eyeDatas,
    behaviorMoleDatas: (state) => {
      return {behaviorDatas: state.behaviorDatas, moleDatas: state.moleDatas}
    }
  },
  mutations: {
    appendRecordData(state, record) {
      state.recordData.push(record);
    },
    setRecordData(state, records) {
      state.recordData = records;
    },
    setEyeData(state, eyes) {
      state.eyeDatas = eyes;
    },
    setBehaviorData(state, behaviors) {
      state.behaviorDatas = behaviors;
    },
    setEditorData(state, editors) {
      state.editorDatas = editors;
    },
    setMoleData(state, moles) {
      state.moleDatas = moles;
    },
  },
  actions: {
    async createRecordData({ commit }, data) {
      await Data.createRecordData(data).then((res) => {
        commit("appendRecordData", res);
      });
    },
    async getRecordData({ commit }) {
      await Data.getRecordData().then((res) => {
        commit("setRecordData", res);
      });
    },
    async getEyeData({ commit }, recordName) {
      await Data.getEyeData(recordName).then((res) => {
        commit("setEyeData", res);
      });
    },
    async getEditorData({ commit }, recordName) {
      await Data.getEditorData(recordName).then((res) => {
        commit("setEditorData", res);
      });
    },
    async getBehaviorData({ commit }, recordName) {
      await Data.getBehaviorData(recordName).then((res) => {
        commit("setBehaviorData", res);
      });
    },
    async getMoleData({ commit }, recordName) {
      await Data.getMoleData(recordName).then((res) => {
        commit("setMoleData", res);
      });
    },
  },
});
