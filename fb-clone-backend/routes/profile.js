const express = require("express");
const auth = require("../Middleware/auth");
const ProfileModel = require("../models/profile");
const confirmPasswordMiddle = require("../Middleware/confirmPassword");
const { UserModel } = require("../models/user");
const { PostModel } = require("../models/PostModel");
const PageModel = require("../models/PageModel");
const asyncMiddleware = require("../Middleware/asyncMiddleware");
const router = express.Router();

router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const profile = await ProfileModel.findById({
      _id: profile_id,
    }).select("_id f_name l_name about");
    res.send(profile);
  })
);

router.get(
  "/:_id/followers",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { followers } = await ProfileModel.findById({ _id }).select(
      "followers"
    );
    res.status(200).send(followers);
  })
);

router.get(
  "/:_id/following",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { following } = await ProfileModel.findById({ _id }).select(
      "following"
    );
    res.status(200).send(following);
  })
);

router.get(
  "/checktoken",
  auth,
  asyncMiddleware(async (req, res) => {
    const profile = await ProfileModel.findById({ _id: req.user.profile });
    if (req.user)
      return res
        .status(200)
        .send({
          id: profile._id,
          f_name: profile.f_name,
          l_name: profile.l_name,
        });
    return res.sendStatus(400);
  })
);

router.get(
  "/people",
  auth,
  asyncMiddleware(async (req, res) => {
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
    }).select({ _id: 1, f_name: 1, l_name: 1 });
    return res.send(profiles);
  })
);

router.get(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    let profile = await ProfileModel.findById({ _id: req.params.id }).select({
      _id: 1,
      f_name: 1,
      l_name: 1,
      dob: 1,
      gender: 1,
      user_id: 1,
      following: 1,
      followers: 1,
      about: 1,
    });
    if (!profile) return res.sendStatus(400);
    profile = {
      ...profile._doc,
      following: profile.following.length,
      followers: profile.followers.length,
    };
    res.status(200).send(profile);
  })
);

router.get(
  "/profile_pic/:id",
  asyncMiddleware(async (req, res) => {
    const { profile_Dps } = await ProfileModel.findById({ _id: req.params.id });
    if (!profile_Dps || profile_Dps.length === 0)
      return res.sendFile(process.cwd() + "/public/free.jpg");
    const profile_dp = profile_Dps[profile_Dps.length - 1];
    res.set("Content-Type", profile_dp.contentType);
    res.status(200).send(profile_dp.data);
  })
);
router.get(
  "/cover/:id",
  asyncMiddleware(async (req, res) => {
    const { cover_pic } = await ProfileModel.findById({ _id: req.params.id });
    if (!cover_pic.data) {
      return res.sendFile(process.cwd() + "/public/free1.jpg");
    }
    res.set("Content-Type", cover_pic.contentType);
    res.status(200).send(cover_pic.data);
  })
);

router.put(
  "/upload/dp",
  auth,
  asyncMiddleware(async (req, res) => {
    const profile = await ProfileModel.findById({ _id: req.user.profile });
    if (!profile) return res.status(404).send("Profile Not found");
    if (!req.files) return res.status(400).send("Please upload a Valid Image");
    const { file } = req.files;
    let profile_dp = {
      name: file.name,
      data: file.data,
      contentType: file.mimetype,
    };
    profile.profile_Dps.push(profile_dp);
    await profile.save();
    res.sendStatus(201);
  })
);

router.put(
  "/upload/cover",
  auth,
  asyncMiddleware(async (req, res) => {
    let { profile: profile_id } = req.user;
    if (!req.files) return res.status(400).send("Incorrect File Data");
    const { data, mimetype } = req.files.file;
    await ProfileModel.findByIdAndUpdate(
      { _id: profile_id },
      {
        cover_pic: {
          data,
          contentType: mimetype,
        },
      },
      { new: true }
    );
    return res.sendStatus(201);
  })
);

router.put(
  "/edit",
  [auth, confirmPasswordMiddle],
  asyncMiddleware(async (req, res) => {
    const { f_name, l_name, about } = req.body;
    const { profile: profile_id } = req.user;
    await ProfileModel.findByIdAndUpdate(
      { _id: profile_id },
      {
        f_name,
        l_name,
        about,
      },
      { new: true }
    );
    res.status(200).send(profile_id);
  })
);

router.delete(
  "/delete",
  [auth, confirmPasswordMiddle],
  asyncMiddleware(async (req, res) => {
    const { id, profile: profile_id } = req.user;
    await ProfileModel.findByIdAndDelete({ _id: profile_id });
    await UserModel.findByIdAndRemove({ _id: id });
    await PostModel.findOneAndRemove({ author_id: profile_id });
    await PageModel.findOneAndRemove({ page_admin_id: profile_id });
    res.sendStatus(200);
  })
);

module.exports = router;
