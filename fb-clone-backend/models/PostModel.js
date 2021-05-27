const mongoose = require("mongoose");
const joi = require("joi");
const likeSchema = require("./Likes");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  belongsTo: {
    type: String,
    enum: ["page", "group", "profile"],
    default: "",
  },
  // pageId: {
  //   type: mongoose.Types.ObjectId,
  //   required: function () {
  //     return this.belongsTo === "page";
  //   },
  //   ref: "Page",
  // },
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
    ref: function () {
      if (this.belongsTo === "page") {
        return "Page";
      } else {
        return "Profile";
      }
    },
  },
  author_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
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
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
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
