const { listContacts } = require("../../models/contacts.js");

const getContactsList = async (req, res) => {
  const contactsList = await listContacts();
  res.status(200).json({
    data: contactsList,
  });
};

module.exports = getContactsList;
