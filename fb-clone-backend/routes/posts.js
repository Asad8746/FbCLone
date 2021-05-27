const auth = require("../Middleware/auth");
const asyncMiddleware = require("../Middleware/asyncMiddleware");
const { PostModel, validatePost } = require("../models/PostModel");
const CommentModel = require("../models/Comment");
const ProfileModel = require("../models/profile");

const express = require("express");
const { GroupModel } = require("../models/GroupModel");

let router = express.Router();

// Get routes

router.get(
  "/:_id/check/like",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const { _id } = req.params;
    const check = await PostModel.findOne({
      _id,
      likes: { _id: profile_id },
    }).select("_id");
    if (check) return res.status(200).send(true);
    return res.status(200).send(false);
  })
);

// A route for getting a single Post based on post id
router.get(
  "/post/:id",
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const post = await PostModel.findById({ _id: id }).select({
      _id: 1,
      description: 1,
      belongsTo: 1,
      pageId: 1,
      groupId: 1,
      author_id: 1,
    });
    if (!post) return res.sendStatus(404);
    res.status(200).send(post);
  })
);

// A route for extracting post image.
router.get(
  "/post_pic/:id",
  asyncMiddleware(async (req, res) => {
    const { image } = await PostModel.findById({ _id: req.params.id });
    res.set("Content-Type", image.contentType);
    return res.status(200).send(image.data);
  })
);

router.get(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    let { pageNumber, type } = req.query;
    let { id } = req.params;
    let query = {};
    let destructure = "";
    switch (type) {
      case "group":
        query = {
          belongsTo: "group",
          groupId: id,
        };
        break;
      case "profile":
        query = {
          belongsTo: "profile",
          author_id: id,
        };
        destructure = "_id f_name l_name";
        break;
      case "page":
        query = {
          author_id: id,
          belongsTo: "page",
        };
        destructure = "_id page_admin_id";
        break;
    }
    pageNumber = parseInt(pageNumber);
    let total = await PostModel.find(query)
      .select("-image")
      .populate("author_id", destructure)
      .sort("-date")
      .count();
    let posts = await PostModel.find(query)
      .select("-image")
      .populate("author_id", destructure)
      .sort("-date")
      .skip((pageNumber - 1) * 10)
      .limit(10);

    posts = posts.map((item) => {
      return {
        ...item._doc,
        comments: item.comments.length,
        likes: item.likes.length,
      };
    });
    return res.status(200).send({ total, posts });
  })
);

// A route for getting all comments based on post id
router.get(
  "/comment/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { pageNumber } = req.query;
    const comments = await CommentModel.find({ post_id: req.params.id })

      .sort("-date")
      .populate("author", "_id f_name l_name")
      .limit(5)
      .skip((parseInt(pageNumber) - 1) * 5);

    return res.status(200).send(comments);
  })
);

//Post Routes
router.post(
  "/create",
  auth,
  asyncMiddleware(async (req, res) => {
    const { description } = req.body;
    const { profile: profile_id } = req.user;
    const profile = await ProfileModel.findById(profile_id).select(
      "_id f_name l_name"
    );
    if (!profile) return res.sendStatus(400);
    let post = {
      author_id: profile_id,
      description,
      belongsTo: "profile",
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
      .populate("author_id", "_id f_name l_name");

    res.send({
      ...post._doc,
      likes: post.likes.length,
      comments: post.comments.length,
    });
  })
);

// Put Routes

/* A route for modifying post description 
where i am first validating the post using validatePost 
function which will return a object with 2 fields error and result 
error will be empty if our req.body has no validation errors
if not then i am returing a response with status code 400 and with validation message
*/
router.put(
  "/post/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { _id } = req.params;
    let updateFlag = false;
    const post = await PostModel.findById(_id)
      .populate("author_id", "_id page_admin_id")
      .populate("groupId", "group_admin_id");
    if (
      post.belongsTo === "page" &&
      post.author_id.page_admin_id == req.user.profile
    ) {
      updateFlag = true;
    }
    if (
      post.belongsTo === "group" &&
      (post.groupId.group_admin_id == req.user.profile ||
        post.author_id._id == req.user.profile)
    ) {
      updateFlag = true;
    }
    if (
      post.belongsTo === "profile" &&
      post.author_id._id == req.user.profile
    ) {
      updateFlag = true;
    }
    if (updateFlag) {
      await PostModel.findOneAndUpdate(
        { _id },
        {
          description: req.body.description,
        }
      );
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  })
);

