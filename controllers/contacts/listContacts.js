// const { listContacts } = require("../../models/contacts.js");
const { Product } = require("../../models");

const getContactsList = async (req, res) => {
  const contactsList = await Product.find({});
  //   const contactsList = await listContacts();
  res.status(200).json({
    data: contactsList,
  });
};

module.exports = getContactsList;
