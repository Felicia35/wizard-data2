import Vue from "vue";
import Vuex from "vuex";
import Data from "../api/data";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        recordData: [],
        visOneDatas: [],
        visTwoDatas: [],
    },
    getters: {
        recordData: (state) => state.recordData,
        visOneDatas: (state) => state.visOneDatas,
        visTwoDatas: (state) => state.visTwoDatas,
    },
    mutations: {
        appendRecordData(state, record) {
            state.recordData.push(record);
        },
        setRecordData(state, records) {
            state.recordData = records;
        },
        setVisOneData(state, visOneDatas) {
            state.visOneDatas = visOneDatas;
        },
        setVisTwoData(state, visTwoDatas) {
            state.visTwoDatas = visTwoDatas;
        },
    },
    actions: {
        async createRecordData({commit}, data) {
            await Data.createRecordData(data).then((res) => {
                commit("appendRecordData", res);
            });
        },
        async getRecordData({commit}) {
            await Data.getRecordData().then((res) => {
                commit("setRecordData", res);
            });
        },
        async getVisOneData({commit}, recordName) {
            await Data.getVisOneData(recordName).then((res) => {
                commit("setVisOneData", res);
            });
        },
        async getVisTwoData({commit}, recordName) {
            await Data.getVisTwoData(recordName).then((res) => {
                commit("setVisTwoData", res);
            });
        },
    },
});
