const auth = require("../Middleware/auth");
const { PostModel, validatePost } = require("../models/PostModel");
const express = require("express");

let router = express.Router();

// Get routes

// A route for getting a single Post based on post id
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById({ _id: id }).select({
    _id: 1,
    description: 1,
    belongsTo: 1,
    belongsToId: 1,
    author_id: 1,
  });
  if (!post) return res.sendStatus(404);
  res.status(200).send(post);
});

// A route for extracting post image.
router.get("/post_pic/:id", async (req, res) => {
  const { image } = await PostModel.findById({ _id: req.params.id });

  res.set("Content-Type", image.contentType);
  return res.status(200).send(image.data);
});

// A Route for getting all profile Posts
router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await PostModel.find({ author_id: req.params.id })
      .select("-image")
      .populate("author_id", "_id f_name l_name", "Profile")
      .sort("-date");
    return res.status(200).send(posts);
  } catch (err) {
    console.log(err.message);
  }
});

// A route for getting all comments based on post id
router.get("/comment/:id", auth, async (req, res) => {
  try {
    const { comments } = await PostModel.findOne({ _id: req.params.id })
      .select("comments")
      .sort("-comments.date")
      .populate("comments.profile_id", "_id f_name l_name");
    return res.status(200).send(comments);
  } catch (err) {
    console.log(err.message);
  }
});

//Post Routes
router.post("/create", auth, async (req, res) => {
  try {
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
    res.send(
      await PostModel.findById({ _id: post._id })
        .select("-image")
        .populate("author_id", "_id f_name l_name", "Profile")
    );
  } catch (err) {
    console.log(err.message);
  }
});

// Put Routes

/* A route for modifying post description 
where i am first validating the post using validatePost 
function which will return a object with 2 fields error and result 
error will be empty if our req.body has no validation errors
if not then i am returing a response with status code 400 and with validation message
*/
router.put("/post/:_id", auth, async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err.message);
  }
});

/* A route for user to like a  Post 
In this route i am first checking if a post is already liked 
by our user if yes then a response with status code 400 and message 
already liked is returned if not then a new user is pushed into the 
post likes array.
*/
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const { post_id } = req.params;
    const { profile: profile_id } = req.user;
    let { likes } = await PostModel.findOne({ _id: post_id }).select("likes");
    const isLiked = likes.find((item) => {
      return item._id == profile_id;
    });
    if (isLiked) return res.status(400).send("Already Liked");
    const post = await PostModel.findByIdAndUpdate(
      { _id: post_id },
      { $push: { likes: { _id: profile_id } } },
      { new: true }
    )
      .populate("author_id", "_id f_name l_name", "Profile")
      .populate("belongsToId", "_id page_name", "Page");
    res.status(200).send(post);
  } catch (err) {
    console.log(err.message);
  }
});

// A route where a user can dislike a  Post
router.put("/dislike/:id", auth, async (req, res) => {
  try {
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
        .populate("belongsToId", "_id page_name", "Page");
      return res.status(200).send(post);
    }
    return res.sendStatus(400);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// A route to comment on a  Post
router.put("/comment/:id", auth, async (req, res) => {
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
    .populate("author_id", "_id f_name l_name", "Profile")
    .populate("belongsToId", "_id page_name", "Page");

  res.status(200).send(post);
});

// delete Routes
// A route to delete a post.
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await PostModel.findById({ _id: req.params.id });
    if (post.author_id != req.user.profile)
      return res.status(400).send("Bad Request");
    await PostModel.deleteOne({ _id: post._id });
    res.status(200).send(post);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:_id/comment/:comment_id", auth, async (req, res) => {
  try {
    const { _id, comment_id } = req.params;
    const { profile: profile_id } = req.user;
    const post = await PostModel.findByIdAndUpdate(
      { _id },
      {
        $pull: { comments: { _id: comment_id, profile_id } },
      },
      { new: true }
    )
      .populate("comments.profile_id", "_id f_name l_name")
      .populate("author_id", "_id f_name l_name", "Profile")
      .populate("belongsToId", "_id page_name", "Page");
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
