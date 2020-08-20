const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  profile_id: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    requried: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = commentSchema;
