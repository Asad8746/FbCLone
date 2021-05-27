const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect(config.get("mongoUri"), { useNewUrlParser: true })
    .then(() => {
      console.log(`Connected to Db`);
      winston.info("Connected to Database");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
