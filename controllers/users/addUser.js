const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const addUser = async (req, res, next) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  const requestedUser = await User.find({ email });
  if (requestedUser.length > 0) {
    throw RequestError(409, "Email in use");
  }
  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target = "_blank" href = "http://localhost:3000/api/users/verify/${verificationToken}">Click this link to verify email</a>`,
  };

  await sendEmail(mail);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
      verificationToken: newUser.verificationToken,
    },
  });
};

module.exports = addUser;
