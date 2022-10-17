const { RequestError } = require("../../helpers");
const { User } = require("../../models");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");

const addUser = async (req, res, next) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  const requestedUser = await User.find({ email });
  if (requestedUser.length > 0) {
    throw RequestError(409, "Email in use");
  }
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res
    .status(201)
    .json({ user: { email, subscription: newUser.subscription, avatarURL } });
};

module.exports = addUser;
