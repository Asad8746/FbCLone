const mongoose = require("mongoose");
const router = require("express").Router();
const asyncMiddleware = require("../Middleware/asyncMiddleware");
const auth = require("../Middleware/auth");
const ProfileModel = mongoose.model("Profile");

router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);
    let { following, blocked_by, blocked_users } = await ProfileModel.findById({
      _id: req.user.profile,
    }).select({ following: 1, blocked_users: 1, blocked_by: 1 });
    const profiles = await ProfileModel.find({
      $and: [
        {
          _id: { $ne: req.user.profile },
        },
        {
          _id: {
            $nin: following,
          },
        },
        {
          _id: {
            $nin: blocked_by,
          },
        },
        {
          _id: {
            $nin: blocked_users,
          },
        },
      ],
    })
      .select({ _id: 1, f_name: 1, l_name: 1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    return res.send(profiles);
  })
);
module.exports = router;
