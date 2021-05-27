const express = require("express");
const mongoose = require("mongoose");
const auth = require("../Middleware/auth");
const ProfileModel = mongoose.model("Profile");
const asyncMiddleware = require("../Middleware/asyncMiddleware");

const router = express.Router();

router.get(
  "/users",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const { blocked_users } = await ProfileModel.findById({
      _id: profile_id,
    })
      .select("blocked_users")
      .populate("blocked_users", "_id f_name l_name", "Profile");
    res.status(200).send(blocked_users);
  })
);

router.get(
  "/check/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const { id } = req.params;
    const profile = await ProfileModel.findOne({
      _id: profile_id,
      $or: [{ blocked_users: id }, { blocked_by: id }],
    })
      .select({
        blocked_users: 1,
        blocked_by: 1,
      })
      .populate("blocked_users", "_id f_name l_name")
      .populate("blocked_by", "_id f_name l_name");
    let blocked = {
      isBlocked: false,
      message: "",
    };
    if (profile && profile.blocked_users.length === 1) {
      let { f_name, l_name } = profile.blocked_users[0];
      blocked = { isBlocked: true, message: `You blocked ${f_name} ${l_name}` };
    } else if (profile && profile.blocked_by.length === 1) {
      let { f_name, l_name } = profile.blocked_by[0];
      blocked = {
        isBlocked: true,
        message: `You were blocked by ${f_name} ${l_name}`,
      };
    }
    res.status(200).send(blocked);
  })
);

router.put(
  "/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    const to_be_blocked_user = await ProfileModel.findById({ _id });
    if (!to_be_blocked_user) return res.sendStatus(404);
    const profile = await ProfileModel.findOne({
      _id: profile_id,
    }).select({ blocked_users: 1, blocked_by: 1, f_name: 1, l_name: 1 });
    const checkBlocked = profile.blocked_users.includes(_id);
    if (checkBlocked) {
      return res.sendStatus(400);
    }

    await ProfileModel.findByIdAndUpdate(
      {
        _id: profile_id,
      },
      {
        $push: {
          blocked_users: _id,
        },
        $pull: {
          followers: {
            _id,
            follower_name: `${to_be_blocked_user.f_name} ${to_be_blocked_user.l_name}`,
          },
        },
        $pull: {
          following: {
            _id,
            followed_name: `${to_be_blocked_user.f_name} ${to_be_blocked_user.l_name}`,
          },
        },
      }
    );
    await ProfileModel.findByIdAndUpdate(
      {
        _id,
      },
      {
        $push: {
          blocked_by: profile_id,
        },
        $pull: {
          followers: {
            _id: profile_id,
            follower_name: `${profile.f_name} ${profile.l_name}`,
          },
          following: {
            _id: profile_id,
            followed_name: `${profile.f_name} ${profile.l_name}`,
          },
        },
      }
    );
    res.sendStatus(200);
  })
);

module.exports = router;
