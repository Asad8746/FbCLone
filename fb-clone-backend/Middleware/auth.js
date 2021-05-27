const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    let user = jwt.verify(token, config.get("secretKey"));
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
