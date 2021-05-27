const mongoose = require("mongoose");

const active_user_schema = new mongoose.Schema({
  socket_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("ActiveUsers", active_user_schema);
