const { RequestError } = require("../../helpers");
const { User } = require("../../models");
const bcryptjs = require("bcryptjs");

const addUser = async (req, res, next) => {
 
  const { email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  console.log(hashPassword);

  const requestedUser = await User.find({ email });
  if (requestedUser.length > 0) {
    throw RequestError(409, "Email in use");
  }
  const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json({ user: { email, subscription: newUser.subscription } });
};

module.exports = addUser;
