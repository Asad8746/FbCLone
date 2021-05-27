const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    requried: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 5,
  },
  post_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", commentSchema);
