const winston = require("winston");

module.exports = (ex, req, res, next) => {
  winston.error(ex.message, ex);
  return res.status(500).send("Oops Something goes wrong");
};
