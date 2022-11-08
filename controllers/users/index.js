const addUser = require("./addUser.js");
const login = require("./login.js");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const changeSubscription = require("./changeSubscription");
const setAvatar = require("./setAvatar.js");
const verify = require("./verifry");
const repeatedVerify = require("./repeatedVerify");

module.exports = {
  addUser,
  login,
  getCurrentUser,
  logout,
  changeSubscription,
  setAvatar,
  verify,
  repeatedVerify,
};
