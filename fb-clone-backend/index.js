const express = require("express");
const winston = require("winston");
const socketIO = require("socket.io");

let app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  winston.info(`Listening to ${PORT}...`);
});

const io = socketIO(server);
require("./startup/notification")(io, app);
require("./startup/logger")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);
