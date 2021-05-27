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
    const { _id } = req.params;
    const { profile: profile_id } = req.user;
    const profile = await ProfileModel.findById(profile_id).select(
      "_id f_name l_name"
    );
    const { send } = req.notification;
    if (!profile) return res.sendStatus(404);
    const page = await PageModel.findById({ _id });
    if (!page) res.sendStatus(404);
    const isLiked = page.likes.find((item) => {
      return item._id == profile_id;
    });
    if (isLiked) return res.status(400).send("already Liked");
    page.likes.push({ _id: profile_id });
    await page.save();
    if (page.page_admin_id.toString() !== profile_id) {
      await send({
        notification: `${profile.f_name} ${profile.l_name} Liked Your Page  ${page.name}`,
        noti_from_id: profile._id,
        link: "http://something.com",
        profile_id: page.page_admin_id,
      });
    }
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
    }).select("_id");
    if (page) return res.status(200).send(true);
    return res.status(200).send(false);
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
    const page = await PageModel.findById({ _id }).select(
      "_id name page_admin_id"
    );
    if (!page) return res.sendStatus(404);

    if (page.page_admin_id != profile_id) return res.sendStatus(400);
    const { description } = req.body;

    let post = {
      description,
      belongsTo: "page",
      author_id: page._id,
      author_name: page.name,
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
      .populate("author_id", "_id page_admin_id");
    res.send({
      ...post._doc,
      comments: post.comments.length,
      likes: post.likes.length,
    });
  })
);

// A Route for getting  Pages based on type [all,managed,liked]
router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { profile: profile_id } = req.user;
    const { pageNumber, type } = req.query;

    let query = {};
    if (type === "all") {
      query = {
        page_admin_id: { $ne: profile_id },
        "likes._id": { $ne: profile_id },
      };
    } else if (type === "managed") {
      query = {
        page_admin_id: profile_id,
      };
    } else if (type === "liked") {
      query = { "likes._id": profile_id };
    }
    const pages = await PageModel.find(query)
      .select("_id name description page_admin_id")
      .limit(10)
      .skip((parseInt(pageNumber) - 1) * 10);
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
    if (!page) return res.status(404).send("Page not found");
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
