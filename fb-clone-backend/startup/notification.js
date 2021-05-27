const Notification = require("../notification/Realtime");

module.exports = (io, app) => {
  const notification = new Notification(io);
  app.use((req, res, next) => {
    req.notification = notification;
    next();
  });
};
