/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const API_URL = "http://localhost:4000";

export default {
  state: {
    data: [],
  },
  reducers: {
    SET_PROP(state, payload) {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    },
  },
  effects: (dispatch) => ({
    async loadData(state) {
      const feeds = await axios.get(API_URL);
      dispatch.feeds.SET_PROP({ key: "data", value: feeds.data });
    },
    async updateFeed(payload) {
      const { feed } = payload;
      const { id } = feed;
      await axios.patch(`${API_URL}/id/${id}`, { ...feed });
      dispatch.feeds.loadData();
    },
    async deleteFeed(payload) {
      const { feed } = payload;
      const { id } = feed;
      await axios.delete(`${API_URL}/id/${id}`);
      dispatch.feeds.loadData();
    },
    async addFeed(payload) {
      const { feed } = payload;
      let id = feed.title;
      feed.id = id.replace(/\s/g, "_");
      await axios.post(`${API_URL}`, { ...feed });
      dispatch.feeds.loadData();
    },
  }),
};
