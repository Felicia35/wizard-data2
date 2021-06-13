import axios from './index';

export default {
  async importEditorData(data) {
    return await axios
      .post("/editor/import", data)
      .then((res) => res.data)
      .catch(console.error);
  },
};