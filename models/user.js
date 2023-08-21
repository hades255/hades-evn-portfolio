const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Model = require("./model");
const User = new Model("users");

User.makeSalt = function () {
  return Math.round(new Date().valueOf() * Math.random()) + "";
};

User.encryptPassword = function (password) {
  if (!password) return "";
  try {
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
  } catch (err) {
    return "";
  }
};

User.authenticate = function (plainText) {
  return this.encryptPassword(plainText) === this.hashed_password;
};

Object.defineProperty(User, "password", {
  set: function (password) {
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  },
});

User.generateAccessToken = function () {
  return jwt.sign(this.id, "process.env.TOKEN_SECRET");
};

User.create = function (data) {
  this.add({ ...data }).save();
};

module.exports = User;
