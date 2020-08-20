const mongoose = require("mongoose");
const LikeSchema = require("./Likes");
const joi = require("joi");

const groupSchema = new mongoose.Schema({
  group_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  group_cover: {
    Data: Buffer,
    contentType: String,
  },
  group_description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: [LikeSchema],
    default: [],
  },
  group_admin_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  members: {
    type: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
      },
    ],
    default: [],
  },
  posts: {
    type: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const GroupModel = mongoose.model("Group", groupSchema);

const validateGroup = (body) => {
  const schema = {
    group_name: joi.string().required().min(2).max(255),
    group_description: joi.string().required().min(2).max(255),
  };
  return joi.validate(body, schema);
};

module.exports = { GroupModel, validateGroup };
