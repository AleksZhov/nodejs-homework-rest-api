
const { Contact } = require("../../models");

const addNewContact = async (req, res, next) => {
  const { _id } = req.user;
  const addedContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    data: addedContact,
  });
};

module.exports = addNewContact;
