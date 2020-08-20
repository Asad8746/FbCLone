const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const config = require("config");
const fileupload = require("express-fileupload");

const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const PostsRouter = require("./routes/posts");
const FollowPeopleRouter = require("./routes/FollowRoutes");
const homeRouter = require("./routes/home");
const blockRouter = require("./routes/blockuser");
const unBlockRouter = require("./routes/unBlockRoutes");
const pageRouter = require("./routes/pageRoutes");
const groupRouter = require("./routes/groupRoutes");

require("./models/PageModel");

let app = express();

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

mongoose
  .connect(config.get("mongoUri"))
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}...`);
});
