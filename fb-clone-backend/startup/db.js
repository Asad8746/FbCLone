const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

module.exports = function () {
  const dbUri = config.get("mongoUri");
  console.log(dbUri);
  mongoose
    .connect(config.get("mongoUri"))
    .then(() => {
      console.log(`Connected to ${dbUri}`);
      winston.info("Connected to Database");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
