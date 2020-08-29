const express = require("express");
const { GroupModel, validateGroup } = require("../models/GroupModel");
const auth = require("../Middleware/auth");
const groupAdminMiddleware = require("../Middleware/groupAdmin");
const { PostModel, validatePost } = require("../models/PostModel");
const asyncMiddleware = require("../Middleware/asyncMiddleware");

const ProfileModel = require("../models/profile");
const { profile } = require("winston");

const router = express.Router();

router.get(
  "/check/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    const { members } = await GroupModel.findById({ _id }).select("members");
    const check = members.findIndex((item) => {
      return item._id == profile_id;
    });
    if (check !== -1) return res.status(200).send(true);
    return res.status(200).send(false);
  })
);
router.get(
  "/privacy/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    const { members } = await GroupModel.findById({ _id }).select("members");
    const check = members.findIndex((item) => {
      return item._id == profile_id;
    });
    if (check !== -1) return res.status(200).send(true);
    return res.status(200).send(false);
  })
);

router.get(
  "/all",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const groups = await GroupModel.find({
      group_admin_id: { $ne: profile_id },
      members: { $nin: [{ _id: profile_id }] },
    }).select("-cover -members -requests -posts");

    res.send(groups);
  })
);

router.get(
  "/joined",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const groups = await GroupModel.find({
      members: { _id: profile_id },
    }).select("-cover -members -requests -posts");
    res.send(groups);
  })
);

router.get(
  "/managed",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const groups = await GroupModel.find({
      group_admin_id: profile_id,
    }).select("_id name description");
    res.send(groups);
  })
);
router.get(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const group = await GroupModel.findById({ _id: id })
      .select("-cover -posts")
      .populate("group_admin_id", "_id f_name l_name");
    console.log(group);
    res.status(200).send({
      ...group._doc,
      members: group.members.length,
      requests: group.requests.length,
    });
  })
);

router.get(
  "/check/:group_id/request",
  auth,
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    const group = await GroupModel.findById({
      _id: group_id,
    }).select("-cover");

    const check = group.requests.findIndex((item) => {
      return item._id == profile_id;
    });
    if (check !== -1) return res.status(200).send(true);
    return res.status(200).send(false);
  })
);
router.put(
  "/add/:group_id/member/:member_id",
  [auth, groupAdminMiddleware],
  asyncMiddleware(async (req, res) => {
    const group = req.group;
    const { member_id } = req.params;
    let profile = await ProfileModel.findById({ _id: member_id }).select(
      "_id groups f_name l_name"
    );
    if (!profile) return res.status(404).send("User not Found");
    if (group.group_admin_id == member_id) {
      return res
        .status(400)
        .send("You are already a group member as group admin");
    }
    const checkIsMember = group.members.findIndex((item) => {
      return item._id == member_id;
    });
    if (checkIsMember !== -1) return res.status(400).send("Already Member");
    group.members.push({
      _id: member_id,
      name: `${profile.f_name} ${profile.l_name}`,
    });
    group.requests = group.requests.filter((item) => {
      return item.id != member_id;
    });
    await group.save();
    await profile.save();
    res.send(group.members);
  })
);

router.get(
  "/requests/:group_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    const group = await GroupModel.findById({
      _id: group_id,
    }).select("_id requests group_admin_id");
    if (group.group_admin_id != profile_id) {
      return res.sendStatus(400);
    }
    res.send(group);
  })
);
router.get(
  "/members/:group_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    const group = await GroupModel.findById({
      _id: group_id,
    }).select("_id members group_admin_id");
    if (group.group_admin_id != profile_id) {
      return res.sendStatus(400);
    }
    console.log(group);
    res.send(group);
  })
);

router.put(
  "/cancelRequest/:group_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    await GroupModel.findByIdAndUpdate(
      {
        _id: group_id,
      },
      {
        $pull: {
          requests: {
            _id: profile_id,
          },
        },
      }
    );
    res.sendStatus(200);
  })
);

router.put(
  "/request/:group_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    const profile = await ProfileModel.findById({ _id: profile_id }).select(
      "_id f_name l_name"
    );
    if (!profile) return res.status(404).send("User Not Found");

    const group = await GroupModel.findById({ _id: group_id }).select("-cover");

    if (group.group_admin_id == profile_id) {
      return res.status(400).send("You are Already a member as Group Admin");
    }
    let check = group.members.findIndex((item) => {
      return item._id == profile_id;
    });
    if (check !== -1) return res.status(400).send("You are a member ");

    check = group.requests.findIndex((item) => {
      return item._id == profile_id;
    });
    if (check !== -1) return res.status(400).send("Already Requested");
    group.requests.push({
      _id: profile._id,
      name: `${profile.f_name} ${profile.l_name}`,
    });
    await group.save();
    res.send(group.requests);
  })
);

