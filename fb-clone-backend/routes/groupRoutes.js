const express = require("express");
const { GroupModel, validateGroup } = require("../models/GroupModel");
const auth = require("../Middleware/auth");
const groupAdminMiddleware = require("../Middleware/groupAdmin");
const { PostModel, validatePost } = require("../models/PostModel");
const asyncMiddleware = require("../Middleware/asyncMiddleware");
const ProfileModel = require("../models/profile");

const router = express.Router();

router.get(
  "/check/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    const check = await GroupModel.findOne({
      _id,
      "members._id": profile_id,
    }).select("_id");
    if (check) return res.status(200).send(true);
    return res.status(200).send(false);
  })
);

router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const { pageNumber, type } = req.query;
    let query = {};
    if (type === "all") {
      query = {
        group_admin_id: { $ne: profile_id },
        "members._id": { $ne: profile_id },
      };
    }
    if (type === "joined") {
      query = {
        "members._id": profile_id,
        group_admin_id: { $ne: profile_id },
      };
    } else if (type === "managed") {
      query = {
        group_admin_id: profile_id,
      };
    }
    const groups = await GroupModel.find(query)
      .select("-cover -members -requests -posts")
      .limit(10)
      .skip((parseInt(pageNumber) - 1) * 10);
    res.send(groups);
  })
);

router.get(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const group = await GroupModel.findById(id)
      .select("-cover -posts")
      .populate("group_admin_id", "_id f_name l_name", "Profile");
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
    const { send } = req.notification;
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
    const { send } = req.notification;
    const { _id, f_name, l_name } = req.group.group_admin_id;
    const { member_id } = req.params;
    let profile = await ProfileModel.findById({ _id: member_id }).select(
      "_id groups f_name l_name"
    );
    if (!profile) return res.status(404).send("User not Found");
    if (_id == member_id) {
      return res
        .status(400)
        .send("You are already a group member as group admin");
    }
    const checkIsMember = group.members.findIndex((item) => {
      return item._id == member_id;
    });
    if (checkIsMember !== -1) {
      return res.status(400).send("Already Member");
    }
    group.members.push({
      _id: member_id,
      name: `${profile.f_name} ${profile.l_name}`,
    });
    group.requests = group.requests.filter((item) => {
      return item.id != member_id;
    });
    await group.save();
    await profile.save();
    await send({
      notification: `${f_name} ${l_name} Accepted  your Request for ${group.name}`,
      noti_from_id: _id,
      link: "http://something.com",
      profile_id: profile._id,
    });
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
    const { send } = req.notification;
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
    await send({
      notification: `${profile.f_name} ${profile.l_name} Requested to join ${group.name}`,
      noti_from_id: profile._id,
      link: "http://something.com",
      profile_id: group.group_admin_id,
    });
    res.sendStatus(200);
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
    await GroupModel.findByIdAndUpdate(
      {
        _id: group_id,
      },
      {
        $pull: {
          members: { _id: profile_id, isAdmin: false },
        },
      }
    );
    res.sendStatus(200);
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
      group_admin_id: userprofile._id,
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
    const group = await GroupModel.findById(group_id).select({
      _id: 1,
    });
    const profile = await ProfileModel.findById(profile_id).select(
      "_id f_name l_name"
    );
    if (!group || !profile) return res.sendStatus(404);
    const { description } = req.body;
    let post = {
      groupId: group_id,
      description,
      belongsTo: "group",
      author_id: profile_id,
      author_name: `${profile.f_name} ${profile.l_name}`,
    };
    if (req.files) {
      const { data, mimetype } = req.files.file;
      post = {
        ...post,
        image: { data, contentType: mimetype },
        hasImage: true,
      };
    }
    post = new PostModel(post);
    await post.save();

    post = await PostModel.findById({ _id: post._id })
      .select("-image")
      .populate("author_id", "_id f_name l_name")
      .populate("groupId", "_id name");

    res.status(200).send({
      ...post._doc,
      likes: post.likes.length,
      comments: post.comments.length,
    });
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

module.exports = router;
