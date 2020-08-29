const { UserModel } = require("../models/user");
const bcrypt = require("bcrypt");
module.exports = async (req, res, next) => {
  try {
    const { confirmPassword, password } = req.body;
    const { id } = req.user;
    const user = await UserModel.findById({ _id: id });

    const passwordCheck = await bcrypt.compare(confirmPassword, user.password);
    if (passwordCheck) {
      if (password) {
        user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        await user.save();
      }
      return next();
    }
    return res.status(400).send("Wrong Password");
  } catch (err) {
    res.send(err.message);
  }
};
