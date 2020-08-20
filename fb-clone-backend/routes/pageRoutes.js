const express = require("express");
const PageModel = require("../models/PageModel");
const ProfileModel = require("../models/profile");

const { PostModel, validatePost } = require("../models/PostModel");
const auth = require("../Middleware/auth");
const pageAdmin = require("../Middleware/pageAdmin");
const router = express.Router();

// Get route for getting all posts for page
router.delete("/:page_id", [auth, pageAdmin], async (req, res) => {
  const { _id } = req.userPage;
  await PageModel.findByIdAndDelete({ _id });
  res.sendStatus(200);
});

router.get("/:_id/posts", auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const page = await PageModel.findById({ _id }).select("_id");
    if (!page) return res.sendStatus(404);
    let posts = await PostModel.find({
      belongsToId: page._id,
      belongsTo: "page",
    })
      .populate("belongsToId", "_id page_name page_admin_id", "Page")
      .select("-image");
    console.log("posts");
    res.status(200).send(posts);
  } catch (err) {
    res.send(err.message);
  }
});
// A Route for updating page likes
/*
First i am checking if a page with given id exists if no then 
return status code 404 which means not found if yes then check 
if our user already liked the page if yes then return response 
with status code 400 if not then update then Page likes Array.

*/
router.put("/like/:_id", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    const { _id } = req.params;
    const page = await PageModel.findById({ _id });
    if (!page) res.sendStatus(404);
    const isLiked = page.likes.find((item) => {
      return item._id == profile_id;
    });
    if (isLiked) return res.status(400).send("already Liked");
    page.likes.push({ _id: profile_id });
    await ProfileModel.findByIdAndUpdate(
      { _id: profile_id },
      {
        $push: {
          pages: {
            _id,
          },
        },
      },
      { new: true }
    );
    await page.save();
    res.status(200).send(page.likes);
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err.message);
  }
});
// A Route for updating page unlikes

router.put("/dislike/:_id", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    const { _id } = req.params;
    const page = await PageModel.findByIdAndUpdate(
      { _id },
      {
        $pull: { likes: { _id: profile_id } },
      },
      { new: true }
    );

    await ProfileModel.findByIdAndUpdate(
      { _id: profile_id },
      {
        $pull: {
          pages: {
            _id: page._id,
          },
        },
      }
    );
    res.status(200).send(page.likes);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/isLiked/:_id", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    const { _id } = req.params;
    const page = await PageModel.findOne({
      _id,
      likes: { _id: profile_id },
    }).select("_id page_name");
    if (page) return res.status(200).send(true);
    return res.status(400).send(false);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
// Route for updating page post
router.put("/:page_id/post/:post_id", [auth, pageAdmin], async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { description } = req.body;
  const { post_id } = req.params;
  const { _id } = req.userPage;
  await PostModel.findOneAndUpdate(
    {
      _id: post_id,
      belongsTo: "page",
      belongsToId: _id,
    },
    {
      description,
    },
    { new: true }
  ).select("-image");
  res.sendStatus(200);
});

// Post Route for creating a post for page

router.post("/:_id/create/post", auth, async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { profile: profile_id } = req.user;
    const { _id } = req.params;

    // Checking if a page with given Id exists
    const page = await PageModel.findById({ _id }).select("_id page_admin_id");
    if (!page) return res.sendStatus(404);

    if (page.page_admin_id != profile_id) return res.sendStatus(400);
    const { description } = req.body;

    let post;
    if (!req.files) {
      post = new PostModel({
        // author_id: profile_id,
        description,
        belongsTo: "page",
        belongsToId: page._id,
      });
    } else {
      const { data, mimetype } = req.files.file;
      post = new PostModel({
        image: { data, contentType: mimetype },
        hasImage: true,
        description,
        belongsTo: "page",
        belongsToId: _id,
        // author_id: profile_id,
      });
    }
    await post.save();
    res.send(
      await PostModel.findById({ _id: post._id })
        .select("-image")
        .populate("belongsToId", "_id page_name", "Page")
    );
  } catch (err) {
    res.send(err.message);
  }
});
// delete Request for Page Post

router.delete("/:page_id/post/:post_id", auth, async (req, res) => {
  try {
    const { page_id, post_id } = req.params;
    const { profile: profile_id } = req.user;
    const Page = await PageModel.findById({ _id: page_id });
    if (!Page) return res.sendStatus(404);
    if (Page.page_admin_id != profile_id) return res.sendStatus(400);
    let Post = await PostModel.findOneAndDelete({
      _id: post_id,
      belongsToId: Page._id,
      belongsTo: "page",
    });
    PostModel.findOneAndDelete;
    res.status(200).send(Post);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(res.message);
  }
});

// A Route for getting all Pages that are liked by our user
router.get("/liked", auth, async (req, res) => {
  const { profile: profile_id } = req.user;
  const pages = await PageModel.find({ likes: { _id: profile_id } }).select(
    "_id page_name page_description"
  );
  res.status(200).send(pages);
});

// A route for getting all Pages where these are not managed by our user and not either liked

router.get("/all", auth, async (req, res) => {
  try {
    const { profile: profile_id } = req.user;
    let pages = await PageModel.find({
      page_admin_id: { $ne: profile_id },
      likes: { $nin: [{ _id: profile_id }] },
    }).select("_id page_name page_description");
    res.send(pages);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

// A route for getting all Pages that are managed  by our  user
router.get("/my", auth, async (req, res) => {
  const { profile: profile_id } = req.user;
  let pages = await PageModel.find({
    page_admin_id: profile_id,
  }).select("_id page_name page_description");
  res.status(200).send(pages);
});

router.get("/:_id/cover", async (req, res) => {
  try {
    const { _id } = req.params;
    const { page_cover } = await PageModel.findById({ _id }).select(
      "page_cover"
    );
    if (!page_cover.Data) {
      return res.sendFile(process.cwd() + "/public/free1.jpg");
    }
    res.set("Content-Type", page_cover.contentType).send(page_cover.Data);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});

// A Route for getting a single Page
router.get("/:_id", auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const page = await PageModel.findById({ _id }).select("-page_cover");
    res.send(page);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

// A Post route for Creating a new Page
router.post("/", auth, async (req, res) => {
  try {
    const { page_name, page_description } = req.body;
    const { profile: profile_id } = req.user;
    let Page = new PageModel({
      page_name,
      page_description,
      page_admin_id: profile_id,
    });
    if (req.files) {
      const { data: Data, mimetype: contentType } = req.files.file;
      Page.page_cover = {
        Data,
        contentType,
      };
    }

    await ProfileModel.findByIdAndUpdate(
      { _id: profile_id },
      {
        $push: {
          pages: {
            _id: Page._id,
            isAdmin: true,
          },
        },
      },
      { new: true }
    );

    await Page.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

router.patch("/:page_id", [auth, pageAdmin], async (req, res) => {
  try {
    const page = req.userPage;
    page.page_name = req.body.page_name;
    page.page_description = req.body.page_description;
    await page.save();
    res.sendStatus(200);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
