const express = require("express");
const cors = require("cors");
const { userApi } = require("./src/api");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  userApi(app);
};
