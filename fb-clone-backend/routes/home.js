const express = require("express");
const ProfileModel = require("../models/profile");
const { PostModel } = require("../models/PostModel");
const auth = require("../Middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let { profile: user_profile_id } = req.user;
    const {
      following,
      blocked_users,
      blocked_by,
      pages,
    } = await ProfileModel.findById({
      _id: user_profile_id,
    }).select({ following: 1, blocked_users: 1, blocked_by: 1, pages: 1 });
    let posts = await PostModel.find({
      $or: [
        { author_id: user_profile_id },
        { profile_id: { $in: following } },
        { belongsToId: { $in: pages } },
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
      .populate("belongsToId", "_id page_name page_admin_id", "Page")
      .sort("-date");
    return res.send(posts);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
