const express = require("express");
const mongoose = require("mongoose");
const auth = require("../Middleware/auth");
const ProfileModel = mongoose.model("Profile");
const router = express.Router();

router.put("/:_id", auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    let { blocked_users } = await ProfileModel.findById({
      _id: profile_id,
    }).select({ blocked_users: 1 });

    const to_be_blocked_user = await ProfileModel.findById({ _id });
    if (!to_be_blocked_user) return res.sendStatus(404);
    const checkBlocked = blocked_users.findIndex((item) => {
      return item._id == _id;
    });
    if (checkBlocked === -1) {
      return res.status(400).send("No Blocked User Found");
    }
    const userProfile = await ProfileModel.findByIdAndUpdate(
      {
        _id: profile_id,
      },
      {
        $pull: {
          blocked_users: {
            _id,
          },
        },
      },
      { new: true }
    )
      .select("blocked_users")
      .populate("blocked_users._id", "_id f_name l_name");
    await ProfileModel.findByIdAndUpdate(
      {
        _id,
      },
      {
        $pull: {
          blocked_by: {
            _id: profile_id,
          },
        },
      }
    );
    res.status(200).send(userProfile.blocked_users);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
