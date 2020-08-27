//Dependencies
const cors = require("cors");
const express = require("express");
const fileupload = require("express-fileupload");
//Routes
const userRouter = require("../routes/user");
const profileRouter = require("../routes/profile");
const PostsRouter = require("../routes/posts");
const FollowPeopleRouter = require("../routes/FollowRoutes");
const homeRouter = require("../routes/home");
const blockRouter = require("../routes/blockuser");
const unBlockRouter = require("../routes/unBlockRoutes");
const pageRouter = require("../routes/pageRoutes");
const groupRouter = require("../routes/groupRoutes");
//Middleware
const errorMiddleware = require("../Middleware/errorMiddlware");

module.exports = function (app) {
  app.use(cors({ exposedHeaders: "x-auth-token" }));
  app.use(express.static("public"));
  app.use(fileupload());
  app.use(express.json());
  app.use("/home", homeRouter);
  app.use("/user", userRouter);
  app.use("/profile", profileRouter);
  app.use("/follower", FollowPeopleRouter);
  app.use("/posts", PostsRouter);
  app.use("/block", blockRouter);
  app.use("/unblock", unBlockRouter);
  app.use("/pages", pageRouter);
  app.use("/groups", groupRouter);
  app.use(errorMiddleware);
};
