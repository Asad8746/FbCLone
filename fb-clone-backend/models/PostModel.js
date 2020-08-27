const mongoose = require("mongoose");
const joi = require("joi");
const likeSchema = require("./Likes");
const commentSchema = require("./Comment");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  belongsTo: {
    type: String,
    enum: ["page", "group", ""],
    default: "",
  },
  pageId: {
    type: mongoose.Types.ObjectId,
    required: function () {
      return this.belongsTo === "page";
    },
    ref: "Page",
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    required: function () {
      return this.belongsTo === "group";
    },
    ref: "Group",
  },
  author_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: function () {
      return this.belongsTo === "" || this.belongsTo === "group";
    },
    ref: "Profile",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  hasImage: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: [likeSchema],
    default: [],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

let PostModel = mongoose.model("Post", postSchema);

const validatePost = (body) => {
  let Schema = {
    description: joi.string().min(3).required(),
  };
  return joi.validate(body, Schema);
};
module.exports = {
  validatePost,
  PostModel,
};
