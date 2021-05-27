const express = require("express");
const mongoose = require("mongoose");
const auth = require("../Middleware/auth");
const asyncMiddleware = require("../Middleware/asyncMiddleware");

const ProfileModel = mongoose.model("Profile");
const router = express.Router();

router.put(
  "/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    const profile = await ProfileModel.findOneAndUpdate(
      {
        _id: profile_id,
        blocked_users: _id,
      },
      {
        $pull: { blocked_users: _id },
      },
      { new: true }
    ).select({ blocked_users: 1 });
    const toBeUnBlocked = await ProfileModel.findOneAndUpdate(
      { _id, blocked_by: profile_id },
      {
        $pull: { blocked_by: profile_id },
      },
      { new: true }
    );
    res.status(200).send(profile.blocked_users);
  })
);

module.exports = router;
