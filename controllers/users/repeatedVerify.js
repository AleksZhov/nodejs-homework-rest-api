const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");
const repeatedVerify = async (req, res) => {
  const { email } = req.body;
  const requestedUser = await User.findOne({ email });
  if (requestedUser.verify === true) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: requestedUser.email,
    subject: "Verify email",
    html: `<a target = "_blank" href = "http://localhost:3000/api/users/verify/${requestedUser.verificationToken}">Click this link to verify email</a>`,
  };
  await sendEmail(mail);
  res.json({ message: "Verification email sent" });
};

module.exports = repeatedVerify;
