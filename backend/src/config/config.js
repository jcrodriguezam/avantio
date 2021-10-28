/* eslint-disable no-undef */
module.exports = {
  port: 4000,
  endpoint: "http://localhost",
  mongo: {
    url: process.env.MONGO_URL || "mongodb://localhost:27018",
    database: process.env.MONGO_DATABASE || "feeds",
  },
};