/* A route for user to like a  Post 
In this route i am first checking if a post is already liked 
by our user if yes then a response with status code 400 and message 
already liked is returned if not then a new user is pushed into the 
post likes array.
*/
router.put(
  "/like/:post_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { post_id } = req.params;
    const { send } = req.notification;
    const { profile: profile_id } = req.user;
    const profile = await ProfileModel.findOne({ _id: profile_id }).select(
      "_id f_name l_name"
    );
    if (!profile) return res.status(404).send("Invalid Request");
    let post = await PostModel.findOne({
      _id: post_id,
      likes: { _id: profile._id },
    }).select("_id");
    if (post) return res.status(400).send("Already Liked");
    post = await PostModel.findByIdAndUpdate(
      { _id: post_id },
      { $push: { likes: { _id: profile_id } } },
      { new: true }
    )
      .populate("author_id", "page_admin_id name")
      .populate("groupId", "name group_admin_id");
    let notification = {
      notification: `${profile.f_name} ${profile.l_name} Liked Your post`,
      noti_from_id: profile._id,
      link: "/post",
      profile_id: post.author_id._id,
    };
    let canSendNoti = true;
    if (post.belongsTo === "page") {
      notification = {
        ...notification,
        notification: `${profile.f_name} ${profile.l_name} Liked Your post in Page  ${post.author_id.name}`,
        profile_id: post.author_id.page_admin_id,
      };
    }
    if (post.belongsTo === "group") {
      const group = await GroupModel.findOne({
        _id: post.groupId._id,
        "members._id": post.author_id._id,
      });
      if (!group) {
        canSendNoti = false;
      }
      notification = {
        ...notification,
        notification: `${profile.f_name} ${profile.l_name} Liked Your post in Group ${post.groupId.name}`,
        profile_id: post.author_id._id,
      };
    }
    if (
      (post.belongsTo === "profile" && post.author_id._id != profile_id) ||
      (post.belongsTo === "page" &&
        post.author_id.page_admin_id != profile_id) ||
      (post.belongsTo === "group" && post.author_id._id != profile_id)
    ) {
      if (canSendNoti) {
        await send(notification);
      }
    }
    res.status(200).send({ likes: post.likes.length });
  })
);

// A route where a user can dislike a  Post
router.put(
  "/dislike/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { id: post_id } = req.params;
    const { profile: profile_id } = req.user;
    let { likes } = await PostModel.findOne({ _id: post_id }).select("likes");
    const isLiked = likes.find((item) => {
      return item._id == profile_id;
    });
    if (isLiked) {
      const post = await PostModel.findByIdAndUpdate(
        { _id: post_id },
        { $pull: { likes: { _id: profile_id } } },
        { new: true }
      )
        .populate("author_id", "_id f_name l_name")
        .populate("groupId", "_id name");
      return res.status(200).send({
        ...post._doc,
        likes: post.likes.length,
        comments: post.comments.length,
      });
    }
  })
);

// A route to comment on a  Post
router.put(
  "/comment/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { send } = req.notification;
    const { comment } = req.body;
    const { profile: profile_id } = req.user;
    const profile = await ProfileModel.findById({ _id: profile_id }).select(
      "_id f_name l_name"
    );
    let post = await PostModel.findById(req.params.id)
      .populate("author_id", "page_admin_id name")
      .populate("groupId", "_id name group_admin_id");

    let newComment = new CommentModel({
      author: profile_id,
      comment,
      post_id: post._id,
    });
    await newComment.save();
    newComment = await CommentModel.findById(newComment._id).populate(
      "author",
      "_id f_name l_name"
    );
    post.comments.push(newComment._id);
    await post.save();
    let notification = {
      notification: `${profile.f_name} ${profile.l_name} Commented on  Your post`,
      noti_from_id: profile._id,
      link: "/post",
      profile_id: post.author_id._id,
    };
    let canSendNoti = true;
    if (post.belongsTo === "page") {
      notification = {
        ...notification,
        notification: `${profile.f_name} ${profile.l_name} Commented on Your post in Page  ${post.author_id.name}`,
        profile_id: post.author_id.page_admin_id,
      };
    }
    if (post.belongsTo === "group") {
      const group = await GroupModel.findOne({
        _id: post.groupId._id,
        "members._id": post.author_id._id,
      });
      if (!group) {
        canSendNoti = false;
      } else {
        notification = {
          ...notification,
          notification: `${profile.f_name} ${profile.l_name} Commented on Your post in Group ${post.groupId.name}`,
          profile_id: post.author_id._id,
        };
      }
    }
    if (
      (post.belongsTo === "profile" && post.author_id._id != profile_id) ||
      (post.belongsTo === "page" &&
        post.author_id.page_admin_id != profile_id) ||
      (post.belongsTo === "group" && post.author_id._id != profile_id)
    ) {
      if (canSendNoti) {
        await send(notification);
      }
    }
    res.status(200).send(newComment);
  })
);

// delete Routes
// A route to delete a post.
router.delete(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    let deleteFlag = false;
    let post = await PostModel.findById({ _id: req.params.id })
      .populate("author_id", "_id page_admin_id")
      .populate("groupId", "group_admin_id");

    if (
      post.belongsTo === "page" &&
      post.author_id.page_admin_id == req.user.profile
    ) {
      deleteFlag = true;
    }
    if (
      post.belongsTo === "group" &&
      (post.groupId.group_admin_id == req.user.profile ||
        post.author_id._id == req.user.profile)
    ) {
      deleteFlag = true;
    }
    if (
      post.belongsTo === "profile" &&
      post.author_id._id == req.user.profile
    ) {
      deleteFlag = true;
    }
    if (deleteFlag) {
      await PostModel.deleteOne({ _id: post._id });
      await CommentModel.deleteMany({ post_id: post._id });
      return res.status(200).send(post._id);
    }
    return res.status(400).send("Invalid Operation");
  })
);

router.delete(
  "/:_id/comment/:comment_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id, comment_id } = req.params;
    const { profile: profile_id } = req.user;
    let comment = await CommentModel.findOneAndDelete({
      _id: comment_id,
      post_id: _id,
      author: profile_id,
    });
    await PostModel.findByIdAndUpdate(
      _id,
      {
        $pull: { comments: comment_id },
      },
      { new: true }
    );
    res.status(200).send({
      id: comment._id,
    });
  })
);

module.exports = router;
