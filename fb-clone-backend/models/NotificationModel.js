const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  profile_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  noti_from_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  notification: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  link: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Notification", schema);
