const { GroupModel } = require("../models/GroupModel");
const ProfileModel = require("../models/profile");

module.exports = async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    const group = await GroupModel.findById({ _id: group_id })
      .select("-cover")
      .populate("group_admin_id", "_id f_name l_name");
    if (group.group_admin_id._id == profile_id) {
      req.group = group;
      return next();
    }
    return res.sendStatus(400);
  } catch (err) {
    console.log("Got error");
    res.status(400).send(err.message);
  }
};
