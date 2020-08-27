const { GroupModel } = require("../models/GroupModel");
const ProfileModel = require("../models/profile");

module.exports = async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const { profile: profile_id } = req.user;
    const group = await GroupModel.findById({ _id: group_id }).select("-cover");
    if (group.group_admin_id == profile_id) {
      req.group = group;
      return next();
    }
    return res.sendStatus(400);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
