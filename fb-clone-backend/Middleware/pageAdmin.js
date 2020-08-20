const PageModel = require("../models/PageModel");

module.exports = async (req, res, next) => {
  try {
    const page = await PageModel.findById({ _id: req.params.page_id }).select(
      "page_admin_id"
    );
    if (page.page_admin_id == req.user.profile) {
      req.userPage = page;
      return next();
    }
    return res.sendStatus(401);
  } catch (err) {
    res.sendStatus(400);
  }
};
