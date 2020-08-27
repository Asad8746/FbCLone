const mongoose = require("mongoose");
const { postSchema } = require("./PostModel");
const BlockedSchema = require("./BlockedSchema");
const FollowerSchema = require("./Followers");
const FollowingSchema = require("./Following");
const Profile_Dp_Schema = require("./profile_dp");

const joi = require("joi");

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
    type: [BlockedSchema],
    default: [],
  },
  blocked_by: {
    type: [BlockedSchema],
    default: [],
  },

  about: {
    type: String,
    default: "",
  },
});

let ProfileModel = mongoose.model("Profile", ProfileSchema);

// const validateProfile = (body) => {
//     let schema = {
//         name: joi.string().required().min(3).max(255),
//         surname:joi.string().required().min(3).max(255),
//         about : joi.string().required().min(3).max(255)
//     }
//     return joi.validate(body,schema)
// }

module.exports = ProfileModel;
