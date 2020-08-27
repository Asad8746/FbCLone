const express = require("express");
const PageModel = require("../models/PageModel");
const ProfileModel = require("../models/profile");
const asyncMiddleware = require("../Middleware/asyncMiddleware");

const { PostModel, validatePost } = require("../models/PostModel");
const auth = require("../Middleware/auth");
const pageAdmin = require("../Middleware/pageAdmin");
const router = express.Router();

// Get route for deleting a page
router.delete(
  "/:page_id",
  [auth, pageAdmin],
  asyncMiddleware(async (req, res) => {
    const { _id } = req.userPage;
    await PageModel.findByIdAndDelete({ _id });
    res.sendStatus(200);
  })
);

router.get(
  "/:_id/posts",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const page = await PageModel.findById({ _id }).select("_id");
    if (!page) return res.sendStatus(404);
    let posts = await PostModel.find({
      pageId: page._id,
      belongsTo: "page",
    })
      .populate("pageId", "_id name page_admin_id")
      .select("-image");
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
// A Route for updating page likes
/*
First i am checking if a page with given id exists if no then 
return status code 404 which means not found if yes then check 
if our user already liked the page if yes then return response 
with status code 400 if not then update then Page likes Array.

*/
router.put(
  "/like/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const { _id } = req.params;
    const page = await PageModel.findById({ _id });
    if (!page) res.sendStatus(404);
    const isLiked = page.likes.find((item) => {
      return item._id == profile_id;
    });
    if (isLiked) return res.status(400).send("already Liked");
    page.likes.push({ _id: profile_id });
    await page.save();
    res.status(200).send(page.likes);
  })
);
// A Route for updating page unlikes

router.put(
  "/dislike/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
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
  })
);

router.get(
  "/isLiked/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const { _id } = req.params;
    const page = await PageModel.findOne({
      _id,
      likes: { _id: profile_id },
    }).select("_id name");
    if (page) return res.status(200).send(true);
    return res.status(400).send(false);
  })
);
// Route for updating page post
router.put(
  "/:page_id/post/:post_id",
  [auth, pageAdmin],
  asyncMiddleware(async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { description } = req.body;
    const { post_id } = req.params;
    const { _id } = req.userPage;
    await PostModel.findOneAndUpdate(
      {
        _id: post_id,
        belongsTo: "page",
        pageId: _id,
      },
      {
        description,
      },
      { new: true }
    );
    res.sendStatus(200);
  })
);

// Post Route for creating a post for page

router.post(
  "/:_id/create/post",
  auth,
  asyncMiddleware(async (req, res) => {
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
        pageId: page._id,
      });
    } else {
      const { data, mimetype } = req.files.file;
      post = new PostModel({
        image: { data, contentType: mimetype },
        hasImage: true,
        description,
        belongsTo: "page",
        pageId: _id,
      });
    }
    await post.save();
    post = await PostModel.findById({ _id: post._id })
      .select("-image")
      .populate("pageId", "_id name page_admin_id");
    res.send({
      ...post._doc,
      comments: post.comments.length,
      likes: post.likes.length,
    });
  })
);
// delete Request for Page Post

router.delete(
  "/:page_id/post/:post_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { page_id, post_id } = req.params;
    const { profile: profile_id } = req.user;
    const Page = await PageModel.findById({ _id: page_id });
    if (!Page) return res.sendStatus(404);
    if (Page.page_admin_id != profile_id) return res.sendStatus(400);
    let Post = await PostModel.findOneAndDelete({
      _id: post_id,
      pageId: Page._id,
      belongsTo: "page",
    });
    res.status(200).send(Post._id);
  })
);

// A Route for getting all Pages that are liked by our user
router.get(
  "/liked",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const pages = await PageModel.find({ likes: { _id: profile_id } }).select(
      "_id name description"
    );
    res.status(200).send(pages);
  })
);

// A route for getting all Pages where these are not managed by our user and not either liked

router.get(
  "/all",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    let pages = await PageModel.find({
      page_admin_id: { $ne: profile_id },
      likes: { $nin: [{ _id: profile_id }] },
    }).select("_id name description");
    res.send(pages);
  })
);

// A route for getting all Pages that are managed  by our  user
router.get(
  "/my",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    let pages = await PageModel.find({
      page_admin_id: profile_id,
    }).select("_id name description");
    res.status(200).send(pages);
  })
);

router.get(
  "/:_id/cover",
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const { cover } = await PageModel.findById({ _id }).select("cover");
    if (!cover.data) {
      return res.sendFile(process.cwd() + "/public/free1.jpg");
    }
    res.set("Content-Type", cover.contentType).send(cover.data);
  })
);

// A Route for getting a single Page
router.get(
  "/:_id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { _id } = req.params;
    const page = await PageModel.findById({ _id }).select("-cover");
    res.send(page);
  })
);

// A Post route for Creating a new Page
router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { name, description } = req.body;
    const { profile: profile_id } = req.user;
    let Page = new PageModel({
      name,
      description,
      page_admin_id: profile_id,
    });
    if (req.files) {
      const { data, mimetype: contentType } = req.files.file;
      Page.cover = {
        data,
        contentType,
      };
    }
    await Page.save();
    res.sendStatus(201);
  })
);

router.patch(
  "/:page_id",
  [auth, pageAdmin],
  asyncMiddleware(async (req, res) => {
    const page = req.userPage;
    page.name = req.body.name;
    page.description = req.body.description;
    await page.save();
    res.sendStatus(200);
  })
);
router.put(
  "/upload/cover/:page_id",
  [auth, pageAdmin],
  asyncMiddleware(async (req, res) => {
    let { page_id } = req.params;
    if (!req.files) return res.status(400).send("Incorrect File Data");
    const { data, mimetype } = req.files.file;
    await PageModel.findByIdAndUpdate(
      { _id: page_id },
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

module.exports = router;
