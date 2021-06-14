import axios from './index';

export default {
  async createRecordData(data) {
    return await axios
      .post("/data/create", {createInfo: data})
      .then((res) => res.data)
      .catch(console.error);
  },
  async getRecordData() {
    return await axios
        .get("/data/index")
        .then((res) => res.data)
        .catch(console.error);
  },
  async getEyeData(recordName) {
    return await axios
        .get(`/data/eye/${recordName}`)
        .then((res) => res.data)
        .catch(console.error);
  },
  async getEditorData(recordName) {
    return await axios
        .get(`/data/editor/${recordName}`)
        .then((res) => res.data)
        .catch(console.error);
  },
  async getBehaviorData(recordName) {
    return await axios
        .get(`/data/behavior/${recordName}`)
        .then((res) => res.data)
        .catch(console.error);
  },
  async getMoleData(recordName) {
    return await axios
        .get(`/data/mole/${recordName}`)
        .then((res) => res.data)
        .catch(console.error);
  },
};
