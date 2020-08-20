const express = require("express");
const Profile = require("../models/profile");
const auth = require("../Middleware/auth");

const router = express.Router();

router.get("/checkfollower/:id", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    const { followers } = await Profile.findById({
      _id: req.params.id,
    }).select({ followers: 1 });
    let check = followers.find((item) => {
      return item._id == profile_id;
    });
    if (check) return res.status(200).send(true);
    return res.status(200).send(false);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    const { followers } = await Profile.findById({ _id: profile_id }).select({
      followers: 1,
    });
    if (!user_profile) return res.sendStatus(400);
    res.status(200).send(followers);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/following/:id", auth, async (req, res) => {
  try {
    const { following } = await Profile.findById({ _id: req.params.id });
    res.send(following);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    let toBeFollowed = await Profile.findById({ _id: req.params.id });
    if (!toBeFollowed) return res.status(400).send("Bad Request");
    const updatedProfile = await Profile.findByIdAndUpdate(
      profile_id,
      {
        $pull: {
          following: {
            _id: req.params.id,
            followed_name: `${toBeFollowed.f_name} ${toBeFollowed.l_name}`,
          },
        },
      },
      { new: true }
    );
    toBeFollowed = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          followers: {
            _id: profile_id,
            follower_name: `${updatedProfile.f_name} ${updatedProfile.l_name}`,
          },
        },
      },
      { new: true }
    ).select({ following: 1, followers: 1 });
    await updatedProfile.save();
    await toBeFollowed.save();
    res.status(200).send({
      followers: toBeFollowed.followers,
      following: toBeFollowed.following,
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/follow/:id", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    let toBeFollowed = await Profile.findById({ _id: req.params.id });
    if (!toBeFollowed) return res.status(400).send("Bad Request");
    const updatedProfile = await Profile.findByIdAndUpdate(
      profile_id,
      {
        $push: {
          following: {
            _id: req.params.id,
            followed_name: `${toBeFollowed.f_name} ${toBeFollowed.l_name}`,
          },
        },
      },
      { new: true }
    );
    toBeFollowed = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          followers: {
            _id: profile_id,
            follower_name: `${updatedProfile.f_name} ${updatedProfile.l_name}`,
          },
        },
      },
      { new: true }
    ).select({
      following: 1,
      followers: 1,
    });
    await updatedProfile.save();
    await toBeFollowed.save();
    res.status(200).send({
      following: toBeFollowed.following,
      followers: toBeFollowed.followers,
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
