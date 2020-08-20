const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  followed_name: {
    type: String,
    required: true,
  },
});
