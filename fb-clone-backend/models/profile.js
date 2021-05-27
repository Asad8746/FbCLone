const mongoose = require("mongoose");
const FollowerSchema = require("./Followers");
const FollowingSchema = require("./Following");
const Profile_Dp_Schema = require("./profile_dp");

let ProfileSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  l_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  profile_Dps: {
    type: [Profile_Dp_Schema],
    default: [],
  },
  cover_pic: {
    data: Buffer,
    contentType: String,
    default: {},
  },
  following: {
    type: [FollowingSchema],
    default: [],
  },
  followers: {
    type: [FollowerSchema],
    default: [],
  },
  blocked_users: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],
    default: [],
  },
  blocked_by: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],
    default: [],
  },
  about: {
    type: String,
    default: "",
  },
});

let ProfileModel = mongoose.model("Profile", ProfileSchema);

module.exports = ProfileModel;
