const express = require("express");
const { GroupModel, validateGroup } = require("../models/GroupModel");
const auth = require("../Middleware/auth");
const ProfileModel = require("../models/profile");
const router = express.Router();

router.put("/:group_id/member/:member_id", auth, async (req, res) => {
  try {
  } catch (err) {
    res.send(err.message);
  }
});

// A Post Request to create a new Group

router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateGroup(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { group_name, group_description } = req.body;
    const { profile: profile_id } = req.user;
    let Group = new GroupModel({
      group_name,
      group_description,
      group_admin_id: profile_id,
    });
    if (req.files) {
      console.log("i am runnign");
      const { data: Data, mimetype: contentType } = req.files.file;
      Group.group_cover = {
        Data,
        contentType,
      };
    }

    await ProfileModel.findByIdAndUpdate(
      { _id: profile_id },
      {
        $push: {
          groups: {
            _id: Group._id,
            isAdmin: true,
          },
        },
      },
      { new: true }
    );

    await Group.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
