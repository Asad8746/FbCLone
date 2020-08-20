const mongoose = require("mongoose");
const LikeSchema = require("./Likes");
const AdminSchema = require("./AdminSchema");

const pageSchema = new mongoose.Schema({
  page_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  page_cover: {
    Data: Buffer,
    contentType: String,
  },
  page_description: {
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
  page_admin_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Profile",
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

module.exports = mongoose.model("Page", pageSchema);
