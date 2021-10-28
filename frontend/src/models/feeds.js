/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const API_URL = "http://localhost:4000";

function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  return str;
}

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
      feed.id = string_to_slug(id);
      await axios.post(`${API_URL}`, { ...feed });
      dispatch.feeds.loadData();
    },
  }),
};
