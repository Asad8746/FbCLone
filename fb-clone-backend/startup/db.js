const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect(config.get("mongoUri"))
    .then(() => {
      console.log("Connected to Database");
      winston.info("Connected to Database");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
