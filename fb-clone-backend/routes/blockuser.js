const express = require("express");
const mongoose = require("mongoose");
const auth = require("../Middleware/auth");
const ProfileModel = mongoose.model("Profile");
const router = express.Router();

router.get("/users", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    const { blocked_users } = await ProfileModel.findById({
      _id: profile_id,
    })
      .select("blocked_users")
      .populate("blocked_users._id", "_id f_name l_name");
    res.status(200).send(blocked_users);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

router.get("/check/:id", auth, async (req, res) => {
  const { profile: profile_id } = req.user;
  const { id } = req.params;
  const { blocked_users, blocked_by } = await ProfileModel.findById({
    _id: profile_id,
  })
    .select({
      blocked_users: 1,
      blocked_by: 1,
    })
    .populate("blocked_users._id", "_id f_name l_name")
    .populate("blocked_by._id", "_id f_name l_name");
  let check = blocked_users.find((item) => {
    return item._id._id == id;
  });
  if (check)
    return res
      .status(400)
      .send({ userIsBlocked: true, message: "You Blocked this user" });
  check = blocked_by.find((item) => {
    return item._id._id == id;
  });
  if (check) {
    const { f_name, l_name } = check._id;
    return res.status(400).send({
      blockedByUser: true,
      message: `you were blocked by ${f_name} ${l_name}`,
    });
  }
  res.sendStatus(200);
});

router.put("/:_id", auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    const { blocked_users, f_name, l_name } = await ProfileModel.findById({
      _id: profile_id,
    }).select({ blocked_users: 1, f_name: 1, l_name: 1 });
    const checkBlocked = blocked_users.findIndex((item) => {
      return item._id == _id;
    });
    const to_be_blocked_user = await ProfileModel.findById({ _id });
    if (!to_be_blocked_user) return res.sendStatus(404);
    if (checkBlocked !== -1) {
      return res.status(400).send("User Already Blocked");
    }
    await ProfileModel.findByIdAndUpdate(
      {
        _id: profile_id,
      },
      {
        $push: {
          blocked_users: {
            _id,
          },
        },
        $pull: {
          followers: {
            _id,
            follower_name: `${to_be_blocked_user.f_name} ${to_be_blocked_user.l_name}`,
          },
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
          blocked_by: {
            _id: profile_id,
          },
          $pull: {
            followers: {
              _id: profile_id,
              follower_name: `${f_name} ${l_name}`,
            },
            following: {
              _id: profile_id,
              followed_name: `${f_name} ${l_name}`,
            },
          },
        },
      }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
