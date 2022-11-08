const { RequestError } = require("../../helpers");
const { User } = require("../../models");
const dotenv = require("dotenv");
dotenv.config();
const { SENDGRID_API_KEY } = process.env;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const verifyUser = await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: "" }
  );
  console.log(verifyUser);
  if (!verifyUser) {
    throw RequestError(404, "User not found");
  } else {
    res.status(200).json({ message: "User was successfully verified" });
  }
};

module.exports = verify;
