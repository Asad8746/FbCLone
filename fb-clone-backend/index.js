const express = require("express");
const winston = require("winston");
let app = express();

require("./startup/logger")();
require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  winston.info(`Listening to ${PORT}...`);
});
