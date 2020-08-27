const mongoose = require("mongoose");
const LikeSchema = require("./Likes");
const joi = require("joi");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  cover: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  group_privacy: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  created_on: {
    type: Date,
    default: Date.now(),
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
          ref: "Profile",
        },
        name: {
          type: String,
          required: true,
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },
  requests: {
    type: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Profile",
        },
        name: {
          type: String,
          required: true,
          minlength: 3,
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
    name: joi.string().required().min(2).max(255),
    description: joi.string().required().min(2).max(255),
    group_privacy: joi.string().required().valid("public", "private"),
  };
  return joi.validate(body, schema);
};

module.exports = { GroupModel, validateGroup };
