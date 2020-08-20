const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  profile_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

userSchema.methods.genToken = function () {
  const token = jwt.sign(
    { id: this._id, profile: this.profile_id },
    config.get("secretKey"),
    {
      expiresIn: "2 days",
    }
  );
  return token;
};

const validateRegisterUser = (body) => {
  let schema = {
    f_name: joi.string().required().min(3).max(255),
    l_name: joi.string().required().min(3).max(255),
    email: joi.string().required().min(5).max(255).email(),
    about: joi.string().required().min(3).max(255),
    password: joi.string().required().min(3).max(255),
    gender: joi.string().required(),
  };
  return joi.validate(body, schema);
};

const validateAuthUser = (body) => {
  let schema = {
    email: joi.string().required().min(5).max(255).email(),
    password: joi.string().required().min(3).max(255),
  };
  return joi.validate(body, schema);
};
const UserModel = mongoose.model("User", userSchema);

UserModel.methods;

module.exports.validateRegisterUser = validateRegisterUser;
module.exports.UserModel = UserModel;
module.exports.validateAuthUser = validateAuthUser;
