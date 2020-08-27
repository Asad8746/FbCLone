const express = require("express");
const ProfileModel = require("../models/profile");
const { PostModel } = require("../models/PostModel");
const auth = require("../Middleware/auth");
const asyncMiddleware = require("../Middleware/asyncMiddleware");
const router = express.Router();

router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    let { profile: user_profile_id } = req.user;
    const {
      following,
      blocked_users,
      blocked_by,
    } = await ProfileModel.findById({
      _id: user_profile_id,
    }).select({ following: 1, blocked_users: 1, blocked_by: 1, pages: 1 });
    let posts = await PostModel.find({
      belongsTo: "",
      $or: [
        { author_id: user_profile_id },
        { profile_id: { $in: following } },
        {
          $and: [
            { profile_id: { $nin: blocked_by } },
            { profile_id: { $nin: blocked_users } },
          ],
        },
      ],
    })
      .select("-image")
      .populate("author_id", "_id f_name l_name", "Profile")
      .populate("pageId", "_id name page_admin_id", "Page")
      .populate("groupId", "_id name group_admin_id")
      .sort("-date");

    posts = posts.map((item) => {
      return {
        ...item._doc,
        comments: item.comments.length,
        likes: item.likes.length,
      };
    });
    return res.send(posts);
  })
);

module.exports = router;
