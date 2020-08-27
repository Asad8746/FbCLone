const winston = require("winston");
const { label } = require("joi");
module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logger.log" }));
  winston.exceptions.handle(
    new winston.transports.File({ filename: "unCaughtExceptions.log" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    })
  ),
    process.on("unhandledRejection", (ex) => {
      throw ex;
    });
};