router.put(
  "/remove/:group_id/member/:member_id",
  [auth, groupAdminMiddleware],
  asyncMiddleware(async (req, res) => {
    const group = req.group;
    const { member_id } = req.params;
    let check = group.members.findIndex((item) => {
      return item._id == member_id;
    });
    if (check === -1) return res.status(400).send("Member not Founded");
    group.members = group.members.filter((item) => {
      return item._id != member_id;
    });
    await group.save();
    res.send(group.members);
  })
);

router.get(
  "/:_id/cover",
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { cover } = await GroupModel.findById({ _id }).select("cover");
    if (!cover.data) {
      return res.sendFile(process.cwd() + "/public/free1.jpg");
    }
    res.set("Content-Type", cover.contentType).send(cover.data);
  })
);

router.put(
  "/leave/:group_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    const Group = await GroupModel.findByIdAndUpdate(
      {
        _id: group_id,
      },
      {
        $pull: {
          members: { _id: profile_id, isAdmin: false },
        },
      }
    );
    res.send(200);
  })
);

// A Post Request to create a new Group

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateGroup(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { name, description, group_privacy } = req.body;
    const { profile: profile_id } = req.user;
    const userprofile = await ProfileModel.findById({ _id: profile_id }).select(
      "_id f_name l_name"
    );
    if (!userprofile) return res.sendStatus(404);
    let Group = new GroupModel({
      name,
      description,
      group_admin_id: profile_id,
      group_privacy,
    });
    if (req.files) {
      const { data, mimetype: contentType } = req.files.file;
      Group.cover = {
        data,
        contentType,
      };
    }
    Group.members.push({
      _id: profile_id,
      name: `${userprofile.f_name} ${userprofile.l_name}`,
      isAdmin: true,
    });
    await Group.save();
    res.sendStatus(201);
  })
);

router.delete(
  "/:group_id",
  [auth, groupAdminMiddleware],
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    await GroupModel.findByIdAndRemove({ _id: group_id });
    res.sendStatus(200);
  })
);

// Routes for creating Posts

router.post(
  "/:group_id/create/post/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validatePost(req.body);
    const { profile: profile_id } = req.user;
    if (error) return res.status(400).send(error.details[0].message);
    const { group_id } = req.params;
    const group = await GroupModel.findById({ _id: group_id }).select({
      _id: 1,
      posts: 1,
    });
    if (!group) return res.sendStatus(404);
    const { description } = req.body;
    let post;
    if (!req.files) {
      post = new PostModel({
        groupId: group_id,
        description,
        belongsTo: "group",
        author_id: profile_id,
      });
    } else {
      const { data, mimetype } = req.files.file;
      post = new PostModel({
        groupId: group_id,
        image: { data, contentType: mimetype },
        hasImage: true,
        description,
        belongsTo: "group",
        author_id: profile_id,
      });
    }
    group.posts.push({ _id: post._id });
    await post.save();
    await group.save();
    post = await PostModel.findById({ _id: post._id })
      .select("-image")
      .populate("groupId", "_id name")
      .populate("author_id", "_id f_name l_name");

    res.status(200).send({
      ...post._doc,
      likes: post.likes.length,
      comments: post.comments.length,
    });
  })
);

router.get(
  "/:group_id/posts",
  auth,
  asyncMiddleware(async (req, res) => {
    const { group_id } = req.params;
    const group = await GroupModel.findById({ _id: group_id }).select("_id");
    if (!group) return res.sendStatus(404);
    let posts = await PostModel.find({
      belongsTo: "group",
      groupId: group._id,
    })
      .select("-image")
      .populate("groupId", "_id name group_admin_id")
      .populate("author_id", "_id f_name l_name")
      .sort({ date: -1 });
    posts = posts.map((item) => {
      return {
        ...item._doc,
        comments: item.comments.length,
        likes: item.likes.length,
      };
    });
    res.status(200).send(posts);
  })
);

router.put(
  "/upload/cover/:group_id",
  [auth, groupAdminMiddleware],
  asyncMiddleware(async (req, res) => {
    let { group_id } = req.params;
    if (!req.files) return res.status(400).send("Incorrect File Data");
    const { data, mimetype } = req.files.file;
    await GroupModel.findByIdAndUpdate(
      { _id: group_id },
      {
        cover: {
          data,
          contentType: mimetype,
        },
      },
      { new: true }
    );
    return res.sendStatus(201);
  })
);

router.patch(
  "/:group_id",
  [auth, groupAdminMiddleware],
  asyncMiddleware(async (req, res) => {
    const group = req.group;
    group.name = req.body.name;
    group.description = req.body.description;
    group.group_privacy = req.body.group_privacy;
    await group.save();
    res.sendStatus(200);
  })
);

// router.delete(
//   "/:group_id",
//   [auth, groupAdminMiddleware],
//   asyncMiddleware(async (req, res) => {
//     const { _id } = req.group;
//     await GroupModel.findByIdAndDelete({ _id });
//     res.sendStatus(200);
//   })
// );

module.exports = router;
