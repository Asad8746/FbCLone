const mongoose = require("mongoose");

const Profile_Dp = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  uploaded_Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Profile_Dp;
