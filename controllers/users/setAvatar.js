const { User } = require("../../models");

const setAvatar = (req, res) => {
  console.log(req.file);
};

module.exports = setAvatar;
