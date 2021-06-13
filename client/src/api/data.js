import axios from './index';

export default {
  async createRecordData(data) {
    return await axios
      .post("/data/create", {createInfo: data})
      .then((res) => res.data)
      .catch(console.error);
  },
};