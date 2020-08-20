const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    let user = jwt.verify(token, "private-key");
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
