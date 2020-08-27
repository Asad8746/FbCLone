const auth = require("../Middleware/auth");
const asyncMiddleware = require("../Middleware/asyncMiddleware");
const { PostModel, validatePost } = require("../models/PostModel");
const express = require("express");

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

// A Route for getting all profile Posts
router.get(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    let posts = await PostModel.find({
      belongsTo: "",
      author_id: req.params.id,
    })
      .select("-image")
      .populate("author_id", "_id f_name l_name")
      .sort("-date");
    posts = posts.map((item) => {
      return {
        ...item._doc,
        comments: item.comments.length,
        likes: item.likes.length,
      };
    });
    return res.status(200).send(posts);
  })
);

// A route for getting all comments based on post id
router.get(
  "/comment/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { comments } = await PostModel.findOne({ _id: req.params.id })
      .select("comments")
      .sort("-comments.date")
      .populate("comments.profile_id", "_id f_name l_name");
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
    let post;
    if (!req.files) {
      post = new PostModel({
        author_id: profile_id,
        description,
        belongsTo: "",
      });
    } else {
      const { data, mimetype } = req.files.file;
      post = new PostModel({
        author_id: profile_id,
        image: { data, contentType: mimetype },
        hasImage: true,
        description,
        belongsTo: "",
      });
    }
    await post.save();
    post = await PostModel.findById({ _id: post._id })
      .select("-image")
      .populate("author_id", "_id f_name l_name", "Profile");

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
    const { profile: profile_id } = req.user;
    await PostModel.findOneAndUpdate(
      { _id, author_id: profile_id },
      {
        description: req.body.description,
      },
      { new: true }
    )
      .select("_id author_id description")
      .populate("author_id", "_id f_name l_name", "Profile");
    res.sendStatus(200);
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
    const { profile: profile_id } = req.user;
    let { likes } = await PostModel.findOne({ _id: post_id }).select("likes");
    const isLiked = likes.find((item) => {
      return item._id == profile_id;
    });
    if (isLiked) return res.status(400).send("Already Liked");
    let post = await PostModel.findByIdAndUpdate(
      { _id: post_id },
      { $push: { likes: { _id: profile_id } } },
      { new: true }
    )
      .populate("author_id", "_id f_name l_name")
      .populate("pageId", "_id name")
      .populate("groupId", "_id name");

    res.status(200).send({
      ...post._doc,
      likes: post.likes.length,
      comments: post.comments.length,
    });
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
        .populate("author_id", "_id f_name l_name", "Profile")
        .populate("pageId", "_id name")
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
    const { profile: profile_id } = req.user;
    let post = await PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            profile_id,
            comment: req.body.comment,
          },
        },
      },
      { new: true }
    )
      .populate("comments.profile_id", "_id f_name l_name")
      .populate("author_id", "_id f_name l_name")
      .populate("pageId", "_id name")
      .populate("groupId", "_id name");
    const commentList = post.comments;
    post = {
      ...post._doc,
      comments: post.comments.length,
      likes: post.likes.length,
    };
    res.status(200).send({
      post,
      commentList,
    });
  })
);

// delete Routes
// A route to delete a post.
router.delete(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    let post = await PostModel.findById({ _id: req.params.id }).populate(
      "groupId",
      "group_admin_id"
    );
    if (
      post.belongsTo === "group" &&
      post.groupId.group_admin_id == req.user.profile
    ) {
      await PostModel.deleteOne({ _id: post._id });
      return res.status(200).send(post._id);
    }
    if (post.author_id != req.user.profile)
      return res.status(400).send("Bad Request");
    await PostModel.deleteOne({ _id: post._id });
    return res.status(200).send(post._id);
  })
);

router.delete(
  "/:_id/comment/:comment_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id, comment_id } = req.params;
    const { profile: profile_id } = req.user;
    let post = await PostModel.findByIdAndUpdate(
      { _id },
      {
        $pull: { comments: { _id: comment_id, profile_id } },
      },
      { new: true }
    )
      .populate("comments.profile_id", "_id f_name l_name")
      .populate("author_id", "_id f_name l_name")
      .populate("pageId", "_id name")
      .populate("groupId", "_id name", "Group");

    const commentList = post.comments;
    post = {
      ...post._doc,
      comments: post.comments.length,
      likes: post.likes.length,
    };
    res.status(200).send({
      post,
      commentList,
    });
  })
);

module.exports = router;
