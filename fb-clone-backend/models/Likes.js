const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    requried: true,
  },
});

module.exports = likeSchema;
