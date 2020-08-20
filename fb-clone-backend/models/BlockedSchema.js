const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});
