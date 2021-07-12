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
  async getVisOneData(recordName) {
    return await axios
        .get(`/data/${recordName}`)
        .then((res) => res.data)
        .catch(console.error);
  },
  async getVisTwoData(recordName) {
    return await axios
        .get(`/data/xyPos/${recordName}`)
        .then((res) => res.data)
        .catch(console.error);
  },
};
