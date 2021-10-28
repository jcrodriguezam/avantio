/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "http://localhost:4000";

// console.log('DOMAIN', DOMAIN)

export default {
  state: {
    data: [],
  },
  reducers: {
    SUCCESS(state, payload) {},
    ERROR(state, payload) {},
    LOGOUT() {},
    SET_PROP(state, payload) {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    },
    SET_STATE(payload) {
      return {
        ...payload,
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
  }),
};
