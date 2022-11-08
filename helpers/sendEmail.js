const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = (data) => {
  const mail = { ...data, from: "alekszhov@meta.ua" };
  sgMail
    .send(mail)
    .then(() => console.log("Message was sent successfully"))
    .catch((error) => console.log(error.message));
};
module.exports = sendEmail;
